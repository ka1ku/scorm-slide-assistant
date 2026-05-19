# SCORM Slide Assistant

A small, open-source **browser extension** that offers optional convenience controls for **Articulate Storyline** courses delivered via SCORM (for example, National Safety Council training portals and Thought Industries hosts).

![Extension icon](nsc-auto-next/icons/icon128.png)

## What this software does

- **Auto-advance:** When the course player exposes an enabled **Next** control, the extension can activate it on your behalf—only while that control is already available in the UI (same as a manual click).
- **Playback speed:** Selects a speed from the player’s built-in speed menu when present.
- **Background playback helper:** Reduces cases where the player pauses because the browser tab lost focus.

## What this software does **not** do

- Does **not** answer quiz questions, submit assessments, or change scores.
- Does **not** bypass locked navigation, timers, or completion requirements imposed by the course.
- Does **not** modify server-side records or certificates.
- Does **not** break DRM or access content you are not authorized to view.

Auto-advance is **disabled on detected quiz slides** (for example, when a Submit control is shown).

## Important notices (please read)

### No affiliation

This project is **not affiliated with, endorsed by, or sponsored by** the National Safety Council (NSC), Articulate, Thought Industries, ScormCloud, or any training provider. Trademarks belong to their respective owners.

### Your responsibilities

You are solely responsible for how you use this software.

- Review and follow your **employer’s policies**, your **school’s academic integrity rules**, and the **terms of use** of any training platform before installing or using this extension.
- Many training programs require you to **personally view** content and **personally complete** evaluations. Using automation may violate those rules even when it is technically possible.
- This software is provided for **legitimate accessibility and productivity** scenarios (for example, reducing repetitive clicking when the platform already allows faster playback and manual Next). **Misuse is discouraged.**

### Disclaimer of warranty

This software is provided **“as is”**, without warranty of any kind. See [LICENSE](LICENSE) for the full legal terms. The authors are not liable for disciplinary action, loss of certification, account termination, or any other consequences arising from use or misuse.

## Installation (Chrome / Edge)

1. Clone this repository.
2. Open `chrome://extensions` (or `edge://extensions`).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the `nsc-auto-next` folder.

Reload the extension after updates.

## Usage

1. Open your SCORM course as usual in the browser.
2. Click the extension icon.
3. Toggle **Auto-advance** and adjust **Playback speed** as desired.

Settings sync via Chrome’s `storage.sync` when signed into the browser.

## Supported sites

The extension runs only on hosts declared in `manifest.json`, including:

- `training.nsc.org` and related `*.nsc.org` paths  
- `scorm.thoughtindustries.com`  
- Common ScormCloud / Rustici hosts  

If your organization uses another SCORM host, you may add a match pattern in the manifest for personal use.

## Privacy

- No analytics, accounts, or remote servers.
- Settings (enabled flag, speed) are stored locally via `chrome.storage.sync`.

## Development

| File | Role |
|------|------|
| `content.js` | Slide navigation and playback speed |
| `focus-patch.js` | Keeps the player active when the tab is in the background |
| `popup.html` / `popup.js` | Toolbar popup UI |

## License

[MIT License](LICENSE) — Copyright (c) 2026 ka1ku

## Contributing

Issues and pull requests are welcome. Please do not use this project to facilitate academic dishonesty or contractual violations.
