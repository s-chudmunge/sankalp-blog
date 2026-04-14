export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  const action = url.searchParams.get('action') || 'get';

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 1. Access the KV Store (you'll need to bind a KV namespace named 'VIEWS' in CF Dashboard)
  if (!env.VIEWS) {
    return new Response(JSON.stringify({ count: 0, error: 'KV not bound' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 2. Bot & Crawler Filtering
  const ua = request.headers.get('user-agent') || '';
  const cf = request.cf || {};
  const isBot = /bot|crawler|spider|slurp|screenshot|libwww|http|fetch|python|node|go-http-client|axios|curl/i.test(ua)
                || (cf.asOrganization && cf.asOrganization.match(/google|bing|baidu|yandex|duckduckgo|ia_archive/i));

  const key = `views:${slug}`;
  let count = parseInt(await env.VIEWS.get(key) || '0');

  if (action === 'inc' && !isBot) {
    // 3. Unique Visitor Check (prevent double-counting within 24h)
    const ip = request.headers.get('cf-connecting-ip') || '';
    // We use a date-based key to allow one count per day per IP
    const date = new Date().toISOString().split('T')[0];
    const visitorKey = `visitor:${slug}:${ip}:${date}`;
    const alreadyCounted = await env.VIEWS.get(visitorKey);

    if (!alreadyCounted) {
      count++;
      await env.VIEWS.put(key, count.toString());
      // Expire visitor key in 24 hours
      await env.VIEWS.put(visitorKey, '1', { expirationTtl: 86400 });
    }
  }

  return new Response(JSON.stringify({ count }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}
