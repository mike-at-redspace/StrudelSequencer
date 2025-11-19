/**
 * Grid manipulation utility functions
 * @module utils/gridUtils
 */

import { CONSTANTS } from '../types/constants.js';

/**
 * Create an empty row filled with "-" placeholders
 * @param {number} totalSteps - Total number of steps in the row
 * @returns {Array<string>} Array of "-" strings
 */
export function createEmptyRow(totalSteps) {
  return Array(totalSteps).fill('-');
}

/**
 * Create a default grid with some pre-populated patterns
 * @param {number} barCount - Number of bars
 * @param {number} beatsPerBar - Number of beats per bar
 * @returns {Array<Array<string>>} 2D array representing the sequencer grid
 */
export function createDefaultGrid(barCount, beatsPerBar) {
  const stepsPerBar = beatsPerBar * CONSTANTS.STEPS_PER_BEAT;
  const numSteps = barCount * stepsPerBar;

  // Simple default pattern generation
  const kick = Array(numSteps)
    .fill('-')
    .map((_, i) => (i % 4 === 0 ? 'bd' : '-'));
  const clap = Array(numSteps)
    .fill('-')
    .map((_, i) => (i % 16 === 4 || i % 16 === 12 ? 'cp' : '-'));
  const hat = Array(numSteps)
    .fill('-')
    .map((_, i) => (i % 4 === 2 ? '808oh' : '-'));
  const bass = Array(numSteps)
    .fill('-')
    .map((_, i) => (i % 4 === 2 ? 'bass' : '-'));

  return [kick, clap, hat, bass];
}

/**
 * Resize grid when bar count changes
 * @param {Array<Array<string>>} grid - Current grid
 * @param {number} oldBars - Previous number of bars
 * @param {number} newBars - New number of bars
 * @param {number} stepsPerBar - Steps per bar
 * @returns {Array<Array<string>>} Resized grid
 */
export function resizeGridByBars(grid, oldBars, newBars, stepsPerBar) {
  const oldTotalSteps = oldBars * stepsPerBar;
  const newTotalSteps = newBars * stepsPerBar;

  return grid.map((row) => {
    if (newBars > oldBars) {
      // Add empty steps
      return [...row, ...Array(newTotalSteps - row.length).fill('-')];
    } else {
      // Remove steps
      return row.slice(0, newTotalSteps);
    }
  });
}

/**
 * Resize grid when beats per bar changes
 * @param {Array<Array<string>>} grid - Current grid
 * @param {number} oldBeats - Previous beats per bar
 * @param {number} newBeats - New beats per bar
 * @param {number} bars - Number of bars
 * @returns {Array<Array<string>>} Resized grid
 */
export function resizeGridByBeats(grid, oldBeats, newBeats, bars) {
  const oldStepsPerBar = oldBeats * CONSTANTS.STEPS_PER_BEAT;
  const newStepsPerBar = newBeats * CONSTANTS.STEPS_PER_BEAT;

  return grid.map((row) => {
    const chunks = [];
    for (let i = 0; i < row.length; i += oldStepsPerBar) {
      chunks.push(row.slice(i, i + oldStepsPerBar));
    }

    const newChunks = chunks.map((chunk) => {
      if (newBeats > oldBeats) {
        // Add empty steps to each bar
        return [...chunk, ...Array(newStepsPerBar - chunk.length).fill('-')];
      } else {
        // Remove steps from each bar
        return chunk.slice(0, newStepsPerBar);
      }
    });

    return newChunks.flat();
  });
}

