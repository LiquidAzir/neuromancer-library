# 05. Implement a simple policy-gradient agent

Resource: [Spinning Up in Deep RL](https://spinningup.openai.com/en/latest/) · [Official PDF](https://spinningup.openai.com/_/downloads/en/latest/pdf/)

Week 8 · Suggested effort: 6–10 hours

## Prerequisites

Modules 01–02; probability, expectations, and log derivatives. Module 04 is not required.

## Read

Read Introduction to RL parts 1–3, then the Vanilla Policy Gradient page. Focus on the policy-gradient derivation before exploring the larger algorithm collection.

- [Part 1 · Key concepts](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html)
- [Part 3 · Policy optimization](https://spinningup.openai.com/en/latest/spinningup/rl_intro3.html)
- [Vanilla Policy Gradient](https://spinningup.openai.com/en/latest/algorithms/vpg.html)

## Explain and derive

Increase the probability of actions associated with better returns. Because rewards are noisy and delayed, a single lucky run is weak evidence.

`∇θJ ≈ mean trajectories [Σₜ ∇θ log πθ(aₜ|sₜ) Gₜ]`

Derive the central relation in your own notation and state the assumptions.

## Implement

Python + NumPy or PyTorch. Start with a two-action bandit, then a short episodic environment.

1. Implement a two-action softmax policy on a bandit with known reward probabilities. Verify the direction of the policy-gradient update.
2. Extend to a small episodic environment: collect trajectories and compute discounted reward-to-go, resetting at episode boundaries.
3. Optimize the negative sum of log action probabilities weighted by detached returns. Make the sign and normalization explicit.
4. Add a baseline independent of the sampled action and compare learning variability with and without it.
5. Run at least five seeds. Plot returns against environment interactions and compare with a random policy.

## Acceptance checks

- [ ] The bandit test favors the higher-reward action over repeated runs.
- [ ] Returns do not leak across episode boundaries; sampled returns do not receive gradients.
- [ ] Report the distribution of results, including unsuccessful seeds.

## Limits

An agent optimizes the specified reward, which may be a poor proxy for the behavior you intended.

## Lab record

- Question and hypothesis:
- Dataset / source license:
- Code commit and environment:
- Seeds and configuration:
- Metric, plot, or gradient check:
- Failure and proposed explanation:
- Next experiment:

## Access and license

The official documentation provides this downloadable PDF. The Spinning Up repository is MIT-licensed. Linked third-party papers retain their own terms. No external PDF is stored in this library.

Reviewed: 2026-10-18. This exercise brief is original guidance; it is not an official assignment from the source author.
