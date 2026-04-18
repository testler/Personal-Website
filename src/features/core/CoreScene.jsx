import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLocation, useNavigate } from 'react-router-dom';
import CoreDodecahedron from './CoreDodecahedron';
import CORE_FACES from '../../content/core-faces.config';
import DIALOGUE_CONFIG from '../../content/dialogue.config';
import STORY_MAP from '../../content/story-map.config';
import { resolveRouteForPassage } from '../../content/story-routing.config';
import IntentGatePanel from '../intent-gate/IntentGatePanel';
import { useAudio } from '../audio/AudioProvider';
import sittingFocusedImg from '../../assets/sitting_coding_not_looking_focused.PNG';
import sittingWavingImg from '../../assets/sitting_coding_waving_and_smiling.PNG';
import standingImg from '../../assets/standing_transparent_bg_Looking_left.png';
import typingSfx from '../../assets/typing.mp3';
import './CoreScene.css';

let introSeenThisSession = false;

const INTRO_IMAGES = {
  builder: sittingFocusedImg,
  wave: sittingWavingImg,
  tour: standingImg,
};

const CHOICE_PHASE_TO_PASSAGE = {
  'builder-choice': 'start',
  'wave-choice': 'introduction',
  'hurry-choice': 'in-a-hurry-intro',
};

function getSequenceForPhase(phase) {
  if (phase === 'builder') return DIALOGUE_CONFIG.intro.builder;
  if (phase === 'wave') return DIALOGUE_CONFIG.intro.wave;
  if (phase === 'tour') return DIALOGUE_CONFIG.intro.tour;
  return null;
}

function getIntroImageKeyForPhase(phase) {
  if (phase === 'builder' || phase === 'builder-choice' || phase === 'hurry-choice') return 'builder';
  if (phase === 'wave' || phase === 'wave-choice') return 'wave';
  if (phase === 'tour') return 'tour';
  return '';
}

