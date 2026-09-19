"use client";

import React, { useState } from "react";
import { EQUIPMENT_ITEMS, EquipmentItem } from "@/data/equipment";
import EquipmentLabCanvas from "@/components/3d/EquipmentLabCanvas";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RotateCw, Box, Check, Eye, Sparkles, Layers, Sliders } from "lucide-react";

export default function EquipmentLabSection() {
  const [selectedId, setSelectedId] = useState<EquipmentItem["id"]>("dumbbell");
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);

  const activeItem = EQUIPMENT_ITEMS.find((item) => item.id === selectedId) || EQUIPMENT_ITEMS[0];

  return (
    <section id="lab" className="py-28 bg-[#08090D] border-t border-white/[0.08] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#00F08B]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00F08B]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00F08B]">
              INTERACTIVE 3D CAD STUDIO
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space mb-4">
            THE DITO <span className="text-[#00F08B]">EQUIPMENT LAB.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Inspect our calibrated competition apparatus in full real-time 3D. Precision knurling, certified weight tolerances, and bio-mechanical ergonomics.
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
                    ? "bg-gradient-to-r from-[#00F08B] to-[#00D488] text-[#08090D] shadow-[0_0_25px_rgba(0,240,139,0.3)] scale-105"
                    : "bg-[#0E121B] text-slate-300 border border-white/[0.08] hover:border-white/20 hover:text-white"
                }`}
              >
                <Box className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main 3D Studio Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0E121B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          
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
                      ? "bg-[#00F08B]/20 text-[#00F08B] border-[#00F08B]/40"
                      : "bg-black/60 text-slate-400 border-white/10 hover:text-white"
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
                      ? "bg-[#00F08B]/20 text-[#00F08B] border-[#00F08B]/40"
                      : "bg-black/60 text-slate-400 border-white/10 hover:text-white"
                  }`}
                  title="Toggle wireframe topology"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Wireframe</span>
                </button>
              </div>

              {/* Interaction Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 pointer-events-none select-none flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F08B] animate-ping" />
                <span>Click & drag to rotate 360°</span>
              </div>
            </div>

          </div>

          {/* Right Column: Spec Sheet & Engineering Data */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="lime">{activeItem.category}</Badge>
                <span className="text-xs font-mono text-[#00D4FF]">LAB-SPEC-0{EQUIPMENT_ITEMS.indexOf(activeItem) + 1}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight font-space mt-1 mb-1">
                {activeItem.name}
              </h3>
              
              <p className="text-sm font-semibold text-[#00F08B] mb-4">
                &ldquo;{activeItem.tagline}&rdquo;
              </p>

              {activeItem.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {activeItem.description}
                </p>
              )}

              {/* Key Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Material / Build
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {activeItem.specs.material}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Tolerance Standard
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#00F08B]">
                    {activeItem.specs.tolerance}
                  </span>
                </div>
              </div>

              {/* Engineering Specs List */}
              <div className="space-y-2 mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Key Engineered Benefits:
                </h4>
                {activeItem.keyBenefits.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F08B]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08]">
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

