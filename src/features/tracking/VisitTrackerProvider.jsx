import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DESTINATION_KEYS } from '../../content/story-map.config';

const STORAGE_KEY_VISITED = 'portifilio:visited';
const STORAGE_KEY_NAME = 'portifilio:name';

function loadVisited() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISITED);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveVisited(set) {
  try {
    localStorage.setItem(STORAGE_KEY_VISITED, JSON.stringify([...set]));
  } catch {}
}

function loadName() {
  try {
    return localStorage.getItem(STORAGE_KEY_NAME) || '';
  } catch {
    return '';
  }
}

function saveName(name) {
  try {
    if (name) localStorage.setItem(STORAGE_KEY_NAME, name);
    else localStorage.removeItem(STORAGE_KEY_NAME);
  } catch {}
}

const VisitTrackerContext = createContext(null);

export function VisitTrackerProvider({ children }) {
  const [visited, setVisited] = useState(loadVisited);
  const [playerName, setPlayerNameState] = useState(loadName);

  useEffect(() => {
    saveVisited(visited);
  }, [visited]);

  useEffect(() => {
    saveName(playerName);
  }, [playerName]);

  const markDestinationVisited = useCallback((destinationKey) => {
    if (!destinationKey) return;
    setVisited((prev) => {
      if (prev.has(destinationKey)) return prev;
      const next = new Set(prev);
      next.add(destinationKey);
      return next;
    });
  }, []);

  const setPlayerName = useCallback((name) => {
    setPlayerNameState(name || '');
  }, []);

  const resetPlayer = useCallback(() => {
    setPlayerNameState('');
    setVisited(new Set());
  }, []);

  const getRandomUnvisited = useCallback(() => {
    const unvisited = DESTINATION_KEYS.filter((k) => !visited.has(k));
    if (unvisited.length === 0) return null;
    return unvisited[Math.floor(Math.random() * unvisited.length)];
  }, [visited]);

  const value = useMemo(() => ({
    visitedDestinations: visited,
    totalVisited: visited.size,
    totalDestinations: DESTINATION_KEYS.length,
    destinationKeys: DESTINATION_KEYS,
    allVisited: visited.size >= DESTINATION_KEYS.length,
    hasSignal: visited.size >= 3,
    isReturningVisitor: !!playerName,
    playerName,
    markDestinationVisited,
    setPlayerName,
    resetPlayer,
    getRandomUnvisited,
  }), [visited, playerName, markDestinationVisited, setPlayerName, resetPlayer, getRandomUnvisited]);

  return (
    <VisitTrackerContext.Provider value={value}>
      {children}
    </VisitTrackerContext.Provider>
  );
}

export function useVisitTracker() {
  const ctx = useContext(VisitTrackerContext);
  if (!ctx) throw new Error('useVisitTracker must be used within VisitTrackerProvider');
  return ctx;
}
