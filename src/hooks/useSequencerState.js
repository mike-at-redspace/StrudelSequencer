/**
 * Custom hook for managing sequencer grid state
 * @module hooks/useSequencerState
 */

import { useState, useCallback } from 'react';
import { CONSTANTS } from '../types/constants.js';
import {
  createDefaultGrid,
  createEmptyRow,
  resizeGridByBars,
  resizeGridByBeats,
} from '../utils/gridUtils.js';

/**
 * Custom hook for managing sequencer state (grid, bars, beats, BPM)
 * @returns {Object} Sequencer state and control functions
 */
export function useSequencerState() {
  const [bars, setBars] = useState(CONSTANTS.DEFAULT_BARS);
  const [beatsPerBar, setBeatsPerBar] = useState(CONSTANTS.DEFAULT_BEATS);
  const [bpm, setBpm] = useState(CONSTANTS.DEFAULT_BPM);
  const [grid, setGrid] = useState(() =>
    createDefaultGrid(CONSTANTS.DEFAULT_BARS, CONSTANTS.DEFAULT_BEATS)
  );

  const stepsPerBar = beatsPerBar * CONSTANTS.STEPS_PER_BEAT;
  const totalSequenceSteps = bars * stepsPerBar;

  /**
   * Update a single cell in the grid
   * @param {number} rowIndex - Row index
   * @param {number} colIndex - Column index
   * @param {string} value - New value for the cell
   */
  const updateGridCell = useCallback((rowIndex, colIndex, value) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[rowIndex] = [...newGrid[rowIndex]];
      newGrid[rowIndex][colIndex] = value;
      return newGrid;
    });
  }, []);

  /**
   * Toggle a cell's sample value
   * @param {number} rowIndex - Row index
   * @param {number} colIndex - Column index
   * @param {string|null} activeTool - Currently active tool/sample
   */
  const toggleCellSample = useCallback((rowIndex, colIndex, activeTool) => {
    setGrid((prevGrid) => {
      const currentCellValue = prevGrid[rowIndex][colIndex];
      const shouldRemoveSample = currentCellValue === activeTool || !activeTool;
      const newValue = shouldRemoveSample ? '-' : activeTool;

      const newGrid = [...prevGrid];
      newGrid[rowIndex] = [...newGrid[rowIndex]];
      newGrid[rowIndex][colIndex] = newValue;
      return newGrid;
    });
  }, []);

  /**
   * Add a new track to the grid
   */
  const addNewTrack = useCallback(() => {
    if (grid.length < CONSTANTS.MAX_TRACKS) {
      setGrid((prevGrid) => [...prevGrid, createEmptyRow(totalSequenceSteps)]);
    }
  }, [grid.length, totalSequenceSteps]);

  /**
   * Remove a track from the grid
   * @param {number} trackIndex - Index of track to remove
   */
  const removeTrack = useCallback(
    (trackIndex) => {
      if (grid.length > CONSTANTS.MIN_TRACKS) {
        setGrid((prevGrid) => prevGrid.filter((_, idx) => idx !== trackIndex));
      }
    },
    [grid.length]
  );

  /**
   * Adjust the number of bars
   * @param {number} increment - Amount to adjust (positive or negative)
   */
  const adjustBarCount = useCallback(
    (increment) => {
      const newBars = Math.max(CONSTANTS.MIN_BARS, Math.min(CONSTANTS.MAX_BARS, bars + increment));
      if (newBars === bars) {
        return;
      }

      setGrid((prevGrid) => resizeGridByBars(prevGrid, bars, newBars, stepsPerBar));
      setBars(newBars);
    },
    [bars, stepsPerBar]
  );

  /**
   * Adjust the number of beats per bar
   * @param {number} increment - Amount to adjust (positive or negative)
   */
  const adjustBeatsPerBar = useCallback(
    (increment) => {
      const newBeats = Math.max(
        CONSTANTS.MIN_BEATS,
        Math.min(CONSTANTS.MAX_BEATS, beatsPerBar + increment)
      );
      if (newBeats === beatsPerBar) {
        return;
      }

      setGrid((prevGrid) => resizeGridByBeats(prevGrid, beatsPerBar, newBeats, bars));
      setBeatsPerBar(newBeats);
    },
    [beatsPerBar, bars]
  );

  /**
   * Adjust BPM
   * @param {number} increment - Amount to adjust (positive or negative)
   */
  const adjustBpm = useCallback((increment) => {
    setBpm((prevBpm) => {
      const newBpm = Math.max(CONSTANTS.MIN_BPM, Math.min(CONSTANTS.MAX_BPM, prevBpm + increment));
      return newBpm;
    });
  }, []);

  /**
   * Reset the sequencer to empty state
   */
  const resetSequencer = useCallback(() => {
    if (window.confirm('Clear all tracks?')) {
      setGrid([createEmptyRow(totalSequenceSteps)]);
    }
  }, [totalSequenceSteps]);

  return {
    bars,
    beatsPerBar,
    bpm,
    grid,
    stepsPerBar,
    totalSequenceSteps,
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
  };
}
