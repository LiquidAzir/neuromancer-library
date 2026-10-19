# 02. Compare optimizers and regularization

Resource: [Deep Learning](https://www.deeplearningbook.org/)

Weeks 3–4 · Suggested effort: 10–14 hours

## Prerequisites

Module 01 and basic linear algebra/probability. Read chapters 2–5 selectively if those foundations are unfamiliar.

## Read

Focus on chapter 6 (feedforward networks), chapter 7 (regularization), chapter 8 (optimization), and chapter 11 (practical methodology). You do not need to read the entire book before experimenting.

- [Chapter 6 · Feedforward networks](https://www.deeplearningbook.org/contents/mlp.html)
- [Chapter 7 · Regularization](https://www.deeplearningbook.org/contents/regularization.html)
- [Chapter 8 · Optimization](https://www.deeplearningbook.org/contents/optimization.html)
- [Chapter 11 · Practical methodology](https://www.deeplearningbook.org/contents/guidelines.html)

## Explain and derive

Reducing training error and improving performance on new data are different objectives. Optimization controls the update; regularization controls what solutions are favored.

`J(θ) = meanᵢ ℓ(fθ(xᵢ), yᵢ) + λ‖W‖²₂`

Derive the central relation in your own notation and state the assumptions.

## Implement

Python + NumPy or PyTorch; use the same small dataset and network from module 01.

1. Freeze the data split, architecture, batch size, training budget, and evaluation metrics.
2. Compare SGD, momentum SGD, and Adam. Give each the same small learning-rate search budget and choose settings using validation data.
3. With one chosen optimizer, compare no regularization, an L2 loss penalty, and dropout. Keep other settings fixed.
4. Run each condition with at least three seeds. Record loss curves, validation accuracy, and elapsed time.
5. Select once using validation performance; evaluate on the untouched test split and write a one-page conclusion.

## Acceptance checks

- [ ] A table reports mean and spread over seeds, with equal tuning budgets.
- [ ] The test split was not used to choose settings.
- [ ] Explain why an L2 loss penalty is not generally equivalent to decoupled weight decay for Adam.

## Limits

Results from a small dataset are evidence about this setup, not a universal ranking of optimizers.

## Lab record

- Question and hypothesis:
- Dataset / source license:
- Code commit and environment:
- Seeds and configuration:
- Metric, plot, or gradient check:
- Failure and proposed explanation:
- Next experiment:

## Access and license

Free official HTML edition. The authors’ FAQ explicitly says their MIT Press contract forbids distributing the book as a PDF. The library links to chapters and does not mirror or convert them.

Reviewed: 2026-10-18. This exercise brief is original guidance; it is not an official assignment from the source author.
