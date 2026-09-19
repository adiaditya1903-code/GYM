"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROGRAMS, Program } from "@/data/programs";
import { Flame, Zap, Activity, Shield, Trophy, ArrowRight, Clock, Calendar, Check, Gauge, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const ICON_MAP: { [key: string]: React.ElementType } = {
  Flame,
  Zap,
  Activity,
  Shield,
  Trophy,
};

const PROGRAM_IMAGES: { [key: string]: string } = {
  "strength-training": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
  "muscle-building": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
  "fat-loss": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80",
  "personal-training": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  "conditioning": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
};

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <section id="programs" className="py-28 bg-[#111111] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D7FF00]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
                STRUCTURED PROTOCOLS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space">
              TRAINING <span className="text-[#D7FF00]">PROGRAMS.</span>
            </h2>
          </div>
          <p className="text-sm text-[#A3A3A3] max-w-md leading-relaxed">
            Engineered through exercise physiology, progressive overload periodization, and biomechanical precision. Zero guesswork.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((program) => {
            const IconComponent = ICON_MAP[program.iconName] || Flame;
            const bgImage = PROGRAM_IMAGES[program.id] || PROGRAM_IMAGES["strength-training"];

            return (
              <div
                key={program.id}
                className="group relative rounded-3xl overflow-hidden bg-[#171717] border border-white/10 hover:border-[#D7FF00]/40 transition-all duration-300 flex flex-col hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
              >
                {/* Top Image Banner */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={bgImage}
                    alt={program.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-transparent" />

                  {/* Program Number Pill (01, 02, 03, etc.) */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-[#080808]/90 backdrop-blur-md border border-white/15 flex items-center gap-2">
                    <span className="text-xs font-black text-[#D7FF00] font-space tracking-wider">
                      {program.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <IconComponent className="w-3.5 h-3.5 text-white" />
                  </div>

                  {/* Difficulty Tag */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="lime">{program.difficulty}</Badge>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3A3A3] block mb-1">
                      {program.category}
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2.5 font-space group-hover:text-[#D7FF00] transition-colors">
                      {program.number} — {program.name}
                    </h3>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed mb-6">
                      {program.shortDescription}
                    </p>
                  </div>

                  {/* Metadata & Button */}
                  <div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A3A3A3] mb-5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D7FF00]" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D7FF00]" />
                        <span>{program.schedule}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:border-[#D7FF00] group-hover:bg-[#D7FF00]/5"
                      onClick={() => setSelectedProgram(program)}
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-4 h-4 text-[#D7FF00] transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <Modal
          isOpen={!!selectedProgram}
          onClose={() => setSelectedProgram(null)}
          title={`${selectedProgram.number} — ${selectedProgram.name}`}
          maxWidth="3xl"
        >
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="lime">{selectedProgram.category}</Badge>
                <Badge variant="silver">{selectedProgram.difficulty}</Badge>
                <Badge variant="dark">{selectedProgram.duration}</Badge>
              </div>
              <p className="text-[#A3A3A3] text-sm leading-relaxed">
                {selectedProgram.fullDescription}
              </p>
            </div>

            {/* Target Adaptations */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 font-space">
                <Gauge className="w-4 h-4 text-[#D7FF00]" />
                Target Adaptations & Training Focus
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProgram.focusAreas.map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                    <Check className="w-4 h-4 text-[#D7FF00] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Structure Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] uppercase text-[#A3A3A3] block mb-0.5 font-semibold">Frequency</span>
                <span className="text-sm font-black text-white font-space">{selectedProgram.schedule}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] uppercase text-[#A3A3A3] block mb-0.5 font-semibold">Cycle Length</span>
                <span className="text-sm font-black text-white font-space">{selectedProgram.duration}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] uppercase text-[#A3A3A3] block mb-0.5 font-semibold">Telemetry</span>
                <span className="text-sm font-black text-[#D7FF00] font-space">Bi-Weekly</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] uppercase text-[#A3A3A3] block mb-0.5 font-semibold">Coach Oversight</span>
                <span className="text-sm font-black text-white font-space">Included</span>
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 gap-3">
              <span className="text-xs text-[#A3A3A3]">
                Full curriculum included in all DITO PRO and ELITE athlete memberships.
              </span>
              <a href="#membership" onClick={() => setSelectedProgram(null)} className="w-full sm:w-auto">
                <Button size="sm" variant="primary" glow className="w-full sm:w-auto">
                  <span>Enroll in Program</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
