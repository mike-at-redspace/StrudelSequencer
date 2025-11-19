/**
 * Custom hook for managing the active tool/sample selection
 * @module hooks/useActiveTool
 */

import { useState, useCallback } from 'react'

/**
 * Custom hook for managing active tool state
 * @returns {Object} Active tool state and control functions
 */
export function useActiveTool() {
  const [activeTool, setActiveTool] = useState(null)

  /**
   * Set the active tool
   * @param {string|null} toolId - Tool/sample ID to activate, or null to clear
   */
  const setTool = useCallback(toolId => {
    setActiveTool(prev => (prev === toolId ? null : toolId))
  }, [])

  /**
   * Clear the active tool
   */
  const clearTool = useCallback(() => {
    setActiveTool(null)
  }, [])

  return {
    activeTool,
    setTool,
    clearTool
  }
}
