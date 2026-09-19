"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Cpu, Target, UserCheck, Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    {
      icon: Cpu,
      title: "Modern Equipment",
      description: "Olympic certified bars, calibrated steel plates, and zero-friction pneumatic cable arrays.",
    },
    {
      icon: Target,
      title: "Expert Coaching",
      description: "CSCS & NASM credentialed master coaches with proven competition and bio-mechanics experience.",
    },
    {
      icon: UserCheck,
      title: "Personal Training",
      description: "Bespoke progressive overloading models tuned directly to your structural leverages.",
    },
    {
      icon: Activity,
      title: "Performance Tracking",
      description: "Real-time telemetry, bar velocity monitoring, and biometric recovery insights.",
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#08090D] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#00F08B]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Gym Image with Glass Stats Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] group shadow-[0_20px_50px_rgba(0,0,0,0.7)] aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
                alt="DITO FITNESS high-performance gym facility"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-110 brightness-90"
              />
              
              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-80" />
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#00F08B] rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#00F08B] rounded-br-xl pointer-events-none" />
          </div>

          {/* Right Column: Copy & Feature Grid */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00F08B] mb-3">
              THE DITO ADVANTAGE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.05] text-white font-space mb-8">
              MORE THAN A GYM. <br />
              <span className="metallic-silver-text">IT&apos;S YOUR NEXT LEVEL.</span>
            </h2>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] hover:border-[#00F08B]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00F08B]/10 border border-[#00F08B]/20 flex items-center justify-center text-[#00F08B] mb-3 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5 font-space uppercase tracking-wide">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
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
        title="DISCOVER THE DITO PHILOSOPHY"
        maxWidth="2xl"
      >
        <div className="space-y-6 text-slate-300 text-sm">
          <p className="leading-relaxed">
            Founded on the belief that human physical potential is rarely tapped to its fullest, DITO FITNESS bridges the gap between high-performance athletic science and commercial gym accessibility.
          </p>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00F08B]" />
              The Three Pillars of DITO
            </h4>
            <ul className="space-y-2 pl-7 list-disc text-slate-300">
              <li>
                <strong className="text-white">Scientific Biomechanics:</strong> Eliminate guesswork with periodized compound loading, bar velocity tracking, and joint health auditing.
              </li>
              <li>
                <strong className="text-white">Uncompromising Infrastructure:</strong> Competition grade Eleiko bars, calibrated steel plates, custom acoustic flooring, and 100% HEPA air exchange.
              </li>
              <li>
                <strong className="text-white">Accountability Ecosystem:</strong> Direct coach telemetry, regular body scans, and our proprietary digital training companion.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <p className="text-xs text-slate-400">
              Ready to experience the floor firsthand? Book a private VIP club tour with one of our master strength coaches.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <a href="#contact" onClick={() => setModalOpen(false)}>
              <Button size="md" variant="primary">
                Book a Free Club Tour
              </Button>
            </a>
          </div>
        </div>
      </Modal>
    </section>
  );
}

