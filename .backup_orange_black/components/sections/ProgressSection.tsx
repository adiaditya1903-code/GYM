"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { TRANSFORMATIONS } from "@/data/testimonials";
import { ArrowRight, MoveHorizontal, CheckCircle, TrendingUp, Quote } from "lucide-react";

export default function ProgressSection() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentStory = TRANSFORMATIONS[activeStoryIndex] || TRANSFORMATIONS[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <section id="progress" className="py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] relative overflow-hidden select-none font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>09 // PROVEN RESULTS</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">BIOMETRIC TRANSFORMATIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              VERIFIED <span className="text-[#FF5E14] orange-glow">PROGRESS.</span>
            </h2>
          </div>

          {/* Story Selector Pills */}
          <div className="flex items-center gap-2 bg-[#121318] p-1.5 rounded-full border border-[#262933] font-space text-xs font-bold">
            {TRANSFORMATIONS.map((story, idx) => (
              <button
                key={story.id}
                type="button"
                onClick={() => setActiveStoryIndex(idx)}
                className={`px-4 py-1.5 rounded-full transition-all uppercase ${
                  activeStoryIndex === idx
                    ? "bg-[#FF5E14] text-white shadow-[0_0_12px_rgba(255,94,20,0.5)]"
                    : "text-[#94A3B8] hover:text-[#FFFFFF]"
                }`}
              >
                CASE 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Draggable Comparison Stage & Biometrics Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Interactive Draggable Comparison Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={() => (isDragging.current = true)}
              onMouseUp={() => (isDragging.current = false)}
              onMouseLeave={() => (isDragging.current = false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[4/3] sm:aspect-[16/10] w-full border border-[#262933] rounded-2xl overflow-hidden cursor-ew-resize bg-[#121318] shadow-2xl"
            >
              {/* After / Progress Image (Base Background) */}
              <div className="absolute inset-0">
                <Image
                  src={currentStory.imageUrlAfter}
                  alt={`${currentStory.headline} Progress`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover grayscale contrast-125"
                  priority
                />
                <div className="absolute bottom-4 right-4 font-space font-bold text-xs bg-[#0A0A0C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#FF5E14] border border-[#FF5E14]/40 flex items-center gap-1.5">
                  <span>AFTER // TRANSFORMED</span>
                </div>
              </div>

              {/* Before / Start Image (Clipped Overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={currentStory.imageUrlBefore}
                    alt={`${currentStory.headline} Start`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover grayscale contrast-110"
                    priority
                  />
                  <div className="absolute bottom-4 left-4 font-space font-bold text-xs bg-[#0A0A0C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white/80 border border-white/20 flex items-center gap-1.5">
                    <span>BEFORE // BASELINE</span>
                  </div>
                </div>
              </div>

              {/* Central Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#FF5E14] z-20 pointer-events-none shadow-[0_0_15px_rgba(255,94,20,0.9)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FF5E14] text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,94,20,0.9)]">
                  <MoveHorizontal className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Top Hint Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-space text-[10px] text-[#94A3B8] pointer-events-none font-bold">
                <span className="bg-[#0A0A0C]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[#FFFFFF]">
                  DRAG SLIDER TO REVEAL
                </span>
                <span className="bg-[#0A0A0C]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[#FF5E14]">
                  DURATION: {currentStory.duration.toUpperCase()}
                </span>
              </div>

            </div>
          </div>

          {/* Right: Authenticated Biometric Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs text-[#FF5E14] font-space uppercase font-bold tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FF5E14]" />
                CASE STUDY // #{currentStory.id.toUpperCase()}
              </span>

              <h3 className="text-3xl sm:text-4xl font-space font-black uppercase text-[#FFFFFF] tracking-tight">
                {currentStory.headline}
              </h3>

              <div className="text-xs text-[#94A3B8] pt-1 font-space">
                TRAINING PROTOCOL: <span className="text-white font-bold">{currentStory.protocol}</span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-4 font-space text-xs pt-2">
              <div className="p-4 bg-[#121318] border border-[#262933] rounded-xl">
                <span className="text-[#94A3B8] block text-[11px] uppercase font-semibold">BODY FAT LOSS</span>
                <span className="text-2xl sm:text-3xl font-space font-black text-[#FF5E14] mt-1 block">
                  {currentStory.bodyCompChange}
                </span>
                <span className="text-[10px] text-[#94A3B8]">DEXA SCAN VERIFIED</span>
              </div>

              <div className="p-4 bg-[#121318] border border-[#262933] rounded-xl">
                <span className="text-[#94A3B8] block text-[11px] uppercase font-semibold">1RM STRENGTH GAIN</span>
                <span className="text-2xl sm:text-3xl font-space font-black text-[#FFFFFF] mt-1 block">
                  {currentStory.strengthGain}
                </span>
                <span className="text-[10px] text-[#94A3B8]">COMPOUND OVERLOAD</span>
              </div>

              <div className="p-4 bg-[#121318] border border-[#262933] rounded-xl">
                <span className="text-[#94A3B8] block text-[11px] uppercase font-semibold">SESSIONS COMPLETED</span>
                <span className="text-2xl sm:text-3xl font-space font-black text-[#FFFFFF] mt-1 block">
                  {currentStory.workoutsCompleted}
                </span>
                <span className="text-[10px] text-[#94A3B8]">ZERO SKIPPED SESSIONS</span>
              </div>

              <div className="p-4 bg-[#121318] border border-[#262933] rounded-xl">
                <span className="text-[#94A3B8] block text-[11px] uppercase font-semibold">ADHERENCE RATE</span>
                <span className="text-2xl sm:text-3xl font-space font-black text-[#FF5E14] mt-1 block">
                  {currentStory.consistency}
                </span>
                <span className="text-[10px] text-[#94A3B8]">VERIFIED CHECK-INS</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#121318] border border-[#262933] rounded-xl text-xs text-[#94A3B8] font-sans italic leading-relaxed">
              <Quote className="w-5 h-5 text-[#FF5E14] shrink-0 mt-0.5 not-italic" />
              <span>&ldquo;{currentStory.notes}&rdquo;</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
