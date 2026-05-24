export default function PianoKeyboard({ blackKeys, whiteKeys }) {
  return (
    <section className="keyboard-section" aria-label="Playable keyboard">
      <div className="section-head">
        <h2>Keyboard range</h2>
        <p>Click or press mapped keys once audio input is connected.</p>
      </div>
      <div className="keyboard-shell">
        <div className="keybed" aria-label="Piano keys">
          <div className="white-keys">
            {whiteKeys.map((note) => (
              <button className="white-key" key={note} type="button" aria-label={note} />
            ))}
          </div>
          <div className="black-keys" aria-hidden="true">
            {blackKeys.map(({ note, left }) => (
              <span className="black-key" key={note} style={{ left: `${left}%` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
