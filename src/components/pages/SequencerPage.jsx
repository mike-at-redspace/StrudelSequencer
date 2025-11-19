/**
 * Main sequencer page component
 * @module components/pages/SequencerPage
 */

import { useCallback } from 'react'
import { Sidebar, ControlBar, SequencerGrid, ActiveSampleDisplay } from '@/components'
import {
  useSequencer,
  useActiveToolContext,
  usePlaybackContext,
  useAutoScroll,
  useKeyboardShortcuts
} from '@/hooks'

/**
 * Sequencer page component
 * No longer receives props - uses context hooks directly
 * @returns {JSX.Element} Sequencer page element
 */
export function SequencerPage() {
  const sequencer = useSequencer()
  const { activeTool, setTool, clearTool } = useActiveToolContext()
  const playback = usePlaybackContext()

  const { scrollContainerRef, scrollToStart } = useAutoScroll(playback.currentStep, 0)

  useKeyboardShortcuts(true, playback.togglePlayback, clearTool)

  const handleReset = useCallback(() => {
    sequencer.resetSequencer()
    playback.stopPlayback()
    scrollToStart()
  }, [sequencer, playback, scrollToStart])

  // Memoize cell click handler to prevent unnecessary re-renders in SequencerGrid
  const handleCellClick = useCallback(
    (rowIndex, colIndex) => {
      sequencer.toggleCellSample(rowIndex, colIndex, activeTool)
    },
    [sequencer, activeTool]
  )

  return (
    <div className='sequencer-page'>
      <Sidebar activeTool={activeTool} setActiveTool={setTool} />

      <main className='sequencer-main'>
        <ControlBar
          bars={sequencer.bars}
          beatsPerBar={sequencer.beatsPerBar}
          bpm={sequencer.bpm}
          isPlaying={playback.isPlaying}
          adjustBarCount={sequencer.adjustBarCount}
          adjustBeatsPerBar={sequencer.adjustBeatsPerBar}
          setBpm={sequencer.setBpm}
          togglePlayback={playback.togglePlayback}
          resetSequencer={handleReset}
        />

        <div className='sequencer-content-wrapper'>
          <div className='sequencer-panel'>
            <SequencerGrid
              grid={sequencer.grid}
              bars={sequencer.bars}
              beatsPerBar={sequencer.beatsPerBar}
              stepsPerBar={sequencer.stepsPerBar}
              currentStep={playback.currentStep}
              activeTool={activeTool}
              onCellClick={handleCellClick}
              onAddTrack={sequencer.addNewTrack}
              onRemoveTrack={sequencer.removeTrack}
              scrollContainerRef={scrollContainerRef}
            />

            <ActiveSampleDisplay activeTool={activeTool} />
          </div>
        </div>
      </main>
    </div>
  )
}
