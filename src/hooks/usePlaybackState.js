/**
 * Custom hook for managing playback state and visual playhead
 * @module hooks/usePlaybackState
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { CONSTANTS } from '../types/constants.js'
import {
  calculateCPS,
  calculateStepsPerSecond,
  calculateCurrentStep
} from '../audio/helpers/timingHelpers.js'
import {
  updateSchedulerPattern,
  startScheduler,
  stopScheduler,
  updateSchedulerCPS
} from '../audio/scheduler/patternScheduler.js'
import { resumeAudioContext } from '../audio/engine/audioEngine.js'

/**
 * Custom hook for managing playback state
 * @param {Object} scheduler - Strudel scheduler instance
 * @param {AudioContext} audioContext - Web Audio API context
 * @param {Array<Array<string>>} grid - Current sequencer grid
 * @param {number} bars - Number of bars
 * @param {number} beatsPerBar - Beats per bar
 * @param {number} bpm - Beats per minute
 * @param {number} stepsPerBar - Steps per bar
 * @param {number} totalSequenceSteps - Total steps in sequence
 * @returns {Object} Playback state and control functions
 */
export function usePlaybackState(
  scheduler,
  audioContext,
  grid,
  bars,
  beatsPerBar,
  bpm,
  stepsPerBar,
  totalSequenceSteps
) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(null)
  const [startTime, setStartTime] = useState(0)
  const requestAnimationFrameId = useRef(null)
  const prevCpsRef = useRef(calculateCPS(CONSTANTS.DEFAULT_BPM, CONSTANTS.DEFAULT_BEATS))

  const cyclesPerSecond = calculateCPS(bpm, beatsPerBar)

  // Update scheduler pattern and CPS when dependencies change
  useEffect(() => {
    if (!scheduler) {
      return
    }

    const newCps = cyclesPerSecond
    updateSchedulerCPS(scheduler, newCps)

    if (isPlaying) {
      const now = audioContext?.currentTime
      if (now && startTime) {
        const oldCps = prevCpsRef.current
        const timeRatio = oldCps / newCps
        const timeSinceStart = now - startTime
        setStartTime(now - timeSinceStart * timeRatio)
      }
    }

    updateSchedulerPattern(grid, scheduler, bars, newCps)
    prevCpsRef.current = newCps
  }, [bpm, cyclesPerSecond, grid, bars, scheduler, isPlaying, audioContext, startTime])

  /**
   * Toggle playback (play/pause)
   */
  const togglePlayback = useCallback(async () => {
    if (!scheduler || !audioContext) {
      return
    }

    if (!isPlaying) {
      // Start playback
      await resumeAudioContext(audioContext)
      updateSchedulerPattern(grid, scheduler, bars, cyclesPerSecond)
      startScheduler(scheduler)
      setStartTime(audioContext.currentTime)
      setIsPlaying(true)
    } else {
      // Stop playback
      stopScheduler(scheduler)
      setIsPlaying(false)
      setCurrentStep(null)
    }
  }, [isPlaying, grid, bars, cyclesPerSecond, scheduler, audioContext])

  /**
   * Stop playback and reset visual state
   */
  const stopPlayback = useCallback(() => {
    if (scheduler) {
      stopScheduler(scheduler)
    }
    setIsPlaying(false)
    setCurrentStep(null)
  }, [scheduler])

  // Visual playhead synchronization
  // Use refs to avoid recalculating values on every frame
  const stepsPerSecondRef = useRef(0)
  const prevStepRef = useRef(null)

  useEffect(() => {
    // Pre-calculate steps per second when dependencies change
    stepsPerSecondRef.current = calculateStepsPerSecond(cyclesPerSecond, stepsPerBar)
  }, [cyclesPerSecond, stepsPerBar])

  useEffect(() => {
    if (!isPlaying || !audioContext) {
      // Use setTimeout to avoid calling setState synchronously in effect
      // This prevents cascading renders and follows React best practices
      const timeoutId = setTimeout(() => {
        setCurrentStep(null)
        prevStepRef.current = null
      }, 0)
      return () => clearTimeout(timeoutId)
    }

    const syncVisualStep = () => {
      if (audioContext.state === 'running' && startTime) {
        const now = audioContext.currentTime
        const elapsed = now - startTime
        const stepIndex = calculateCurrentStep(
          elapsed,
          stepsPerSecondRef.current,
          totalSequenceSteps
        )

        // Only update state if step actually changed
        if (stepIndex !== prevStepRef.current) {
          prevStepRef.current = stepIndex
          setCurrentStep(stepIndex)
        }
      }
      requestAnimationFrameId.current = requestAnimationFrame(syncVisualStep)
    }

    requestAnimationFrameId.current = requestAnimationFrame(syncVisualStep)
    return () => {
      if (requestAnimationFrameId.current) {
        cancelAnimationFrame(requestAnimationFrameId.current)
      }
    }
  }, [isPlaying, startTime, totalSequenceSteps, audioContext])

  return {
    isPlaying,
    currentStep,
    togglePlayback,
    stopPlayback
  }
}
