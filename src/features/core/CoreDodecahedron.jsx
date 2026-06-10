import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const RADIUS = 2;
const FACE_DISC_RADIUS = 0.85;
const LABEL_OFFSET = 1.15;
const TAP_MAX_DRIFT_PX = 8;
const VISITED_COLOR = '#22c55e';
const VISITED_EMISSIVE = '#16a34a';
const UNVISITED_COLOR = '#1e3a8a';
const UNVISITED_EMISSIVE = '#0ea5e9';

// Scratch vectors reused every frame to avoid per-frame allocations
const _camDir = new THREE.Vector3();
const _worldDir = new THREE.Vector3();
const _worldPos = new THREE.Vector3();

function getAnchorVectors() {
  const geo = new THREE.DodecahedronGeometry(1, 0);
  const pos = geo.attributes.position.array;
  const uniqueNormals = [];

  for (let i = 0; i < pos.length; i += 9) {
    const a = new THREE.Vector3(pos[i], pos[i + 1], pos[i + 2]);
    const b = new THREE.Vector3(pos[i + 3], pos[i + 4], pos[i + 5]);
    const c = new THREE.Vector3(pos[i + 6], pos[i + 7], pos[i + 8]);

    const normal = b.clone().sub(a).cross(c.clone().sub(a)).normalize();
    const center = a.clone().add(b).add(c).multiplyScalar(1 / 3);
    if (center.dot(normal) < 0) {
      normal.multiplyScalar(-1);
    }

    const exists = uniqueNormals.some((candidate) => candidate.dot(normal) > 0.999);
    if (!exists) uniqueNormals.push(normal);
  }

  geo.dispose();
  return uniqueNormals
    .sort((left, right) => {
      if (Math.abs(left.y - right.y) > 0.0001) return right.y - left.y;
      if (Math.abs(left.x - right.x) > 0.0001) return left.x - right.x;
      return left.z - right.z;
    })
    .slice(0, 12);
}

function quaternionForOutwardNormal(dir) {
  const eye = dir.clone().multiplyScalar(RADIUS);
  const m = new THREE.Matrix4().lookAt(eye, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0));
  const q = new THREE.Quaternion();
  q.setFromRotationMatrix(m);
  return q;
}

