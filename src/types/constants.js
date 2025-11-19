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
  bd: 'bg-cyan-500 border-cyan-400 text-white',
  drumtraks: 'bg-blue-600 border-blue-500 text-white',
  gretsch: 'bg-sky-600 border-sky-500 text-white',
  linnhats: 'bg-cyan-700 border-cyan-600 text-white',
  tok: 'bg-blue-500 border-blue-400 text-white',
  odx: 'bg-sky-500 border-sky-400 text-white',
  sd: 'bg-emerald-500 border-emerald-400 text-white',
  cp: 'bg-teal-500 border-teal-400 text-white',
  '808bd': 'bg-lime-600 border-lime-500 text-white',
  '808sd': 'bg-lime-500 border-lime-400 text-slate-900',
  '808oh': 'bg-yellow-400 border-yellow-300 text-yellow-950',
  '808cy': 'bg-amber-400 border-amber-300 text-amber-950',
  '808hc': 'bg-orange-400 border-orange-300 text-white',
  '808ht': 'bg-orange-500 border-orange-400 text-white',
  '808lc': 'bg-yellow-600 border-yellow-500 text-white',
  '808mc': 'bg-amber-600 border-amber-500 text-white',
  bass: 'bg-purple-500 border-purple-400 text-white',
  jungbass: 'bg-fuchsia-700 border-fuchsia-600 text-white',
  arpy: 'bg-violet-500 border-violet-400 text-white',
  house: 'bg-fuchsia-500 border-fuchsia-400 text-white',
  techno: 'bg-pink-500 border-pink-400 text-white',
  moog: 'bg-purple-700 border-purple-600 text-white',
  juno: 'bg-indigo-500 border-indigo-400 text-white',
  sax: 'bg-pink-600 border-pink-500 text-white',
  sitar: 'bg-rose-400 border-rose-300 text-rose-950',
  casio: 'bg-violet-400 border-violet-300 text-violet-950',
  gabbaloud: 'bg-red-600 border-red-500 text-white',
  glitch: 'bg-red-500 border-red-400 text-white',
  metal: 'bg-zinc-500 border-zinc-400 text-white',
  can: 'bg-stone-500 border-stone-400 text-white',
  bottle: 'bg-emerald-700 border-emerald-600 text-white',
  wind: 'bg-slate-500 border-slate-400 text-white',
  rave: 'bg-rose-600 border-rose-500 text-white',
  toys: 'bg-amber-500 border-amber-400 text-white',
  industrial: 'bg-slate-600 border-slate-500 text-white',
  print: 'bg-stone-400 border-stone-300 text-stone-900',
  amencutup: 'bg-orange-600 border-orange-500 text-white',
  hh: 'bg-yellow-400 border-yellow-300 text-yellow-950',
};
