"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, ArrowDown, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import HeroDumbbellCanvas from "@/components/3d/HeroDumbbellCanvas";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 overflow-hidden bg-[#0A0A0C] bg-athletic-grid font-sans"
    >
      {/* Background Orange & Amber Athletic Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF5E14]/[0.07] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-[#FF7A00]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Asymmetric Athletic Composition */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative">

          {/* LEFT: Index & Telemetry Sidebar */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-between h-[520px] border-r border-[#262933] pr-6 select-none text-[11px] text-[#94A3B8] font-space">
            <div className="space-y-2 text-center">
              <div>01</div>
              <div>02</div>
              <div>03</div>
              <div className="text-[#FF5E14] font-bold">04</div>
              <div>05</div>
              <div>06</div>
              <div>07</div>
              <div>08</div>
            </div>

            <div className="writing-vertical text-[10px] tracking-[0.3em] text-[#FF5E14] uppercase font-bold">
              EST. ALMATTI // 2024
            </div>

            <div className="text-[10px] text-[#94A3B8] space-y-1 text-center font-mono">
              <div>16.33°N</div>
              <div>75.89°E</div>
              <div className="text-[#FF5E14] font-bold">534M</div>
            </div>
          </div>

          {/* CENTER: Massive Typography & Athletic Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-20">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF5EE] text-[#0A0A0C] rounded-full w-fit mb-5 shadow-sm border border-white">
              <Flame className="w-3.5 h-3.5 text-[#FF5E14] fill-[#FF5E14]" />
              <span className="font-space font-bold text-[11px] uppercase tracking-wider">
                PREMIER ATHLETIC SANCTUARY
              </span>
            </div>

            {/* Brutalist Heading */}
            <div className="relative select-none">
              <h1 className="font-space font-black uppercase tracking-tighter leading-[0.85] text-[#FFFFFF]">
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[135px]">
                  DITO
                </span>
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[115px] xl:text-[150px] text-white xl:-mr-16 2xl:-mr-24">
                  FITNESS<span className="text-[#FF5E14] orange-glow">.</span>
                </span>
              </h1>

              {/* Performance Manifesto Box */}
              <div className="mt-6 sm:mt-8 p-5 bg-[#121318] border border-[#262933] rounded-xl max-w-xl text-xs sm:text-sm text-[#94A3B8] leading-relaxed shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#FF5E14] font-space font-bold uppercase tracking-wider text-[11px]">
                    // HIGH-PERFORMANCE DISCIPLINE
                  </span>
                  <span className="px-2 py-0.5 bg-[#FF5E14]/15 text-[#FF5E14] font-mono text-[10px] font-bold rounded">
                    PEAK ADAPTATION
                  </span>
                </div>
                <p className="text-[#F8FAFC]/90">
                  Engineered for dedicated athletes seeking uncompromised strength, hypertrophy periodization, and competitive physical conditioning.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a href="#membership">
                <Button size="lg" variant="primary" glow className="w-full sm:w-auto gap-2.5">
                  <span>START YOUR TRAINING</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>

              <a href="#programs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <span>EXPLORE PROTOCOLS</span>
                </Button>
              </a>

              <div className="hidden xl:flex items-center gap-4 pl-4 border-l border-[#262933] text-[11px] text-[#94A3B8] font-space">
                <div>
                  <span className="text-white block font-bold">12,000 SQ FT</span>
                  <span className="text-[#FF5E14]">ELITE FACILITY</span>
                </div>
                <div className="w-[1px] h-6 bg-[#262933]" />
                <div>
                  <span className="text-white block font-bold">ALMATTI</span>
                  <span>KARNATAKA</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: 3D Dumbbell CAD Frame & Floating Panel */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            
            {/* 3D Canvas Viewport */}
            <div className="w-full relative z-10" data-cursor="rotate">
              <HeroDumbbellCanvas />
            </div>

            {/* Vertical Athletic Visual Frame */}
            <div className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 w-48 h-[480px] border border-[#262933] overflow-hidden opacity-30 hover:opacity-75 transition-opacity duration-500 pointer-events-none -z-10 rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                alt="DITO Athletic Training"
                fill
                sizes="200px"
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]" />
            </div>

            {/* Floating Status Panel */}
            <div className="absolute -bottom-4 right-2 sm:right-4 z-20 bg-[#121318] p-4 max-w-[250px] border border-[#262933] rounded-xl shadow-2xl">
              <div className="text-[10px] text-[#FF5E14] font-space font-bold mb-1 flex items-center gap-1.5 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
                <span>FACILITY STATUS: ACTIVE</span>
              </div>
              <p className="text-xs text-[#FFFFFF] font-space font-bold leading-tight">
                STRENGTH / HYPERTROPHY / KINETICS
              </p>
              <div className="mt-2 pt-2 border-t border-[#262933] flex items-center justify-between text-[10px] text-[#94A3B8]">
                <span>APPARATUS</span>
                <span className="text-[#FF5E14] font-semibold">ELEIKO OLYMPIC</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* BOTTOM: Navigation & Brand Pillars */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 w-full pt-6 flex items-center justify-between border-t border-[#262933] select-none text-xs text-[#94A3B8] font-space">
        <a
          href="#about"
          className="group inline-flex items-center gap-2 hover:text-[#FF5E14] transition-colors"
        >
          <span>EXPLORE OUR PHILOSOPHY</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#FF5E14]" />
        </a>

        <div className="hidden sm:flex items-center gap-6 text-[11px] font-bold tracking-wider">
          <span>DISCIPLINE</span>
          <span className="text-[#FF5E14]">/</span>
          <span>MOVEMENT</span>
          <span className="text-[#FF5E14]">/</span>
          <span>STRENGTH</span>
          <span className="text-[#FF5E14]">/</span>
          <span className="text-[#FF5E14]">PRECISION</span>
        </div>
      </div>

    </section>
  );
}
