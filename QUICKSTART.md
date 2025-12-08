# eDEX-UI - Quick Start Guide

## What is eDEX-UI?

eDEX-UI is a fullscreen, cross-platform terminal emulator and system monitor that looks and feels like a sci-fi computer interface, heavily inspired by the TRON Legacy movie.

## Installation

The project has been successfully updated to work with:
- ✅ Node.js 24.x (latest)
- ✅ macOS (latest version, including Apple Silicon)
- ✅ Electron 33 (latest)

### First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   cd src && npm install
   ```

2. **Rebuild native modules:**
   ```bash
   cd src && npx @electron/rebuild -f -w node-pty
   ```

## Running eDEX-UI

### Development Mode
```bash
npm start
```

This will launch eDEX-UI in fullscreen mode with the default "tron" theme.

### Skip Intro Animation
```bash
npm start -- --nointro
```

## Building Distributables

### For macOS
```bash
npm run prebuild-darwin
npm run build-darwin
```

This will create a DMG file in the `dist` folder with support for both Intel and Apple Silicon Macs.

## Configuration

eDEX-UI stores its configuration in:
```
~/Library/Application Support/eDEX-UI/
```

### Key Files:
- `settings.json` - Main application settings
- `shortcuts.json` - Keyboard shortcuts
- `themes/` - Custom themes
- `keyboards/` - Custom keyboard layouts

### Default Settings:
- **Shell**: bash
- **Theme**: tron
- **Terminal Font Size**: 15
- **Audio**: Enabled
- **Fullscreen**: Enabled

## Features

### Terminal
- Full terminal emulator with tabs
- 256 colors support
- Mouse events
- Curses application support

### System Monitor
- Real-time CPU, RAM, swap monitoring
- Network monitoring with GeoIP
- Active connections tracking
- Process list

### Customization
- Multiple themes (tron, blade, disrupted, etc.)
- Custom keyboard layouts
- CSS injection support
- Sound effects toggle

### Keyboard Shortcuts (Default)
- `Ctrl+Shift+C` - Copy
- `Ctrl+Shift+V` - Paste
- `Ctrl+Tab` - Next tab
- `Ctrl+Shift+Tab` - Previous tab
- `Ctrl+X` - Close tab
- `Ctrl+Shift+S` - Settings
- `Ctrl+Shift+F5` - Reload

## Troubleshooting

### Application won't start
1. Make sure all dependencies are installed
2. Rebuild native modules: `cd src && npx @electron/rebuild -f -w node-pty`
3. Check console for errors

### Terminal not working
1. Verify bash is installed: `which bash`
2. Check settings.json for correct shell path
3. Ensure node-pty was rebuilt correctly

### Performance issues
1. Try disabling WebGL renderer
2. Reduce terminal font size
3. Disable sound effects
4. Close unnecessary tabs

## Development

### Project Structure
```
edex-ui/
├── src/
│   ├── _boot.js           # Main process entry point
│   ├── ui.html            # Renderer process HTML
│   ├── classes/           # Core classes (Terminal, etc.)
│   ├── assets/            # Themes, fonts, sounds
│   └── mods/              # UI modules
├── media/                 # Icons and screenshots
└── package.json           # Build configuration
```

### Making Changes
1. Edit files in `src/`
2. Reload with `Ctrl+Shift+F5` (if enabled)
3. Or restart the application

### Testing
```bash
npm start
```

## Known Issues

- File browser tracking doesn't work on Windows
- Some themes may need adjustments for modern displays
- WebGL renderer may not work on all systems

## Credits

- Original Author: Gabriel 'Squared' SAILLARD
- Inspired by: TRON Legacy movie effects
- Built with: Electron, xterm.js, systeminformation

## License

GPL-3.0

## Additional Resources

- [Original Repository](https://github.com/GitSquared/edex-ui)
- [Wiki](https://github.com/GitSquared/edex-ui/wiki)
- [Issues](https://github.com/GitSquared/edex-ui/issues)

---

**Note**: This is an updated version of the archived eDEX-UI project, modernized to work with the latest Node.js and macOS versions. See `MODERNIZATION_NOTES.md` for details on what was changed.
