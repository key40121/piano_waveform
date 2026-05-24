const octaves = [2, 3, 4, 5, 6];
const whiteNoteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackNotePositions = [
  { name: 'C#', afterWhiteOffset: 0 },
  { name: 'D#', afterWhiteOffset: 1 },
  { name: 'F#', afterWhiteOffset: 3 },
  { name: 'G#', afterWhiteOffset: 4 },
  { name: 'A#', afterWhiteOffset: 5 },
];

export const whiteKeys = [
  ...octaves.flatMap((octave) => whiteNoteNames.map((name) => `${name}${octave}`)),
  'C7',
];

export const blackKeys = octaves.flatMap((octave, octaveIndex) =>
  blackNotePositions.map(({ afterWhiteOffset, name }) => ({
    note: `${name}${octave}`,
    afterWhiteKey: octaveIndex * whiteNoteNames.length + afterWhiteOffset,
  })),
);

export const waveformReadouts = [
  { label: 'Window', value: '120 ms' },
  { label: 'Sample rate', value: '44.1 kHz' },
  { label: 'Resolution', value: '2048 samples' },
];

export const keyboardRange = {
  first: 'C2',
  last: 'C7',
  whiteKeyCount: whiteKeys.length,
  blackKeyCount: blackKeys.length,
  inputMode: 'Mouse / computer keyboard',
};
