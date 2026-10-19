# 04. Train a small autoregressive model

Resource: [nanoGPT](https://github.com/karpathy/nanoGPT)

Weeks 6–7 · Suggested effort: 8–12 hours

## Prerequisites

Module 03; Python, PyTorch fundamentals, and train/validation splits.

## Read

Read the README’s quick start, then follow the data pipeline, model.py, and train.py. Use the tiny CPU settings first. Record the exact upstream commit for reproducibility.

- [Model implementation](https://github.com/karpathy/nanoGPT/blob/master/model.py)
- [Training loop](https://github.com/karpathy/nanoGPT/blob/master/train.py)
- [Author’s newer project · optional](https://github.com/karpathy/nanochat)

## Explain and derive

A language model learns a distribution over the next token. Repeated sampling turns that local prediction into a sequence.

`p(x₁…xT) = ∏ₜ p(xₜ | x₁…xₜ₋₁)`

Derive the central relation in your own notation and state the assumptions.

## Implement

Python + PyTorch in an isolated environment. Use a small CPU configuration or an existing GPU; no paid compute is required for the basic exercise.

1. Choose a small text corpus you wrote or have permission to use. Record its source and license; do not assume a code license covers datasets.
2. Split the text before making training windows. Define a simple character vocabulary and measure a unigram baseline.
3. Train a tiny model: two layers, two heads, 64 channels, and a short context. Disable compilation if unsupported; start with a few hundred updates.
4. Record train and validation cross-entropy, tokenization, seed, configuration, runtime, and the upstream commit.
5. Sample with two temperatures, then remove or alter one component and compare validation loss under the same budget.

## Acceptance checks

- [ ] The model predicts next tokens without accessing future targets.
- [ ] Report validation loss relative to the unigram baseline, even if the experiment fails.
- [ ] Save configuration and short samples; discuss memorization and train/validation leakage.

## Limits

Fluent samples do not establish truth, reasoning ability, or safe behavior. Small-run results do not extrapolate directly to large models.

## Lab record

- Question and hypothesis:
- Dataset / source license:
- Code commit and environment:
- Seeds and configuration:
- Metric, plot, or gradient check:
- Failure and proposed explanation:
- Next experiment:

## Access and license

MIT-licensed code repository. Preserve the license if copying code. Dataset and pretrained-weight terms must be checked separately. This is a code resource, not a PDF book.

Reviewed: 2026-10-18. This exercise brief is original guidance; it is not an official assignment from the source author.
