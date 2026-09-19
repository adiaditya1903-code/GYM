"use client";

import React, { useEffect, useState, useRef } from "react";

interface TelemetryMetric {
  id: string;
  number: string;
  kernelKey: string;
  label: string;
  value: number;
  suffix: string;
  displayValue?: string;
  metricCategory: string;
  progressPercent: number;
  benchmark: string;
}

const METRICS: TelemetryMetric[] = [
  {
    id: "strength",
    number: "01",
    kernelKey: "METRIC.STRENGTH_LOAD",
    label: "STRENGTH CAPACITY",
    value: 38,
    suffix: "%",
    metricCategory: "COMPOUND OVERLOAD",
    progressPercent: 88,
    benchmark: "AVERAGE 16-WEEK PROGRESSION",
  },
  {
    id: "consistency",
    number: "02",
    kernelKey: "METRIC.ADHERENCE_RATE",
    label: "SESSION ADHERENCE",
    value: 98,
    suffix: ".4%",
    metricCategory: "PROGRAM COMPLIANCE",
    progressPercent: 98,
    benchmark: "VERIFIED ACTIVE RETENTION",
  },
  {
    id: "athletes",
    number: "03",
    kernelKey: "METRIC.ACTIVE_ATHLETES",
    label: "ROSTERED ATHLETES",
    value: 1200,
    suffix: "+",
    metricCategory: "SANCTUARY ROSTER",
    progressPercent: 92,
    benchmark: "TRACKED IN ALMATTI FACILITY",
  },
  {
    id: "satisfaction",
    number: "04",
    kernelKey: "METRIC.COACH_SCORE",
    label: "COACHING RATING",
    value: 49,
    suffix: "/5.0",
    displayValue: "4.9",
    metricCategory: "ATHLETE SATISFACTION",
    progressPercent: 96,
    benchmark: "ANONYMOUS BI-WEEKLY REVIEWS",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentValues, setCurrentValues] = useState<{ [key: string]: number }>({
    strength: 0,
    consistency: 0,
    athletes: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600;
          const startTime = performance.now();

          const updateCounters = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCurrentValues({
              strength: Math.floor(easeOut * 38),
              consistency: Math.floor(easeOut * 98),
              athletes: Math.floor(easeOut * 1200),
              satisfaction: Math.floor(easeOut * 49),
            });

            if (progress < 1) {
              requestAnimationFrame(updateCounters);
            }
          };

          requestAnimationFrame(updateCounters);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#0A0A0C] border-y border-[#262933] relative overflow-hidden font-sans select-none"
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Telemetry Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#262933] pb-4 mb-10 gap-3 text-xs text-[#94A3B8] font-space">
          <div className="flex items-center gap-3">
            <span className="text-[#FF5E14] font-bold">04 // ATHLETIC TELEMETRY</span>
            <span className="text-white/20">|</span>
            <span className="text-[#FFFFFF]">VERIFIED PROGRESSION METRICS</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
              <span className="text-[#FF5E14] font-bold">LIVE TELEMETRY STREAM</span>
            </div>
            <span>SAMPLE SIZE: N=1,200</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#262933] border border-[#262933] rounded-xl bg-[#121318] overflow-hidden shadow-xl">
          {METRICS.map((metric) => {
            let valStr = `${currentValues[metric.id]}${metric.suffix}`;
            if (metric.id === "satisfaction") {
              const num = (currentValues[metric.id] / 10).toFixed(1);
              valStr = `${num}${metric.suffix}`;
            }

            return (
              <div
                key={metric.id}
                className="p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:bg-white/[0.02] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-space text-[#94A3B8] mb-3">
                    <span className="text-[#FF5E14] font-bold text-[11px]">{metric.kernelKey}</span>
                    <span className="text-[10px] text-[#94A3B8] uppercase">{metric.metricCategory}</span>
                  </div>

                  <h3 className="text-xs text-[#94A3B8] uppercase tracking-wider mb-2 font-space font-semibold">
                    {metric.label}
                  </h3>

                  <div className="text-3xl sm:text-4xl lg:text-5xl font-space font-black text-[#FFFFFF] tracking-tight">
                    {valStr}
                  </div>
                </div>

                {/* Animated Telemetry Progress Line */}
                <div className="space-y-2 pt-4 border-t border-[#262933]">
                  <div className="w-full bg-[#1A1C24] h-[4px] rounded-full overflow-hidden">
                    <div
                      className="bg-[#FF5E14] h-full rounded-full shadow-[0_0_12px_rgba(255,94,20,0.85)] transition-all duration-1000 ease-out"
                      style={{
                        width: hasAnimated ? `${metric.progressPercent}%` : "0%",
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#94A3B8] font-space">
                    <span className="text-white/40">BENCHMARK</span>
                    <span className="text-[#94A3B8] font-semibold">{metric.benchmark}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
