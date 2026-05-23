import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const whiteKeys = [
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

const blackKeys = [
  { note: 'C#3', key: 'W', left: 3.7 },
  { note: 'D#3', key: 'E', left: 8.3 },
  { note: 'F#3', key: 'T', left: 17.4 },
  { note: 'G#3', key: 'Y', left: 22 },
  { note: 'A#3', key: 'U', left: 26.6 },
  { note: 'C#4', key: 'O', left: 35.5 },
  { note: 'D#4', key: 'P', left: 40.1 },
  { note: 'F#4', key: ']', left: 49.2 },
  { note: 'G#4', key: '\\', left: 53.8 },
  { note: 'A#4', key: '-', left: 58.4 },
  { note: 'C#5', key: '=', left: 67.4 },
  { note: 'D#5', key: '7', left: 72 },
  { note: 'F#5', key: '9', left: 81 },
  { note: 'G#5', key: '0', left: 85.6 },
  { note: 'A#5', key: 'Backspace', left: 90.2 },
];

const keyMap = [
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  ';',
  "'",
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
  ',',
  '.',
  '/',
  'Shift',
];

const meters = [
  { label: 'Selected note', value: 'None' },
  { label: 'Frequency', value: '-- Hz' },
  { label: 'Velocity', value: '--' },
  { label: 'Input source', value: 'Mouse / keyboard' },
  { label: 'Audio engine', value: 'Not connected' },
  { label: 'Waveform', value: 'Idle' },
];

function App() {
  return (
    <main className="app-shell" aria-label="Piano waveform interface">
      <header className="topbar">
        <div>
          <h1>Piano Waveform</h1>
          <p className="header-copy">Browser keyboard instrument with per-note waveform inspection.</p>
        </div>
        <nav className="mode-tabs" aria-label="Workspace modes">
          <button className="mode-tab active" type="button">Keyboard</button>
          <button className="mode-tab" type="button">Waveform</button>
          <button className="mode-tab" type="button">Settings</button>
        </nav>
      </header>

      <section className="metrics-grid" aria-label="Current instrument state">
        {meters.map((meter) => (
          <div className="metric" key={meter.label}>
            <span>{meter.label}</span>
            <strong>{meter.value}</strong>
          </div>
        ))}
      </section>

      <section className="workspace" aria-label="Waveform workspace">
        <section className="waveform-panel" aria-label="Waveform preview">
          <div className="panel-head">
            <div>
              <h2>Waveform</h2>
              <p>No note selected. The display will remain empty until input is wired.</p>
            </div>
            <dl className="readout-list">
              <div>
                <dt>Window</dt>
                <dd>120 ms</dd>
              </div>
              <div>
                <dt>Sample rate</dt>
                <dd>44.1 kHz</dd>
              </div>
            </dl>
          </div>

          <div className="waveform-empty" aria-label="Empty waveform graph">
            <span className="axis-label y-label">Amplitude</span>
            <span className="axis-label x-label">Time</span>
            <div className="baseline" />
            <p>Waiting for note input</p>
          </div>
        </section>

        <aside className="event-panel" aria-label="Input events">
          <div className="panel-head compact">
            <h2>Input events</h2>
            <span className="quiet-value">0 active</span>
          </div>
          <div className="empty-log">
            <strong>No events yet</strong>
            <p>Mouse clicks and computer-key presses will appear here after input handling is implemented.</p>
          </div>
        </aside>
      </section>

      <section className="keyboard-section" aria-label="Playable keyboard">
        <div className="section-head">
          <h2>Keyboard range</h2>
          <p>Click or press mapped keys once audio input is connected.</p>
        </div>
        <div className="keyboard-shell">
          <div className="keybed" aria-label="Piano keys">
            <div className="white-keys">
              {whiteKeys.map((note, index) => (
                <button className="white-key" key={note} type="button" aria-label={note}>
                  <span>{note}</span>
                  <kbd>{keyMap[index]}</kbd>
                </button>
              ))}
            </div>
            <div className="black-keys" aria-hidden="true">
              {blackKeys.map(({ note, key, left }) => (
                <span className="black-key" key={note} style={{ left: `${left}%` }}>
                  <span>{note}</span>
                  <kbd>{key}</kbd>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
