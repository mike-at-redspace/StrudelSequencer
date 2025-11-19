/**
 * Control bar component with playback and sequencer controls
 * @module components/organisms/ControlBar
 */

import PropTypes from 'prop-types';
import { Trash } from 'lucide-react';
import { ControlGroup } from '../molecules/ControlGroup.jsx';
import { PlaybackButton } from '../molecules/PlaybackButton.jsx';
import { CONSTANTS } from '../../types/constants.js';

/**
 * Control bar organism component
 * @param {Object} props - Component props
 * @param {number} props.bars - Number of bars
 * @param {number} props.beatsPerBar - Beats per bar
 * @param {number} props.bpm - Beats per minute
 * @param {boolean} props.isPlaying - Whether sequencer is playing
 * @param {Function} props.adjustBarCount - Function to adjust bar count
 * @param {Function} props.adjustBeatsPerBar - Function to adjust beats per bar
 * @param {Function} props.setBpm - Function to set BPM
 * @param {Function} props.togglePlayback - Function to toggle playback
 * @param {Function} props.resetSequencer - Function to reset sequencer
 * @returns {JSX.Element} Control bar element
 */
export function ControlBar({
  bars,
  beatsPerBar,
  bpm,
  isPlaying,
  adjustBarCount,
  adjustBeatsPerBar,
  setBpm,
  togglePlayback,
  resetSequencer,
}) {
  const handleBpmIncrement = () => {
    setBpm((prev) => Math.min(CONSTANTS.MAX_BPM, prev + CONSTANTS.BPM_STEP));
  };

  const handleBpmDecrement = () => {
    setBpm((prev) => Math.max(CONSTANTS.MIN_BPM, prev - CONSTANTS.BPM_STEP));
  };

  return (
    <header className="control-bar">
      <div className="control-bar-content">
        <ControlGroup
          label="BARS"
          value={bars}
          onIncrement={() => adjustBarCount(1)}
          onDecrement={() => adjustBarCount(-1)}
          isPlaying={isPlaying}
          valueClassName="w-5"
        />

        <ControlGroup
          label="BEATS/BAR"
          value={beatsPerBar}
          onIncrement={() => adjustBeatsPerBar(1)}
          onDecrement={() => adjustBeatsPerBar(-1)}
          isPlaying={isPlaying}
          valueClassName="w-5"
        />

        <ControlGroup
          label="BPM"
          value={bpm}
          onIncrement={handleBpmIncrement}
          onDecrement={handleBpmDecrement}
          isPlaying={isPlaying}
          valueClassName="w-8"
        />
      </div>

      <div className="control-bar-actions">
        <button onClick={resetSequencer} className="btn-reset" title="Reset" type="button">
          <Trash size={18} />
        </button>

        <PlaybackButton isPlaying={isPlaying} onClick={togglePlayback} />
      </div>
    </header>
  );
}

ControlBar.propTypes = {
  bars: PropTypes.number.isRequired,
  beatsPerBar: PropTypes.number.isRequired,
  bpm: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  adjustBarCount: PropTypes.func.isRequired,
  adjustBeatsPerBar: PropTypes.func.isRequired,
  setBpm: PropTypes.func.isRequired,
  togglePlayback: PropTypes.func.isRequired,
  resetSequencer: PropTypes.func.isRequired,
};
