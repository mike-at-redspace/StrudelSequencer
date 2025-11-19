/**
 * Context hook for accessing sequencer state
 * Provides access to sequencer state from SequencerProvider context
 * @module hooks/useSequencer
 */

import { useContext } from 'react'
import { SequencerContext } from '../contexts/SequencerContext.js'

/**
 * Hook to access sequencer state from context
 * Must be used inside a SequencerProvider
 * @returns {Object} Sequencer state object
 * @throws {Error} If used outside of SequencerProvider
 */
export function useSequencer() {
  const context = useContext(SequencerContext)
  if (context === null) {
    throw new Error('useSequencer must be used inside a SequencerProvider')
  }
  return context
}

export { SequencerContext }
