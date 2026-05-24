function getBlackKeyPosition(afterWhiteKey, whiteKeyCount) {
  return `${((afterWhiteKey + 1) / whiteKeyCount) * 100}%`;
}

export default function PianoKeyboard({ blackKeys, range, whiteKeys }) {
  return (
    <section className="keyboard-section" aria-label="Playable keyboard">
      <div className="section-head">
        <div>
          <h2>Keyboard range</h2>
          <p>Keys are intentionally unlabelled; note names remain available to assistive technology.</p>
        </div>
        <dl className="range-summary">
          <div>
            <dt>Range</dt>
            <dd>{range.first}-{range.last}</dd>
          </div>
          <div>
            <dt>Keys</dt>
            <dd>{range.whiteKeyCount + range.blackKeyCount}</dd>
          </div>
          <div>
            <dt>Input</dt>
            <dd>{range.inputMode}</dd>
          </div>
        </dl>
      </div>
      <div className="keyboard-shell">
        <div className="keybed" aria-label="Piano keys">
          <div className="white-keys">
            {whiteKeys.map((note) => (
              <button className="white-key" key={note} type="button" aria-label={note} />
            ))}
          </div>
          <div className="black-keys" aria-hidden="true">
            {blackKeys.map(({ afterWhiteKey, note }) => (
              <span
                className="black-key"
                key={note}
                style={{ left: getBlackKeyPosition(afterWhiteKey, whiteKeys.length) }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
