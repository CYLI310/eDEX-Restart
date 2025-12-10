<p align="center">
  <br>
  <img alt="Logo" src="media/logo.png">
  <br><br>
</p>

# eDEX-UI Modernization Project

**This is a modernized and actively maintained version of the original eDEX-UI project.**

eDEX-UI is a fullscreen, cross-platform terminal emulator and system monitor that looks and feels like a sci-fi computer interface. This project has been updated to work with the latest versions of Node.js, Electron, and macOS, ensuring compatibility with modern systems.

---

<a href="https://youtu.be/BGeY1rK19zA">
  <img align="right" width="400" alt="Demo on YouTube" src="media/youtube-demo-teaser.gif">
</a>

Heavily inspired from the [TRON Legacy movie effects](https://web.archive.org/web/20170511000410/http://jtnimoy.com/blogs/projects/14881671) (especially the [Board Room sequence](https://gmunk.com/TRON-Board-Room)), the eDEX-UI project was originally meant to be *"[DEX-UI](https://github.com/seenaburns/dex-ui) with less « art » and more « distributable software »"*.

While keeping a futuristic look and feel, it strives to maintain a certain level of functionality and to be usable in real-life scenarios, with the larger goal of bringing science-fiction UXs to the mainstream.

It might or might not be a joke taken too seriously.


---

<p align="center">
  <em>Jump to: <br><a href="#features">Features</a> — <a href="#screenshots">Screenshots</a> — <a href="#quick-start">Quick Start</a> — <a href="#license-and-original-authorship">License</a></em>
</p>

## Features
- Fully featured terminal emulator with tabs, colors, mouse events, and support for `curses` and `curses`-like applications.
- Real-time system (CPU, RAM, swap, processes) and network (GeoIP, active connections, transfer rates) monitoring.
- Full support for touch-enabled displays, including an on-screen keyboard.
- Directory viewer that follows the CWD (current working directory) of the terminal.
- Advanced customization using themes, on-screen keyboard layouts, CSS injections.
- Optional sound effects made by a talented sound designer for maximum hollywood hacking vibe.

## Screenshots
![Default screenshot](media/screenshot_default.png)

_[neofetch](https://github.com/dylanaraps/neofetch) on eDEX-UI 2.2 with the default "tron" theme & QWERTY keyboard_

![Blade screenshot](media/screenshot_blade.png)

_Checking out available themes in eDEX's config dir with [`ranger`](https://github.com/ranger/ranger) on eDEX-UI 2.2 with the "blade" theme_

![Disrupted screenshot](media/screenshot_disrupted.png)

_[cmatrix](https://github.com/abishekvashok/cmatrix) on eDEX-UI 2.2 with the experimental "tron-disrupted" theme, and the user-contributed DVORAK keyboard_

![Horizon screenshot](media/screenshot_horizon.png)

_Editing eDEX-UI source code with `nvim` on eDEX-UI 2.2 with the custom [`horizon-full`](https://github.com/GitSquared/horizon-edex-theme) theme_

## Quick Start

### Installation

The project has been successfully updated to work with:
- ✅ Node.js 24.x (latest)
- ✅ macOS (latest version, including Apple Silicon)
- ✅ Electron 33 (latest)

#### First Time Setup

1.  **Install dependencies:**
    ```bash
    npm install
    cd src && npm install
    ```

2.  **Rebuild native modules:**
    ```bash
    cd src && npx @electron/rebuild -f -w node-pty
    ```

### Running eDEX-UI

#### Development Mode
```bash
npm start
```

This will launch eDEX-UI in fullscreen mode with the default "tron" theme.

#### Skip Intro Animation
```bash
npm start -- --nointro
```

### Building Distributables

#### For macOS
```bash
npm run prebuild-darwin
npm run build-darwin
```

This will create a DMG file in the `dist` folder with support for both Intel and Apple Silicon Macs.

### Configuration

eDEX-UI stores its configuration in:
`~/Library/Application Support/eDEX-UI/`

#### Key Files:
-   `settings.json` - Main application settings
-   `shortcuts.json` - Keyboard shortcuts
-   `themes/` - Custom themes
-   `keyboards/` - Custom keyboard layouts

### Keyboard Shortcuts (Default)
-   `Ctrl+Shift+C` - Copy
-   `Ctrl+Shift+V` - Paste
-   `Ctrl+Tab` - Next tab
-   `Ctrl+Shift+Tab` - Previous tab
-   `Ctrl+X` - Close tab
-   `Ctrl+Shift+S` - Settings
-   `Ctrl+Shift+F5` - Reload

### Troubleshooting

#### Application won't start
1.  Make sure all dependencies are installed
2.  Rebuild native modules: `cd src && npx @electron/rebuild -f -w node-pty`
3.  Check console for errors

#### Terminal not working
1.  Verify bash is installed: `which bash`
2.  Check settings.json for correct shell path
3.  Ensure node-pty was rebuilt correctly

## License and Original Authorship
This project is licensed under the [GPLv3.0](LICENSE). The original eDEX-UI project was created by Gabriel 'Squared' SAILLARD. This modernized version is a fork of the original project, and all credit for the original concept and design goes to the original author.
