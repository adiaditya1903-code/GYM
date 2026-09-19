"use client";

import React from "react";
import { ArrowRight, Clock, Users, Award, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import HeroDumbbellCanvas from "@/components/3d/HeroDumbbellCanvas";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern bg-[#08090D]"
    >
      {/* Dynamic atmospheric radial glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00F08B]/[0.05] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Small Label Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00F08B] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00F08B]">
                DITO FITNESS / ATHLETIC PERFORMANCE
              </span>
            </div>

            {/* Large Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight uppercase leading-[0.95] mb-6 font-space">
              <span className="text-white block">BUILD YOUR</span>
              <span className="metallic-text block">STRONGEST</span>
              <span className="text-[#00F08B] block">VERSION.</span>
            </h1>

            {/* Tagline */}
            <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-slate-400 mb-8 flex items-center gap-2">
              <span className="w-4 h-[1.5px] bg-[#00F08B]" />
              Train Hard. Move Better. Become DITO.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a href="#membership" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" glow className="w-full sm:w-auto">
                  <span>JOIN DITO NOW</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>

              <a href="#membership" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  EXPLORE MEMBERSHIPS
                </Button>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 pt-6 border-t border-white/[0.08] w-full grid grid-cols-3 gap-4">
              <div>
                <span className="text-2xl font-black text-white font-space">15,000</span>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Sq.Ft Facility</p>
              </div>
              <div>
                <span className="text-2xl font-black text-[#00F08B] font-space">24/7</span>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Club Access</p>
              </div>
              <div>
                <span className="text-2xl font-black text-white font-space">100%</span>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Biometric Pass</p>
              </div>
            </div>
          </div>

          {/* Right Hero Column: 3D Interactive Dumbbell & Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* 3D Canvas */}
            <div className="w-full relative z-0">
              <HeroDumbbellCanvas />
            </div>

            {/* Floating UI Card 1: 24/7 ACCESS (Top Left) */}
            <div className="absolute top-4 left-0 sm:left-4 z-20 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:border-[#00F08B]/40 transition-all hover:scale-105 select-none animate-float">
              <div className="w-8 h-8 rounded-xl bg-[#00F08B]/10 flex items-center justify-center text-[#00F08B]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wider">24/7 ACCESS</p>
                <p className="text-[10px] text-slate-400">Never Miss A Session</p>
              </div>
            </div>

            {/* Floating UI Card 2: 500+ MEMBERS (Top Right) */}
            <div className="absolute top-10 right-0 sm:right-4 z-20 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:border-[#00F08B]/40 transition-all hover:scale-105 select-none animate-float-delayed">
              <div className="w-8 h-8 rounded-xl bg-[#00F08B]/10 flex items-center justify-center text-[#00F08B]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wider">500+ MEMBERS</p>
                <p className="text-[10px] text-slate-400">Elite Community</p>
              </div>
            </div>

            {/* Floating UI Card 3: 15+ EXPERT TRAINERS (Bottom Left) */}
            <div className="absolute bottom-6 left-0 sm:left-6 z-20 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:border-[#00F08B]/40 transition-all hover:scale-105 select-none animate-float-delayed">
              <div className="w-8 h-8 rounded-xl bg-[#00F08B]/10 flex items-center justify-center text-[#00F08B]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wider">15+ EXPERT COACHES</p>
                <p className="text-[10px] text-slate-400">Certified Specialists</p>
              </div>
            </div>

            {/* Floating UI Card 4: RESULTS FIRST (Bottom Right) */}
            <div className="absolute bottom-12 right-0 sm:right-6 z-20 glass-panel-glow px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.5)] select-none hover:scale-105 transition-all animate-float">
              <div className="w-8 h-8 rounded-xl bg-[#00F08B] text-[#08090D] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-black text-white tracking-wider">RESULTS FIRST</p>
                <p className="text-[10px] text-[#00F08B] font-semibold">Telemetry Tracked</p>
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#stats"
            className="flex flex-col items-center text-xs text-slate-400 hover:text-[#00F08B] transition-colors"
            aria-label="Scroll down to fitness stats"
          >
            <span className="uppercase tracking-[0.2em] font-semibold mb-1 text-[10px]">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#00F08B]" />
          </a>
        </div>
      </div>
    </section>
  );
}

