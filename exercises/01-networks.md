# 01. Build an MLP with manual backpropagation

Resource: [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html)

Weeks 1–2 · Suggested effort: 8–12 hours

## Prerequisites

Python functions and arrays; derivatives and the chain rule. Use Deep Learning chapters 2–4 to refresh the mathematics as needed.

## Read

Start with the micrograd lecture. Continue through makemore’s MLP material, then use “Becoming a Backprop Ninja” for manual tensor derivatives. Pause often and reconstruct the steps yourself.

- [Official lesson code](https://github.com/karpathy/nn-zero-to-hero)
- [micrograd reference](https://github.com/karpathy/micrograd)

## Explain and derive

A gradient tells each parameter how a small change would affect the error. Backpropagation reuses local derivatives across a computation graph.

`h = tanh(XW₁ + b₁); ŷ = hW₂ + b₂; θ ← θ − η∇θL`

Derive the central relation in your own notation and state the assumptions.

## Implement

Python + NumPy; CPU is enough. Use autograd only as a separate check.

1. Create a fixed-seed two-class toy dataset. Keep a separate validation split and record its seed.
2. Implement a two-layer tanh network and a numerically stable binary cross-entropy loss from logits.
3. Derive and implement all weight and bias gradients by hand. Track the shape of every intermediate array.
4. Check a sample of parameters with central finite differences: [L(θ+ε)−L(θ−ε)]/(2ε), trying ε around 10⁻⁵ in float64.
5. Train with gradient descent and save training/validation losses plus a short explanation of one failed run.

## Acceptance checks

- [ ] Manual gradients agree with finite differences within 10⁻⁴ relative error on non-negligible gradients; use absolute error near zero.
- [ ] The model can overfit a tiny batch, then learn on a held-out toy split.
- [ ] Explain a saturation or learning-rate failure without referring to the code.

## Limits

Learning a toy decision boundary does not establish general intelligence, biological realism, or robustness outside the training distribution.

## Lab record

- Question and hypothesis:
- Dataset / source license:
- Code commit and environment:
- Seeds and configuration:
- Metric, plot, or gradient check:
- Failure and proposed explanation:
- Next experiment:

## Access and license

The lesson repository and micrograd code use the MIT license. That code license is not a blanket license to redistribute the videos. The course is linked at its official site; no official course PDF was identified.

Reviewed: 2026-10-18. This exercise brief is original guidance; it is not an official assignment from the source author.
