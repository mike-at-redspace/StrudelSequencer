/**
 * Hook for accessing active tool state from context
 * Provides access to active tool state from ActiveToolProvider context
 * For local state management, use the useActiveTool hook instead
 * @module contexts/useActiveToolContext
 */

import { useContext } from 'react'
import { ActiveToolContext } from '../ActiveToolContext.js'

/**
 * Hook to access active tool state from context
 * Must be used inside an ActiveToolProvider
 * @returns {Object} Active tool state object with { activeTool, setTool, clearTool }
 * @throws {Error} If used outside of ActiveToolProvider
 */
export function useActiveToolContext() {
  const context = useContext(ActiveToolContext)
  if (context === null) {
    throw new Error('useActiveTool must be used inside an ActiveToolProvider')
  }
  return context
}
