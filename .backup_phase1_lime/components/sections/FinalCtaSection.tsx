"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Flame } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section className="relative py-32 bg-[#080808] border-t border-white/10 overflow-hidden text-center">
      {/* Dramatic atmospheric radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D7FF00]/[0.035] rounded-full blur-[180px] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-white/10 mb-6 backdrop-blur-md">
          <Flame className="w-4 h-4 text-[#D7FF00]" />
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D7FF00] font-space">
            NO EXCUSES. NO SHORTCUTS.
          </span>
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.92] text-white font-space mb-6">
          YOUR NEXT REP <br />
          <span className="metallic-text">STARTS HERE.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#A3A3A3] max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Stop waiting for motivation. Build kinetic momentum with DITO FITNESS.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#membership" className="w-full sm:w-auto">
            <Button size="xl" variant="primary" glow className="w-full sm:w-auto text-base">
              <span>JOIN DITO FITNESS</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>

          <a href="#contact" className="w-full sm:w-auto">
            <Button size="xl" variant="outline" className="w-full sm:w-auto text-base">
              BOOK A FREE TOUR
            </Button>
          </a>
        </div>

        <p className="text-xs text-[#A3A3A3] uppercase tracking-widest mt-12 font-medium">
          DITO FITNESS • ATHLETIC PERFORMANCE SANCTUARY • 24/7 BIOMETRIC CLUB
        </p>
      </div>
    </section>
  );
}
