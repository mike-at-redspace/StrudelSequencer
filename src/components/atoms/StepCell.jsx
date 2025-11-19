/**
 * Individual step cell component in the sequencer grid
 * @module components/atoms/StepCell
 */

import PropTypes from 'prop-types';
import { getSampleStyle, getSampleName } from '../../utils/sampleUtils.js';

/**
 * Step cell atom component
 * @param {Object} props - Component props
 * @param {string} props.value - Cell value (sample ID or "-")
 * @param {boolean} props.isActive - Whether this step is currently playing
 * @param {string|null} props.activeTool - Currently selected tool/sample
 * @param {Function} props.onClick - Click handler
 * @param {string} props.id - Element ID (for first row step markers)
 * @returns {JSX.Element} Step cell element
 */
export function StepCell({ value, isActive, activeTool, onClick, id }) {
  const isCellFilled = value !== '-';
  const cellStyle = getSampleStyle(value);

  return (
    <div
      id={id}
      className="step-cell-container group"
      onClick={onClick}
      title={isCellFilled ? getSampleName(value) : ''}
    >
      <div
        className={`step-cell ${cellStyle} ${
          activeTool ? 'cursor-cell' : ''
        } ${
          !activeTool && isCellFilled ? 'cursor-grab' : ''
        } ${
          isActive ? 'step-cell-active' : 'step-cell-hover'
        } ${
          isCellFilled ? 'step-cell-filled' : 'step-cell-empty'
        }`}
      >
        {!isCellFilled && <div className="step-cell-empty-dot" />}
      </div>
    </div>
  );
}

StepCell.propTypes = {
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  activeTool: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
};

