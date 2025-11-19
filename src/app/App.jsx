/**
 * Main application component
 * @module app/App
 */

import { useAudioInitialization } from '../hooks/useAudioInitialization.js'
import { SequencerProvider } from '../context/SequencerContext.jsx'
import { ActiveToolProvider } from '../context/ActiveToolContext.jsx'
import { PlaybackProvider } from '../context/PlaybackContext.jsx'
import { IntroScreen } from '../components/pages/IntroScreen.jsx'
import { SequencerPage } from '../components/pages/SequencerPage.jsx'

/**
 * Main App component
 * @returns {JSX.Element} App element
 */
function App() {
  const { isLoaded, hasStarted, scheduler, audioContext, initializeAudio } =
    useAudioInitialization()

  if (!hasStarted) {
    return <IntroScreen isLoaded={isLoaded} onEnter={initializeAudio} />
  }

  return (
    <SequencerProvider>
      <ActiveToolProvider>
        <PlaybackProvider scheduler={scheduler} audioContext={audioContext}>
          <SequencerPage />
        </PlaybackProvider>
      </ActiveToolProvider>
    </SequencerProvider>
  )
}

export default App
