# Neuromancer scientific study plan

A flexible ten-week sequence for selected readings and seven small implementations. Budget roughly 6–8 hours per week; extend the schedule for prerequisite study. Completion means explaining the idea, deriving the math, building a simplified version, and naming its limits. It does not mean reading every page.

## Prerequisites

Python functions and arrays, matrix multiplication, elementary probability, derivatives, and the chain rule. Use Deep Learning chapters 2–5 where needed. Neuronal Dynamics additionally needs elementary differential equations. Read on your phone; perform coding labs on a computer or existing notebook environment.

## Sequence

| When | Resource | Build |
|---|---|---|
| Weeks 1–2 | [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) | [Build an MLP with manual backpropagation](exercises/01-networks.md) |
| Weeks 3–4 | [Deep Learning](https://www.deeplearningbook.org/) | [Compare optimizers and regularization](exercises/02-theory.md) |
| Week 5 | [Attention Is All You Need](https://arxiv.org/abs/1706.03762) | [Implement causal self-attention](exercises/03-attention.md) |
| Weeks 6–7 | [nanoGPT](https://github.com/karpathy/nanoGPT) | [Train a small autoregressive model](exercises/04-language.md) |
| Week 8 | [Spinning Up in Deep RL](https://spinningup.openai.com/en/latest/) | [Implement a simple policy-gradient agent](exercises/05-reinforcement.md) |
| Week 9 | [Neuronal Dynamics](https://neuronaldynamics.epfl.ch/online/index.html) | [Simulate a spiking neuron](exercises/06-neurons.md) |
| Week 10 | [Vision · Levels of Analysis](https://mitpress.mit.edu/9780262514620/vision/) | [Analyze one AI system at three levels](exercises/07-marr.md) |

Modules 01 → 02 → 03 → 04 form the main prerequisite chain. RL branches from modules 01–02; neuronal dynamics can be studied independently once differential equations are comfortable. Preview Marr’s three questions at the start and return for a capstone based on a completed implementation.

## Week one

### Day 1: Set up your field notebook (45–60 min)

- Read: Open Zero to Hero and watch the opening portion of the micrograd lesson. Refresh the chain rule if needed.
- Build: Create a local Python environment and implement a scalar function. Compare its derivative by hand with a finite difference.
- Keep: One derivative check and a paragraph answering: what does a gradient tell us?
- Module: [Neural Networks: Zero to Hero](exercises/01-networks.md)

### Day 2: Follow the gradient (60–90 min)

- Read: Continue micrograd through the computation graph and backward pass.
- Build: Draw a small graph, derive every local gradient, and implement its backward pass.
- Keep: A graph annotated with intermediate values and derivatives.
- Module: [Neural Networks: Zero to Hero](exercises/01-networks.md)

### Day 3: Build one neuron (60–90 min)

- Read: Study the neuron and nonlinearity portions of the course.
- Build: Implement a tanh neuron and test both small and saturated inputs.
- Keep: A numerical derivative check and an explanation of saturation.
- Module: [Neural Networks: Zero to Hero](exercises/01-networks.md)

### Day 4: Connect a small network (60–90 min)

- Read: Start the MLP material; use Deep Learning chapter 6 as a reference.
- Build: Create a two-layer forward pass. Define a stable loss and annotate tensor shapes.
- Keep: A working forward pass with finite loss on a tiny fixed dataset.
- Module: [Neural Networks: Zero to Hero](exercises/01-networks.md)

### Day 5: Make the network learn (60–90 min)

- Read: Review manual backpropagation for the operations in your network.
- Build: Implement the backward pass, check gradients, and overfit a tiny batch.
- Keep: A loss curve plus the largest gradient-check discrepancy.
- Module: [Neural Networks: Zero to Hero](exercises/01-networks.md)

### Day 6: Try to break it (60–90 min)

- Read: Skim chapter 7’s regularization motivation and chapter 8’s gradient descent discussion.
- Build: Change the learning rate and data split. Compare training and validation behavior.
- Keep: One failed experiment, its diagnosis, and one proposed fix.
- Module: [Deep Learning](exercises/02-theory.md)

### Day 7: Explain what you built (45–60 min)

- Read: Review your notes; preview Marr’s three questions in the capstone brief.
- Build: Explain the MLP without looking at code. Describe its objective, algorithm, physical implementation, and two limitations.
- Keep: A one-page lab note. Finish module 01’s checkpoints only when you can demonstrate them.
- Module: [Vision · Levels of Analysis](exercises/07-marr.md)

## Repeatable session

20 minutes reading, 10 minutes recall and explanation, 25 minutes implementing or testing, 5 minutes recording the result. Combine sessions for longer labs. Keep one plot or table, one derivation, and one written limitation each week.
