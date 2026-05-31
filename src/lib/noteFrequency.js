const semitoneByNote = {
  C: 0,
  'C#': 1,
  D: 2,
  'D#': 3,
  E: 4,
  F: 5,
  'F#': 6,
  G: 7,
  'G#': 8,
  A: 9,
  'A#': 10,
  B: 11,
};

export function getNoteFrequency(note) {
  const match = note.match(/^([A-G]#?)(-?\d+)$/);

  if (!match) {
    throw new Error(`Invalid note: ${note}`);
  }

  const [, noteName, octaveText] = match;
  const midiNote = (Number(octaveText) + 1) * 12 + semitoneByNote[noteName];

  return 440 * 2 ** ((midiNote - 69) / 12);
}
