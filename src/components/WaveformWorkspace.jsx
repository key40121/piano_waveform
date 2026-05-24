export default function WaveformWorkspace() {
  return (
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
  );
}
