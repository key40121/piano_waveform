import { useEffect, useRef, useState } from 'react';

function getBlackKeyPosition(afterWhiteKey, whiteKeyCount) {
  return `${((afterWhiteKey + 1) / whiteKeyCount) * 100}%`;
}

export default function PianoKeyboard({ blackKeys, range, whiteKeys }) {
  const [pressedNote, setPressedNote] = useState(null);
  const isPointerPressing = useRef(false);

  useEffect(() => {
    function stopPointerPress() {
      isPointerPressing.current = false;
      setPressedNote(null);
    }

    window.addEventListener('pointercancel', stopPointerPress);
    window.addEventListener('pointerup', stopPointerPress);

    return () => {
      window.removeEventListener('pointercancel', stopPointerPress);
      window.removeEventListener('pointerup', stopPointerPress);
    };
  }, []);

  function startPress(note) {
    return (event) => {
      event.preventDefault();
      isPointerPressing.current = true;
      setPressedNote(note);
    };
  }

  function updatePressFromPointer(event) {
    if (!isPointerPressing.current) {
      return;
    }

    const key = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-note]');
    const note = event.currentTarget.contains(key) ? key?.dataset.note : null;

    setPressedNote(note ?? null);
  }

  function clearPressOnPointerExit() {
    if (isPointerPressing.current) {
      setPressedNote(null);
    }
  }

  function startKeyboardPress(note) {
    return (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        setPressedNote(note);
      }
    };
  }

  function stopKeyboardPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      setPressedNote(null);
    }
  }

  function clearPressOnKeyboardExit(event) {
    const keybed = event.currentTarget.closest('.keybed');

    window.setTimeout(() => {
      if (!keybed?.contains(document.activeElement)) {
        setPressedNote(null);
      }
    }, 0);
  }

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
        <div
          className="keybed"
          aria-label="Piano keys"
          onPointerLeave={clearPressOnPointerExit}
          onPointerMove={updatePressFromPointer}
        >
          <div className="white-keys" style={{ '--white-key-count': whiteKeys.length }}>
            {whiteKeys.map((note) => (
              <button
                className={`white-key ${pressedNote === note ? 'pressed' : ''}`}
                key={note}
                type="button"
                aria-label={note}
                aria-pressed={pressedNote === note}
                data-note={note}
                onBlur={clearPressOnKeyboardExit}
                onKeyDown={startKeyboardPress(note)}
                onKeyUp={stopKeyboardPress}
                onPointerDown={startPress(note)}
              />
            ))}
          </div>
          <div className="black-keys">
            {blackKeys.map(({ afterWhiteKey, note }) => (
              <button
                className={`black-key ${pressedNote === note ? 'pressed' : ''}`}
                key={note}
                type="button"
                aria-label={note}
                aria-pressed={pressedNote === note}
                data-note={note}
                onBlur={clearPressOnKeyboardExit}
                onKeyDown={startKeyboardPress(note)}
                onKeyUp={stopKeyboardPress}
                onPointerDown={startPress(note)}
                style={{ left: getBlackKeyPosition(afterWhiteKey, whiteKeys.length) }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