export default function CoreDodecahedron({
  faces,
  onFaceSelect,
  labelElsRef,
  selectedFaceId = '',
  visitedIds,
  interactingRef,
}) {
  const groupRef = useRef();
  const shellRef = useRef();
  const edgeRef = useRef();
  const coreRef = useRef();
  const ringRef = useRef();
  const selectedRingRef = useRef();
  const pulseRef = useRef(0);
  const timeRef = useRef(0);

  const { camera, size } = useThree();

  const visitedSet = useMemo(() => {
    if (visitedIds instanceof Set) return visitedIds;
    if (Array.isArray(visitedIds)) return new Set(visitedIds);
    return new Set();
  }, [visitedIds]);

  const shellGeometry = useMemo(() => new THREE.DodecahedronGeometry(RADIUS, 0), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(shellGeometry, 30), [shellGeometry]);
  const selectedRingGeometry = useMemo(
    () => new THREE.RingGeometry(FACE_DISC_RADIUS + 0.02, FACE_DISC_RADIUS + 0.18, 48),
    []
  );
  const faceDiscGeometry = useMemo(() => new THREE.CircleGeometry(FACE_DISC_RADIUS, 32), []);

  const anchors = useMemo(() => getAnchorVectors(), []);
  const faceAnchors = useMemo(
    () =>
      faces.map((face, index) => {
        const dir = anchors[index % anchors.length];
        return {
          face,
          dir,
          position: dir.clone().multiplyScalar(RADIUS + 0.01),
          quaternion: quaternionForOutwardNormal(dir),
        };
      }),
    [faces, anchors]
  );

  useEffect(() => {
    if (selectedFaceId) {
      pulseRef.current = 1;
    }
  }, [selectedFaceId]);

  useEffect(() => () => {
    shellGeometry.dispose();
    edgesGeometry.dispose();
    selectedRingGeometry.dispose();
    faceDiscGeometry.dispose();
  }, [shellGeometry, edgesGeometry, selectedRingGeometry, faceDiscGeometry]);

  // A tap selects; a drag (pointer drifted past the threshold) only rotates.
  const handleTap = (event, face) => {
    event.stopPropagation();
    if (event.delta > TAP_MAX_DRIFT_PX) return;
    onFaceSelect?.(face);
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    timeRef.current += delta;

    // Idle spin pauses while the user is orbiting, and while a face is
    // selected so the tap-again-to-confirm target doesn't drift away.
    if (!interactingRef?.current && !selectedFaceId) {
      groupRef.current.rotation.y += 0.24 * delta;
      groupRef.current.rotation.x += 0.11 * delta;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.6 * delta;
      ringRef.current.rotation.y += 0.12 * delta;
    }

    pulseRef.current = Math.max(0, pulseRef.current - delta * 2.4);
    const pulseScale = 1 + Math.sin((1 - pulseRef.current) * Math.PI) * 0.1 * pulseRef.current;

    if (ringRef.current) {
      ringRef.current.scale.setScalar(pulseScale);
    }

    const breathe = Math.sin(timeRef.current * 1.2) * 0.4;

    if (coreRef.current) {
      const coreMat = coreRef.current.material;
      coreMat.emissiveIntensity = 1.7 + breathe + pulseRef.current * 1.2;
    }

    if (shellRef.current) {
      const shellMat = shellRef.current.material;
      shellMat.emissiveIntensity = (selectedFaceId ? 0.32 : 0.08) + breathe * 0.05;
    }

    if (edgeRef.current) {
      const edgeMat = edgeRef.current.material;
      edgeMat.opacity = (selectedFaceId ? 0.95 : 0.72) + breathe * 0.08;
    }

    if (selectedRingRef.current) {
      const mat = selectedRingRef.current.material;
      mat.emissiveIntensity = 1.4 + Math.sin(timeRef.current * 4) * 0.5;
      mat.opacity = 0.78 + Math.sin(timeRef.current * 3) * 0.18;
    }

    // Project each face anchor to screen space and position its DOM label
    // imperatively — no React re-renders in the frame loop.
    const labelEls = labelElsRef?.current;
    if (!labelEls) return;

    camera.getWorldDirection(_camDir);

    for (const { face, dir } of faceAnchors) {
      const el = labelEls.get(face.id);
      if (!el) continue;

      _worldDir.copy(dir).applyQuaternion(groupRef.current.quaternion).normalize();
      const facing = _worldDir.dot(_camDir);

      _worldPos
        .copy(dir)
        .multiplyScalar(RADIUS + LABEL_OFFSET)
        .applyMatrix4(groupRef.current.matrixWorld)
        .project(camera);

      const visible = facing < -0.5 && _worldPos.z > -1 && _worldPos.z < 1;
      const x = (_worldPos.x * 0.5 + 0.5) * size.width;
      const y = (-_worldPos.y * 0.5 + 0.5) * size.height;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.opacity = visible ? String(Math.min(1, Math.max(0.55, -facing * 1.8))) : '0';
      el.style.pointerEvents = visible ? 'auto' : 'none';
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={shellRef}
        onClick={(event) => {
          if (event.delta > TAP_MAX_DRIFT_PX) return;
          event.stopPropagation();
          if (!groupRef.current) return;

          const local = groupRef.current.worldToLocal(event.point.clone()).normalize();
          let bestIndex = 0;
          let bestDot = -Infinity;

          for (let i = 0; i < faceAnchors.length; i += 1) {
            const dot = local.dot(faceAnchors[i].dir);
            if (dot > bestDot) {
              bestDot = dot;
              bestIndex = i;
            }
          }

          onFaceSelect?.(faceAnchors[bestIndex].face);
        }}
      >
        <primitive attach="geometry" object={shellGeometry} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.9}
          roughness={0.4}
          emissive="#012348"
          emissiveIntensity={0.08}
        />
      </mesh>

      {faceAnchors.map(({ face, position, quaternion }) => {
        const isVisited = visitedSet.has(face.id);
        const isSelected = face.id === selectedFaceId;
        const baseColor = isVisited ? VISITED_COLOR : UNVISITED_COLOR;
        const emissive = isVisited ? VISITED_EMISSIVE : UNVISITED_EMISSIVE;
        return (
          <group key={face.id} position={position} quaternion={quaternion}>
            <mesh onClick={(event) => handleTap(event, face)}>
              <primitive attach="geometry" object={faceDiscGeometry} />
              <meshStandardMaterial
                color={baseColor}
                emissive={emissive}
                emissiveIntensity={isVisited ? 1.1 : 0.55}
                metalness={0.35}
                roughness={0.4}
                side={THREE.DoubleSide}
              />
            </mesh>
            {isSelected && (
              <mesh ref={selectedRingRef} position={[0, 0, 0.005]}>
                <primitive attach="geometry" object={selectedRingGeometry} />
                <meshStandardMaterial
                  color="#fde68a"
                  emissive="#facc15"
                  emissiveIntensity={1.4}
                  transparent
                  opacity={0.85}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                />
              </mesh>
            )}
          </group>
        );
      })}

      <lineSegments ref={edgeRef}>
        <primitive attach="geometry" object={edgesGeometry} />
        <lineBasicMaterial color="#00ccff" transparent opacity={0.72} />
      </lineSegments>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#44aaff"
          emissive="#3399ff"
          emissiveIntensity={1.7}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.55, 0.018, 16, 120]} />
        <meshStandardMaterial
          color="#00ccff"
          emissive="#00ccff"
          emissiveIntensity={1.0}
          metalness={0.25}
          roughness={0.22}
          transparent
          opacity={0.55}
        />
      </mesh>

    </group>
  );
}
