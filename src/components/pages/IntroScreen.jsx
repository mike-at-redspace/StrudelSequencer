/**
 * Intro screen component shown before audio initialization
 * @module components/pages/IntroScreen
 */

import PropTypes from 'prop-types';
import { Volume2 } from 'lucide-react';

/**
 * Intro screen page component
 * @param {Object} props - Component props
 * @param {boolean} props.isLoaded - Whether samples are loaded
 * @param {Function} props.onEnter - Callback when user clicks to enter
 * @returns {JSX.Element} Intro screen element
 */
export function IntroScreen({ isLoaded, onEnter }) {
  return (
    <div className="intro-container">
      <div className="intro-card">
        <h1 className="intro-title">
          Strudel<span className="intro-title-text">Sequencer</span>
        </h1>

        {!isLoaded ? (
          <div className="intro-loading">Loading Sample Library...</div>
        ) : (
          <button onClick={onEnter} className="btn-enter-studio" type="button">
            <div className="btn-enter-studio-content">
              <Volume2 />
              Enter Studio
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

IntroScreen.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  onEnter: PropTypes.func.isRequired,
};

