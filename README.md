# Strudel Sequencer

[![Netlify Status](https://api.netlify.com/api/v1/badges/a60f7540-502a-49e3-9d4e-2f1d0c1412ec/deploy-status)](https://app.netlify.com/projects/strudel-sequencer/deploys)

**Live Demo:** [https://strudel-sequencer.netlify.app/](https://strudel-sequencer.netlify.app/)

A step sequencer built with React and [Strudel](https://strudel.cc/) (TidalCycles for the web). Strudel brings the power of [TidalCycles](https://tidalcycles.org/) live coding to the browser.

## Features

- Multi-track step sequencer with visual playhead and auto-scroll
- Organized sample library with color-coded categories
- Real-time tempo control (BPM, bars, beats per bar)
- Keyboard shortcuts (Spacebar: play/pause, Escape: clear tool)
- Dark theme with glassmorphism effects

## Tech Stack

- React 18 + Vite
- TailwindCSS 4
- Strudel (@strudel/core, @strudel/mini, @strudel/webaudio)
- Lucide React (icons)

## Getting Started

```bash
npm install
npm run dev          # Start dev server at localhost:5173
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## Usage

1. Click "Enter Studio" to initialize the audio engine
2. Select a sample from the sidebar
3. Click grid cells to add samples to steps
4. Press Spacebar or click PLAY to start playback
5. Adjust tempo with BPM, Bars, and Beats/BAR controls
6. Add tracks with + button, remove by hovering and clicking trash icon

## Project Structure

```
src/
  app/              # Main application
  audio/            # Audio engine (Strudel integration)
    engine/         # Audio initialization
    scheduler/      # Pattern scheduling
    helpers/        # Timing and sample loading
  components/       # React components (atomic design)
    atoms/          # Basic UI elements
    molecules/      # Composite components
    organisms/      # Complex sections
    pages/          # Page-level components
  hooks/            # Custom React hooks
  styles/           # TailwindCSS layers
  utils/            # Utility functions
  types/            # Constants and types
```

## Architecture

- **Atomic Design**: Components organized by complexity
- **Custom Hooks**: State management (sequencer, playback, audio)
- **Separation of Concerns**: Audio, UI, and state clearly separated
- **No External State Library**: Pure React hooks

## Browser Support

Requires Web Audio API (Chrome, Firefox, Safari latest versions)

## License

MIT
