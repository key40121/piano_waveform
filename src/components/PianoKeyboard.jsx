export default function PianoKeyboard({ blackKeys, whiteKeyMap, whiteKeys }) {
  return (
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
                <kbd>{whiteKeyMap[index]}</kbd>
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
  );
}
