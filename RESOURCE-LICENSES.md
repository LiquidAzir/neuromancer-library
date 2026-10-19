# Resource access and licensing audit

Reviewed **18 October 2026**. Availability and reuse permission are separate checks. A public URL alone does not establish a right to redistribute a book. This repository stores no third-party PDFs, videos, or book text. Its own MIT license applies only to original repository content.

## 01. Neural Networks: Zero to Hero

The lesson repository and micrograd code use the MIT license. That code license is not a blanket license to redistribute the videos. The course is linked at its official site; no official course PDF was identified.

- Official resource: [Open the course](https://karpathy.ai/zero-to-hero.html)
- PDF decision: use the official web resource.
- Evidence: [Lesson repository license](https://github.com/karpathy/nn-zero-to-hero/blob/master/LICENSE)
- Evidence: [micrograd license](https://github.com/karpathy/micrograd/blob/master/LICENSE)

## 02. Deep Learning

Free official HTML edition. The authors’ FAQ explicitly says their MIT Press contract forbids distributing the book as a PDF. The library links to chapters and does not mirror or convert them.

- Official resource: [Read the web book](https://www.deeplearningbook.org/)
- PDF decision: use the official web resource.
- Evidence: [Official book and PDF FAQ](https://www.deeplearningbook.org/)

## 03. Attention Is All You Need

The arXiv record provides an authorized direct PDF. Its non-exclusive distribution license grants rights to arXiv; it is not a general redistribution license for this repository. We link rather than rehost the paper.

- Official resource: [Open paper details](https://arxiv.org/abs/1706.03762)
- Authorized direct PDF: [Open PDF](https://arxiv.org/pdf/1706.03762)
- Evidence: [Paper’s license](https://arxiv.org/licenses/nonexclusive-distrib/1.0/license.html)
- Evidence: [Version and access record](https://arxiv.org/abs/1706.03762)

## 04. nanoGPT

MIT-licensed code repository. Preserve the license if copying code. Dataset and pretrained-weight terms must be checked separately. This is a code resource, not a PDF book.

- Official resource: [Open the repository](https://github.com/karpathy/nanoGPT)
- PDF decision: use the official web resource.
- Evidence: [nanoGPT MIT license](https://github.com/karpathy/nanoGPT/blob/master/LICENSE)
- Evidence: [Deprecation notice in README](https://github.com/karpathy/nanoGPT)

## 05. Spinning Up in Deep RL

The official documentation provides this downloadable PDF. The Spinning Up repository is MIT-licensed. Linked third-party papers retain their own terms. No external PDF is stored in this library.

- Official resource: [Read the web guide](https://spinningup.openai.com/en/latest/)
- Authorized direct PDF: [Open PDF](https://spinningup.openai.com/_/downloads/en/latest/pdf/)
- Evidence: [Spinning Up MIT license](https://github.com/openai/spinningup/blob/master/LICENSE)
- Evidence: [Official documentation](https://spinningup.openai.com/en/latest/)

## 06. Neuronal Dynamics

The official EPFL-hosted HTML book is free to read. Cambridge University Press retains copyright; its notice prohibits reproduction without written permission. No authorized full-book PDF was identified, so the library uses the official web edition.

- Official resource: [Read the web book](https://neuronaldynamics.epfl.ch/online/index.html)
- PDF decision: use the official web resource.
- Evidence: [Official copyright notice](https://neuronaldynamics.epfl.ch/online/index.html)
- Evidence: [Author-hosted book site](https://neuronaldynamics.epfl.ch/)

## 07. Vision · Levels of Analysis

Copyrighted MIT Press book. The official publisher page and chapter access route are provided. The supplied NYU scan has no verified reuse permission in this review and is excluded from the reading links. No claim is made that it is unlawful.

- Official resource: [View publisher / access options](https://mitpress.mit.edu/9780262514620/vision/)
- PDF decision: use the official web resource.
- Evidence: [Official publisher record](https://mitpress.mit.edu/9780262514620/vision/)
- Evidence: [Official chapter record](https://doi.org/10.7551/mitpress/9780262514620.003.0002)

## Excluded user-supplied scan

The original Marr URL was https://www.cns.nyu.edu/~david/courses/perception/Readings/Marr1982Ch1.pdf . The automated browser retrieval failed, and an explicit authorization for a public redistribution was not established. It is retained here only as an audit record, not offered as an approved reading link. The publisher and official chapter access route replace it. This is an unresolved permission finding, not a claim that the course-hosted copy is illegal.

## Link verification

See [link-check.json](link-check.json) for timestamped HTTP results, final URLs, content types, and PDF magic-byte checks. The verifier reads only enough response bytes to check headers; it does not save external works. A 403 or robot challenge is recorded as an automated-access limitation, not silently reported as success. The official records were also reviewed through web retrieval.

Re-run with `python scripts/check-links.py`. Link verification is on demand; no scheduled automation has been created.

Supplemental checks for destinations that blocked or timed out in the local checker are documented in [LINK-REVIEW.md](LINK-REVIEW.md). Those limitations remain visible in the machine report.
