'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from '@/context/AppContext';
import { Zap, WifiOff, Sparkles } from 'lucide-react';

const MONUMENTS = [
  { id: 'kicc', name: 'KICC', fullName: 'Kenyatta International Convention Centre', tagline: "Nairobi's Architectural Crown", accentColor: '#C84B31', glowColor: 0xc84b31 },
  { id: 'museum', name: 'National Museum', fullName: 'Nairobi National Museum', tagline: 'Heritage and Living Culture', accentColor: '#1F4E38', glowColor: 0x1f4e38 },
  { id: 'archives', name: 'Kenya Archives', fullName: 'Kenya National Archives', tagline: 'CBD Historical Anchor', accentColor: '#E5A93C', glowColor: 0xe5a93c },
] as const;

function mkMat(color: number, metalness = 0.55, roughness = 0.4, emissive = 0x0a0400): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness, emissive });
}

function am(group: THREE.Group, geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  group.add(m);
  return m;
}

function buildKICC(group: THREE.Group) {
  am(group, new THREE.BoxGeometry(3.2, 0.55, 3.2), mkMat(0x8b5e3c, 0.3, 0.75, 0x100500), 0, -2.05);
  am(group, new THREE.CylinderGeometry(1.65, 1.85, 0.28, 32), mkMat(0xa06540, 0.45, 0.65), 0, -1.52);
  am(group, new THREE.CylinderGeometry(0.68, 0.86, 3.3, 32), mkMat(0xc84b31, 0.6, 0.38, 0x3a0e00), 0, 0.2);
  for (let i = 0; i < 6; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.032, 8, 32), mkMat(0x9e3218, 0.7, 0.3));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.2 + i * 0.6;
    group.add(ring);
  }
  am(group, new THREE.CylinderGeometry(1.58, 0.92, 0.38, 48), mkMat(0xd9531e, 0.68, 0.28, 0x3a0e00), 0, 1.95);
  const saucerRim = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.07, 10, 48), mkMat(0xe5a93c, 0.88, 0.18, 0x332200));
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = 1.78;
  group.add(saucerRim);
  am(group, new THREE.CylinderGeometry(0.022, 0.055, 1.3, 8), mkMat(0xe5a93c, 0.95, 0.08, 0x332200), 0, 2.75);
  am(group, new THREE.SphereGeometry(0.09, 16, 16), mkMat(0xffd580, 0.95, 0.04, 0x553300), 0, 3.45);
  const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.88, 3.3, 12, 6), new THREE.MeshBasicMaterial({ color: 0xe5a93c, wireframe: true, transparent: true, opacity: 0.13 }));
  wire.position.y = 0.2;
  group.add(wire);
}

function buildMuseum(group: THREE.Group) {
  am(group, new THREE.BoxGeometry(4.1, 0.38, 3.0), mkMat(0x4a7c59, 0.18, 0.82, 0x010d07), 0, -2.1);
  am(group, new THREE.BoxGeometry(3.3, 0.32, 2.4), mkMat(0x5a9a6d, 0.28, 0.72), 0, -1.75);
  am(group, new THREE.BoxGeometry(2.5, 0.32, 1.9), mkMat(0x6ab07d, 0.32, 0.68), 0, -1.42);
  am(group, new THREE.BoxGeometry(2.7, 1.52, 1.62), mkMat(0x1f4e38, 0.38, 0.55, 0x051a10), 0, -0.44);
  for (let x = -0.9; x <= 0.9; x += 0.3) {
    am(group, new THREE.BoxGeometry(0.065, 1.52, 0.065), mkMat(0x3a7a52, 0.48, 0.42), x, -0.44, 0.84);
  }
  am(group, new THREE.BoxGeometry(1.05, 1.0, 0.5), mkMat(0x2d6b47, 0.52, 0.45, 0x040f08), 0, -0.94, 1.07);
  am(group, new THREE.BoxGeometry(1.45, 0.07, 0.72), mkMat(0xe5a93c, 0.82, 0.22, 0x332200), 0, -0.43, 1.17);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.74, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), mkMat(0x1a4530, 0.52, 0.4, 0x060f08));
  dome.position.y = 0.33;
  group.add(dome);
  const domeRing = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.055, 8, 32), mkMat(0xe5a93c, 0.9, 0.14, 0x332200));
  domeRing.rotation.x = Math.PI / 2;
  domeRing.position.y = 0.33;
  group.add(domeRing);
  ([-1.45, 1.45] as number[]).forEach(xPos => {
    am(group, new THREE.CylinderGeometry(0.07, 0.09, 1.85, 10), mkMat(0x4a7c59, 0.32, 0.65), xPos, -0.52, 0.85);
    am(group, new THREE.BoxGeometry(0.2, 0.1, 0.2), mkMat(0xe5a93c, 0.8, 0.2, 0x332200), xPos, 0.38, 0.85);
  });
  ([ [-1.7, -1.62, 0.5], [1.7, -1.62, 0.5], [-1.7, -1.62, -0.4], [1.7, -1.62, -0.4] ] as [number,number,number][]).forEach(([x, y, z]) => {
    am(group, new THREE.IcosahedronGeometry(0.2, 1), mkMat(0x3a7d44, 0.08, 0.92, 0x010d07), x, y, z);
  });
  const wire = new THREE.Mesh(new THREE.BoxGeometry(2.72, 1.54, 1.64), new THREE.MeshBasicMaterial({ color: 0x1f4e38, wireframe: true, transparent: true, opacity: 0.1 }));
  wire.position.y = -0.44;
  group.add(wire);
}

