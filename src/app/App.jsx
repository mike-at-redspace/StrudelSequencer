/**
 * Main application component
 * @module app/App
 */

import { useAudioInitialization } from '@/hooks'
import { SequencerProvider, ActiveToolProvider, PlaybackProvider } from '@/context'
import { IntroScreen, SequencerPage } from '@/components'

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
