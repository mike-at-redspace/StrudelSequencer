/**
 * Main application component
 * @module app/App
 */

import { useSequencerState } from '../hooks/useSequencerState.js'
import { usePlaybackState } from '../hooks/usePlaybackState.js'
import { useActiveTool } from '../hooks/useActiveTool.js'
import { useAutoScroll } from '../hooks/useAutoScroll.js'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts.js'
import { useAudioInitialization } from '../hooks/useAudioInitialization.js'
import { IntroScreen } from '../components/pages/IntroScreen.jsx'
import { SequencerPage } from '../components/pages/SequencerPage.jsx'

/**
 * Main App component
 * @returns {JSX.Element} App element
 */
function App() {
  const { isLoaded, hasStarted, scheduler, audioContext, initializeAudio } =
    useAudioInitialization()

  const sequencerState = useSequencerState()
  const { activeTool, setTool, clearTool } = useActiveTool()

  const playbackState = usePlaybackState(
    scheduler,
    audioContext,
    sequencerState.grid,
    sequencerState.bars,
    sequencerState.beatsPerBar,
    sequencerState.bpm,
    sequencerState.stepsPerBar,
    sequencerState.totalSequenceSteps
  )

  const { scrollContainerRef, scrollToStart } = useAutoScroll(playbackState.currentStep, 0)

  useKeyboardShortcuts(hasStarted, playbackState.togglePlayback, clearTool)

  if (!hasStarted) {
    return <IntroScreen isLoaded={isLoaded} onEnter={initializeAudio} />
  }

  return (
    <SequencerPage
      sequencerState={sequencerState}
      playbackState={playbackState}
      activeToolState={{ activeTool, setTool, clearTool }}
      scrollState={{ scrollContainerRef, scrollToStart }}
    />
  )
}

export default App