function buildArchives(group: THREE.Group) {
  am(group, new THREE.BoxGeometry(4.0, 0.48, 2.2), mkMat(0xb89a4a, 0.32, 0.72, 0x100c00), 0, -2.1);
  am(group, new THREE.BoxGeometry(3.3, 2.05, 1.42), mkMat(0xe5a93c, 0.42, 0.5, 0x1a0d00), 0, -0.82);
  for (let row = 0; row < 3; row++) {
    for (let col = -2; col <= 2; col++) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.28, 0.055), new THREE.MeshStandardMaterial({ color: 0xd4a017, metalness: 0.72, roughness: 0.18, emissive: 0x221400, transparent: true, opacity: 0.88 }));
      win.position.set(col * 0.52, -1.48 + row * 0.56, 0.74);
      group.add(win);
    }
  }
  am(group, new THREE.BoxGeometry(3.5, 0.11, 1.56), mkMat(0xffd580, 0.72, 0.22, 0x332200), 0, 0.22);
  for (let i = -1.2; i <= 1.2; i += 0.6) {
    const arch = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.038, 8, 16, Math.PI), mkMat(0xd4a017, 0.58, 0.3));
    arch.rotation.z = Math.PI;
    arch.position.set(i, -1.63, 0.74);
    group.add(arch);
    ([-0.18, 0.18] as number[]).forEach(dx => am(group, new THREE.CylinderGeometry(0.038, 0.05, 0.55, 8), mkMat(0xc99a30, 0.5, 0.42), i + dx, -1.93, 0.74));
  }
  am(group, new THREE.BoxGeometry(0.92, 2.65, 0.92), mkMat(0xd4a017, 0.52, 0.4, 0x221500), 0, 1.58);
  const clockFace = new THREE.Mesh(new THREE.CircleGeometry(0.28, 32), new THREE.MeshStandardMaterial({ color: 0xfff8e0, metalness: 0.28, roughness: 0.52, emissive: 0x1a1400 }));
  clockFace.position.set(0, 1.88, 0.47);
  group.add(clockFace);
  const handMat = mkMat(0x2a1a00, 0.2, 0.82);
  am(group, new THREE.BoxGeometry(0.038, 0.2, 0.012), handMat, 0, 1.96, 0.48);
  const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.024, 0.26, 0.012), handMat);
  minHand.position.set(0.05, 1.88, 0.48);
  minHand.rotation.z = -0.48;
  group.add(minHand);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.56, 0.68, 4), mkMat(0xb88a20, 0.68, 0.3, 0x2a1800));
  cap.position.y = 2.95;
  cap.rotation.y = Math.PI / 4;
  group.add(cap);
  am(group, new THREE.CylinderGeometry(0.018, 0.018, 0.85, 6), mkMat(0xffd580, 0.92, 0.08, 0x332200), 0, 3.68);
  const flag = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.21, 0.01), new THREE.MeshStandardMaterial({ color: 0xbb0000, roughness: 0.82, side: THREE.DoubleSide }));
  flag.position.set(0.19, 3.74, 0);
  group.add(flag);
  const wire = new THREE.Mesh(new THREE.BoxGeometry(3.32, 2.08, 1.45), new THREE.MeshBasicMaterial({ color: 0xe5a93c, wireframe: true, transparent: true, opacity: 0.09 }));
  wire.position.y = -0.82;
  group.add(wire);
}

