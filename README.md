# Neuromancer · Scientific field library

**[Open the phone-friendly library](https://liquidazir.github.io/neuromancer-library/)**

Seven scientific resources with official reading links, legally accessible direct PDFs where verified, a suggested study sequence, and original implementation briefs.

## Read on your phone

- iPhone/iPad: open in Safari, then Share → Add to Home Screen.
- Android: open in Chrome, then menu → Add to Home screen / Install app.
- Use **Aa** to enlarge study text and **◐** for dark mode. Open a module for reading links, its lab brief, checkpoints, notes, and a saved reading position.
- After an initial online visit, supported browsers cache the library and original briefs for offline use. External books, videos, and PDFs are **not** cached. Save authorized PDF downloads separately with your phone’s reader.
- Notes/progress stay in the current browser. Use Notebook → Export backup, and Import backup on another device. There is no automatic sync or analytics.

## Reading shelf

| Resource | Access | Implementation |
|---|---|---|
| [Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) | Official web resource | [Build an MLP with manual backpropagation](exercises/01-networks.md) |
| [Deep Learning](https://www.deeplearningbook.org/) | Official web resource | [Compare optimizers and regularization](exercises/02-theory.md) |
| [Attention Is All You Need](https://arxiv.org/abs/1706.03762) | [Official direct PDF](https://arxiv.org/pdf/1706.03762) | [Implement causal self-attention](exercises/03-attention.md) |
| [nanoGPT](https://github.com/karpathy/nanoGPT) | Official web resource | [Train a small autoregressive model](exercises/04-language.md) |
| [Spinning Up in Deep RL](https://spinningup.openai.com/en/latest/) | [Official direct PDF](https://spinningup.openai.com/_/downloads/en/latest/pdf/) | [Implement a simple policy-gradient agent](exercises/05-reinforcement.md) |
| [Neuronal Dynamics](https://neuronaldynamics.epfl.ch/online/index.html) | Official web resource | [Simulate a spiking neuron](exercises/06-neurons.md) |
| [Vision · Levels of Analysis](https://mitpress.mit.edu/9780262514620/vision/) | Publisher / purchase or library access | [Analyze one AI system at three levels](exercises/07-marr.md) |

**[Study sequence and first-week plan](STUDY-PLAN.md)** · **[Access and license audit](RESOURCE-LICENSES.md)** · **[Link check results](link-check.json)**

Deep Learning explicitly does not provide a PDF; Neuronal Dynamics is a copyrighted free web edition. Marr’s supplied scan could not be verified as an authorized public download, so the official publisher and chapter route are used. nanoGPT is retained as requested but is marked deprecated by its author.

## Repository contents

- `index.html`, `style.css`, `app.js`: responsive interface, notes, progress, filters, and export/import.
- `data.js`: editable source of the resource catalog and plan.
- `exercises/`: seven original implementation briefs; these are instructions and acceptance criteria, not completed model implementations.
- `resources.json`: portable machine-readable catalog.
- `sw.js`, `manifest.webmanifest`, `assets/`: offline interface and install metadata.
- `scripts/`: regenerate documentation and verify source URLs.

## Run locally

No package installation or build step is needed. With Python installed, run:

```text
python -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ . Serve over HTTPS for phone installation outside localhost.

After editing `data.js`, run:

```text
node scripts/generate-docs.cjs
python scripts/check-links.py
```

Increment the service-worker cache version when changing the offline asset set. GitHub Pages is configured to publish the `main` branch at the repository root. No third-party runtime scripts or fonts are loaded.

## Terms

Original code and exercise briefs: [MIT license](LICENSE). Linked works retain their own terms; no book, paper, or video is relicensed by this repository. License and access decisions were reviewed on **18 October 2026**. This is an independent learning project, not an official course or an affiliation with the source authors.

See [LINK-REVIEW.md](LINK-REVIEW.md) for supplemental source checks and [VERIFICATION.md](VERIFICATION.md) for interface testing.
