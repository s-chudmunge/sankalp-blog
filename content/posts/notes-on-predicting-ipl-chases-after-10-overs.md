---
title: "Notes on Predicting IPL Chases After 10 Overs"
date: 2026-01-11T10:54:33Z
draft: false
---

I started this project with a deceptively simple question: can we predict whether an IPL chase will be successful once 10 overs of the second innings are complete. 

The IPL datasets I was working with had two very different granularities. The ball by ball data was a stream of events, while the match level data stored outcomes and context. If I naïvely trained on ball by ball rows, the model would see multiple rows from the same match, future information would leak backwards, and accuracy would become meaningless. The only way forward was to decide exactly when the prediction is supposed to happen. I fixed that moment at the end of the 10th over of the second innings.

Once that was clear, the data engineering problem became obvious. Each training row had to represent one match at one moment in time. That meant collapsing dozens of deliveries into a single snapshot. By sorting by match, innings, and delivery order and then creating a cumulative counter within each innings, I recreated the notion of a true ball number. Only then did filtering to the first 60 balls of the chase actually meant something.

At that point, the features almost designed themselves. Runs scored in 10 overs, extras conceded, wickets lost, wickets remaining, venue, season, chasing team, and bowling team. Every one of these was information that would have been known at that moment in the match. Anything else would be leakage. Match IDs were kept only long enough to align data correctly and then discarded.

The label construction was equally strict. Once X and Y existed in a clean, defensible form, the modeling itself was almost anticlimactic. A simple feed forward neural network with **one hidden layer** was enough. Recurrent models were unnecessary because time had already been collapsed. The network never saw sequences, only states. Using anything more complex would have added parameters without adding signal. Training used binary cross entropy with logits, not because it is fancy, but because it is numerically stable and matches the probabilistic interpretation of the task.

Preprocessing mattered more than architecture. One hot encoding categorical variables and scaling numerical features were non negotiable. Neural networks do not understand stadium names or team names, and they struggle when different features live on wildly different numeric scales. Once the preprocessing pipeline was correct, training became predictable and repeatable.

Evaluation was where expectations had to be recalibrated. The final accuracy settled around 0.58, sometimes a little higher depending on threshold choice. At first glance this looks unimpressive. But this is where domain understanding mattered more than metrics. After 10 overs of a T20 chase, the match is often genuinely undecided. Explosive batters, collapses, dew, pressure, and tactical decisions all live in the remaining overs. The model has never seen those. Expecting 70 or 80 percent accuracy at that point would mean either data leakage or self deception.

This was the most important lesson of the project. A model does not fail just because it is uncertain. Sometimes uncertainty is the correct output. In fact, a well calibrated model that admits uncertainty is far more valuable than an overconfident one that cheats. In cricket, as in many real world systems, there is an irreducible randomness that no amount of modeling can remove.

Could this model be improved. Yes, but not by stacking more layers or training for more epochs. The path forward would be better features. Target runs, required run rate, run rate differentials, phase wise scoring, team strength priors, and venue chase history would all add signal. Each might add a few percentage points, but even then the curve would flatten.

The notebook can be found here - [https://github.com/s-chudmunge/Notebooks/blob/main/IPL_chase_predictor.ipynb](https://github.com/s-chudmunge/Notebooks/blob/main/IPL_chase_predictor.ipynb)
