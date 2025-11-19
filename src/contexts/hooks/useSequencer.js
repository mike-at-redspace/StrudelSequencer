/**
 * Hook for accessing sequencer state from context
 * Provides access to sequencer state from SequencerProvider context
 * @module contexts/useSequencer
 */

import { useContext } from 'react'
import { SequencerContext } from '../SequencerContext.js'

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
