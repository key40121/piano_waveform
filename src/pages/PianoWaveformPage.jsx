import AppHeader from '../components/AppHeader';
import MetricsGrid from '../components/MetricsGrid';
import PianoKeyboard from '../components/PianoKeyboard';
import WaveformWorkspace from '../components/WaveformWorkspace';
import {
  blackKeys,
  instrumentMeters,
  keyboardRange,
  setupChecklist,
  transportStatus,
  waveformReadouts,
  whiteKeys,
} from '../data/keyboard';

export default function PianoWaveformPage() {
  return (
    <main className="app-shell" aria-label="Piano waveform interface">
      <AppHeader />
      <MetricsGrid meters={instrumentMeters} />
      <WaveformWorkspace
        readouts={waveformReadouts}
        setupChecklist={setupChecklist}
        transportStatus={transportStatus}
      />
      <PianoKeyboard blackKeys={blackKeys} range={keyboardRange} whiteKeys={whiteKeys} />
    </main>
  );
}
