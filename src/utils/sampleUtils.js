/**
 * Sample utility functions
 * @module utils/sampleUtils
 */

import { COLOR_MAP, SAMPLE_CATEGORIES } from '../types/constants.js';

/**
 * Get the Tailwind CSS classes for a sample based on its name
 * @param {string} name - The sample ID or name
 * @returns {string} Tailwind CSS classes for styling
 */
export function getSampleStyle(name) {
  if (name === '-') {
    return 'bg-white/5 border-white/5 hover:bg-white/10';
  }
  return COLOR_MAP[name] || 'bg-slate-600 border-slate-500 text-white';
}

/**
 * Get the display name for a sample ID
 * @param {string} id - The sample ID
 * @returns {string} The display name of the sample
 */
export function getSampleName(id) {
  for (const category in SAMPLE_CATEGORIES) {
    const item = SAMPLE_CATEGORIES[category].items.find((i) => i.id === id);
    if (item) {
      return item.name;
    }
  }
  return id;
}
