'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useApp } from '@/context/AppContext';
import { Zap, WifiOff, Sparkles } from 'lucide-react';

export default function AfricanSportsMonument() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLowBandwidthMode, setIsLowBandwidthMode } = useApp();
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isLowBandwidthMode) return;

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported, falling back to SVG', e);
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Warm African Sunlight lighting
    const ambientLight = new THREE.AmbientLight(0xfef5dc, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffa726, 2.5); // Golden Acacia Sunlight
    sunLight.position.set(5, 6, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x1f4e38, 1.8); // Rift Highland Green rim
    rimLight.position.set(-6, -4, -2);
    scene.add(rimLight);

    const terracottaLight = new THREE.PointLight(0xc84b31, 2.0, 15); // Terracotta ground glow
    terracottaLight.position.set(0, -3, 2);
    scene.add(terracottaLight);

    // Master Group for mouse tracking and rotation
    const monumentGroup = new THREE.Group();
    scene.add(monumentGroup);

    // 1. Core Geodesic African Sports Sphere (Soccer / Athletics Trophy motif)
    const sphereGeo = new THREE.IcosahedronGeometry(2.1, 2);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x121314, // Obsidian
      roughness: 0.35,
      metalness: 0.75,
      wireframe: false,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    monumentGroup.add(coreSphere);

    // Wireframe geometric overlay in golden sun
    const wireGeo = new THREE.IcosahedronGeometry(2.12, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xe5a93c, // Acacia Sun Gold
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    monumentGroup.add(wireMesh);

    // Secondary inner faceted sculpture in Terracotta
    const innerGeo = new THREE.OctahedronGeometry(1.4, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xc84b31, // Terracotta
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    monumentGroup.add(innerMesh);

    // 2. Kinetic Athletics Ribbons (Swirling track lanes in national / African athletic colors)
    const ribbonCurve1 = new THREE.TorusGeometry(3.0, 0.07, 16, 100);
    const ribbonMat1 = new THREE.MeshStandardMaterial({
      color: 0xd9531e, // African Ember
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x551100,
    });
    const ribbon1 = new THREE.Mesh(ribbonCurve1, ribbonMat1);
    ribbon1.rotation.x = Math.PI / 3;
    ribbon1.rotation.y = Math.PI / 6;
    monumentGroup.add(ribbon1);

    const ribbonCurve2 = new THREE.TorusGeometry(3.3, 0.05, 16, 100);
    const ribbonMat2 = new THREE.MeshStandardMaterial({
      color: 0xe5a93c, // Sun Gold
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x442200,
    });
    const ribbon2 = new THREE.Mesh(ribbonCurve2, ribbonMat2);
    ribbon2.rotation.x = -Math.PI / 4;
    ribbon2.rotation.y = Math.PI / 3;
    monumentGroup.add(ribbon2);

    const ribbonCurve3 = new THREE.TorusGeometry(2.7, 0.06, 16, 100);
    const ribbonMat3 = new THREE.MeshStandardMaterial({
      color: 0x1f4e38, // Rift Green
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x051a10,
    });
    const ribbon3 = new THREE.Mesh(ribbonCurve3, ribbonMat3);
    ribbon3.rotation.z = Math.PI / 3;
    monumentGroup.add(ribbon3);

    // 3. Floating Sunlit Particle Atmosphere (Savannah golden dust motes)
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 8;
      scales[i / 3] = Math.random() * 0.06 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd580,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 1.5;
      targetY = -((event.clientY - rect.top) / rect.height - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow interpolation
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      monumentGroup.rotation.y = currentX * 0.8 + elapsedTime * 0.25;
      monumentGroup.rotation.x = currentY * 0.6 + Math.sin(elapsedTime * 0.5) * 0.1;

      // Inner sculpture counter-rotation
      innerMesh.rotation.y = -elapsedTime * 0.5;
      innerMesh.rotation.z = elapsedTime * 0.3;

      // Ribbon kinetic spins
      ribbon1.rotation.z = elapsedTime * 0.4;
      ribbon2.rotation.z = -elapsedTime * 0.35;
      ribbon3.rotation.x = elapsedTime * 0.3;

      // Gentle floating breathing translation
      monumentGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.18;

      // Particle subtle swirl
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer) {
        renderer.dispose();
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ribbonCurve1.dispose();
      ribbonMat1.dispose();
      ribbonCurve2.dispose();
      ribbonMat2.dispose();
      ribbonCurve3.dispose();
      ribbonMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isLowBandwidthMode]);

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial African glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-sun-500/10 via-earth-500/10 to-rift-600/10 rounded-3xl blur-3xl pointer-events-none" />

      {/* 3D WebGL Canvas or SVG Fallback */}
      {!isLowBandwidthMode && webGlSupported ? (
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Ultra-fast, low-bandwidth SVG African kinetic sculpture */
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 200 200">
            {/* Outer golden athletic track ring */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="#E5A93C" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#D9531E" strokeWidth="3" opacity="0.6" />
            {/* Kenya Rift Green ribbon */}
            <circle cx="100" cy="100" r="55" fill="none" stroke="#1F4E38" strokeWidth="2" strokeDasharray="12 4" />
            {/* Geometric African soccer pentagon center */}
            <polygon points="100,60 135,85 122,128 78,128 65,85" fill="#121314" stroke="#E5A93C" strokeWidth="2" />
            <polygon points="100,75 120,90 112,115 88,115 80,90" fill="#C84B31" />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center p-4">
            <span className="text-xs font-bold text-earth-600 uppercase tracking-widest">
              Low-Bandwidth Mode
            </span>
            <p className="text-[11px] text-savannah-700 max-w-[160px]">
              Fast vector rendering active for battery & data savings.
            </p>
          </div>
        </div>
      )}

      {/* Mode Switcher & Interactive Prompt Pill */}
      <div className="absolute bottom-3 right-4 flex items-center gap-2 z-10">
        <button
          type="button"
          onClick={() => setIsLowBandwidthMode(!isLowBandwidthMode)}
          aria-label={isLowBandwidthMode ? 'Enable 3D WebGL visuals' : 'Switch to low-data mode'}
          className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-savannah-300 text-xs font-medium text-obsidian shadow-sm hover:shadow transition-all flex items-center gap-1.5"
        >
          {isLowBandwidthMode ? (
            <>
              <Zap className="w-3.5 h-3.5 text-sun-600" />
              <span>Turn On 3D Motion</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-savannah-600" />
              <span>Low-Data Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Floating 3D interaction label */}
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sun-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sun-500" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-savannah-700 bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-savannah-200 shadow-sm flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-earth-600" />
          Interactive 3D Living Monument • Move Cursor
        </span>
      </div>
    </div>
  );
}
