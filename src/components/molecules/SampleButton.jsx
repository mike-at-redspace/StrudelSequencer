/**
 * Sample selection button component
 * @module components/molecules/SampleButton
 */

import PropTypes from 'prop-types';
import { getSampleStyle, getSampleName } from '../../utils/sampleUtils.js';

/**
 * Sample button molecule component
 * @param {Object} props - Component props
 * @param {string} props.sampleId - Sample ID
 * @param {string} props.sampleName - Display name
 * @param {boolean} props.isActive - Whether this sample is currently selected
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Sample button element
 */
export function SampleButton({ sampleId, sampleName, isActive, onClick }) {
  const styleClasses = getSampleStyle(sampleId);

  return (
    <div
      onClick={onClick}
      className={`sample-button ${styleClasses} ${
        isActive ? 'sample-button-active' : 'sample-button-inactive'
      }`}
      title={`ID: ${sampleId}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {sampleName}
    </div>
  );
}

SampleButton.propTypes = {
  sampleId: PropTypes.string.isRequired,
  sampleName: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

