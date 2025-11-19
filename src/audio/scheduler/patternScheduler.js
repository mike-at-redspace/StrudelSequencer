/**
 * Pattern scheduling and generation for Strudel
 * @module audio/scheduler/patternScheduler
 */

import { controls } from '@strudel/core'
import { mini } from '@strudel/mini'

const { s } = controls

/**
 * Update the scheduler pattern based on the current grid state
 * @param {Array<Array<string>>} grid - 2D array representing the sequencer grid
 * @param {Object} scheduler - Strudel scheduler instance
 * @param {number} barCount - Number of bars in the sequence
 * @param {number} cps - Cycles per second (tempo)
 * @throws {Error} If pattern generation fails
 */
export function updateSchedulerPattern(grid, scheduler, barCount, cps) {
  if (!scheduler) {
    return
  }

  try {
    const patternObjects = grid.map(row => {
      if (!row || row.length === 0) {
        return null
      }
      // Convert grid row to Strudel pattern string
      // "-" becomes "~" (rest) in Strudel syntax
      const rowStr = `[${row.map(n => (n === '-' ? '~' : n)).join(' ')}]`
      return s(mini(rowStr)).slow(barCount).legato(1).cps(cps)
    })

    const validPatterns = patternObjects.filter(p => p !== null)

    // Stack all patterns together
    const mainPattern =
      validPatterns.length > 0
        ? validPatterns.reduce((acc, pat) => acc.stack(pat))
        : s(mini('~')).cps(cps)

    scheduler.setPattern(mainPattern)
  } catch (e) {
    console.error('Pattern Generation Error', e)
    throw e
  }
}

/**
 * Update the scheduler's cycles per second (tempo)
 * @param {Object} scheduler - Strudel scheduler instance
 * @param {number} cps - Cycles per second
 */
export function updateSchedulerCPS(scheduler, cps) {
  if (!scheduler || typeof scheduler.setCPS !== 'function') {
    return
  }
  scheduler.setCPS(cps)
}

/**
 * Start the scheduler
 * @param {Object} scheduler - Strudel scheduler instance
 */
export function startScheduler(scheduler) {
  if (!scheduler) {
    return
  }
  scheduler.start()
}

/**
 * Stop the scheduler
 * @param {Object} scheduler - Strudel scheduler instance
 */
export function stopScheduler(scheduler) {
  if (!scheduler) {
    return
  }
  scheduler.stop()
}
