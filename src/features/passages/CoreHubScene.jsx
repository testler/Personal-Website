import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CoreDodecahedron from '../core/CoreDodecahedron';
import CORE_FACES from '../../content/core-faces.config';
import './CoreHubScene.css';

export default function CoreHubScene({
  visitedIds,
  totalVisited,
  totalDestinations,
  onFaceConfirm,
  hasSignal,
  onFollowSignal,
}) {
  const [labels, setLabels] = useState([]);
  const [selectedFaceId, setSelectedFaceId] = useState('');
  const confirmTimeoutRef = useRef(null);

  const visitedSet = visitedIds instanceof Set ? visitedIds : new Set(visitedIds || []);

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

  const selectedFace = labels.find((l) => l.id === selectedFaceId);

  return (
    <div className="core-hub-scene">
      <div className="core-hub-counter-row">
        <span className="core-hub-counter-text">
          Visited: {totalVisited} / {totalDestinations}
        </span>
        {hasSignal && (
          <button type="button" className="core-hub-signal-btn" onClick={onFollowSignal}>
            ⚠ SIGNAL — follow it to the ending
          </button>
        )}
      </div>

      <div className="core-hub-canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 1000 }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          }}
        >
          <ambientLight color="#222244" intensity={0.6} />
          <pointLight color="#66ccff" position={[0, 0, 0]} intensity={5} distance={50} />
          <pointLight color="#ffffff" position={[6, 6, 6]} intensity={0.6} />

          <CoreDodecahedron
            faces={CORE_FACES}
            onFaceSelect={handleFaceSelect}
            onLabelsUpdate={setLabels}
            selectedFaceId={selectedFaceId}
            visitedIds={visitedSet}
          />

          <OrbitControls
            enablePan={false}
            enableZoom
            enableRotate
            minDistance={5}
            maxDistance={11}
            dampingFactor={0.06}
          />
        </Canvas>

        {labels.map((label) => (
          <button
            key={label.id}
            type="button"
            className={`core-hub-label ${label.visible ? 'visible' : ''} ${label.selected ? 'selected' : ''} ${label.visited ? 'visited' : ''}`}
            style={{
              left: `${label.x}px`,
              top: `${label.y}px`,
              opacity: label.opacity,
            }}
            onClick={() => {
              const face = CORE_FACES.find((f) => f.id === label.id);
              handleFaceSelect(face);
            }}
          >
            <span className="core-hub-label-text">{label.label}</span>
            {label.visited && <span className="core-hub-label-check">✓</span>}
          </button>
        ))}
      </div>

      <p className="core-hub-hint">
        {selectedFace
          ? `Tap "${selectedFace.label}" again to enter`
          : 'Drag to rotate • Tap a face to select'}
      </p>
    </div>
  );
}
