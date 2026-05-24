const gridColumns = Array.from({ length: 12 }, (_, index) => index);
const gridRows = Array.from({ length: 6 }, (_, index) => index);

export default function WaveformWorkspace({ readouts }) {
  return (
    <section className="workspace" aria-label="Waveform workspace">
      <section className="waveform-panel" aria-label="Waveform preview">
        <div className="panel-head">
          <div>
            <h2>Waveform</h2>
            <p>Empty until a note event is routed into the analyzer.</p>
          </div>
          <dl className="readout-list">
            {readouts.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="waveform-empty" aria-label="Empty waveform graph">
          <div className="plot-grid" aria-hidden="true">
            {gridColumns.map((line) => (
              <span
                className="grid-line vertical"
                key={`column-${line}`}
                style={{ left: `${((line + 1) / (gridColumns.length + 1)) * 100}%` }}
              />
            ))}
            {gridRows.map((line) => (
              <span
                className="grid-line horizontal"
                key={`row-${line}`}
                style={{ top: `${((line + 1) / (gridRows.length + 1)) * 100}%` }}
              />
            ))}
          </div>
          <span className="axis-label y-label">Amplitude</span>
          <span className="axis-label x-label">Time</span>
          <div className="baseline" />
          <div className="empty-message">
            <strong>No waveform data</strong>
            <p>Selecting a piano key will populate this plot after audio routing is implemented.</p>
          </div>
        </div>
      </section>
    </section>
  );
}
