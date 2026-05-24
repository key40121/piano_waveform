const gridColumns = Array.from({ length: 12 }, (_, index) => index);
const gridRows = Array.from({ length: 6 }, (_, index) => index);

export default function WaveformWorkspace({ readouts, setupChecklist, transportStatus }) {
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

      <aside className="inspector-panel" aria-label="Input and audio inspector">
        <div className="panel-head compact">
          <h2>Inspector</h2>
          <span className="quiet-value">0 events</span>
        </div>

        <div className="status-list" aria-label="Implementation status">
          {transportStatus.map((item) => (
            <div className="status-row" key={item.label}>
              <span className={`status-mark ${item.state}`} />
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="empty-log">
          <strong>Input log is empty</strong>
          <p>Note-on, note-off, and source events will appear here once handlers are connected.</p>
        </div>

        <div className="checklist" aria-label="Next implementation steps">
          <h3>Next wiring</h3>
          <ol>
            {setupChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </aside>
    </section>
  );
}
