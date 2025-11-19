import PropTypes from 'prop-types'
import { Plus, Minus } from 'lucide-react'
import { ControlButton } from '../atoms/ControlButton.jsx'
import NumberFlow from '@number-flow/react'

/**
 * Control group molecule component
 */
export function ControlGroup({
  label,
  value,
  onIncrement,
  onDecrement,
  onChange,
  isPlaying = false,
  valueClassName = 'w-12',
  min = 0,
  max = 999,
  step = 1
}) {
  const createKeyDownHandler = handler => e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      handler()
    }
  }

  return (
    <div className='control-group'>
      <span className='control-label'>{label}</span>
      <div className='flex items-center gap-2'>
        <ControlButton
          isPlaying={isPlaying}
          onClick={onDecrement}
          onKeyDown={createKeyDownHandler(onDecrement)}
        >
          <Minus size={14} />
        </ControlButton>

        <NumberFlow
          value={value}
          onChange={onChange}
          disabled={isPlaying}
          min={min}
          max={max}
          step={step}
          className={`control-value ${valueClassName}`}
        />

        <ControlButton
          isPlaying={isPlaying}
          onClick={onIncrement}
          onKeyDown={createKeyDownHandler(onIncrement)}
        >
          <Plus size={14} />
        </ControlButton>
      </div>
    </div>
  )
}

ControlGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired, // required for NumberFlow input
  isPlaying: PropTypes.bool,
  valueClassName: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
}
