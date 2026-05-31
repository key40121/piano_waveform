import { useCallback, useEffect, useRef } from 'react';
import { getNoteFrequency } from '../lib/noteFrequency';

const attackSeconds = 0.008;
const releaseSeconds = 0.07;
const sustainGain = 0.12;

function createAudioContext() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  return AudioContextConstructor ? new AudioContextConstructor() : null;
}

export default function usePianoAudio() {
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const voiceRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    if (!audioContextRef.current) {
      const context = createAudioContext();

      if (!context) {
        return null;
      }

      const masterGain = context.createGain();
      masterGain.gain.value = 0.65;
      masterGain.connect(context.destination);

      audioContextRef.current = context;
      masterGainRef.current = masterGain;
    }

    if (audioContextRef.current.state === 'suspended') {
      void audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }, []);

  const releaseVoice = useCallback((voice) => {
    if (!voice) {
      return;
    }

    const now = voice.context.currentTime;
    const stopAt = now + releaseSeconds + 0.02;

    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setValueAtTime(Math.max(voice.gain.gain.value, 0.0001), now);
    voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + releaseSeconds);
    voice.oscillators.forEach((oscillator) => oscillator.stop(stopAt));
  }, []);

  const stopNote = useCallback(() => {
    releaseVoice(voiceRef.current);
    voiceRef.current = null;
  }, [releaseVoice]);

  const playNote = useCallback(
    (note) => {
      if (voiceRef.current?.note === note) {
        return;
      }

      const context = getAudioContext();

      if (!context || !masterGainRef.current) {
        return;
      }

      releaseVoice(voiceRef.current);

      const frequency = getNoteFrequency(note);
      const now = context.currentTime;
      const noteGain = context.createGain();
      const bodyOscillator = context.createOscillator();
      const overtoneOscillator = context.createOscillator();
      const overtoneGain = context.createGain();

      bodyOscillator.type = 'triangle';
      bodyOscillator.frequency.setValueAtTime(frequency, now);

      overtoneOscillator.type = 'sine';
      overtoneOscillator.frequency.setValueAtTime(frequency * 2, now);
      overtoneGain.gain.setValueAtTime(0.18, now);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(sustainGain, now + attackSeconds);
      noteGain.gain.exponentialRampToValueAtTime(sustainGain * 0.74, now + 0.12);

      bodyOscillator.connect(noteGain);
      overtoneOscillator.connect(overtoneGain);
      overtoneGain.connect(noteGain);
      noteGain.connect(masterGainRef.current);

      bodyOscillator.start(now);
      overtoneOscillator.start(now);

      voiceRef.current = {
        context,
        gain: noteGain,
        note,
        oscillators: [bodyOscillator, overtoneOscillator],
      };
    },
    [getAudioContext, releaseVoice],
  );

  useEffect(() => {
    return () => {
      releaseVoice(voiceRef.current);
      void audioContextRef.current?.close();
    };
  }, [releaseVoice]);

  return { playNote, stopNote };
}
