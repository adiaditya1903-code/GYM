"use client";

import React from "react";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FinalCtaSection() {
  return (
    <section className="relative py-32 sm:py-44 bg-[#0A0A0C] border-t border-[#262933] overflow-hidden select-none font-sans">
      
      {/* Background Micro Orange Scanline Indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5E14] to-transparent opacity-80" />

      {/* Atmospheric Orange Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5E14]/[0.08] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Top Indicator */}
        <div className="flex items-center justify-between border-b border-[#262933] pb-4 mb-16 font-space text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
            <span className="text-[#FF5E14] font-bold uppercase tracking-wider">// 12: COMMITMENT INITIATION</span>
          </div>
          <span className="text-white font-bold tracking-wider uppercase">DITO FITNESS • ALMATTI</span>
        </div>

        {/* Giant Interactive Statement */}
        <div className="relative my-auto">
          <h2 className="font-space font-black uppercase tracking-tighter leading-[0.82] text-[#FFFFFF]">
            <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px]">
              YOUR
            </span>
            <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px] text-white/20 hover:text-white transition-colors">
              NEXT
            </span>
            <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px]">
              REP
            </span>
            <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px] text-white/20 hover:text-white transition-colors">
              STARTS
            </span>
            <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[130px] xl:text-[160px] text-[#FF5E14] orange-glow">
              HERE<span className="text-white">.</span>
            </span>
          </h2>

          {/* Floating Action Button Dock */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-[#262933]">
            <div className="font-space text-xs text-[#94A3B8] max-w-sm">
              <span className="text-white block font-bold mb-1 uppercase tracking-wider">// ZERO COMPROMISE. MAXIMUM ADAPTATION.</span>
              <span className="font-sans">Join a collective of dedicated lifters and athletes engineered for progressive strength and physical excellence.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a href="#membership">
                <Button size="lg" variant="primary" glow className="gap-3 w-full sm:w-auto">
                  <span>JOIN DITO TODAY</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>

              <a href="#contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <span>BOOK FACILITY TOUR</span>
                </Button>
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
