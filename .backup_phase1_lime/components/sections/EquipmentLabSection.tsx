"use client";

import React, { useState } from "react";
import { EQUIPMENT_ITEMS, EquipmentItem } from "@/data/equipment";
import EquipmentLabCanvas from "@/components/3d/EquipmentLabCanvas";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RotateCw, Box, Sparkles, Layers } from "lucide-react";

export default function EquipmentLabSection() {
  const [selectedId, setSelectedId] = useState<EquipmentItem["id"]>("dumbbell");
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);

  const activeItem = EQUIPMENT_ITEMS.find((item) => item.id === selectedId) || EQUIPMENT_ITEMS[0];

  return (
    <section id="lab" className="py-28 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D7FF00]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D7FF00]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
              INTERACTIVE 3D CAD STUDIO
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space mb-4">
            THE DITO <span className="text-[#D7FF00]">EQUIPMENT LAB.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A3A3A3]">
            Inspect our calibrated competition apparatus in real-time 3D. Diamond knurling, certified weight tolerances, and biomechanical ergonomics.
          </p>
        </div>

        {/* Object Selector Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {EQUIPMENT_ITEMS.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#D7FF00] text-[#080808] shadow-[0_0_20px_rgba(215,255,0,0.3)] scale-105"
                    : "bg-[#171717] text-[#A3A3A3] border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Box className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Studio Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          
          {/* Left Column: 3D Viewport with Controls */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Viewport Box */}
            <div className="relative">
              <EquipmentLabCanvas
                selectedEquipment={selectedId}
                wireframeMode={wireframeMode}
                autoRotate={autoRotate}
              />

              {/* Viewport Overlay Controls */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                    autoRotate
                      ? "bg-[#D7FF00]/20 text-[#D7FF00] border-[#D7FF00]/40"
                      : "bg-black/60 text-[#A3A3A3] border-white/10 hover:text-white"
                  }`}
                  title="Toggle continuous rotation"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
                  <span>Auto-Spin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWireframeMode(!wireframeMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                    wireframeMode
                      ? "bg-[#D7FF00]/20 text-[#D7FF00] border-[#D7FF00]/40"
                      : "bg-black/60 text-[#A3A3A3] border-white/10 hover:text-white"
                  }`}
                  title="Toggle wireframe topology"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Wireframe</span>
                </button>
              </div>

              {/* Interaction Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-[#A3A3A3] pointer-events-none select-none flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF00] animate-ping" />
                <span>Click & drag to rotate 360°</span>
              </div>
            </div>

          </div>

          {/* Right Column: Spec Sheet & Engineering Data */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="lime">{activeItem.category}</Badge>
                <span className="text-xs font-mono text-[#A3A3A3]">LAB-SPEC-0{EQUIPMENT_ITEMS.indexOf(activeItem) + 1}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight font-space mt-1 mb-1">
                {activeItem.name}
              </h3>
              
              <p className="text-sm font-semibold text-[#D7FF00] mb-4 font-space">
                &ldquo;{activeItem.tagline}&rdquo;
              </p>

              {activeItem.description && (
                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed mb-6">
                  {activeItem.description}
                </p>
              )}

              {/* Key Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-[#A3A3A3] tracking-wider block mb-1">
                    Material / Build
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {activeItem.specs.material}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-[#A3A3A3] tracking-wider block mb-1">
                    Tolerance Standard
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#D7FF00]">
                    {activeItem.specs.tolerance}
                  </span>
                </div>
              </div>

              {/* Engineering Specs List */}
              <div className="space-y-2 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-space">
                  Key Engineered Features:
                </h4>
                {activeItem.keyBenefits.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#A3A3A3]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D7FF00]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <a href="#membership" className="flex-1">
                <Button size="md" variant="primary" glow className="w-full">
                  Train on this Gear
                </Button>
              </a>
              <a href="#workout" className="flex-1">
                <Button size="md" variant="outline" className="w-full">
                  Workout Plan
                </Button>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
