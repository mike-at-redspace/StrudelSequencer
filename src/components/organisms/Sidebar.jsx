/**
 * Sidebar component with sample library
 * @module components/organisms/Sidebar
 */

import PropTypes from 'prop-types';
import { Drum, Disc, Music, Zap } from 'lucide-react';
import { SAMPLE_CATEGORIES } from '../../types/constants.js';
import { SampleButton } from '../molecules/SampleButton.jsx';

const ICON_MAP = {
  Drum,
  Disc,
  Music,
  Zap,
};

/**
 * Sidebar organism component
 * @param {Object} props - Component props
 * @param {string|null} props.activeTool - Currently active tool/sample ID
 * @param {Function} props.setActiveTool - Function to set active tool
 * @returns {JSX.Element} Sidebar element
 */
export function Sidebar({ activeTool, setActiveTool }) {
  const handleSampleClick = (sampleId) => {
    setActiveTool(activeTool === sampleId ? null : sampleId);
  };

  return (
    <aside className="w-64 flex-none panel-glass border-r flex flex-col z-30">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Library</h2>
        <p className="sidebar-subtitle">Select a sample → click timeline</p>
      </div>

      <div className="sidebar-content">
        {Object.entries(SAMPLE_CATEGORIES).map(([category, { icon, items }]) => {
          const IconComponent = ICON_MAP[icon];
          return (
            <div key={category}>
              <h3 className="category-title">
                {IconComponent && <IconComponent size={16} />}
                {category}
              </h3>
              <div className="category-grid">
                {items.map((sample) => (
                  <SampleButton
                    key={sample.id}
                    sampleId={sample.id}
                    sampleName={sample.name}
                    isActive={activeTool === sample.id}
                    onClick={() => handleSampleClick(sample.id)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  activeTool: PropTypes.string,
  setActiveTool: PropTypes.func.isRequired,
};
