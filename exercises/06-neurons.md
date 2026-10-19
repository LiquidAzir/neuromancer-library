# 06. Simulate a spiking neuron

Resource: [Neuronal Dynamics](https://neuronaldynamics.epfl.ch/online/index.html)

Week 9 · Suggested effort: 6–10 hours

## Prerequisites

Basic differential equations and numerical integration. Module 01 helps with comparisons; the transformer and RL modules are not prerequisites.

## Read

Read chapter 1, especially sections 1.3–1.5. Use the companion leaky integrate-and-fire exercises. Treat the Hodgkin–Huxley chapter as an optional next step.

- [Section 1.3 · Integrate-and-fire](https://neuronaldynamics.epfl.ch/online/Ch1.S3.html)
- [Section 1.4 · Model limitations](https://neuronaldynamics.epfl.ch/online/Ch1.S4.html)
- [Official companion Python exercise](https://neuronaldynamics-exercises.readthedocs.io/en/latest/exercises/leaky-integrate-and-fire.html)

## Explain and derive

Input raises a neuron’s membrane potential while leakage pulls it back toward rest. Threshold crossing triggers a spike and reset.

`τₘ du/dt = −(u − uᵣₑₛₜ) + RI(t)`

Derive the central relation in your own notation and state the assumptions.

## Implement

Python + NumPy + a plotting library. Brian is optional for comparison with the companion exercises.

1. Implement a leaky integrate-and-fire neuron with explicit units, resting potential, threshold, reset, resistance, and time constant.
2. Use Euler integration for a constant current, then add threshold/reset and a refractory interval.
3. Plot membrane potential and spike times for subthreshold and suprathreshold currents.
4. Halve the time step repeatedly and compare spike counts and timings. Compare subthreshold voltage with the analytic exponential solution.
5. Sweep input current to plot a firing-rate curve. Record what the model omits about real neurons.

## Acceptance checks

- [ ] Units are consistent, and zero input relaxes voltage toward rest.
- [ ] The numerical subthreshold solution converges toward the analytic solution as the time step shrinks.
- [ ] A plot shows threshold, reset, and refractory behavior; list at least three biological omissions.

## Limits

An integrate-and-fire model abstracts away ion-channel dynamics, detailed anatomy, and many forms of adaptation. A useful neuron model is not a complete model of cognition.

## Lab record

- Question and hypothesis:
- Dataset / source license:
- Code commit and environment:
- Seeds and configuration:
- Metric, plot, or gradient check:
- Failure and proposed explanation:
- Next experiment:

## Access and license

The official EPFL-hosted HTML book is free to read. Cambridge University Press retains copyright; its notice prohibits reproduction without written permission. No authorized full-book PDF was identified, so the library uses the official web edition.

Reviewed: 2026-10-18. This exercise brief is original guidance; it is not an official assignment from the source author.
