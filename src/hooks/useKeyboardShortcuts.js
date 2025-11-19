/**
 * Custom hook for keyboard shortcuts
 * @module hooks/useKeyboardShortcuts
 */

import { useEffect } from 'react'

/**
 * Custom hook for handling keyboard shortcuts
 * @param {boolean} isEnabled - Whether shortcuts are enabled
 * @param {Function} onPlayPause - Callback for play/pause (Space)
 * @param {Function} onClearTool - Callback for clearing active tool (Escape)
 */
export function useKeyboardShortcuts(isEnabled, onPlayPause, onClearTool) {
  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const handleGlobalKeydown = e => {
      // Escape key should always work to clear the tool
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        e.target.blur()
        onClearTool()
        return
      }

      // For other shortcuts, don't trigger if focus is on form elements
      const targetTag = e.target.tagName
      if (['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(targetTag)) {
        return
      }

      if (e.code === 'Space') {
        e.preventDefault()
        onPlayPause()
      }
    }

    window.addEventListener('keydown', handleGlobalKeydown)
    return () => {
      window.removeEventListener('keydown', handleGlobalKeydown)
    }
  }, [isEnabled, onPlayPause, onClearTool])
}
