"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createProceduralDumbbell } from "./three-helpers";

export default function HeroDumbbellCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 7.8);

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
    renderer.toneMappingExposure = 1.25;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Realistic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Light (Crisp White overhead)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Controlled Lime Rim Light (#D7FF00)
    const rimLight = new THREE.DirectionalLight(0xD7FF00, 2.0);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);

    // Soft Neutral Fill Light
    const fillLight = new THREE.DirectionalLight(0xa3a3a3, 1.0);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // 3D Dumbbell Object
    const dumbbell = createProceduralDumbbell();
    dumbbell.rotation.x = 0.35;
    dumbbell.rotation.y = 0.6;
    dumbbell.rotation.z = -0.38;
    scene.add(dumbbell);

    // Background subtle particles (micro dust)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 55;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleVelocities: { y: number; x: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleVelocities.push({
        y: 0.002 + Math.random() * 0.004,
        x: (Math.random() - 0.5) * 0.001,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD7FF00,
      size: 0.04,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Smooth Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.35;
      targetMouseY = y * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove);

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
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth mouse interpolation
        currentMouseX += (targetMouseX - currentMouseX) * 0.04;
        currentMouseY += (targetMouseY - currentMouseY) * 0.04;

        // Slow graceful floating
        const floatY = Math.sin(elapsedTime * 1.2) * 0.12;
        dumbbell.position.y = floatY;

        // Subtle idle rotation + mouse reactivity
        dumbbell.rotation.y = 0.6 + elapsedTime * 0.2 + currentMouseX;
        dumbbell.rotation.x = 0.35 + Math.sin(elapsedTime * 0.6) * 0.08 + currentMouseY;
        dumbbell.rotation.z = -0.38 + Math.cos(elapsedTime * 0.5) * 0.06;

        // Animate particles
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          arr[i * 3 + 1] += particleVelocities[i].y;
          arr[i * 3] += particleVelocities[i].x;
          if (arr[i * 3 + 1] > 5) {
            arr[i * 3 + 1] = -5;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

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
      <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center p-8 rounded-3xl border border-white/10 bg-[#171717] text-center">
        <div className="w-24 h-24 rounded-full bg-[#D7FF00]/10 border border-[#D7FF00]/30 flex items-center justify-center mb-4">
          <svg className="w-12 h-12 text-[#D7FF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-xs font-bold tracking-widest uppercase text-[#D7FF00]">DITO Metallic Dumbbell</p>
        <p className="text-[11px] text-[#A3A3A3] mt-1">Calibrated Olympic Grade</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] flex items-center justify-center select-none pointer-events-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-[#A3A3A3]">
          <div className="w-5 h-5 border-2 border-[#D7FF00] border-t-transparent rounded-full animate-spin mr-2" />
          <span>Loading 3D Visualizer...</span>
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
