import { useEffect, useRef, useState } from 'react';
import usePianoAudio from '../hooks/usePianoAudio';

const whiteKeyGapPx = 1;
const minimumWhiteKeyWidthPx = 24;

function getBlackKeyPosition(afterWhiteKey, whiteKeyCount) {
  const gapsWidth = (whiteKeyCount - 1) * whiteKeyGapPx;
  const keyWidth = `(100% - ${gapsWidth}px) / ${whiteKeyCount}`;
  const keyEnd = `${afterWhiteKey + 1} * (${keyWidth})`;
  const gapCenter = afterWhiteKey * whiteKeyGapPx + whiteKeyGapPx / 2;

  return `calc(${keyEnd} + ${gapCenter}px)`;
}

function getKeyboardTrackMinWidth(whiteKeyCount) {
  const totalKeyWidth = whiteKeyCount * minimumWhiteKeyWidthPx;
  const totalGapWidth = (whiteKeyCount - 1) * whiteKeyGapPx;

  return `${totalKeyWidth + totalGapWidth}px`;
}

export default function PianoKeyboard({ blackKeys, range, whiteKeys }) {
  const [pressedNote, setPressedNote] = useState(null);
  const isPointerPressing = useRef(false);
  const { playNote, stopNote } = usePianoAudio();

  useEffect(() => {
    function stopPointerPress() {
      isPointerPressing.current = false;
      setPressedNote(null);
      stopNote();
    }

    window.addEventListener('pointercancel', stopPointerPress);
    window.addEventListener('pointerup', stopPointerPress);

    return () => {
      window.removeEventListener('pointercancel', stopPointerPress);
      window.removeEventListener('pointerup', stopPointerPress);
    };
  }, [stopNote]);

  function startPress(note) {
    return (event) => {
      event.preventDefault();
      isPointerPressing.current = true;
      setPressedNote(note);
      playNote(note);
    };
  }

  function updatePressFromPointer(event) {
    if (!isPointerPressing.current) {
      return;
    }

    const key = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-note]');
    const note = event.currentTarget.contains(key) ? key?.dataset.note : null;

    setPressedNote(note ?? null);

    if (note) {
      playNote(note);
    } else {
      stopNote();
    }
  }

  function clearPressOnPointerExit() {
    if (isPointerPressing.current) {
      setPressedNote(null);
      stopNote();
    }
  }

  function startKeyboardPress(note) {
    return (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setPressedNote(note);
        playNote(note);
      }
    };
  }

  function stopKeyboardPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      setPressedNote(null);
      stopNote();
    }
  }

  function clearPressOnKeyboardExit(event) {
    const keybed = event.currentTarget.closest('.keybed');

    window.setTimeout(() => {
      if (!keybed?.contains(document.activeElement)) {
        setPressedNote(null);
        stopNote();
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
          <div
            className="keyboard-track"
            style={{
              '--keyboard-track-min-width': getKeyboardTrackMinWidth(whiteKeys.length),
              '--white-key-count': whiteKeys.length,
            }}
          >
            <div className="white-keys">
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
      </div>
    </section>
  );
}
