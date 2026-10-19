# 03. Implement causal self-attention

Resource: [Attention Is All You Need](https://arxiv.org/abs/1706.03762) · [Official PDF](https://arxiv.org/pdf/1706.03762)

Week 5 · Suggested effort: 6–8 hours

## Prerequisites

Modules 01–02; matrix multiplication, softmax, and tensor shapes.

## Read

Read the abstract, section 3 (especially 3.2), and section 4. Sketch the encoder and decoder. The original model is encoder–decoder; the exercise isolates the decoder’s causal self-attention.

- [Official arXiv record](https://arxiv.org/abs/1706.03762)

## Explain and derive

Queries ask what is relevant; keys indicate what a token offers; values carry the information mixed into the output. A causal mask prevents access to future positions.

`Attention(Q,K,V) = softmax(QKᵀ / √dₖ + M)V`

Derive the central relation in your own notation and state the assumptions.

## Implement

Python + NumPy or PyTorch. Start with a single head on a sequence of four tokens.

1. Project an input of shape (batch, tokens, channels) into Q, K, and V. Write down all resulting shapes.
2. Compute scaled dot products. Apply an upper-triangular mask with negative infinity before a stable row-wise softmax.
3. Multiply the attention weights by V. Inspect the weight matrix for a short example.
4. Perturb only a future token and verify that earlier outputs are unchanged, with dropout disabled.
5. Extend to multiple heads and a final output projection. Compare against a trusted framework implementation with identical weights.

## Acceptance checks

- [ ] Every attention row sums to one and forbidden future weights are zero.
- [ ] The future-token perturbation test passes within floating-point tolerance.
- [ ] Explain the scaling factor, the tensor dimensions, and the difference between self- and cross-attention.

## Limits

Attention weights alone are not a reliable causal explanation. This exercise does not reproduce the full paper’s training experiment.

## Lab record

- Question and hypothesis:
- Dataset / source license:
- Code commit and environment:
- Seeds and configuration:
- Metric, plot, or gradient check:
- Failure and proposed explanation:
- Next experiment:

## Access and license

The arXiv record provides an authorized direct PDF. Its non-exclusive distribution license grants rights to arXiv; it is not a general redistribution license for this repository. We link rather than rehost the paper.

Reviewed: 2026-10-18. This exercise brief is original guidance; it is not an official assignment from the source author.
