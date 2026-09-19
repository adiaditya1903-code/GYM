"use client";

import React, { useState } from "react";
import { EQUIPMENT_ITEMS, EquipmentItem } from "@/data/equipment";
import EquipmentLabCanvas from "@/components/3d/EquipmentLabCanvas";
import { RotateCw, Layers, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EquipmentLabSection() {
  const [selectedId, setSelectedId] = useState<EquipmentItem["id"]>("dumbbell");
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);

  const activeItem = EQUIPMENT_ITEMS.find((item) => item.id === selectedId) || EQUIPMENT_ITEMS[0];

  return (
    <section id="lab" className="py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] relative overflow-hidden font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-12 gap-6 select-none">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>06 // HARDWARE TELEMETRY</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">COMPETITION APPARATUS LAB</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              HARDWARE <span className="text-[#FF5E14] orange-glow">LAB.</span>
            </h2>
          </div>

          {/* Apparatus Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121318] p-1.5 rounded-xl border border-[#262933]">
            {EQUIPMENT_ITEMS.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-space text-xs font-bold uppercase transition-all ${
                    isSelected
                      ? "bg-[#FF5E14] text-white shadow-[0_0_15px_rgba(255,94,20,0.5)]"
                      : "text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-white/[0.05]"
                  }`}
                >
                  {item.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D CAD Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#262933] bg-[#121318] rounded-2xl p-6 sm:p-10 relative shadow-2xl">
          
          {/* Top Bar Label */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-[#0A0A0C]/80 backdrop-blur-md rounded-t-2xl border-b border-[#262933] px-5 flex items-center justify-between text-xs text-[#94A3B8] pointer-events-none font-space font-semibold">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
              <span className="text-white">3D VIEWPORT // {activeItem.name.toUpperCase()}</span>
            </span>
            <span className="text-[#FF5E14] hidden sm:inline">WEBGL HARDWARE ACCELERATED</span>
          </div>

          {/* Left Column: 3D Viewport with Controls */}
          <div className="lg:col-span-7 flex flex-col gap-4 mt-6">
            
            {/* Viewport Box */}
            <div data-cursor="rotate" className="relative border border-[#262933] bg-[#0A0A0C] rounded-xl overflow-hidden group">
              <EquipmentLabCanvas
                selectedEquipment={selectedId}
                wireframeMode={wireframeMode}
                autoRotate={autoRotate}
              />

              {/* Top Viewport Overlay Controls */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10 text-xs font-space font-bold">
                <button
                  type="button"
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all flex items-center gap-1.5 ${
                    autoRotate
                      ? "bg-[#FF5E14]/15 text-[#FF5E14] border-[#FF5E14]/50 shadow-[0_0_10px_rgba(255,94,20,0.3)]"
                      : "bg-[#0A0A0C]/80 text-[#94A3B8] border-[#262933] hover:text-[#FFFFFF]"
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
                  <span>AUTO-SPIN: {autoRotate ? "ON" : "OFF"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWireframeMode(!wireframeMode)}
                  className={`px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all flex items-center gap-1.5 ${
                    wireframeMode
                      ? "bg-[#FF5E14]/15 text-[#FF5E14] border-[#FF5E14]/50"
                      : "bg-[#0A0A0C]/80 text-[#94A3B8] border-[#262933] hover:text-[#FFFFFF]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>WIREFRAME</span>
                </button>
              </div>

              {/* Bottom Drag Interaction Label */}
              <div className="absolute bottom-3 right-3 text-[10px] text-[#94A3B8] bg-[#0A0A0C]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 pointer-events-none font-space font-semibold">
                <span>DRAG TO ROTATE 360°</span>
              </div>
            </div>

          </div>

          {/* Right Column: Spec Sheet & Engineering Data */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 mt-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#94A3B8] border-b border-[#262933] pb-3 mb-4 font-space font-bold">
                <span className="text-[#FF5E14] uppercase">TYPE: {activeItem.category}</span>
                <span className="text-white">SPEC REV: 0{EQUIPMENT_ITEMS.indexOf(activeItem) + 1}.0</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-space font-black uppercase text-[#FFFFFF] tracking-tight">
                {activeItem.name}
              </h3>
              
              <p className="text-xs text-[#FF5E14] font-space font-bold mt-1 mb-4 uppercase tracking-wider">
                &ldquo;{activeItem.tagline}&rdquo;
              </p>

              {activeItem.description && (
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6 font-sans">
                  {activeItem.description}
                </p>
              )}

              {/* Key Quick Stats */}
              <div className="grid grid-cols-2 gap-3 font-space text-xs mb-6">
                <div className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-lg">
                  <span className="text-[10px] text-[#94A3B8] block uppercase">MATERIAL SPEC</span>
                  <span className="text-xs font-bold text-[#FFFFFF] mt-0.5 block">
                    {activeItem.specs.material}
                  </span>
                </div>

                <div className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-lg">
                  <span className="text-[10px] text-[#94A3B8] block uppercase">TOLERANCE / GRIP</span>
                  <span className="text-xs font-bold text-[#FF5E14] mt-0.5 block">
                    {activeItem.specs.tolerance || activeItem.specs.gripDiameter}
                  </span>
                </div>
              </div>

              {/* Engineering Feature List */}
              <div className="space-y-2.5 font-space text-xs">
                {activeItem.keyBenefits.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[#94A3B8]">
                    <span className="text-[#FF5E14] font-black text-sm">&gt;</span>
                    <span className="text-[#FFFFFF]/90 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#262933] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-space">
              <span className="text-xs text-[#94A3B8] flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
                COMPETITION GRADE CERTIFIED
              </span>
              <a href="#membership">
                <Button size="sm" variant="primary" glow>
                  <span>EXPLORE ACCESS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
