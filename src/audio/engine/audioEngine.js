/**
 * Audio engine initialization and management
 * @module audio/engine/audioEngine
 */

import { repl } from '@strudel/core'
import { getAudioContext, webaudioOutput } from '@strudel/webaudio'

/**
 * Initialize the audio engine and create a scheduler
 * @returns {Promise<Object>} Object containing scheduler and audio context
 * @throws {Error} If audio initialization fails
 */
export async function initializeAudioEngine() {
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    const { scheduler } = repl({
      defaultOutput: webaudioOutput,
      getTime: () => ctx.currentTime
    })

    return { scheduler, audioContext: ctx }
  } catch (err) {
    console.error('Failed to initialize audio:', err)
    throw new Error('Audio initialization failed. Please verify your browser supports Web Audio.')
  }
}

/**
 * Resume audio context if suspended
 * @param {AudioContext} audioContext - The Web Audio API context
 * @returns {Promise<void>}
 */
export async function resumeAudioContext(audioContext) {
  if (audioContext && audioContext.state === 'suspended') {
    await audioContext.resume()
  }
}
