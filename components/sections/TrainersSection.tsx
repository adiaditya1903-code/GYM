"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TRAINERS, Trainer } from "@/data/trainers";
import { ArrowRight, ArrowUpRight, Award, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function TrainersSection() {
  const [activeTrainerIndex, setActiveTrainerIndex] = useState(0);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const activeTrainer = TRAINERS[activeTrainerIndex] || TRAINERS[0];

  return (
    <section id="trainers" className="py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] relative overflow-hidden font-sans select-none">
      
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>05 // COACHING ROSTER</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">EXERCISE SCIENCE FACULTY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              MASTER <span className="text-[#FF5E14] orange-glow">COACHES.</span>
            </h2>
          </div>

          <p className="text-xs text-[#94A3B8] max-w-sm">
            All DITO faculty hold CSCS and exercise science degrees. Biomechanical rigor, bar velocity tracking, and periodized athletic preparation.
          </p>
        </div>

        {/* Editorial Trainer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: Large Trainer Portrait */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] max-h-[600px] w-full border border-[#262933] rounded-2xl overflow-hidden bg-[#121318] shadow-2xl">
              <Image
                key={activeTrainer.id}
                src={activeTrainer.imageUrl}
                alt={activeTrainer.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-125 transition-all duration-500 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-85" />

              {/* Technical Badge Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] text-[#94A3B8] bg-[#0A0A0C]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 font-space font-bold">
                <span className="text-[#FF5E14] font-mono">COACH // 0{activeTrainerIndex + 1}</span>
                <span className="text-white uppercase">{activeTrainer.role}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FFFFFF] bg-[#121318]/90 backdrop-blur-md px-5 py-3 rounded-xl border border-[#262933] font-space font-bold shadow-lg">
                <div>
                  <span className="text-[10px] text-[#94A3B8] block uppercase">ACTIVE CLIENT LOAD</span>
                  <span className="text-sm text-[#FF5E14] font-mono font-bold">{activeTrainer.activeAthletes} ATHLETES</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#94A3B8] block uppercase">COACHING RATING</span>
                  <span className="text-sm text-[#FFFFFF] flex items-center gap-1 font-mono font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                    {activeTrainer.clientRating} / 5.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Dossier Index & Selector */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Active Details Display */}
            <div className="space-y-3">
              <div className="text-xs text-[#FF5E14] font-space font-bold tracking-wider uppercase">
                COACHING DOSSIER // 0{activeTrainerIndex + 1}
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-space font-black uppercase text-[#FFFFFF] tracking-tight">
                {activeTrainer.name}
              </h3>

              <div className="text-xs text-[#94A3B8] pt-0.5 font-space font-semibold">
                SPECIALIZATION: <span className="text-white">{activeTrainer.specialization}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed pt-1 font-sans">
                {activeTrainer.bio}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeTrainer.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="px-3 py-1 bg-[#121318] border border-[#262933] rounded-full text-[11px] font-space font-bold text-[#FF5E14]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Coach Selector List */}
            <div className="divide-y divide-[#262933] border-y border-[#262933] text-xs pt-2">
              {TRAINERS.map((trainer, idx) => {
                const isSelected = activeTrainerIndex === idx;
                return (
                  <button
                    key={trainer.id}
                    type="button"
                    onMouseEnter={() => setActiveTrainerIndex(idx)}
                    onClick={() => setActiveTrainerIndex(idx)}
                    className={`w-full py-4 px-3 flex items-center justify-between text-left transition-all rounded-lg ${
                      isSelected ? "bg-[#121318] text-[#FFFFFF]" : "text-[#94A3B8] hover:text-[#FFFFFF]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono font-bold ${isSelected ? "text-[#FF5E14]" : "text-[#94A3B8]"}`}>
                        0{idx + 1}
                      </span>
                      <span className="font-space font-bold uppercase text-sm sm:text-base">
                        {trainer.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block text-xs text-[#94A3B8] font-space font-semibold">
                        {trainer.experienceYears} YRS EXP
                      </span>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? "text-[#FF5E14] rotate-45" : "text-[#94A3B8]"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Trigger */}
            <div className="pt-2 flex items-center gap-3.5">
              <Button
                size="md"
                variant="primary"
                glow
                onClick={() => setSelectedTrainer(activeTrainer)}
              >
                <span>VIEW FULL DOSSIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>

              <a href="#contact">
                <Button size="md" variant="outline">
                  <span>REQUEST COACH ASSIGNMENT</span>
                </Button>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Trainer Full Dossier Modal */}
      {selectedTrainer && (
        <Modal
          isOpen={!!selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
          title={`COACH DOSSIER // ${selectedTrainer.name.toUpperCase()}`}
          maxWidth="2xl"
        >
          <div className="space-y-5 font-space text-xs text-[#94A3B8]">
            <div className="flex items-center gap-4 border-b border-[#262933] pb-4">
              <div className="relative w-16 h-16 rounded-xl border border-[#262933] shrink-0 overflow-hidden bg-[#1A1C24]">
                <Image
                  src={selectedTrainer.imageUrl}
                  alt={selectedTrainer.name}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div>
                <h4 className="text-lg font-space font-black uppercase text-[#FFFFFF]">
                  {selectedTrainer.name}
                </h4>
                <p className="text-xs text-[#FF5E14] font-bold">{selectedTrainer.role}</p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5">{selectedTrainer.experienceYears} Years Competitive Experience</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase block mb-1 font-bold">CERTIFICATIONS & ACCREDITATION</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTrainer.certifications.map((c) => (
                    <span key={c} className="px-2.5 py-1 bg-[#1A1C24] border border-[#262933] rounded text-[#FF5E14] font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-[#94A3B8] uppercase block mb-1 font-bold">COACHING BIOGRAPHY</span>
                <p className="text-xs font-sans text-[#F8FAFC]/90 leading-relaxed">
                  {selectedTrainer.bio}
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[#262933]">
              <span className="text-[11px] text-[#94A3B8]">INCLUDED IN PRO & ELITE MEMBERSHIPS</span>
              <a href="#contact" onClick={() => setSelectedTrainer(null)}>
                <Button size="sm" variant="primary">
                  <span>BOOK CONSULTATION</span>
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      )}

    </section>
  );
}
