"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  createProceduralDumbbell,
  createProceduralBarbell,
  createProceduralKettlebell,
  createProceduralWeightPlate,
} from "./three-helpers";
import { EquipmentItem } from "@/data/equipment";

interface EquipmentLabCanvasProps {
  selectedEquipment: EquipmentItem["id"];
  wireframeMode?: boolean;
  autoRotate?: boolean;
}

export default function EquipmentLabCanvas({
  selectedEquipment,
  wireframeMode = false,
  autoRotate = true,
}: EquipmentLabCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const activeObjectGroupRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const autoRotateRef = useRef(autoRotate);
  const wireframeModeRef = useRef(wireframeMode);

  autoRotateRef.current = autoRotate;
  wireframeModeRef.current = wireframeMode;

  // Toggle wireframe on materials
  useEffect(() => {
    if (!activeObjectGroupRef.current) return;
    activeObjectGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            (mat as THREE.MeshStandardMaterial).wireframe = wireframeMode;
          });
        } else if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframeMode;
        }
      }
    });
  }, [wireframeMode]);

  // Handle Model Switching
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Remove old model
    if (activeObjectGroupRef.current) {
      scene.remove(activeObjectGroupRef.current);
      activeObjectGroupRef.current = null;
    }

    // Spawn new model
    let newGroup: THREE.Group;
    switch (selectedEquipment) {
      case "dumbbell":
        newGroup = createProceduralDumbbell();
        newGroup.scale.set(0.9, 0.9, 0.9);
        break;
      case "barbell":
        newGroup = createProceduralBarbell();
        newGroup.scale.set(0.65, 0.65, 0.65);
        break;
      case "kettlebell":
        newGroup = createProceduralKettlebell();
        newGroup.scale.set(0.9, 0.9, 0.9);
        break;
      case "weight-plate":
        newGroup = createProceduralWeightPlate();
        newGroup.scale.set(0.95, 0.95, 0.95);
        break;
      default:
        newGroup = createProceduralDumbbell();
    }

    // Apply wireframe if active
    if (wireframeModeRef.current) {
      newGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material && !Array.isArray(mesh.material)) {
            (mesh.material as THREE.MeshStandardMaterial).wireframe = true;
          }
        }
      });
    }

    // Intro spawn animation
    newGroup.position.set(0, 0, 0);
    newGroup.rotation.set(0.2, 0.4, 0);
    scene.add(newGroup);
    activeObjectGroupRef.current = newGroup;
  }, [selectedEquipment]);

  // Main Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(6, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xD7FF00, 2.2);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    const topSoft = new THREE.DirectionalLight(0xa3a3a3, 1.2);
    topSoft.position.set(0, 8, 2);
    scene.add(topSoft);

    // Subtle circular lab pedestal
    const pedestalGeo = new THREE.CylinderGeometry(3.0, 3.2, 0.1, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.8,
      roughness: 0.5,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -2.2;
    scene.add(pedestal);

    // Glowing rim ring on pedestal
    const ringGeo = new THREE.TorusGeometry(3.02, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xD7FF00 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -2.14;
    scene.add(ring);

    // Mouse Drag Rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !activeObjectGroupRef.current) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      activeObjectGroupRef.current.rotation.y += deltaX * 0.01;
      activeObjectGroupRef.current.rotation.x += deltaY * 0.01;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !activeObjectGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      activeObjectGroupRef.current.rotation.y += deltaX * 0.012;
      activeObjectGroupRef.current.rotation.x += deltaY * 0.012;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    domEl.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotateRef.current && !isDragging && activeObjectGroupRef.current) {
        activeObjectGroupRef.current.rotation.y += delta * 0.55;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domEl.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();
      pedestalGeo.dispose();
      pedestalMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#171717] rounded-2xl border border-white/10">
        <p className="text-sm font-semibold text-[#D7FF00]">Equipment 3D Lab</p>
        <p className="text-xs text-[#A3A3A3] mt-1">WebGL acceleration not detected</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#171717] via-[#111111] to-[#080808] border border-white/10">
      {/* 3D Canvas element */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
