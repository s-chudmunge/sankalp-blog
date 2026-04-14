export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const action = url.searchParams.get('action'); // "get" or "inc"

  if (!slug) return new Response('Missing slug', { status: 400 });

  // 1. Basic Bot Filtering
  const ua = request.headers.get('user-agent') || '';
  const isBot = /bot|crawler|spider|slurp|screenshot|libwww|http|fetch|python|node/i.test(ua);
  
  // 2. Access the KV Store (you'll need to bind a KV namespace named 'VIEWS' in CF Dashboard)
  if (!env.VIEWS) {
    return new Response(JSON.stringify({ count: 0, error: 'KV not bound' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const key = `views:${slug}`;
  let count = parseInt(await env.VIEWS.get(key) || '0');

  if (action === 'inc' && !isBot) {
    // 3. Unique Check (Optional: use a 24h hash of IP to prevent double-counting refreshes)
    const ip = request.headers.get('cf-connecting-ip') || '';
    const date = new Date().toISOString().split('T')[0];
    const visitorKey = `visitor:${slug}:${ip}:${date}`;
    const alreadyCounted = await env.VIEWS.get(visitorKey);

    if (!alreadyCounted) {
      count++;
      await env.VIEWS.put(key, count.toString());
      await env.VIEWS.put(visitorKey, '1', { expirationTtl: 86400 });
    }
  }

  return new Response(JSON.stringify({ count }), {
    headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' 
    }
  });
}