export default function CoreScene() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playSfx } = useAudio();
  const isCoreRoute = location.pathname === '/';

  const [phase, setPhase] = useState(() => (introSeenThisSession ? 'free' : 'builder'));
  const [stepIndex, setStepIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [labels, setLabels] = useState([]);
  const [selectedFaceId, setSelectedFaceId] = useState('');
  const [showIntentGate, setShowIntentGate] = useState(false);

  const typingAudioRef = useRef(null);
  const typingPlayedRef = useRef(false);
  const prepRef = useRef(null);
  const intervalRef = useRef(null);
  const confirmTimeoutRef = useRef(null);
  const controlsRef = useRef(null);

  const sequence = getSequenceForPhase(phase);
  const introImageKey = getIntroImageKeyForPhase(phase);
  const choicePassageId = CHOICE_PHASE_TO_PASSAGE[phase] || '';
  const choicePassage = choicePassageId ? STORY_MAP.nodes[choicePassageId] : null;
  const currentLine = sequence?.[stepIndex] || '';
  const show3D = phase === 'tour' || phase === 'free';
  const showDialogue = phase === 'builder' || phase === 'wave' || phase === 'tour';

  useEffect(() => {
    if (!isCoreRoute) return undefined;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [isCoreRoute]);

  useEffect(() => {
    if (!isCoreRoute) {
      setLabels([]);
      setShowIntentGate(false);
      setSelectedFaceId('');
    }
  }, [isCoreRoute]);

  useEffect(() => () => {
    if (confirmTimeoutRef.current) window.clearTimeout(confirmTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!currentLine) return undefined;

    setDisplayedText('');
    setIsTyping(false);
    setIsPreparing(true);

    if (prepRef.current) window.clearTimeout(prepRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    prepRef.current = window.setTimeout(() => {
      setIsPreparing(false);
      setIsTyping(true);
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setDisplayedText(currentLine.slice(0, i));
        if (i >= currentLine.length) {
          setIsTyping(false);
          if (intervalRef.current) window.clearInterval(intervalRef.current);
        }
      }, 23);
    }, 800);

    return () => {
      if (prepRef.current) window.clearTimeout(prepRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      setIsPreparing(false);
      setIsTyping(false);
    };
  }, [phase, stepIndex, currentLine]);

  const handleAdvance = () => {
    if (!sequence || !currentLine) return;

    if (!typingPlayedRef.current) {
      typingPlayedRef.current = true;
      playSfx(typingAudioRef.current, 0.14);
    }

    if (isPreparing || isTyping) {
      if (prepRef.current) window.clearTimeout(prepRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      setDisplayedText(currentLine);
      setIsPreparing(false);
      setIsTyping(false);
      return;
    }

    if (phase === 'builder') {
      if (stepIndex < sequence.length - 1) {
        setStepIndex((i) => i + 1);
      } else {
        setPhase('builder-choice');
      }
      return;
    }

    if (phase === 'wave') {
      if (stepIndex < sequence.length - 1) {
        setStepIndex((i) => i + 1);
      } else {
        setPhase('wave-choice');
      }
      return;
    }

    if (phase === 'tour') {
      if (stepIndex < sequence.length - 1) {
        setStepIndex((i) => i + 1);
      } else {
        introSeenThisSession = true;
        setPhase('free');
      }
    }
  };

  const navigateToStoryPassage = (passageId) => {
    if (!passageId || !STORY_MAP.nodes[passageId]) return;

    if (passageId === 'the-core') {
      setPhase('tour');
      setStepIndex(0);
      return;
    }

    if (passageId === 'start') {
      setPhase('builder-choice');
      return;
    }

    if (passageId === 'introduction') {
      setPhase('wave');
      setStepIndex(0);
      return;
    }

    if (passageId === 'in-a-hurry-intro') {
      setPhase('hurry-choice');
      return;
    }

    introSeenThisSession = true;
    const targetRoute = resolveRouteForPassage(passageId);
    navigate(targetRoute);
  };

  const handleChoiceSelect = (choice) => {
    if (!choice) return;

    if (choice.toPassage) {
      navigateToStoryPassage(choice.toPassage);
      return;
    }

    if (choice.toRoute) {
      if (choice.toRoute === '/') {
        introSeenThisSession = true;
        setPhase('free');
        return;
      }
      introSeenThisSession = true;
      navigate(choice.toRoute);
    }
  };

  const executeFaceAction = (face) => {
    if (!face) return;

    if (face.type === 'route') {
      if (face.to === '/' && isCoreRoute) {
        if (controlsRef.current) {
          controlsRef.current.reset();
          controlsRef.current.update();
        }
        return;
      }
      navigate(face.to);
      return;
    }

    if (face.type === 'external') {
      window.open(face.href, '_blank', 'noopener,noreferrer');
      return;
    }

    if (face.type === 'mailto') {
      window.location.href = `mailto:${face.to}`;
    }
  };

  const runFaceAction = (face) => {
    if (!face) return;

    if (selectedFaceId && selectedFaceId === face.id) {
      setSelectedFaceId('');
      executeFaceAction(face);
      if (confirmTimeoutRef.current) window.clearTimeout(confirmTimeoutRef.current);
      return;
    }

    setSelectedFaceId(face.id || '');
    if (confirmTimeoutRef.current) window.clearTimeout(confirmTimeoutRef.current);
    confirmTimeoutRef.current = window.setTimeout(() => {
      setSelectedFaceId('');
    }, 5000);
  };

  if (!isCoreRoute) return null;

  return (
    <div className="core-scene-wrap">
      {introImageKey && !show3D && (
        <div className={`core-intro-scene core-intro-${introImageKey}`}>
          <img src={INTRO_IMAGES[introImageKey]} alt="Josh intro scene" className="core-intro-image" />
          {introImageKey === 'builder' && <div className="core-intro-vignette" />}
        </div>
      )}

      {show3D && (
        <div className="core-canvas-shell">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 1000 }}
            onCreated={({ gl }) => {
              gl.physicallyCorrectLights = true;
              gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            }}
          >
            <ambientLight color="#222244" intensity={0.5} />
            <pointLight color="#66ccff" position={[0, 0, 0]} intensity={5} distance={50} />

            <CoreDodecahedron
              faces={CORE_FACES}
              onFaceSelect={runFaceAction}
              onLabelsUpdate={setLabels}
              selectedFaceId={selectedFaceId}
            />

            <OrbitControls
              ref={controlsRef}
              enablePan={false}
              enableZoom
              enableRotate
              minDistance={4}
              maxDistance={11}
              dampingFactor={0.06}
            />
          </Canvas>
        </div>
      )}

      <audio ref={typingAudioRef} src={typingSfx} preload="auto" />

      {showDialogue && (
        <div className="core-dialogue-overlay" onClick={handleAdvance}>
          {phase === 'tour' && (
            <div className="core-tour-guide">
              <img src={standingImg} alt="Josh guide" />
            </div>
          )}
          <div className="core-dialogue-box">
            {isPreparing ? <p className="core-dialogue-text core-typing">...</p> : <p className="core-dialogue-text">{displayedText}</p>}
            <span className="core-dialogue-hint">{isPreparing || isTyping ? 'tap to skip' : 'tap to continue'}</span>
          </div>
        </div>
      )}

      {!!choicePassage && (
        <div className="core-dialogue-overlay core-dialogue-overlay-static">
          <div className="core-dialogue-box core-choice-box" onClick={(event) => event.stopPropagation()}>
            <p className="core-dialogue-text">{choicePassage.prompt}</p>
            {(choicePassage.paragraphs || []).map((paragraph) => (
              <p key={paragraph} className="core-dialogue-text core-choice-paragraph">{paragraph}</p>
            ))}
            <div className="core-choice-options">
              {(choicePassage.choices || []).map((choice) => (
                <button
                  type="button"
                  key={choice.label}
                  className="core-choice-button"
                  onClick={() => handleChoiceSelect(choice)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === 'free' && labels.map((label) => (
        <button
          type="button"
          key={label.id}
          className={`core-face-label ${label.visible ? 'visible' : ''} ${label.selected ? 'selected' : ''}`}
          style={{ left: `${label.x}px`, top: `${label.y}px`, opacity: label.opacity, color: label.color }}
          onClick={() => runFaceAction(CORE_FACES.find((f) => f.id === label.id))}
        >
          {label.label}
        </button>
      ))}

      {phase === 'free' && !showIntentGate && (
        <button
          type="button"
          className="intent-gate-launch"
          onClick={() => setShowIntentGate(true)}
        >
          Open Command Panel
        </button>
      )}

      {phase === 'free' && showIntentGate && (
        <IntentGatePanel
          heading={DIALOGUE_CONFIG.intentGate.heading}
          subheading={DIALOGUE_CONFIG.intentGate.subheading}
          options={DIALOGUE_CONFIG.intentGate.options}
          onClose={() => setShowIntentGate(false)}
          onSelect={(option) => {
            setShowIntentGate(false);
            navigate(option.to);
          }}
        />
      )}
    </div>
  );
}
