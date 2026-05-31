import PianoKeyboard from '../components/PianoKeyboard';
import WaveformWorkspace from '../components/WaveformWorkspace';
import {
  blackKeys,
  keyboardRange,
  waveformReadouts,
  whiteKeys,
} from '../data/keyboard';

export default function PianoWaveformPage() {
  return (
    <main className="app-shell" aria-label="Piano waveform interface">
      <WaveformWorkspace readouts={waveformReadouts} />
      <PianoKeyboard blackKeys={blackKeys} range={keyboardRange} whiteKeys={whiteKeys} />
    </main>
  );
}
