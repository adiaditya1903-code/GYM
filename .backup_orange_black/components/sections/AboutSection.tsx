"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Dumbbell, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] font-sans select-none">
      
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-[#262933] pb-4 mb-14 text-xs text-[#94A3B8] font-space">
          <div className="flex items-center gap-3">
            <span className="text-[#FF5E14] font-bold">02 // THE PHILOSOPHY</span>
            <span className="text-white/20">|</span>
            <span className="text-[#FFFFFF]">ARCHITECTURAL ETHOS</span>
          </div>
          <span className="text-[11px] hidden sm:inline-block text-[#94A3B8]">
            FACILITY LOCATION: ALMATTI // KARNATAKA
          </span>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Bold Typography & Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h2 className="font-space font-black uppercase tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[98px] leading-[0.88] text-[#FFFFFF]">
                <span className="block hover:text-[#FF5E14] transition-colors">TRAIN</span>
                <span className="block text-white/30">HARD<span className="text-[#FF5E14]">.</span></span>
                <span className="block hover:text-[#FF7A00] transition-colors mt-2">MOVE</span>
                <span className="block text-white/30">BETTER<span className="text-[#FF7A00]">.</span></span>
                <span className="block text-[#FF5E14] orange-glow mt-2">BECOME</span>
                <span className="block text-white">MORE<span className="text-[#FF5E14]">.</span></span>
              </h2>
            </div>

            <div className="mt-8 sm:mt-12 max-w-xl">
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Most commercial gyms sell passive access to machines. DITO constructs a dedicated athletic execution environment where physical capability is non-negotiable. Every platform, barbell, and coaching protocol is designed to eliminate biomechanical friction.
              </p>

              <div className="mt-8">
                <Button
                  size="md"
                  variant="outline"
                  onClick={() => setModalOpen(true)}
                  className="gap-2.5 text-xs font-space"
                >
                  <span>READ FULL ETHOS DOSSIER</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF5E14]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Visual & Specs */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Cropped Architectural Visual */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] border border-[#262933] rounded-xl overflow-hidden bg-[#121318] group shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                alt="DITO FITNESS high-performance gym facility"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[#94A3B8] bg-[#0A0A0C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 font-space font-semibold">
                <span>SECTOR 01: FREE WEIGHTS</span>
                <span className="text-[#FF5E14]">STATUS: CALIBRATED</span>
              </div>
            </div>

            {/* Technical System Specifications */}
            <div className="divide-y divide-[#262933] border-y border-[#262933] text-xs font-space">
              <div className="py-4 flex items-start justify-between gap-4">
                <span className="text-[#FF5E14] font-bold">01 // APPARATUS</span>
                <div className="text-right">
                  <span className="text-[#FFFFFF] block font-bold">Competition Calibrated Steel</span>
                  <span className="text-[#94A3B8] text-[11px]">Eleiko bars, machined plates & pneumatic cables.</span>
                </div>
              </div>

              <div className="py-4 flex items-start justify-between gap-4">
                <span className="text-[#FF7A00] font-bold">02 // PROTOCOL</span>
                <div className="text-right">
                  <span className="text-[#FFFFFF] block font-bold">Conjugate Periodization</span>
                  <span className="text-[#94A3B8] text-[11px]">Progressive overload tailored to personal leverages.</span>
                </div>
              </div>

              <div className="py-4 flex items-start justify-between gap-4">
                <span className="text-[#FF5E14] font-bold">03 // FACILITY</span>
                <div className="text-right">
                  <span className="text-[#FFFFFF] block font-bold">12,000 SQ FT Sanctuary</span>
                  <span className="text-[#94A3B8] text-[11px]">Acoustic rubber turf, Olympic cages, Almatti KA.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Discovery Philosophy Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="DITO PHILOSOPHY & TRAINING ETHOS"
        maxWidth="2xl"
      >
        <div className="space-y-5 text-xs text-[#94A3B8] font-space leading-relaxed">
          <p className="text-[#FFFFFF] text-sm leading-relaxed">
            Founded on the principle that physical capability is the bedrock of high performance, DITO FITNESS bridges the divide between elite athletic preparation and commercial fitness.
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-[#FF5E14] font-bold uppercase tracking-wider text-xs">
              CORE ATHLETIC TENETS
            </h4>
            
            <div className="space-y-2.5">
              <div className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-lg">
                <strong className="text-[#FF5E14] block mb-1 text-xs">01 / BIOMECHANICAL RIGOR</strong>
                <span className="text-[#94A3B8]">Eliminate guesswork with structured compound loading, bar velocity tracking, and joint longevity work.</span>
              </div>
              <div className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-lg">
                <strong className="text-[#FF7A00] block mb-1 text-xs">02 / UNCOMPROMISING APPARATUS</strong>
                <span className="text-[#94A3B8]">Eleiko competition racks, calibrated steel, custom acoustic shock-absorbing flooring, and medical-grade air filtration.</span>
              </div>
              <div className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-lg">
                <strong className="text-[#FF5E14] block mb-1 text-xs">03 / RADICAL ACCOUNTABILITY</strong>
                <span className="text-[#94A3B8]">Direct coach telemetry, scheduled kinetic re-evaluations, and individualized training adaptation.</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <a href="#contact" onClick={() => setModalOpen(false)}>
              <Button size="sm" variant="primary">
                <span>SCHEDULE FACILITY TOUR</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </Modal>

    </section>
  );
}
