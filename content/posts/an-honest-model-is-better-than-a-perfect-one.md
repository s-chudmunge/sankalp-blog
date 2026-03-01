---
title: "An Honest Model Is Better Than a Perfect One"
date: 2026-01-07T20:42:11Z
draft: false
---

## Training my first CNN!

Today was one of those days where the learning wasn’t about getting a high accuracy number, but about understanding *why* things behave the way they do when training deep learning models, especially in medical imaging.

I started with a simple CNN for brain tumor MRI classification. At first, the instinct was to think that more parameters and more epochs would naturally lead to better performance. That intuition turned out to be wrong. Flattening large feature maps created millions of parameters, which made the model memorize instead of understand. Switching to Global Average Pooling forced the network to focus on meaningful patterns rather than pixel-level noise, drastically reducing parameters and making training more stable.

Another important realization was that architecture decisions matter far more than training longer. Once the model capacity is fixed, increasing epochs doesn’t magically improve results. The model either has enough representational power for the task or it doesn’t. When validation accuracy plateaus and loss stops improving, that’s not failure, it’s an honest signal that the model has reached its limit.

Working with brain MRI data also highlighted how different medical images are from everyday computer vision datasets. Aggressive augmentations that work well for natural images can silently damage medical models. Vertical flips and large rotations create anatomically impossible brains. Conservative, realistic augmentations turned out to be far more important than diversity for its own sake.

I also learned why validation loss is often more informative than accuracy. Accuracy only counts whether predictions are right or wrong, while loss captures confidence and uncertainty. In medical tasks, a model being confidently wrong is far worse than being cautiously correct, which makes validation loss a better indicator of real-world usefulness.

Switching from CPU to GPU was eye-opening but also clarifying. Training became dramatically faster, but accuracy stayed the same. Hardware affects speed, not intelligence. If a model is capacity-limited or data-limited, no amount of compute will fix that.

Finally, seeing training, validation, and test accuracy line up around the same range was reassuring. It meant there was no data leakage, no cheating, and no misleading metrics. The model was learning honestly, even if the final accuracy wasn’t impressive. That honesty is more valuable than inflated numbers.

By the end of the day, the biggest lesson was simple: good machine learning isn’t about chasing high scores, it’s about making choices that align with the data, the domain, and reality.
