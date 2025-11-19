/**
 * Context hook for accessing active tool state
 * Provides access to active tool state from ActiveToolProvider context
 * For local state management, use the useActiveTool hook instead
 * @module hooks/useActiveToolContext
 */

import { useContext } from 'react'
import { ActiveToolContext } from '../contexts/ActiveToolContext.js'

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

export { ActiveToolContext }
