/**
 * Provider for playback state context
 * @module context/PlaybackContext
 */

import PropTypes from 'prop-types'
import { usePlaybackInitialize, PlaybackContext } from '../contexts/hooks/usePlaybackContext.js'

/**
 * Provider component that wraps the app with playback state context
 * Requires SequencerProvider and audio initialization context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} props.scheduler - Strudel scheduler instance
 * @param {AudioContext} props.audioContext - Web Audio API context
 * @returns {JSX.Element} Context provider element
 */
export function PlaybackProvider({ children, scheduler, audioContext }) {
  const playbackState = usePlaybackInitialize(scheduler, audioContext)

  return <PlaybackContext.Provider value={playbackState}>{children}</PlaybackContext.Provider>
}

PlaybackProvider.propTypes = {
  children: PropTypes.node.isRequired,
  scheduler: PropTypes.object,
  audioContext: PropTypes.object
}
