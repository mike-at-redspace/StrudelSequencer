/**
 * Custom hook for auto-scrolling the sequencer grid to follow the playhead
 * @module hooks/useAutoScroll
 */

import { useEffect, useRef } from 'react'
import { CONSTANTS } from '@/types'

/**
 * Custom hook for auto-scrolling to keep the playhead visible
 * @param {number|null} currentStep - Current step index (null if not playing)
 * @param {number} _firstRowIndex - Index of the first row (for step marker IDs, reserved for future use)
 */
// eslint-disable-next-line no-unused-vars
export function useAutoScroll(currentStep, _firstRowIndex = 0) {
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (currentStep === null || !scrollContainerRef.current) {
      return
    }

    const container = scrollContainerRef.current
    const activeElement = document.getElementById(`step-marker-${currentStep}`)

    if (activeElement) {
      const containerRect = container.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()

      const isOutOfBoundsRight = activeRect.right > containerRect.right - CONSTANTS.SCROLL_PADDING
      const isOutOfBoundsLeft = activeRect.left < containerRect.left + CONSTANTS.SCROLL_PADDING

      if (isOutOfBoundsRight || isOutOfBoundsLeft) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [currentStep])

  /**
   * Scroll to the beginning of the sequence
   */
  const scrollToStart = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  return { scrollContainerRef, scrollToStart }
}
