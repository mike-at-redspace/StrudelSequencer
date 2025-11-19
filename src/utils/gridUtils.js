/**
 * Grid manipulation utility functions
 * @module utils/gridUtils
 */

import { CONSTANTS } from '@/types'

/**
 * Create an empty row filled with "-" placeholders
 * @param {number} totalSteps - Total number of steps in the row
 * @returns {Array<string>} Array of "-" strings
 */
export function createEmptyRow(totalSteps) {
  return Array(totalSteps).fill('-')
}

/**
 * Create a default grid with some pre-populated patterns
 * @param {number} barCount - Number of bars
 * @param {number} beatsPerBar - Number of beats per bar
 * @returns {Array<Array<string>>} 2D array representing the sequencer grid
 */
export function createDefaultGrid(barCount, beatsPerBar) {
  const stepsPerBar = beatsPerBar * CONSTANTS.STEPS_PER_BEAT
  const numSteps = barCount * stepsPerBar

  // Simple default pattern generation
  const kick = Array(numSteps)
    .fill('-')
    .map((_, i) => (i % 4 === 0 ? 'bd' : '-'))
  const clap = Array(numSteps)
    .fill('-')
    .map((_, i) => (i % 16 === 4 || i % 16 === 12 ? 'cp' : '-'))
  const hat = Array(numSteps)
    .fill('-')
    .map((_, i) => (i % 4 === 2 ? '808oh' : '-'))
  const bass = Array(numSteps)
    .fill('-')
    .map((_, i) => (i % 4 === 2 ? 'bass' : '-'))

  return [kick, clap, hat, bass]
}

/**
 * Resize grid when bar count changes
 * Preserves all pattern data - only affects the view
 * @param {Array<Array<string>>} grid - Current grid
 * @param {number} oldBars - Previous number of bars
 * @param {number} newBars - New number of bars
 * @param {number} stepsPerBar - Steps per bar
 * @returns {Array<Array<string>>} Resized grid
 */
export function resizeGridByBars(grid, oldBars, newBars, stepsPerBar) {
  const newTotalSteps = newBars * stepsPerBar

  return grid.map(row => {
    if (newBars > oldBars) {
      // Add empty steps
      return [...row, ...Array(newTotalSteps - row.length).fill('-')]
    } else {
      // Truncate excess steps
      return row.slice(0, newTotalSteps)
    }
  })
}

/**
 * Resize grid when beats per bar changes
 * Preserves all pattern data per bar - only changes the view resolution
 *
 * Algorithm:
 * 1. Split each row into bar chunks based on OLD beat configuration
 * 2. For each bar chunk, resize it to match NEW beat configuration
 * 3. If newBeats < oldBeats: hidden steps are preserved in memory
 * 4. If newBeats > oldBeats: restored steps are filled with empty values
 *
 * @param {Array<Array<string>>} grid - Current grid (full stored data)
 * @param {number} oldBeats - Previous beats per bar
 * @param {number} newBeats - New beats per bar
 * @param {number} _bars - Number of bars (reserved for future use)
 * @returns {Array<Array<string>>} View-layer resized grid
 */
// eslint-disable-next-line no-unused-vars
export function resizeGridByBeats(grid, oldBeats, newBeats, _bars) {
  const oldStepsPerBar = oldBeats * CONSTANTS.STEPS_PER_BEAT
  const newStepsPerBar = newBeats * CONSTANTS.STEPS_PER_BEAT

  return grid.map(row => {
    const chunks = []
    for (let i = 0; i < row.length; i += oldStepsPerBar) {
      chunks.push(row.slice(i, i + oldStepsPerBar))
    }

    const newChunks = chunks.map(chunk => {
      if (newBeats > oldBeats) {
        const currentLength = chunk.length
        const targetLength = newStepsPerBar
        return [...chunk, ...Array(Math.max(0, targetLength - currentLength)).fill('-')]
      } else {
        return chunk.slice(0, newStepsPerBar)
      }
    })

    return newChunks.flat()
  })
}

/**
 * Get a view of the grid at specific beat/bar resolution
 * Used when you need to display data at a certain resolution without modifying stored data
 *
 * @param {Array<Array<string>>} fullGrid - Full stored grid data
 * @param {number} displayBeats - Beats to display per bar
 * @param {number} bars - Number of bars
 * @returns {Array<Array<string>>} Grid view at specified resolution
 */
export function getGridView(fullGrid, displayBeats, bars) {
  const stepsPerBar = displayBeats * CONSTANTS.STEPS_PER_BEAT
  const viewTotalSteps = bars * stepsPerBar

  return fullGrid.map(row => row.slice(0, viewTotalSteps))
}
