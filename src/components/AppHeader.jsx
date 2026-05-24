export default function AppHeader() {
  return (
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
  );
}
