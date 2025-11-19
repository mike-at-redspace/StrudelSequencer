/**
 * Provider for sequencer state context
 * @module context/SequencerContext
 */

import PropTypes from 'prop-types'
import { useSequencerState } from '../hooks/useSequencerState.js'
import { SequencerContext } from '../contexts/SequencerContext.js'

/**
 * Provider component that wraps the app with sequencer state context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Context provider element
 */
export function SequencerProvider({ children }) {
  const sequencerState = useSequencerState()

  return <SequencerContext.Provider value={sequencerState}>{children}</SequencerContext.Provider>
}

SequencerProvider.propTypes = {
  children: PropTypes.node.isRequired
}
