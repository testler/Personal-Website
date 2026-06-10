import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CoreDodecahedron from '../core/CoreDodecahedron';
import CORE_FACES from '../../content/core-faces.config';
import './CoreHubScene.css';

const FACE_GROUPS = [...new Set(CORE_FACES.map((f) => f.group))];

export default function CoreHubScene({
  visitedIds,
  totalVisited,
  totalDestinations,
  onFaceConfirm,
}) {
  const [selectedFaceId, setSelectedFaceId] = useState('');
  const confirmTimeoutRef = useRef(null);
  const labelElsRef = useRef(new Map());
  const interactingRef = useRef(false);

  const visitedSet = visitedIds instanceof Set ? visitedIds : new Set(visitedIds || []);

  useEffect(() => () => {
    if (confirmTimeoutRef.current) window.clearTimeout(confirmTimeoutRef.current);
  }, []);

  const handleFaceSelect = (face) => {
    if (!face) return;
    if (selectedFaceId && selectedFaceId === face.id) {
      setSelectedFaceId('');
      if (confirmTimeoutRef.current) window.clearTimeout(confirmTimeoutRef.current);
      onFaceConfirm?.(face);
      return;
    }
    setSelectedFaceId(face.id);
    if (confirmTimeoutRef.current) window.clearTimeout(confirmTimeoutRef.current);
    confirmTimeoutRef.current = window.setTimeout(() => setSelectedFaceId(''), 5000);
  };

  const selectedFace = CORE_FACES.find((f) => f.id === selectedFaceId);

  return (
    <div className="core-hub-scene">
      <div className="core-hub-counter-row">
        <span className="core-hub-counter-text">
          Visited {totalVisited} / {totalDestinations}
        </span>
      </div>

      <div className="core-hub-canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 1000 }}
          dpr={[1, 2]}
        >
          <ambientLight color="#222244" intensity={0.6} />
          <pointLight color="#66ccff" position={[0, 0, 0]} intensity={5} distance={50} />
          <pointLight color="#ffffff" position={[6, 6, 6]} intensity={0.6} />

          <CoreDodecahedron
            faces={CORE_FACES}
            onFaceSelect={handleFaceSelect}
            labelElsRef={labelElsRef}
            selectedFaceId={selectedFaceId}
            visitedIds={visitedSet}
            interactingRef={interactingRef}
          />

          <OrbitControls
            enablePan={false}
            enableZoom
            enableRotate
            minDistance={5}
            maxDistance={11}
            dampingFactor={0.06}
            onStart={() => { interactingRef.current = true; }}
            onEnd={() => { interactingRef.current = false; }}
          />
        </Canvas>

        {/* Floating face labels: positioned every frame by CoreDodecahedron.
            Pointer-only affordance — keyboard/screen-reader users navigate via
            the destination list below. */}
        {CORE_FACES.map((face) => (
          <button
            key={face.id}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            ref={(el) => {
              if (el) labelElsRef.current.set(face.id, el);
              else labelElsRef.current.delete(face.id);
            }}
            className={`core-hub-label ${face.id === selectedFaceId ? 'selected' : ''} ${visitedSet.has(face.id) ? 'visited' : ''}`}
            onClick={() => handleFaceSelect(face)}
          >
            <span className="core-hub-label-text">{face.label}</span>
            {visitedSet.has(face.id) && <span className="core-hub-label-check">✓</span>}
          </button>
        ))}
      </div>

      <p className="core-hub-hint" aria-live="polite">
        {selectedFace
          ? `Tap "${selectedFace.label}" again to enter`
          : 'Drag to rotate • Tap a face to select'}
      </p>

      <details className="core-hub-list">
        <summary className="core-hub-list-summary">All destinations</summary>
        {FACE_GROUPS.map((group) => (
          <div key={group} className="core-hub-group">
            <p className="core-hub-group-label">{group}</p>
            <div className="core-hub-group-items">
              {CORE_FACES.filter((f) => f.group === group).map((face) => (
                <button
                  key={face.id}
                  type="button"
                  className={`passage-choice core-hub-item ${visitedSet.has(face.id) ? 'core-hub-item--visited' : ''}`}
                  onClick={() => onFaceConfirm?.(face)}
                >
                  <span>{face.label}</span>
                  {visitedSet.has(face.id) && <span className="core-hub-check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </details>
    </div>
  );
}
