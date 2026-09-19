"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cpu, Target, UserCheck, Activity, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    {
      icon: Cpu,
      title: "Olympic Equipment",
      description: "Competition calibrated Eleiko bars, machined steel plates, and zero-drag pneumatic cables.",
    },
    {
      icon: Target,
      title: "Science-Led Coaching",
      description: "CSCS and exercise science credentials with proven athletic and biomechanics pedigree.",
    },
    {
      icon: UserCheck,
      title: "Bespoke Periodization",
      description: "Conjugate loading systems mapped directly to your anatomical leverages and targets.",
    },
    {
      icon: Activity,
      title: "Kinetic Telemetry",
      description: "Continuous progress tracking, bar velocity monitoring, and systemic recovery insights.",
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#080808] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#D7FF00]/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Gym Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-[0_20px_50px_rgba(0,0,0,0.8)] aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                alt="DITO FITNESS high-performance gym facility"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-110 brightness-85"
              />
              
              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#D7FF00] rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#D7FF00] rounded-br-xl pointer-events-none" />
          </div>

          {/* Right Column: Copy & Feature Grid */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D7FF00]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
                THE DITO ADVANTAGE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.02] text-white font-space mb-8">
              MORE THAN A GYM. <br />
              <span className="metallic-silver-text">YOUR ATHLETIC SANCTUARY.</span>
            </h2>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#171717] border border-white/10 hover:border-[#D7FF00]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#D7FF00]/10 border border-[#D7FF00]/20 flex items-center justify-center text-[#D7FF00] mb-3 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5 font-space uppercase tracking-wide">{feature.title}</h3>
                  <p className="text-xs text-[#A3A3A3] leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              variant="primary"
              glow
              onClick={() => setModalOpen(true)}
            >
              <span>DISCOVER DITO</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

        </div>
      </div>

      {/* Discovery Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="THE DITO PHILOSOPHY"
        maxWidth="2xl"
      >
        <div className="space-y-6 text-[#A3A3A3] text-sm">
          <p className="leading-relaxed">
            Founded on the principle that physical capability is the bedrock of high performance, DITO FITNESS bridges the divide between elite athletic preparation and commercial fitness.
          </p>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-base flex items-center gap-2 font-space">
              <CheckCircle2 className="w-5 h-5 text-[#D7FF00]" />
              The Three Pillars of DITO
            </h4>
            <ul className="space-y-2 pl-7 list-disc text-[#A3A3A3]">
              <li>
                <strong className="text-white">Scientific Biomechanics:</strong> Eliminate guesswork with periodized compound loading, bar velocity metrics, and joint longevity protocols.
              </li>
              <li>
                <strong className="text-white">Uncompromising Infrastructure:</strong> Competition Eleiko cages, calibrated steel plates, custom acoustic flooring, and hospital-grade HEPA air exchange.
              </li>
              <li>
                <strong className="text-white">Accountability Ecosystem:</strong> Direct coach telemetry, bi-weekly kinetic progress check-ins, and individual lifestyle calibration.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <p className="text-xs text-[#A3A3A3]">
              Ready to experience the facility firsthand? Schedule a complimentary VIP tour with a master strength coach.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <a href="#contact" onClick={() => setModalOpen(false)}>
              <Button size="md" variant="primary" glow>
                <span>Book a Free Club Tour</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          </div>
        </div>
      </Modal>
    </section>
  );
}
