/**
 * Custom hook for keyboard shortcuts
 * @module hooks/useKeyboardShortcuts
 */

import { useEffect } from 'react';

/**
 * Custom hook for handling keyboard shortcuts
 * @param {boolean} isEnabled - Whether shortcuts are enabled
 * @param {Function} onPlayPause - Callback for play/pause (Space)
 * @param {Function} onClearTool - Callback for clearing active tool (Escape)
 */
export function useKeyboardShortcuts(isEnabled, onPlayPause, onClearTool) {
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handleGlobalKeydown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        onPlayPause();
      }
      if (e.key === 'Escape') {
        onClearTool();
      }
    };

    window.addEventListener('keydown', handleGlobalKeydown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown);
    };
  }, [isEnabled, onPlayPause, onClearTool]);
}
