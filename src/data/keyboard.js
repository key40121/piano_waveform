export const whiteKeys = [
  'C3',
  'D3',
  'E3',
  'F3',
  'G3',
  'A3',
  'B3',
  'C4',
  'D4',
  'E4',
  'F4',
  'G4',
  'A4',
  'B4',
  'C5',
  'D5',
  'E5',
  'F5',
  'G5',
  'A5',
  'B5',
  'C6',
];

export const blackKeys = [
  { note: 'C#3', afterWhiteKey: 0 },
  { note: 'D#3', afterWhiteKey: 1 },
  { note: 'F#3', afterWhiteKey: 3 },
  { note: 'G#3', afterWhiteKey: 4 },
  { note: 'A#3', afterWhiteKey: 5 },
  { note: 'C#4', afterWhiteKey: 7 },
  { note: 'D#4', afterWhiteKey: 8 },
  { note: 'F#4', afterWhiteKey: 10 },
  { note: 'G#4', afterWhiteKey: 11 },
  { note: 'A#4', afterWhiteKey: 12 },
  { note: 'C#5', afterWhiteKey: 14 },
  { note: 'D#5', afterWhiteKey: 15 },
  { note: 'F#5', afterWhiteKey: 17 },
  { note: 'G#5', afterWhiteKey: 18 },
  { note: 'A#5', afterWhiteKey: 19 },
];

export const instrumentMeters = [
  { label: 'Selected note', value: 'None', tone: 'muted' },
  { label: 'Frequency', value: '-- Hz', tone: 'muted' },
  { label: 'Input source', value: 'Mouse / keyboard', tone: 'ready' },
  { label: 'Waveform buffer', value: 'Idle', tone: 'muted' },
];

export const transportStatus = [
  { label: 'Audio context', value: 'Pending gesture', state: 'warning' },
  { label: 'Keyboard listener', value: 'Planned', state: 'idle' },
  { label: 'Pointer input', value: 'Planned', state: 'idle' },
  { label: 'Analyzer node', value: 'Not attached', state: 'error' },
];

export const waveformReadouts = [
  { label: 'Window', value: '120 ms' },
  { label: 'Sample rate', value: '44.1 kHz' },
  { label: 'Resolution', value: '2048 samples' },
];

export const keyboardRange = {
  first: 'C3',
  last: 'C6',
  whiteKeyCount: whiteKeys.length,
  blackKeyCount: blackKeys.length,
  inputMode: 'Mouse / computer keyboard',
};

export const setupChecklist = [
  'Create oscillator per selected note',
  'Attach keyboard and pointer handlers',
  'Route analyzer output into waveform view',
];
