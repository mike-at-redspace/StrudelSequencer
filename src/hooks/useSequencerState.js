/**
 * Custom hook for managing sequencer grid state
 * @module hooks/useSequencerState
 */

import { useState, useCallback, useRef } from 'react'
import { CONSTANTS } from '@/types'
import { createDefaultGrid, createEmptyRow, resizeGridByBars, resizeGridByBeats } from '@/utils'

/**
 * Custom hook for managing sequencer state (grid, bars, beats, BPM)
 * Implements a history stack for beat changes to allow restoration of hidden data
 * @returns {Object} Sequencer state and control functions
 */
export function useSequencerState() {
  const [bars, setBars] = useState(CONSTANTS.DEFAULT_BARS)
  const [beatsPerBar, setBeatsPerBar] = useState(CONSTANTS.DEFAULT_BEATS)
  const [bpm, setBpm] = useState(CONSTANTS.DEFAULT_BPM)
  const [grid, setGrid] = useState(() =>
    createDefaultGrid(CONSTANTS.DEFAULT_BARS, CONSTANTS.DEFAULT_BEATS)
  )
  const [beatHistoryAvailable, setBeatHistoryAvailable] = useState(false)

  // History stack for beat changes - allows restoration if user toggles beats
  const beatHistoryRef = useRef([])

  const stepsPerBar = beatsPerBar * CONSTANTS.STEPS_PER_BEAT
  const totalSequenceSteps = bars * stepsPerBar

  /**
   * Update a single cell in the grid
   * @param {number} rowIndex - Row index
   * @param {number} colIndex - Column index
   * @param {string} value - New value for the cell
   */
  const updateGridCell = useCallback((rowIndex, colIndex, value) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid]
      newGrid[rowIndex] = [...newGrid[rowIndex]]
      newGrid[rowIndex][colIndex] = value
      return newGrid
    })
  }, [])

  /**
   * Toggle a cell's sample value
   * @param {number} rowIndex - Row index
   * @param {number} colIndex - Column index
   * @param {string|null} activeTool - Currently active tool/sample
   */
  const toggleCellSample = useCallback((rowIndex, colIndex, activeTool) => {
    setGrid(prevGrid => {
      const currentCellValue = prevGrid[rowIndex][colIndex]
      const shouldRemoveSample = currentCellValue === activeTool || !activeTool
      const newValue = shouldRemoveSample ? '-' : activeTool

      const newGrid = [...prevGrid]
      newGrid[rowIndex] = [...newGrid[rowIndex]]
      newGrid[rowIndex][colIndex] = newValue
      return newGrid
    })
  }, [])

  /**
   * Add a new track to the grid
   */
  const addNewTrack = useCallback(() => {
    if (grid.length < CONSTANTS.MAX_TRACKS) {
      setGrid(prevGrid => [...prevGrid, createEmptyRow(totalSequenceSteps)])
    }
  }, [grid.length, totalSequenceSteps])

  /**
   * Remove a track from the grid
   * @param {number} trackIndex - Index of track to remove
   */
  const removeTrack = useCallback(
    trackIndex => {
      if (grid.length > CONSTANTS.MIN_TRACKS) {
        setGrid(prevGrid => prevGrid.filter((_, idx) => idx !== trackIndex))
      }
    },
    [grid.length]
  )

  /**
   * Adjust the number of bars
   * @param {number} increment - Amount to adjust (positive or negative)
   */
  const adjustBarCount = useCallback(
    increment => {
      const newBars = Math.max(CONSTANTS.MIN_BARS, Math.min(CONSTANTS.MAX_BARS, bars + increment))
      if (newBars === bars) {
        return
      }

      setGrid(prevGrid => resizeGridByBars(prevGrid, bars, newBars, stepsPerBar))
      setBars(newBars)
    },
    [bars, stepsPerBar]
  )

  /**
   * Adjust the number of beats per bar
   * Stores the previous grid state in history to allow restoration
   *
   * Data Preservation Strategy:
   * - When reducing beats: hidden steps are preserved in the full grid state
   * - When increasing beats: if previous state is in history, restore from there
   * - Otherwise: expand with empty steps
   *
   * @param {number} increment - Amount to adjust (positive or negative)
   */
  const adjustBeatsPerBar = useCallback(
    increment => {
      const newBeats = Math.max(
        CONSTANTS.MIN_BEATS,
        Math.min(CONSTANTS.MAX_BEATS, beatsPerBar + increment)
      )
      if (newBeats === beatsPerBar) {
        return
      }

      // Save current grid state to history before changing beats
      beatHistoryRef.current.push({
        beats: beatsPerBar,
        grid: grid.map(row => [...row]) // Deep copy
      })

      // Keep history size reasonable (last 20 changes)
      if (beatHistoryRef.current.length > 20) {
        beatHistoryRef.current.shift()
      }

      // Update state to reflect history availability
      setBeatHistoryAvailable(beatHistoryRef.current.length > 0)

      setGrid(prevGrid => resizeGridByBeats(prevGrid, beatsPerBar, newBeats, bars))
      setBeatsPerBar(newBeats)
    },
    [beatsPerBar, bars, grid]
  )

  /**
   * Adjust BPM
   * @param {number} increment - Amount to adjust (positive or negative)
   */
  const adjustBpm = useCallback(increment => {
    setBpm(prevBpm => {
      const newBpm = Math.max(CONSTANTS.MIN_BPM, Math.min(CONSTANTS.MAX_BPM, prevBpm + increment))
      return newBpm
    })
  }, [])

  /**
   * Reset the sequencer to empty state
   */
  const resetSequencer = useCallback(() => {
    if (window.confirm('Clear all tracks?')) {
      setGrid([createEmptyRow(totalSequenceSteps)])
      beatHistoryRef.current = []
      setBeatHistoryAvailable(false)
    }
  }, [totalSequenceSteps])

  /**
   * Restore grid to a previous beat configuration
   * Useful for undoing beat changes and recovering hidden data
   * @param {number} targetBeats - Target beats per bar to restore
   */
  const restoreBeatHistory = useCallback(targetBeats => {
    const historyEntry = beatHistoryRef.current.findLast(entry => entry.beats === targetBeats)
    if (historyEntry) {
      setGrid(historyEntry.grid.map(row => [...row]))
      setBeatsPerBar(targetBeats)
    }
  }, [])

  return {
    bars,
    beatsPerBar,
    bpm,
    grid,
    stepsPerBar,
    totalSequenceSteps,
    beatHistoryAvailable,
    setBpm,
    updateGridCell,
    toggleCellSample,
    addNewTrack,
    removeTrack,
    adjustBarCount,
    adjustBeatsPerBar,
    adjustBpm,
    resetSequencer,
    setGrid,
    restoreBeatHistory
  }
}
