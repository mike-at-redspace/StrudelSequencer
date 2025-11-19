/**
 * Active sample display HUD component
 * @module components/molecules/ActiveSampleDisplay
 */

import PropTypes from 'prop-types';
import { getSampleStyle, getSampleName } from '../../utils/sampleUtils.js';

/**
 * Active sample display molecule component
 * @param {Object} props - Component props
 * @param {string|null} props.activeTool - Currently active tool/sample ID
 * @returns {JSX.Element|null} Active sample display element or null
 */
export function ActiveSampleDisplay({ activeTool }) {
  if (!activeTool) {
    return null;
  }

  const styleClasses = getSampleStyle(activeTool);
  const bgColorClass = styleClasses.split(' ')[0];

  return (
    <div className="active-sample-hud">
      <div className="active-sample-content">
        <div className={`active-sample-indicator ${bgColorClass}`} />
        <span className="active-sample-text">
          Adding Sample: <b>&quot;{getSampleName(activeTool)}&quot;</b>
        </span>
        <div className="active-sample-divider" />
        <span className="active-sample-hint">
          <span className="key-badge">ESC</span> to stop
        </span>
      </div>
    </div>
  );
}

ActiveSampleDisplay.propTypes = {
  activeTool: PropTypes.string,
};

