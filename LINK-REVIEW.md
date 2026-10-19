# Link verification notes

Reviewed on 18 October 2026 (America/Los_Angeles). Machine timestamps in `link-check.json` use UTC, so they may show 19 October.

The catalog contains **31 distinct source, chapter, code, and license URLs**. The local HTTP checker verified 25, including both direct PDFs by their `%PDF-` signature. The remaining six were reviewed through web retrieval of the official source pages:

| URL | Local checker | Supplemental review |
|---|---|---|
| [Neuronal Dynamics contents](https://neuronaldynamics.epfl.ch/online/index.html) | Network timeout | Official contents and Cambridge copyright notice retrieved |
| [Integrate-and-fire section](https://neuronaldynamics.epfl.ch/online/Ch1.S3.html) | Network timeout | Correct section title and content retrieved |
| [Model limitations section](https://neuronaldynamics.epfl.ch/online/Ch1.S4.html) | Network timeout | Correct section title and content retrieved |
| [Neuronal Dynamics homepage](https://neuronaldynamics.epfl.ch/) | Network timeout | Author-hosted book and exercise links retrieved |
| [Marr: Vision publisher page](https://mitpress.mit.edu/9780262514620/vision/) | HTTP 403 | Official book record retrieved through web search; title, author, and ISBN confirmed |
| [Marr chapter DOI](https://doi.org/10.7551/mitpress/9780262514620.003.0002) | HTTP 403 after redirect | Official chapter record retrieved; title and access requirement confirmed |

Web retrieval may use indexed/cached results. It corroborates the destination and content but does not establish that every device can currently open it. The machine report retains its original failures. None of these checks grants redistribution rights; see [RESOURCE-LICENSES.md](RESOURCE-LICENSES.md).

The original NYU scan is excluded from approved reading links because retrieval and permission could not both be established. The audit retains the submitted URL for traceability.

Phone installation guidance was checked against [Apple’s Safari guide](https://support.apple.com/guide/iphone/bookmark-a-website-iph42ab2f3a7/ios) and [Google Chrome’s Android web-app guide](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=en). Menu labels vary by browser version.
