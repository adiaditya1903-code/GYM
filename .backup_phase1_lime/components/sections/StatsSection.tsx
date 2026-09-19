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
    label: "Fitness Legacy",
    sublabel: "Pioneering athletic training protocols",
  },
  {
    id: "members",
    target: 100,
    suffix: "+",
    label: "Active Athletes",
    sublabel: "Committed lifters and champions",
  },
  {
    id: "trainers",
    target: 10,
    suffix: "+",
    label: "Expert Coaches",
    sublabel: "Certified exercise scientists",
  },
  {
    id: "workouts",
    target: 50,
    suffix: "K+",
    label: "Logged Sessions",
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
      className="relative py-20 bg-[#080808] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center sm:items-start p-6 sm:p-8 rounded-3xl bg-[#171717] border border-white/10 hover:border-[#D7FF00]/40 transition-all duration-300 group shadow-xl hover:-translate-y-1"
            >
              {/* Counter Value */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-space tracking-tight text-white mb-2 flex items-baseline group-hover:text-[#D7FF00] transition-colors">
                <span>{counts[stat.id]}</span>
                <span className="text-[#D7FF00] text-2xl sm:text-3xl ml-1">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider mb-1 font-space">
                {stat.label}
              </h3>

              {/* Sublabel */}
              <p className="text-xs text-[#A3A3A3] font-normal leading-relaxed text-center sm:text-left">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
