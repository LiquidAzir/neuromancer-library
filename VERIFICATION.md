# Verification

Tested on 18 October 2026 in a Chromium-based browser.

- JavaScript syntax checks passed for application, catalog, and service worker.
- Desktop library layout visually inspected.
- Phone layout inspected at 390 × 844 and 320 × 740. The narrow view had no horizontal page overflow, including enlarged study text.
- PDF filter returned the two approved PDF resources. Topic search for “attention” returned the transformer resource.
- Module navigation, study path, first-week tasks, and notebook were exercised.
- Notes, reading position, module checkpoints, and daily completion survived reloads.
- Backup export/import round trip preserved the test note and did not duplicate identical content.
- A note containing literal HTML-like text displayed as text.
- Light/dark switching and enlarged reading text were visually checked.
- The offline study path reloaded successfully after the local server was stopped. The service worker normalizes route fragments before matching cached files.
- Test notes and checked completion states were cleared from the preview.
- Source availability checks and their limitations are documented in [LINK-REVIEW.md](LINK-REVIEW.md) and [link-check.json](link-check.json).

Limits: this was browser viewport testing, not a physical iOS or Android device test. External books and PDFs are not cached or reformatted by the library. The seven lab briefs were reviewed as instructional guidance; their model implementations have not been completed or benchmarked by this repository.
