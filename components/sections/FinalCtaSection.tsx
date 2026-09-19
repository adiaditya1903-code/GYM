"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Flame } from "lucide-react";

export default function FinalCtaSection() {
  return (
    <section className="relative py-32 bg-[#06070A] border-t border-white/[0.08] overflow-hidden text-center">
      {/* Dramatic atmospheric radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00F08B]/[0.06] rounded-full blur-[180px] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] mb-6 backdrop-blur-md">
          <Flame className="w-4 h-4 text-[#00F08B]" />
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#00F08B]">
            NO EXCUSES. NO SHORTCUTS.
          </span>
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white font-space mb-6">
          YOUR NEXT REP <br />
          <span className="metallic-text">STARTS HERE.</span>
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Stop waiting for motivation. Start building momentum.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#membership">
            <Button size="xl" variant="primary" glow className="w-full sm:w-auto text-base">
              <span>JOIN DITO FITNESS</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>

          <a href="#contact">
            <Button size="xl" variant="outline" className="w-full sm:w-auto text-base">
              BOOK A FREE TOUR
            </Button>
          </a>
        </div>

        <p className="text-xs text-slate-400 uppercase tracking-widest mt-12 font-medium">
          DITO FITNESS • PREMIUM TRAINING CLUB • 24/7 BIOMETRIC CAMPUS
        </p>
      </div>
    </section>
  );
}

