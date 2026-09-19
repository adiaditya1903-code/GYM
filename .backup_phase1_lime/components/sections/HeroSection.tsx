"use client";

import React from "react";
import { ArrowRight, Clock, Users, Award, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import HeroDumbbellCanvas from "@/components/3d/HeroDumbbellCanvas";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern bg-[#080808]"
    >
      {/* Dark cinematic lighting */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D7FF00]/[0.035] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Brand Messaging */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Small Label Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-white/10 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D7FF00] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
                DITO FITNESS / ATHLETIC PERFORMANCE
              </span>
            </div>

            {/* Large Typography */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight uppercase leading-[0.92] mb-6 font-space">
              <span className="text-white block">BUILD YOUR</span>
              <span className="metallic-text block">STRONGEST</span>
              <span className="text-white block">
                VERSION<span className="text-[#D7FF00]">.</span>
              </span>
            </h1>

            {/* Tagline / Value Proposition */}
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#A3A3A3] mb-8 flex items-center gap-2.5">
              <span className="w-5 h-[1.5px] bg-[#D7FF00]" />
              <span>Train Hard. Move Better. Become DITO.</span>
            </p>

            <p className="text-sm sm:text-base text-[#A3A3A3] max-w-lg mb-10 leading-relaxed font-normal">
              State-of-the-art training sanctuary engineered with Olympic-grade competition apparatus, progressive overload periodization, and bespoke athletic coaching.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a href="#membership" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" glow className="w-full sm:w-auto">
                  <span>JOIN THE GYM</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>

              <a href="#membership" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  VIEW MEMBERSHIPS
                </Button>
              </a>
            </div>

            {/* High-Trust Quick Metrics Bar */}
            <div className="mt-12 pt-6 border-t border-white/10 w-full grid grid-cols-3 gap-4">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-space">15,000</span>
                <p className="text-[11px] text-[#A3A3A3] uppercase tracking-wider font-semibold mt-0.5">Sq.Ft Facility</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#D7FF00] font-space">24/7</span>
                <p className="text-[11px] text-[#A3A3A3] uppercase tracking-wider font-semibold mt-0.5">Club Access</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-space">100%</span>
                <p className="text-[11px] text-[#A3A3A3] uppercase tracking-wider font-semibold mt-0.5">Biometric Pass</p>
              </div>
            </div>
          </div>

          {/* Right Hero Column: 3D Dumbbell & Floating Badges */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* 3D Canvas */}
            <div className="w-full relative z-0">
              <HeroDumbbellCanvas />
            </div>

            {/* Floating UI Card 1: 24/7 ACCESS (Top Left) */}
            <div className="hidden sm:flex absolute top-4 left-0 sm:left-2 z-20 glass-panel px-4 py-2.5 rounded-2xl items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.6)] border border-white/10 hover:border-[#D7FF00]/40 transition-all hover:scale-105 select-none animate-float">
              <div className="w-8 h-8 rounded-xl bg-[#D7FF00]/10 flex items-center justify-center text-[#D7FF00]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wider uppercase font-space">24/7 ACCESS</p>
                <p className="text-[10px] text-[#A3A3A3]">Never Miss A Session</p>
              </div>
            </div>

            {/* Floating UI Card 2: 500+ ATHLETES (Top Right) */}
            <div className="hidden sm:flex absolute top-8 right-0 sm:right-2 z-20 glass-panel px-4 py-2.5 rounded-2xl items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.6)] border border-white/10 hover:border-[#D7FF00]/40 transition-all hover:scale-105 select-none animate-float-delayed">
              <div className="w-8 h-8 rounded-xl bg-[#D7FF00]/10 flex items-center justify-center text-[#D7FF00]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wider uppercase font-space">500+ ATHLETES</p>
                <p className="text-[10px] text-[#A3A3A3]">Elite Community</p>
              </div>
            </div>

            {/* Floating UI Card 3: 15+ COACHES (Bottom Left) */}
            <div className="hidden md:flex absolute bottom-6 left-0 sm:left-4 z-20 glass-panel px-4 py-2.5 rounded-2xl items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.6)] border border-white/10 hover:border-[#D7FF00]/40 transition-all hover:scale-105 select-none animate-float-delayed">
              <div className="w-8 h-8 rounded-xl bg-[#D7FF00]/10 flex items-center justify-center text-[#D7FF00]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wider uppercase font-space">15+ COACHES</p>
                <p className="text-[10px] text-[#A3A3A3]">CSCS & NASM Certified</p>
              </div>
            </div>

            {/* Floating UI Card 4: RESULTS FIRST (Bottom Right) */}
            <div className="hidden sm:flex absolute bottom-8 right-0 sm:right-4 z-20 glass-panel-glow px-4 py-2.5 rounded-2xl items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.6)] select-none hover:scale-105 transition-all animate-float">
              <div className="w-8 h-8 rounded-xl bg-[#D7FF00] text-[#080808] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <div>
                <p className="text-xs font-black text-white tracking-wider uppercase font-space">RESULTS FIRST</p>
                <p className="text-[10px] text-[#D7FF00] font-semibold">Telemetry Tracked</p>
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#stats"
            className="flex flex-col items-center text-xs text-[#A3A3A3] hover:text-[#D7FF00] transition-colors"
            aria-label="Scroll down to gym statistics"
          >
            <span className="uppercase tracking-[0.25em] font-bold mb-1 text-[10px]">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#D7FF00]" />
          </a>
        </div>
      </div>
    </section>
  );
}
