import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import musicSrc from '../../assets/Galactic Odyssey (Loop).mp3';

const AudioCtx = createContext(null);

const MUSIC_VOLUME = 0.55;

export function AudioProvider({ children }) {
  const musicRef = useRef(null);
  const enabledRef = useRef(true);

  const [enabled, setEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem('audioEnabled');
      const val = stored !== 'false';
      enabledRef.current = val;
      return val;
    } catch {
      return true;
    }
  });

  // Keep ref in sync with state (ref is needed for event handlers)
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  // Create the music element once on mount, tear it down on unmount
  useEffect(() => {
    const el = new Audio(musicSrc);
    el.loop = true;
    el.volume = MUSIC_VOLUME;
    el.preload = 'auto';
    musicRef.current = el;
    return () => {
      el.pause();
      el.src = '';
      musicRef.current = null;
    };
  }, []);

  // Auto-start music on first user gesture when enabled.
  // Runs once and stays mounted for the app lifetime.
  useEffect(() => {
    const tryStart = () => {
      const music = musicRef.current;
      if (!music || !enabledRef.current || !music.paused) return;
      music.volume = MUSIC_VOLUME;
      music.play().catch(() => {});
    };

    // Try immediately (works if browser already has gesture permission)
    tryStart();

    window.addEventListener('pointerdown', tryStart);
    window.addEventListener('keydown', tryStart);
    return () => {
      window.removeEventListener('pointerdown', tryStart);
      window.removeEventListener('keydown', tryStart);
    };
  }, []);

  // Toggle: called directly from a click handler, so audio.play() is
  // inside a user-gesture context and won't be blocked by the browser.
  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    try { localStorage.setItem('audioEnabled', String(next)); } catch {}

    const music = musicRef.current;
    if (!music) return;

    if (next) {
      music.volume = MUSIC_VOLUME;
      music.play().catch(() => {});
    } else {
      music.pause();
    }
  }, []);

  // Play a one-shot SFX through any <audio> element.
  // Uses the ref so the callback is stable and never stale.
  const playSfx = useCallback((audioEl, vol = 0.14) => {
    if (!enabledRef.current || !audioEl) return;
    try {
      audioEl.currentTime = 0;
      audioEl.volume = vol;
      audioEl.play().catch(() => {});
    } catch {}
  }, []);

  const value = useMemo(() => ({ enabled, toggle, playSfx }), [enabled, toggle, playSfx]);

  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>;
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be inside AudioProvider');
  return ctx;
}
