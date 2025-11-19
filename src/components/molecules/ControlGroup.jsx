/**
 * Control group component for bars, beats, BPM controls
 * @module components/molecules/ControlGroup
 */

import PropTypes from 'prop-types';
import { ControlButton } from '../atoms/ControlButton.jsx';
import { Plus, Minus } from 'lucide-react';

/**
 * Control group molecule component
 * @param {Object} props - Component props
 * @param {string} props.label - Label text
 * @param {number} props.value - Current value
 * @param {Function} props.onIncrement - Increment handler
 * @param {Function} props.onDecrement - Decrement handler
 * @param {boolean} props.isPlaying - Whether sequencer is playing
 * @param {string} props.valueClassName - Additional classes for value display
 * @returns {JSX.Element} Control group element
 */
export function ControlGroup({
  label,
  value,
  onIncrement,
  onDecrement,
  isPlaying,
  valueClassName = 'w-4',
}) {
  return (
    <div className="control-group">
      <span className="control-label">{label}</span>
      <div className="flex items-center gap-2">
        <ControlButton isPlaying={isPlaying} onClick={onDecrement}>
          <Minus size={14} />
        </ControlButton>
        <span className={`control-value ${valueClassName}`}>{value}</span>
        <ControlButton isPlaying={isPlaying} onClick={onIncrement}>
          <Plus size={14} />
        </ControlButton>
      </div>
    </div>
  );
}

ControlGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
  valueClassName: PropTypes.string,
};
