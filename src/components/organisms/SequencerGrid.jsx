/**
 * Sequencer grid component
 * @module components/organisms/SequencerGrid
 */

import { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { StepCell } from '../atoms/StepCell.jsx';
import { CONSTANTS } from '../../types/constants.js';

/**
 * Sequencer grid organism component
 * @param {Object} props - Component props
 * @param {Array<Array<string>>} props.grid - 2D array representing the sequencer grid
 * @param {number} props.bars - Number of bars
 * @param {number} props.beatsPerBar - Beats per bar
 * @param {number} props.stepsPerBar - Steps per bar
 * @param {number|null} props.currentStep - Current playing step index
 * @param {string|null} props.activeTool - Currently active tool/sample
 * @param {Function} props.onCellClick - Cell click handler
 * @param {Function} props.onAddTrack - Add track handler
 * @param {Function} props.onRemoveTrack - Remove track handler
 * @param {Object} props.scrollContainerRef - Ref for scroll container
 * @returns {JSX.Element} Sequencer grid element
 */
export function SequencerGrid({
  grid,
  bars,
  beatsPerBar,
  stepsPerBar,
  currentStep,
  activeTool,
  onCellClick,
  onAddTrack,
  onRemoveTrack,
  scrollContainerRef,
}) {
  const handleCellClick = useCallback(
    (rowIndex, stepIndex) => {
      onCellClick(rowIndex, stepIndex);
    },
    [onCellClick]
  );

  const createCellClickHandler = useCallback(
    (rowIndex, stepIndex) => {
      return () => handleCellClick(rowIndex, stepIndex);
    },
    [handleCellClick]
  );

  // Memoize handlers map - only recreate when grid structure changes
  const clickHandlers = useMemo(() => {
    const handlers = new Map();
    grid.forEach((row, rowIndex) => {
      row.forEach((_, stepIndex) => {
        const key = `${rowIndex}-${stepIndex}`;
        handlers.set(key, createCellClickHandler(rowIndex, stepIndex));
      });
    });
    return handlers;
  }, [grid, createCellClickHandler]);

  // Animation variants for track rows
  const trackRowVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  // Animation variants for bar containers
  const barVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  // Animation variants for beat containers
  const beatVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  };

  // Animation variants for grid rows
  const gridRowVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Track controls column */}
      <div className="track-controls">
        <div className="track-controls-header" />
        <div className="track-controls-content">
          <div className="flex flex-col">
            {grid.map((_, rowIndex) => (
              <motion.div
                key={rowIndex}
                className="track-row group"
                variants={trackRowVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              >
                <button
                  onClick={() => onRemoveTrack(rowIndex)}
                  className="btn-remove-track"
                  disabled={grid.length === CONSTANTS.MIN_TRACKS}
                  title="Remove track"
                  type="button"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}

            <motion.div
              className="btn-add-track-container"
              onClick={onAddTrack}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddTrack();
                }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <button
                disabled={grid.length >= CONSTANTS.MAX_TRACKS}
                className="btn-add-track"
                type="button"
              >
                <Plus size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Grid content */}
      <div ref={scrollContainerRef} className="grid-container">
        <div className="grid-content">
          {/* Header row with bar/beat markers */}
          <div className="grid-header" style={{ position: 'sticky', top: 0, zIndex: 20 }}>
            {Array(bars)
              .fill(0)
              .map((_, barIndex) => (
                <motion.div
                  key={barIndex}
                  className="bar-container"
                  variants={barVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    delay: barIndex * 0.05,
                    type: 'spring',
                    stiffness: 500,
                    damping: 35,
                  }}
                >
                  <div className="bar-label">BAR {barIndex + 1}</div>
                  {Array(beatsPerBar)
                    .fill(0)
                    .map((_, beatIndex) => (
                      <motion.div
                        key={beatIndex}
                        className="beat-container"
                        variants={beatVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                          delay: beatIndex * 0.03,
                          type: 'spring',
                          stiffness: 500,
                          damping: 35,
                        }}
                      >
                        {Array(CONSTANTS.STEPS_PER_BEAT)
                          .fill(0)
                          .map((_, stepIndex) => (
                            <div key={stepIndex} className="step-marker-container">
                              <div
                                className={`step-marker ${
                                  stepIndex === 0 ? 'step-marker-beat' : 'step-marker-sub'
                                }`}
                              />
                            </div>
                          ))}
                      </motion.div>
                    ))}
                </motion.div>
              ))}
          </div>

          {/* Grid rows */}
          {grid.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="grid-row"
              layout
              variants={gridRowVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: rowIndex * 0.03, type: 'spring', stiffness: 500, damping: 35 }}
            >
              {Array(bars)
                .fill(0)
                .map((_, barIndex) => (
                  <div key={barIndex} className="bar-cell">
                    {Array(beatsPerBar)
                      .fill(0)
                      .map((_, beatIndex) => (
                        <motion.div
                          key={beatIndex}
                          className="beat-container"
                          variants={beatVariants}
                          initial="initial"
                          animate="animate"
                          transition={{
                            delay: beatIndex * 0.02,
                            type: 'spring',
                            stiffness: 500,
                            damping: 35,
                          }}
                        >
                          {Array(CONSTANTS.STEPS_PER_BEAT)
                            .fill(0)
                            .map((_, stepIndex) => {
                              const globalStepIndex =
                                barIndex * stepsPerBar +
                                beatIndex * CONSTANTS.STEPS_PER_BEAT +
                                stepIndex;
                              if (globalStepIndex >= row.length) {
                                return null;
                              }

                              const cell = row[globalStepIndex];
                              const isActive = currentStep === globalStepIndex;
                              const handlerKey = `${rowIndex}-${globalStepIndex}`;
                              const cellClickHandler = clickHandlers.get(handlerKey);

                              return (
                                <StepCell
                                  key={globalStepIndex}
                                  value={cell}
                                  isActive={isActive}
                                  activeTool={activeTool}
                                  onClick={cellClickHandler}
                                  id={rowIndex === 0 ? `step-marker-${globalStepIndex}` : undefined}
                                />
                              );
                            })}
                        </motion.div>
                      ))}
                  </div>
                ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

SequencerGrid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  bars: PropTypes.number.isRequired,
  beatsPerBar: PropTypes.number.isRequired,
  stepsPerBar: PropTypes.number.isRequired,
  currentStep: PropTypes.number,
  activeTool: PropTypes.string,
  onCellClick: PropTypes.func.isRequired,
  onAddTrack: PropTypes.func.isRequired,
  onRemoveTrack: PropTypes.func.isRequired,
  scrollContainerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
