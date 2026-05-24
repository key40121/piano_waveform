export default function AppHeader() {
  return (
    <header className="topbar">
      <div>
        <h1>Piano Waveform</h1>
        <p className="header-copy">Inspect note input and waveform output for the browser piano.</p>
      </div>
      <div className="session-state" aria-label="Session state">
        <span className="state-dot" />
        <span>Prototype wiring pending</span>
      </div>
    </header>
  );
}
