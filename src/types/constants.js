/**
 * Application-wide constants
 * @module types/constants
 */

/**
 * Sequencer timing and configuration constants
 * @constant {Object}
 */
export const CONSTANTS = {
  /** Number of steps per beat (16th notes) */
  STEPS_PER_BEAT: 4,
  /** Default number of bars */
  DEFAULT_BARS: 2,
  /** Default BPM */
  DEFAULT_BPM: 120,
  /** Default beats per bar (4/4 time) */
  DEFAULT_BEATS: 4,
  /** Scroll padding for auto-scroll behavior */
  SCROLL_PADDING: 64,
  /** Minimum number of bars */
  MIN_BARS: 1,
  /** Maximum number of bars */
  MAX_BARS: 16,
  /** Minimum beats per bar */
  MIN_BEATS: 2,
  /** Maximum beats per bar */
  MAX_BEATS: 7,
  /** Minimum BPM */
  MIN_BPM: 40,
  /** Maximum BPM */
  MAX_BPM: 300,
  /** BPM increment/decrement step */
  BPM_STEP: 5,
  /** Maximum number of tracks */
  MAX_TRACKS: 8,
  /** Minimum number of tracks */
  MIN_TRACKS: 1,
};

/**
 * Sample library categories with icons and items
 * @constant {Object}
 */
export const SAMPLE_CATEGORIES = {
  'Core Drums': {
    icon: 'Drum',
    items: [
      { id: 'bd', name: 'Kick' },
      { id: 'sd', name: 'Snare' },
      { id: 'hh', name: 'Hi-Hat' },
      { id: 'cp', name: 'Clap' },
      { id: 'drumtraks', name: 'Retro Kit' },
      { id: 'gretsch', name: 'Acoustic' },
      { id: 'linnhats', name: 'Linn Hats' },
      { id: 'tok', name: 'Tok Kick' },
      { id: 'odx', name: 'New Order' },
    ],
  },
  '808 Kit': {
    icon: 'Disc',
    items: [
      { id: '808bd', name: 'Kick' },
      { id: '808sd', name: 'Snare' },
      { id: '808oh', name: 'Open' },
      { id: '808cy', name: 'Cym' },
      { id: '808hc', name: 'HiCon' },
      { id: '808lc', name: 'LoCon' },
      { id: '808ht', name: 'HiTom' },
      { id: '808mc', name: 'MidCon' },
    ],
  },
  Instruments: {
    icon: 'Music',
    items: [
      { id: 'bass', name: 'Bass Hit' },
      { id: 'jungbass', name: 'Jungle Bass' },
      { id: 'arpy', name: 'Arpy' },
      { id: 'house', name: 'House Synth' },
      { id: 'techno', name: 'Techno' },
      { id: 'moog', name: 'Moog' },
      { id: 'juno', name: 'Juno Pad' },
      { id: 'sax', name: 'Sax' },
      { id: 'sitar', name: 'Sitar' },
      { id: 'casio', name: 'Casio' },
    ],
  },
  'FX & Percussion': {
    icon: 'Zap',
    items: [
      { id: 'gabbaloud', name: 'Gabba' },
      { id: 'glitch', name: 'Glitch' },
      { id: 'metal', name: 'Metal' },
      { id: 'can', name: 'Can' },
      { id: 'bottle', name: 'Bottle' },
      { id: 'wind', name: 'Wind' },
      { id: 'rave', name: 'Rave Vox' },
      { id: 'toys', name: 'Toys' },
      { id: 'industrial', name: 'Industrial' },
      { id: 'print', name: 'Printer' },
      { id: 'amencutup', name: 'Amen Chop' },
    ],
  },
};

/**
 * Color mapping for sample types
 * @constant {Object<string, string>}
 */
export const COLOR_MAP = {
  // --- CORE DRUMS (distinct cool tones) ---
  bd: 'bg-cyan-600 border-cyan-500 text-white',
  sd: 'bg-emerald-600 border-emerald-500 text-white',
  hh: 'bg-blue-400 border-blue-300 text-blue-950',
  cp: 'bg-teal-500 border-teal-400 text-white',
  drumtraks: 'bg-indigo-500 border-indigo-400 text-white',
  gretsch: 'bg-sky-600 border-sky-500 text-white',
  linnhats: 'bg-cyan-800 border-cyan-700 text-white',
  tok: 'bg-blue-700 border-blue-600 text-white',
  odx: 'bg-blue-500 border-blue-400 text-white',

  // --- 808 KIT (bright yellows/oranges with spacing) ---
  '808bd': 'bg-lime-600 border-lime-500 text-white',
  '808sd': 'bg-yellow-500 border-yellow-400 text-yellow-950',
  '808oh': 'bg-amber-400 border-amber-300 text-amber-950',
  '808cy': 'bg-orange-400 border-orange-300 text-white',
  '808hc': 'bg-amber-600 border-amber-500 text-white',
  '808ht': 'bg-orange-500 border-orange-400 text-white',
  '808lc': 'bg-yellow-600 border-yellow-500 text-white',
  '808mc': 'bg-orange-700 border-orange-600 text-white',

  // --- INSTRUMENTS (clear purple spectrum separation) ---
  bass: 'bg-purple-600 border-purple-500 text-white',
  jungbass: 'bg-fuchsia-700 border-fuchsia-600 text-white',
  arpy: 'bg-violet-500 border-violet-400 text-white',
  house: 'bg-pink-500 border-pink-400 text-white',
  techno: 'bg-rose-500 border-rose-400 text-white',
  moog: 'bg-purple-800 border-purple-700 text-white',
  juno: 'bg-indigo-600 border-indigo-500 text-white',
  sax: 'bg-pink-700 border-pink-600 text-white',
  sitar: 'bg-rose-400 border-rose-300 text-rose-950',
  casio: 'bg-fuchsia-400 border-fuchsia-300 text-fuchsia-950',

  // --- FX & PERC (reds + neutrals spaced out) ---
  gabbaloud: 'bg-red-700 border-red-600 text-white',
  glitch: 'bg-red-500 border-red-400 text-white',
  metal: 'bg-zinc-600 border-zinc-500 text-white',
  can: 'bg-stone-600 border-stone-500 text-white',
  bottle: 'bg-green-700 border-green-600 text-white',
  wind: 'bg-slate-500 border-slate-400 text-white',
  rave: 'bg-rose-700 border-rose-600 text-white',
  toys: 'bg-amber-500 border-amber-400 text-white',
  industrial: 'bg-gray-700 border-gray-600 text-white',
  print: 'bg-stone-400 border-stone-300 text-stone-900',
  amencutup: 'bg-orange-700 border-orange-600 text-white',
};
