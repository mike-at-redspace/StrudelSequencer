/**
 * Control button component for increment/decrement controls
 * @module components/atoms/ControlButton
 */

import PropTypes from 'prop-types'

/**
 * Control button atom for +/- controls
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Icon or content
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.isPlaying - Whether sequencer is playing (disables button)
 * @returns {JSX.Element} Control button element
 */
export function ControlButton({ children, onClick, isPlaying = false }) {
  return (
    <button onClick={onClick} className='btn-control' disabled={isPlaying} type='button'>
      {children}
    </button>
  )
}

ControlButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool
}
