"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROGRAMS, Program } from "@/data/programs";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const PROGRAM_IMAGES: { [key: string]: string } = {
  "strength-training": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
  "muscle-building": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
  "fat-loss": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
  "personal-training": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  "conditioning": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80",
};

export default function ProgramsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const currentProgram = PROGRAMS[activeIndex] || PROGRAMS[0];
  const activeImage = PROGRAM_IMAGES[currentProgram.id] || PROGRAM_IMAGES["strength-training"];

  return (
    <section id="programs" className="relative py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] font-sans select-none">
      
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>03 // ATHLETIC PROTOCOLS</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">STRUCTURED PERIODIZATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              PERFORMANCE <span className="text-[#FF5E14] orange-glow">PROGRAMS.</span>
            </h2>
          </div>

          <p className="text-xs text-[#94A3B8] max-w-sm">
            Select a specialized training track to inspect mechanical volume load, scheduling, and target adaptations.
          </p>
        </div>

        {/* Desktop Vertical Protocol Selector */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch min-h-[540px]">
          
          {/* Left Column: Program Track List */}
          <div className="col-span-6 flex flex-col justify-between divide-y divide-[#262933] border-y border-[#262933]">
            {PROGRAMS.map((program, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={program.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setSelectedProgram(program)}
                  data-cursor="explore"
                  className={`group relative py-6 px-5 cursor-pointer transition-all duration-150 flex items-center justify-between rounded-lg ${
                    isActive ? "bg-[#121318]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Active Orange Indicator Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-r transition-all duration-150 ${
                      isActive ? "bg-[#FF5E14] shadow-[0_0_15px_rgba(255,94,20,0.8)]" : "bg-transparent"
                    }`}
                  />

                  <div className="flex items-baseline gap-5">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? "text-[#FF5E14]" : "text-[#94A3B8] group-hover:text-white"
                      }`}
                    >
                      {program.number}
                    </span>

                    <div>
                      <h3
                        className={`text-xl xl:text-2xl font-space font-black uppercase tracking-tight transition-colors ${
                          isActive
                            ? "text-[#FFFFFF]"
                            : "text-[#94A3B8] group-hover:text-[#FFFFFF]"
                        }`}
                      >
                        {program.name}
                      </h3>
                      <p className="text-xs text-[#94A3B8] mt-0.5 font-space">
                        {program.category} • {program.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#FF5E14] font-space font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      VIEW SYLLABUS
                    </span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? "text-[#FF5E14] rotate-45" : "text-[#94A3B8] group-hover:text-white"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Program Specification Card */}
          <div className="col-span-6 flex flex-col justify-between border border-[#262933] bg-[#121318] rounded-xl relative overflow-hidden p-8 sm:p-10 shadow-2xl">
            
            {/* Background Masked Visual */}
            <div className="absolute inset-0 z-0">
              <Image
                key={activeImage}
                src={activeImage}
                alt={currentProgram.name}
                fill
                sizes="(max-width: 1520px) 50vw, 600px"
                className="object-cover grayscale contrast-125 opacity-20 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-[#121318]/90 to-transparent" />
            </div>

            {/* Content Details */}
            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-[#262933] pb-3 text-xs font-space font-bold">
                <span className="text-[#FF5E14] uppercase">
                  TRACK: {currentProgram.category}
                </span>
                <span className="px-2.5 py-0.5 bg-[#FFF5EE] text-[#0A0A0C] rounded-full text-[10px] uppercase">
                  {currentProgram.difficulty}
                </span>
              </div>

              <div>
                <h4 className="text-2xl xl:text-3xl font-space font-black uppercase text-[#FFFFFF] tracking-tight mb-2">
                  {currentProgram.name}
                </h4>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-lg font-sans">
                  {currentProgram.fullDescription}
                </p>
              </div>

              {/* Spec Parameters */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#262933] text-xs font-space">
                <div className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-lg">
                  <span className="text-[#94A3B8] block text-[10px] uppercase">TRAINING DURATION</span>
                  <span className="text-[#FFFFFF] font-bold text-sm mt-0.5 block">{currentProgram.duration}</span>
                </div>
                <div className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-lg">
                  <span className="text-[#94A3B8] block text-[10px] uppercase">WEEKLY SCHEDULE</span>
                  <span className="text-[#FFFFFF] font-bold text-sm mt-0.5 block">{currentProgram.schedule}</span>
                </div>
              </div>

              {/* Target Adaptations */}
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block mb-2 font-space font-bold">TARGET ADAPTATIONS</span>
                <div className="flex flex-wrap gap-2">
                  {currentProgram.focusAreas.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white/[0.05] border border-white/10 rounded text-[#F8FAFC] text-[11px] font-space font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Execution Trigger */}
            <div className="relative z-10 pt-5 border-t border-[#262933] flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-space">
                INCLUDED IN ALL ACCESS TIERS
              </span>
              <Button
                size="sm"
                variant="primary"
                glow
                onClick={() => setSelectedProgram(currentProgram)}
              >
                <span>VIEW SYLLABUS</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

          </div>

        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-3">
          {PROGRAMS.map((program, idx) => {
            const isExpanded = activeIndex === idx;

            return (
              <div
                key={program.id}
                className="border border-[#262933] bg-[#121318] rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(isExpanded ? -1 : idx)}
                  className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs text-[#FF5E14] font-bold font-mono">
                      {program.number}
                    </span>
                    <span className="text-base font-space font-black uppercase text-[#FFFFFF]">
                      {program.name}
                    </span>
                  </div>
                  <ArrowUpRight
                    className={`w-4 h-4 text-[#94A3B8] transition-transform ${
                      isExpanded ? "rotate-45 text-[#FF5E14]" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-[#262933] space-y-3">
                    <p className="text-xs text-[#94A3B8] leading-relaxed pt-2">
                      {program.shortDescription}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#94A3B8] pt-2 border-t border-[#262933] font-space">
                      <span>{program.duration}</span>
                      <span>{program.schedule}</span>
                    </div>

                    <Button
                      size="sm"
                      variant="primary"
                      className="w-full justify-center"
                      onClick={() => setSelectedProgram(program)}
                    >
                      <span>VIEW FULL SYLLABUS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Curriculum Syllabus Inspection Modal */}
      {selectedProgram && (
        <Modal
          isOpen={!!selectedProgram}
          onClose={() => setSelectedProgram(null)}
          title={`PROGRAM SYLLABUS // ${selectedProgram.name}`}
          maxWidth="3xl"
        >
          <div className="space-y-5 font-space text-xs text-[#94A3B8]">
            <div className="flex flex-wrap items-center gap-4 text-xs border-b border-[#262933] pb-3 text-[#94A3B8]">
              <span className="text-[#FF5E14] font-bold">DIFFICULTY: {selectedProgram.difficulty}</span>
              <span>•</span>
              <span>DURATION: {selectedProgram.duration}</span>
              <span>•</span>
              <span className="text-[#FFFFFF]">SCHEDULE: {selectedProgram.schedule}</span>
            </div>

            <div>
              <h4 className="text-[10px] text-[#94A3B8] uppercase mb-1 font-bold">METHODOLOGY & PERIODIZATION</h4>
              <p className="text-xs text-[#FFFFFF] leading-relaxed font-sans">
                {selectedProgram.fullDescription}
              </p>
            </div>

            {/* Representative Training Routine */}
            <div className="p-4 bg-[#1A1C24] border border-[#262933] rounded-lg space-y-3">
              <div className="flex items-center justify-between border-b border-[#262933] pb-2 text-xs">
                <span className="text-[#FF5E14] font-bold uppercase">PRIMARY COMPOUND MOVEMENT BLOCK</span>
                <span className="text-[#94A3B8]">INTENSITY TARGET</span>
              </div>

              <div className="space-y-2">
                {selectedProgram.sampleSession.main.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] text-xs">
                    <span className="text-[#FFFFFF] font-semibold">{ex.exercise}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#94A3B8]">{ex.sets}</span>
                      <span className="px-2 py-0.5 bg-[#FF5E14]/15 border border-[#FF5E14]/30 rounded text-[10px] text-[#FF5E14] font-mono font-bold">
                        {ex.rpe}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-[#262933]">
              <span className="text-xs text-[#94A3B8]">AVAILABLE ACROSS ALL MEMBERSHIPS</span>
              <a href="#membership" onClick={() => setSelectedProgram(null)}>
                <Button size="sm" variant="primary">
                  <span>ENROLL NOW</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      )}

    </section>
  );
}
