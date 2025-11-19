/**
 * Timing and tempo calculation helpers
 * @module audio/helpers/timingHelpers
 */

/**
 * Calculate cycles per second from BPM and beats per bar
 * @param {number} bpm - Beats per minute
 * @param {number} beatsPerBar - Number of beats per bar
 * @returns {number} Cycles per second
 */
export function calculateCPS(bpm, beatsPerBar) {
  return bpm / (60 * beatsPerBar)
}

/**
 * Calculate steps per second from cycles per second and steps per bar
 * @param {number} cps - Cycles per second
 * @param {number} stepsPerBar - Number of steps per bar
 * @returns {number} Steps per second
 */
export function calculateStepsPerSecond(cps, stepsPerBar) {
  return cps * stepsPerBar
}

/**
 * Calculate the current step index based on elapsed time
 * @param {number} elapsedTime - Elapsed time in seconds
 * @param {number} stepsPerSecond - Steps per second
 * @param {number} totalSteps - Total number of steps in the sequence
 * @returns {number} Current step index (0-based)
 */
export function calculateCurrentStep(elapsedTime, stepsPerSecond, totalSteps) {
  return Math.floor(elapsedTime * stepsPerSecond) % totalSteps
}
