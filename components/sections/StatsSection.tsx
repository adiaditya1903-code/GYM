"use client";

import React, { useEffect, useState, useRef } from "react";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  {
    id: "years",
    target: 5,
    suffix: "+ YEARS",
    label: "Fitness Experience",
    sublabel: "Pioneering athletic training protocols",
  },
  {
    id: "members",
    target: 100,
    suffix: "+",
    label: "Active Members",
    sublabel: "Committed lifters and athletes",
  },
  {
    id: "trainers",
    target: 10,
    suffix: "+",
    label: "Expert Trainers",
    sublabel: "Certified exercise scientists & coaches",
  },
  {
    id: "workouts",
    target: 50,
    suffix: "K+",
    label: "Workouts Completed",
    sublabel: "Tracked with zero skipped reps",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    years: 0,
    members: 0,
    trainers: 0,
    workouts: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // ms
          const startTime = performance.now();

          const updateCounts = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              years: Math.floor(ease * 5),
              members: Math.floor(ease * 100),
              trainers: Math.floor(ease * 10),
              workouts: Math.floor(ease * 50),
            });

            if (progress < 1) {
              requestAnimationFrame(updateCounts);
            } else {
              setCounts({
                years: 5,
                members: 100,
                trainers: 10,
                workouts: 50,
              });
            }
          };

          requestAnimationFrame(updateCounts);
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
      id="stats"
      ref={sectionRef}
      className="relative py-20 bg-[#0B0D14] border-y border-white/[0.08]"
    >
      {/* Subtle glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F08B]/[0.025] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center sm:items-start p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08] hover:border-[#00F08B]/40 transition-all duration-300 group shadow-xl hover:-translate-y-1"
            >
              {/* Counter Value */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-space tracking-tight text-white mb-2 flex items-baseline group-hover:text-[#00F08B] transition-colors">
                <span>{counts[stat.id]}</span>
                <span className="text-[#00F08B] text-2xl sm:text-3xl ml-1">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-sm sm:text-base font-bold text-slate-200 uppercase tracking-wider mb-1 font-space">
                {stat.label}
              </h3>

              {/* Sublabel */}
              <p className="text-xs text-slate-400 font-normal leading-relaxed text-center sm:text-left">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

