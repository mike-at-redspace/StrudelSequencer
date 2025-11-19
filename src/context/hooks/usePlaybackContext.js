/**
 * Hook for accessing playback state from context
 * Provides access to playback state from PlaybackProvider context
 * @module contexts/usePlaybackContext
 */

import { useContext, useMemo } from 'react'
import { PlaybackContext } from '@/context'
import { usePlaybackState } from '@/hooks'
import { useSequencer } from './useSequencer.js'

/**
 * Hook to access playback state from context
 * Must be used inside a PlaybackProvider
 * @returns {Object} Playback state object with { isPlaying, currentStep, togglePlayback, stopPlayback }
 * @throws {Error} If used outside of PlaybackProvider
 */
export function usePlaybackContext() {
  const context = useContext(PlaybackContext)
  if (context === null) {
    throw new Error('usePlayback must be used inside a PlaybackProvider')
  }
  return context
}

/**
 * Internal hook for PlaybackProvider to initialize playback state with dependencies
 * @param {Object} scheduler - Strudel scheduler instance
 * @param {AudioContext} audioContext - Web Audio API context
 * @returns {Object} Initialized playback state
 */
export function usePlaybackInitialize(scheduler, audioContext) {
  const sequencer = useSequencer()

  // Get sequencer state needed for playback
  const playbackDependencies = useMemo(
    () => ({
      grid: sequencer.grid,
      bars: sequencer.bars,
      beatsPerBar: sequencer.beatsPerBar,
      bpm: sequencer.bpm,
      stepsPerBar: sequencer.stepsPerBar,
      totalSequenceSteps: sequencer.totalSequenceSteps
    }),
    [
      sequencer.grid,
      sequencer.bars,
      sequencer.beatsPerBar,
      sequencer.bpm,
      sequencer.stepsPerBar,
      sequencer.totalSequenceSteps
    ]
  )

  return usePlaybackState(
    scheduler,
    audioContext,
    playbackDependencies.grid,
    playbackDependencies.bars,
    playbackDependencies.beatsPerBar,
    playbackDependencies.bpm,
    playbackDependencies.stepsPerBar,
    playbackDependencies.totalSequenceSteps
  )
}

export { PlaybackContext }
