import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './GuideCharacter.css';
import standingImg from '../../assets/standing_transparent_bg_Looking_left.png';
import guideScripts from './guideScripts';

function GuideCharacter({ page, enabled = true, eventKey = '', eventNonce = 0 }) {
  const script = guideScripts[page];
  const boxRef = useRef(null);
  const timersRef = useRef([]);
  const initialShownRef = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [panels, setPanels] = useState([]);
  const [panelIndex, setPanelIndex] = useState(0);
  const [reacting, setReacting] = useState(false);

  const currentPanel = useMemo(() => panels[panelIndex] ?? '', [panels, panelIndex]);

  const clearTimers = () => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  };

  const showPanels = (nextPanels, autoHideMs, panelMs) => {
    if (!nextPanels || nextPanels.length === 0) return;
    clearTimers();
    setPanels(nextPanels);
    setPanelIndex(0);
    setDialogueVisible(true);

    for (let i = 1; i < nextPanels.length; i += 1) {
      timersRef.current.push(
        window.setTimeout(() => setPanelIndex(i), i * panelMs)
      );
    }

    timersRef.current.push(
      window.setTimeout(() => setDialogueVisible(false), autoHideMs)
    );
  };

  useEffect(() => {
    if (!enabled || !script) return undefined;

    setIsVisible(true);
    if (!initialShownRef.current) {
      initialShownRef.current = true;
      showPanels(
        script.initialPanels,
        script.autoHideMs ?? 8000,
        script.panelMs ?? 2400
      );
    }

    return () => clearTimers();
  }, [enabled, page, script]);

  useEffect(() => {
    if (!enabled || !script || page !== 'projects') return;
    if (!eventKey || !eventNonce) return;

    const contextualPanels =
      script.projectPanels?.[eventKey] ?? ['This one started as an experiment.', 'It escalated quickly.'];
    setReacting(true);
    timersRef.current.push(window.setTimeout(() => setReacting(false), 420));
    showPanels(contextualPanels, 5200, 2200);
  }, [enabled, eventKey, eventNonce, page, script]);

  useEffect(() => {
    if (!enabled || !dialogueVisible) return undefined;

    const onPointerDown = (event) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(event.target)) {
        setDialogueVisible(false);
        clearTimers();
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [dialogueVisible, enabled]);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  if (!enabled || !script || !isVisible) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="guide-shell" aria-live="polite">
      <div className={`guide-avatar${reacting ? ' guide-avatar-react' : ''}`}>
        <img src={standingImg} alt="Joshua guide character" />
      </div>

      {dialogueVisible && currentPanel && (
        <div ref={boxRef} className="guide-dialogue-box" role="dialog" aria-label="Guide commentary">
          <button
            type="button"
            className="guide-dismiss-button"
            onClick={() => {
              setDialogueVisible(false);
              clearTimers();
            }}
            aria-label="Dismiss guide message"
          >
            x
          </button>
          <p>{currentPanel}</p>
        </div>
      )}
    </div>,
    document.body
  );
}

export default GuideCharacter;