function buildParticles(scene: THREE.Scene): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(320 * 3);
  for (let i = 0; i < 320 * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 15;
    pos[i + 1] = (Math.random() - 0.5) * 13;
    pos[i + 2] = (Math.random() - 0.5) * 10;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffd580, size: 0.07, transparent: true, opacity: 0.62, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(pts);
  return pts;
}

export default function NairobiMonumentLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLowBandwidthMode, setIsLowBandwidthMode } = useApp();
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const activeMonument = MONUMENTS[activeIdx];
  const setActiveRef = useRef(setActiveIdx);
  setActiveRef.current = setActiveIdx;

  useEffect(() => {
    if (isLowBandwidthMode) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL unavailable', e);
      setWebGlSupported(false);
      return;
    }

    const cw = container.clientWidth, ch = container.clientHeight;
    renderer.setSize(cw, ch);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, cw / ch, 0.1, 100);
    camera.position.set(0, 0.5, 9.8);

    scene.add(new THREE.AmbientLight(0xfef5dc, 1.0));
    const sun = new THREE.DirectionalLight(0xffa726, 2.8);
    sun.position.set(5, 8, 5);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x1f4e38, 1.5);
    rim.position.set(-6, -3, -3);
    scene.add(rim);
    const accentPt = new THREE.PointLight(MONUMENTS[0].glowColor, 2.5, 18);
    accentPt.position.set(0, -2.5, 3.5);
    scene.add(accentPt);

    const groups: THREE.Group[] = [];
    [buildKICC, buildMuseum, buildArchives].forEach((build, i) => {
      const g = new THREE.Group();
      build(g);
      g.visible = i === 0;
      scene.add(g);
      groups.push(g);
    });
    const particles = buildParticles(scene);

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const onMM = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.8;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 1.8;
    };
    window.addEventListener('mousemove', onMM);
    const onResize = () => {
      if (!container || !renderer) return;
      const nw = container.clientWidth, nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    const DISPLAY = 5.2, TRANS = 1.25;
    let animId: number, segTime = 0, inTrans = false, transProgress = 0, fromIdx = 0, toIdx = 1;
    const clock = new THREE.Clock();
    const glowCols = MONUMENTS.map(m => new THREE.Color(m.glowColor));

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta(), elapsed = clock.getElapsedTime();
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (!inTrans) {
        segTime += delta;
        setProgressPct(Math.round(Math.min(segTime / DISPLAY, 1) * 100));
        const g = groups[fromIdx];
        g.rotation.y = currentX * 0.7 + elapsed * 0.2;
        g.rotation.x = currentY * 0.5 + Math.sin(elapsed * 0.55) * 0.07;
        g.position.y = Math.sin(elapsed * 1.0) * 0.13;
        g.scale.setScalar(1.0);
        if (segTime >= DISPLAY) {
          inTrans = true;
          setIsTransitioning(true);
          toIdx = (fromIdx + 1) % MONUMENTS.length;
          transProgress = 0;
          groups[toIdx].visible = true;
          groups[toIdx].scale.setScalar(0);
          groups[toIdx].position.y = -1.8;
          groups[toIdx].rotation.y = -Math.PI * 0.45;
        }
      } else {
        transProgress += delta / TRANS;
        const t = Math.min(transProgress, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        groups[fromIdx].scale.setScalar(1 - ease);
        groups[fromIdx].rotation.y += delta * 0.8;
        groups[fromIdx].position.y = ease * 2.2;
        groups[toIdx].scale.setScalar(ease);
        groups[toIdx].rotation.y = (1 - ease) * -Math.PI * 0.45 + currentX * 0.7;
        groups[toIdx].rotation.x = currentY * 0.5;
        groups[toIdx].position.y = (1 - ease) * -1.8 + Math.sin(elapsed * 1.0) * 0.13 * ease;
        accentPt.color.lerpColors(glowCols[fromIdx], glowCols[toIdx], ease);
        accentPt.intensity = 2.5 + Math.sin(transProgress * Math.PI) * 2.2;
        if (transProgress >= 1) {
          groups[fromIdx].visible = false;
          groups[fromIdx].scale.setScalar(1);
          groups[fromIdx].rotation.set(0, 0, 0);
          groups[fromIdx].position.set(0, 0, 0);
          inTrans = false;
          setIsTransitioning(false);
          fromIdx = toIdx;
          setActiveRef.current(fromIdx);
          segTime = 0;
          setProgressPct(0);
        }
      }
      particles.rotation.y = elapsed * 0.032;
      particles.rotation.x = Math.sin(elapsed * 0.018) * 0.07;
      renderer!.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMM);
      window.removeEventListener('resize', onResize);
      renderer?.dispose();
      groups.forEach(g => g.traverse(obj => {
        if ((obj as THREE.Mesh).isMesh) {
          const m = obj as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) m.material.forEach((x: THREE.Material) => x.dispose());
          else (m.material as THREE.Material)?.dispose();
        }
      }));
      (particles.geometry as THREE.BufferGeometry).dispose();
      (particles.material as THREE.Material).dispose();
    };
  }, [isLowBandwidthMode]);

  return (
    <div
      className="relative w-full h-[440px] sm:h-[500px] lg:h-[580px] flex items-center justify-center select-none overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic glow backdrop */}
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-1000 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 65% 30%, ${activeMonument.accentColor}1A 0%, transparent 68%), radial-gradient(ellipse at 25% 75%, #E5A93C0D 0%, transparent 58%)` }}
      />

      {/* 3D Canvas */}
      {!isLowBandwidthMode && webGlSupported ? (
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden" />
      ) : (
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 220 220" fill="none">
            <rect x="65" y="180" width="90" height="14" rx="3" fill="#8B5E3C" opacity="0.9" />
            <rect x="97" y="92" width="26" height="88" rx="4" fill="#C84B31" />
            <ellipse cx="110" cy="90" rx="42" ry="11" fill="#D9531E" />
            <line x1="110" y1="90" x2="110" y2="54" stroke="#E5A93C" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="110" cy="51" r="5" fill="#FFD580" />
            <ellipse cx="110" cy="148" rx="80" ry="20" fill="none" stroke="#E5A93C" strokeWidth="1.5" strokeDasharray="7 4" opacity="0.5" />
          </svg>
          <div className="absolute flex flex-col items-center text-center p-4">
            <span className="text-xs font-bold text-earth-600 uppercase tracking-widest">Low-Bandwidth Mode</span>
            <p className="text-[11px] text-savannah-700 max-w-[160px] mt-1">Fast vector rendering active.</p>
          </div>
        </div>
      )}

      {/* Monument label card */}
      <div className={`absolute bottom-14 left-4 right-4 flex items-end justify-between pointer-events-none transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-savannah-200 max-w-[75%]">
          <div className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5" style={{ color: activeMonument.accentColor }}>
            {activeMonument.name}
          </div>
          <div className="text-xs font-bold text-obsidian leading-tight">{activeMonument.fullName}</div>
          <div className="text-[10px] text-savannah-600 mt-0.5">{activeMonument.tagline}</div>
        </div>
        <div className="flex flex-col gap-1.5 items-center pb-1 pr-1">
          {MONUMENTS.map((m, i) => (
            <div
              key={m.id}
              className="rounded-full transition-all duration-500"
              style={{ width: i === activeIdx ? 8 : 6, height: i === activeIdx ? 26 : 6, opacity: i === activeIdx ? 1 : 0.4, background: i === activeIdx ? m.accentColor : '#9CA3AF' }}
            />
          ))}
        </div>
      </div>

      {/* Timeline progress */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 pointer-events-none">
        {MONUMENTS.map((m, i) => (
          <div key={m.id} className="flex-1 h-0.5 rounded-full bg-savannah-200 overflow-hidden">
            <div className="h-full rounded-full transition-[width] duration-100" style={{ width: i === activeIdx ? `${progressPct}%` : i < activeIdx ? '100%' : '0%', background: m.accentColor }} />
          </div>
        ))}
      </div>

      {/* Live badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sun-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sun-500" />
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-savannah-700 bg-white/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-savannah-200 shadow-sm flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-earth-600" />
          Nairobi 3D Monument Loop &bull; Move Cursor
        </span>
      </div>

      {/* Mode toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          type="button"
          onClick={() => setIsLowBandwidthMode(!isLowBandwidthMode)}
          aria-label="Toggle 3D mode"
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-savannah-300 text-xs font-medium text-obsidian shadow-sm hover:shadow transition-all flex items-center gap-1.5"
        >
          {isLowBandwidthMode ? (
            <><Zap className="w-3.5 h-3.5 text-sun-600" /><span>Turn On 3D</span></>
          ) : (
            <><WifiOff className="w-3.5 h-3.5 text-savannah-600" /><span>Low-Data</span></>
          )}
        </button>
      </div>
    </div>
  );
}
