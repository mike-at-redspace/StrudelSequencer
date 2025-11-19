/**
 * Main sequencer page component
 * @module components/pages/SequencerPage
 */

import { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Sidebar } from '../organisms/Sidebar.jsx'
import { ControlBar } from '../organisms/ControlBar.jsx'
import { SequencerGrid } from '../organisms/SequencerGrid.jsx'
import { ActiveSampleDisplay } from '../molecules/ActiveSampleDisplay.jsx'

/**
 * Sequencer page component
 * @param {Object} props - Component props
 * @param {Object} props.sequencerState - Sequencer state from useSequencerState hook
 * @param {Object} props.playbackState - Playback state from usePlaybackState hook
 * @param {Object} props.activeToolState - Active tool state from useActiveTool hook
 * @param {Object} props.scrollState - Scroll state from useAutoScroll hook
 * @returns {JSX.Element} Sequencer page element
 */
export function SequencerPage({ sequencerState, playbackState, activeToolState, scrollState }) {
  const {
    bars,
    beatsPerBar,
    bpm,
    grid,
    stepsPerBar,
    adjustBarCount,
    adjustBeatsPerBar,
    setBpm,
    toggleCellSample,
    addNewTrack,
    removeTrack,
    resetSequencer
  } = sequencerState

  const { isPlaying, currentStep, togglePlayback, stopPlayback } = playbackState
  const { activeTool, setTool } = activeToolState
  const { scrollContainerRef, scrollToStart } = scrollState

  const handleReset = useCallback(() => {
    resetSequencer()
    stopPlayback()
    scrollToStart()
  }, [resetSequencer, stopPlayback, scrollToStart])

  // Memoize cell click handler to prevent unnecessary re-renders in SequencerGrid
  const handleCellClick = useCallback(
    (rowIndex, colIndex) => {
      toggleCellSample(rowIndex, colIndex, activeTool)
    },
    [toggleCellSample, activeTool]
  )

  return (
    <div className='sequencer-page'>
      <Sidebar activeTool={activeTool} setActiveTool={setTool} />

      <main className='sequencer-main'>
        <ControlBar
          bars={bars}
          beatsPerBar={beatsPerBar}
          bpm={bpm}
          isPlaying={isPlaying}
          adjustBarCount={adjustBarCount}
          adjustBeatsPerBar={adjustBeatsPerBar}
          setBpm={setBpm}
          togglePlayback={togglePlayback}
          resetSequencer={handleReset}
        />

        <div className='sequencer-content-wrapper'>
          <div className='sequencer-panel'>
            <SequencerGrid
              grid={grid}
              bars={bars}
              beatsPerBar={beatsPerBar}
              stepsPerBar={stepsPerBar}
              currentStep={currentStep}
              activeTool={activeTool}
              onCellClick={handleCellClick}
              onAddTrack={addNewTrack}
              onRemoveTrack={removeTrack}
              scrollContainerRef={scrollContainerRef}
            />

            <ActiveSampleDisplay activeTool={activeTool} />
          </div>
        </div>
      </main>
    </div>
  )
}

SequencerPage.propTypes = {
  sequencerState: PropTypes.shape({
    bars: PropTypes.number.isRequired,
    beatsPerBar: PropTypes.number.isRequired,
    bpm: PropTypes.number.isRequired,
    grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    stepsPerBar: PropTypes.number.isRequired,
    adjustBarCount: PropTypes.func.isRequired,
    adjustBeatsPerBar: PropTypes.func.isRequired,
    setBpm: PropTypes.func.isRequired,
    toggleCellSample: PropTypes.func.isRequired,
    addNewTrack: PropTypes.func.isRequired,
    removeTrack: PropTypes.func.isRequired,
    resetSequencer: PropTypes.func.isRequired
  }).isRequired,
  playbackState: PropTypes.shape({
    isPlaying: PropTypes.bool.isRequired,
    currentStep: PropTypes.number,
    togglePlayback: PropTypes.func.isRequired,
    stopPlayback: PropTypes.func.isRequired
  }).isRequired,
  activeToolState: PropTypes.shape({
    activeTool: PropTypes.string,
    setTool: PropTypes.func.isRequired,
    clearTool: PropTypes.func.isRequired
  }).isRequired,
  scrollState: PropTypes.shape({
    scrollContainerRef: PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    }).isRequired,
    scrollToStart: PropTypes.func.isRequired
  }).isRequired
}
