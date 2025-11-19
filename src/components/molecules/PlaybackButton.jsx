/**
 * Playback control button (Play/Stop)
 * @module components/molecules/PlaybackButton
 */

import PropTypes from 'prop-types';
import { Play, Square } from 'lucide-react';

/**
 * Playback button molecule component
 * @param {Object} props - Component props
 * @param {boolean} props.isPlaying - Whether sequencer is playing
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Playback button element
 */
export function PlaybackButton({ isPlaying, onClick }) {
  return (
    <button
      onClick={onClick}
      className={isPlaying ? 'btn-primary-stop' : 'btn-primary-play'}
      type="button"
    >
      {isPlaying ? (
        <>
          <Square size={16} fill="currentColor" /> STOP
        </>
      ) : (
        <>
          <Play size={16} fill="currentColor" /> PLAY
        </>
      )}
      <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 font-mono">
        {' '}
        ␣
      </span>
    </button>
  );
}

PlaybackButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

