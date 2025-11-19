/**
 * Individual step cell component in the sequencer grid
 * @module components/atoms/StepCell
 */

import { memo, useMemo } from 'react';
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
function StepCellComponent({ value, isActive, activeTool, onClick, id }) {
  const isCellFilled = value !== '-';

  // Memoize expensive utility function calls
  const cellStyle = useMemo(() => getSampleStyle(value), [value]);
  const sampleName = useMemo(
    () => (isCellFilled ? getSampleName(value) : ''),
    [isCellFilled, value]
  );

  // Memoize className construction
  // IMPORTANT: step-cell-active must come last to ensure it overrides other styles
  const cellClassName = useMemo(() => {
    const classes = ['step-cell', cellStyle];

    classes.push(isCellFilled ? 'step-cell-filled' : 'step-cell-empty');

    if (activeTool) {
      classes.push('cursor-cell');
    } else if (isCellFilled) {
      classes.push('cursor-grab');
    }

    // Active state must be last to ensure proper CSS specificity
    classes.push(isActive ? 'step-cell-active' : 'step-cell-hover');

    return classes.join(' ');
  }, [cellStyle, activeTool, isCellFilled, isActive]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      id={id}
      className="step-cell-container group"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      title={sampleName}
      role="button"
      tabIndex={0}
    >
      <div className={cellClassName}>
        {!isCellFilled && <div className="step-cell-empty-dot" />}
      </div>
    </div>
  );
}

StepCellComponent.propTypes = {
  value: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  activeTool: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
};

/**
 * Memoized StepCell component to prevent unnecessary re-renders.
 * Only re-renders when props actually change.
 */
export const StepCell = memo(StepCellComponent, (prevProps, nextProps) => {
  // Custom comparison: only re-render if relevant props changed
  return (
    prevProps.value === nextProps.value &&
    prevProps.isActive === nextProps.isActive &&
    prevProps.activeTool === nextProps.activeTool &&
    prevProps.id === nextProps.id &&
    prevProps.onClick === nextProps.onClick
  );
});
