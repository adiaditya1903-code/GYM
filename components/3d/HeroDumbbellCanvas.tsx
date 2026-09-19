"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createProceduralDumbbell } from "./three-helpers";

export default function HeroDumbbellCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        setIsLoading(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      setIsLoading(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      setIsLoading(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Remove any previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Key Keylight (Electric Cyber tint)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cyan/Lime Rim Light
    const rimLight = new THREE.DirectionalLight(0x10ffa0, 2.2);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    // Soft Blue Fill Light
    const fillLight = new THREE.DirectionalLight(0x4a72ff, 1.2);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // 3D Dumbbell Object
    const dumbbell = createProceduralDumbbell();
    // Default dynamic diagonal angle
    dumbbell.rotation.x = 0.35;
    dumbbell.rotation.y = 0.5;
    dumbbell.rotation.z = -0.4;
    scene.add(dumbbell);

    // Background floating particle dust
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 85;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleVelocities: { y: number; x: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleVelocities.push({
        y: 0.003 + Math.random() * 0.006,
        x: (Math.random() - 0.5) * 0.002,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x10ffa0,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Interactive Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.45;
      targetMouseY = y * 0.35;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouseX = x * 0.35;
        targetMouseY = y * 0.25;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);
    setIsLoading(false);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Floating sine wave
      const floatY = Math.sin(elapsedTime * 1.6) * 0.15;
      dumbbell.position.y = floatY;

      // Slow idle rotation + mouse reactivity
      dumbbell.rotation.y = 0.5 + elapsedTime * 0.25 + currentMouseX;
      dumbbell.rotation.x = 0.35 + Math.sin(elapsedTime * 0.8) * 0.1 + currentMouseY;
      dumbbell.rotation.z = -0.4 + Math.cos(elapsedTime * 0.6) * 0.08;

      // Animate background particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] += particleVelocities[i].y;
        arr[i * 3] += particleVelocities[i].x;
        if (arr[i * 3 + 1] > 6) {
          arr[i * 3 + 1] = -6;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      // Clean up Three.js objects
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full min-h-[420px] flex flex-col items-center justify-center p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-[#121620] to-[#07080A] text-center">
        <div className="w-32 h-32 rounded-full bg-[#10FFA0]/10 border border-[#10FFA0]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,255,160,0.2)]">
          <svg className="w-16 h-16 text-[#10FFA0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-sm font-semibold tracking-wider uppercase text-[#10FFA0]">DITO High-Grade Dumbbell</p>
        <p className="text-xs text-slate-400 mt-1">Procedural 3D Model Optimized</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[460px] lg:h-[580px] flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">
          <div className="w-6 h-6 border-2 border-[#10FFA0] border-t-transparent rounded-full animate-spin mr-3" />
          Initializing 3D Engine...
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700"
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
}

