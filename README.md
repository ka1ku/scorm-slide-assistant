# SCORM Slide Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Chrome MV3](https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4?logo=googlechrome&logoColor=white)](manifest.json)
[![Version](https://img.shields.io/badge/version-1.3.1-blue)](manifest.json)

Optional browser-extension controls for **Articulate Storyline** courses delivered through SCORM—auto-advancing slides when the player allows, adjusting built-in playback speed, and helping media continue when the tab is in the background.

<p align="center">
  <img src="icons/icon128.png" alt="SCORM Slide Assistant icon" width="96" height="96" />
</p>

## Features

| Feature | Description |
|--------|-------------|
| **Auto-advance** | Clicks the player’s **Next** control when it is enabled (same as a manual click). |
| **Playback speed** | Sets speed via the player’s native speed menu (0.5×–2×). |
| **Background helper** | Patches visibility/focus APIs so many players do not pause when you switch tabs. |
| **Quiz-safe** | Does not auto-submit quizzes when a Submit control is detected. |

## What it does not do

- Answer quiz questions or change scores  
- Bypass timers, locks, or completion requirements  
- Modify server-side training records  
- Access content you are not authorized to view  

## Important notices

**No affiliation** — Not affiliated with NSC, Articulate, Thought Industries, ScormCloud, or any training provider.

**Your responsibility** — Follow your employer, school, and platform terms of use. Many programs require you to personally complete training; automation may violate those rules.

**No warranty** — Software is provided “as is.” See [LICENSE](LICENSE).

## Install

### From source (recommended)

```bash
git clone https://github.com/ka1ku/scorm-slide-assistant.git
cd scorm-slide-assistant
```

1. Open `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select **one** of these folders (whichever contains `manifest.json` on your machine):
   - **Repository root** — `scorm-slide-assistant/` (same folder as this README), or
   - **`nsc-auto-next/`** — use this if you previously loaded the extension from that path.
4. Reload the extension after pulling updates.

**“Could not load manifest”** — You selected a parent folder or a path without `manifest.json`. Open the folder in Finder and confirm `manifest.json` is visible, then load that exact folder.

## Usage

1. Open your SCORM course in the browser and start a module.
2. Click the extension toolbar icon.
3. Toggle **Auto-advance** and set **Playback speed** as needed.

Settings sync through `chrome.storage.sync` when you are signed into Chrome.

## Supported hosts

Declared in [`manifest.json`](manifest.json):

- `training.nsc.org` / `*.nsc.org`
- `scorm.thoughtindustries.com` / `*.thoughtindustries.com`
- `*.scormcloud.com` / `*.cloud.scorm.com`

Add your own `matches` patterns for other SCORM hosts if needed.

## How it works

```
┌─────────────────────────────────────────┐
│  Browser tab (training portal)          │
│  ┌───────────────────────────────────┐  │
│  │  SCORM iframe (Storyline player)  │  │
│  │  • focus-patch.js  (MAIN world)   │  │
│  │  • content.js      (isolated)     │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

- **`focus-patch.js`** — Runs at `document_start` in the page context so Storyline sees the tab as focused/visible.
- **`content.js`** — Finds `#nav-controls button#next`, respects disabled state, skips quiz slides.

Background audio/video is **best-effort**; Chrome may still throttle or pause media in inactive tabs.

## Privacy

No analytics, accounts, or remote servers. Only local settings (enabled, speed) via `chrome.storage.sync`.

## Project layout

| File | Purpose |
|------|---------|
| `manifest.json` | Extension manifest (MV3) |
| `content.js` | Auto-advance and playback speed |
| `focus-patch.js` | Background-tab playback helper |
| `popup.html` / `popup.js` | Toolbar popup |
| `icons/` | Extension icons |

## Contributing

Issues and pull requests are welcome. Please use this project responsibly and in line with platform policies.

## License

[MIT](LICENSE) © 2026 [ka1ku](https://github.com/ka1ku)
