"use client";

import React from "react";
import Image from "next/image";
import { TRANSFORMATIONS } from "@/data/testimonials";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, TrendingUp, CalendarCheck, Dumbbell, ShieldAlert } from "lucide-react";

export default function ProgressSection() {
  return (
    <section className="py-28 bg-[#080808] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D7FF00]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
              VERIFIED BIOMETRICS & ADAPTATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space mb-4">
            PROGRESS IS BUILT, <br />
            <span className="text-[#D7FF00]">NOT WISHED FOR.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A3A3A3]">
            Uncompromising adherence, periodized compound loading, and nutritional precision. Real adaptations tracked through kinetic testing.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Demonstration progress models. Individual outcomes vary by baseline metrics and training adherence.</span>
          </div>
        </div>

        {/* Progress Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TRANSFORMATIONS.map((story) => (
            <div
              key={story.id}
              className="rounded-3xl bg-[#171717] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#D7FF00]/30 transition-all duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="lime">{story.duration}</Badge>
                  <span className="text-xs font-mono text-[#A3A3A3]">CASE STUDY #{story.id.toUpperCase()}</span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-white font-space mb-1">
                  {story.headline}
                </h3>
                <p className="text-xs text-[#A3A3A3] mb-6 font-medium">
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
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] border border-white/10">
                      Baseline
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#D7FF00]/40 group shadow-[0_0_20px_rgba(215,255,0,0.15)]">
                    <Image
                      src={story.imageUrlAfter}
                      alt="Conditioned adaptation phase"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover filter contrast-110"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#D7FF00] text-[#080808] text-[10px] font-black uppercase tracking-wider shadow-md">
                      Week 16 Result
                    </div>
                  </div>
                </div>

                {/* Core Tracked Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="flex items-center justify-center text-[#D7FF00] mb-1">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-base font-black text-white font-space block">
                      {story.strengthGain}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#A3A3A3]">
                      Strength Metric
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="flex items-center justify-center text-white mb-1">
                      <CalendarCheck className="w-4 h-4" />
                    </div>
                    <span className="text-base font-black text-white font-space block">
                      {story.consistency}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#A3A3A3]">
                      Consistency
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                    <div className="flex items-center justify-center text-[#D7FF00] mb-1">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <span className="text-base font-black text-white font-space block">
                      {story.workoutsCompleted}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#A3A3A3]">
                      Workouts Logged
                    </span>
                  </div>
                </div>
              </div>

              {/* Disclaimer footer */}
              <p className="text-[10px] text-[#A3A3A3] pt-3 border-t border-white/10 italic leading-normal">
                {story.notes}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
