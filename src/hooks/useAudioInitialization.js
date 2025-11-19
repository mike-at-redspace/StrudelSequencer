/**
 * Custom hook for audio engine initialization and sample loading
 * @module hooks/useAudioInitialization
 */

import { useState, useEffect, useCallback } from 'react';
import { initializeAudioEngine } from '../audio/engine/audioEngine.js';
import { loadSampleLibrary } from '../audio/helpers/sampleLoader.js';

/**
 * Custom hook for managing audio initialization
 * @returns {Object} Initialization state and functions
 */
export function useAudioInitialization() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [scheduler, setScheduler] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [error, setError] = useState(null);

  // Load sample library on mount
  useEffect(() => {
    loadSampleLibrary()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load samples:', err);
        setError(err.message);
        setIsLoaded(true); // Still allow starting even if samples fail
      });
  }, []);

  /**
   * Initialize the audio engine
   */
  const initializeAudio = useCallback(async () => {
    try {
      setError(null);
      const { scheduler: newScheduler, audioContext: newAudioContext } =
        await initializeAudioEngine();
      setScheduler(newScheduler);
      setAudioContext(newAudioContext);
      setHasStarted(true);
    } catch (err) {
      console.error('Audio initialization failed:', err);
      setError(err.message);
      alert(err.message);
    }
  }, []);

  return {
    isLoaded,
    hasStarted,
    scheduler,
    audioContext,
    error,
    initializeAudio,
  };
}
