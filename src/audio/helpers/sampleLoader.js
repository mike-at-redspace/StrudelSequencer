/**
 * Sample library loading utilities
 * @module audio/helpers/sampleLoader
 */

import { samples } from '@strudel/webaudio'

const SAMPLE_LIBRARY_URL =
  'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/refs/heads/master/strudel.json'

/**
 * Load the sample library from the remote URL
 * @returns {Promise<void>}
 * @throws {Error} If sample loading fails
 */
export async function loadSampleLibrary() {
  try {
    await samples(SAMPLE_LIBRARY_URL)
  } catch (error) {
    console.error('Samples failed to load', error)
    throw new Error('Failed to load sample library. Please check your internet connection.')
  }
}
