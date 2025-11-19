/**
 * Sample library loading utilities
 * @module audio/helpers/sampleLoader
 */

import { samples } from '@strudel/webaudio'
import { SAMPLE_LIBRARY } from './sampleLibrary.js'

/**
 * Remote GitHub URL as fallback (if bundled samples fail)
 * Note: This is kept as a fallback only. The primary method uses bundled samples.
 * @constant {string}
 */
const SAMPLE_LIBRARY_URL_FALLBACK =
  'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/refs/heads/master/strudel.json'

/**
 * Load the sample library using bundled configuration
 * Falls back to remote URL if bundled method fails
 *
 * Strategy:
 * 1. First attempts to use bundled sample library (no external dependency)
 * 2. If bundled fails, attempts remote GitHub URL
 * 3. Logs warning if remote fallback is used
 *
 * @returns {Promise<void>}
 * @throws {Error} If both bundled and remote loading fail
 */
export async function loadSampleLibrary() {
  try {
    // Primary: Use bundled sample library
    await loadBundledSampleLibrary()
    console.log('Sample library loaded from bundled configuration')
  } catch (bundledError) {
    console.warn('Bundled sample library failed, attempting remote fallback...', bundledError)

    try {
      // Fallback: Use remote GitHub URL
      await loadRemoteSampleLibrary()
      console.warn('Sample library loaded from remote GitHub URL (external dependency)')
    } catch (remoteError) {
      console.error('Both bundled and remote sample loading failed', {
        bundledError,
        remoteError
      })
      throw new Error(
        'Failed to load sample library. Please check your internet connection and try again.'
      )
    }
  }
}

/**
 * Load samples using the bundled library configuration
 * This method doesn't require external network access
 *
 * @returns {Promise<void>}
 * @private
 */
async function loadBundledSampleLibrary() {
  try {
    // Initialize samples with bundled configuration
    // The Strudel samples function accepts a library mapping
    await samples(SAMPLE_LIBRARY)
  } catch (error) {
    throw new Error(`Bundled sample library failed to initialize: ${error.message}`)
  }
}

/**
 * Load samples from the remote GitHub URL
 * Used as fallback if bundled method fails
 *
 * @returns {Promise<void>}
 * @private
 */
async function loadRemoteSampleLibrary() {
  try {
    await samples(SAMPLE_LIBRARY_URL_FALLBACK)
  } catch (error) {
    throw new Error(`Remote sample library failed to load: ${error.message}`)
  }
}
