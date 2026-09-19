"use client";

import React from "react";
import Image from "next/image";
import { TRANSFORMATIONS } from "@/data/testimonials";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, TrendingUp, CalendarCheck, Dumbbell, ShieldAlert } from "lucide-react";

export default function ProgressSection() {
  return (
    <section className="py-28 bg-[#090C13] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00F08B]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00F08B]">
              VERIFIED BIOMETRICS & DATA
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space mb-4">
            PROGRESS IS BUILT, <br />
            <span className="text-[#00F08B]">NOT WISHED FOR.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Adherence, periodized loading, and nutritional precision. Real adaptations tracked through comprehensive kinetic testing.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Demonstration progress models. Individual outcomes vary by baseline and adherence.</span>
          </div>
        </div>

        {/* Progress Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TRANSFORMATIONS.map((story) => (
            <div
              key={story.id}
              className="rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#00F08B]/30 transition-all duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="lime">{story.duration}</Badge>
                  <span className="text-xs font-mono text-slate-400">CASE STUDY #{story.id.toUpperCase()}</span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-white font-space mb-1">
                  {story.headline}
                </h3>
                <p className="text-xs text-slate-400 mb-6 font-medium">
                  Protocol: {story.protocol}
                </p>

                {/* Split Before / After Images */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Before */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 group">
                    <Image
                      src={story.imageUrlBefore}
                      alt="Baseline evaluation phase"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover filter grayscale contrast-125"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-slate-300 border border-white/10">
                      Baseline
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#00F08B]/40 group shadow-[0_0_20px_rgba(0,240,139,0.15)]">
                    <Image
                      src={story.imageUrlAfter}
                      alt="Conditioned adaptation phase"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover filter contrast-110"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-gradient-to-r from-[#00F08B] to-[#00D488] text-[#08090D] text-[10px] font-black uppercase tracking-wider shadow-md">
                      Week 16 Result
                    </div>
                  </div>
                </div>

                {/* Core Tracked Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="flex items-center justify-center text-[#00F08B] mb-1">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-base font-black text-white font-space block">
                      {story.strengthGain}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                      Strength Metric
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="flex items-center justify-center text-[#00D4FF] mb-1">
                      <CalendarCheck className="w-4 h-4" />
                    </div>
                    <span className="text-base font-black text-white font-space block">
                      {story.consistency}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                      Consistency
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="flex items-center justify-center text-[#00F08B] mb-1">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <span className="text-base font-black text-white font-space block">
                      {story.workoutsCompleted}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                      Workouts Logged
                    </span>
                  </div>
                </div>
              </div>

              {/* Disclaimer footer */}
              <p className="text-[10px] text-slate-500 pt-3 border-t border-white/[0.06] italic leading-normal">
                {story.notes}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

