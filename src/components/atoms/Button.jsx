/**
 * Basic button component
 * @module components/atoms/Button
 */

import PropTypes from 'prop-types';

/**
 * Button atom component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Tooltip text
 * @returns {JSX.Element} Button element
 */
export function Button({ children, onClick, disabled = false, className = '', title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
};

