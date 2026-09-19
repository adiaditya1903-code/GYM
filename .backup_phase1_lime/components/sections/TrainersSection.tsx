"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TRAINERS, Trainer } from "@/data/trainers";
import { Star, ShieldCheck, ArrowRight, Sparkles, Award, UserCheck, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function TrainersSection() {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  return (
    <section id="trainers" className="py-28 bg-[#080808] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-3">
              <Award className="w-3.5 h-3.5 text-[#D7FF00]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
                COACHING ROSTER
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space">
              ELITE <span className="text-[#D7FF00]">COACHES.</span>
            </h2>
          </div>
          <p className="text-sm text-[#A3A3A3] max-w-md leading-relaxed">
            Certified exercise scientists and competitive athletes dedicated to precision biomechanics, structured periodization, and injury-free progression.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="group rounded-3xl overflow-hidden bg-[#171717] border border-white/10 hover:border-[#D7FF00]/40 transition-all duration-300 flex flex-col hover:-translate-y-2 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            >
              {/* Photo Banner */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={trainer.imageUrl}
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-[#080808]/85 backdrop-blur-md border border-white/15 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#D7FF00] fill-current" />
                  <span className="text-xs font-bold text-white font-space">{trainer.clientRating}</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge variant="lime">{trainer.experienceYears}+ Years Exp</Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1 font-space group-hover:text-[#D7FF00] transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-xs font-bold text-[#D7FF00] uppercase tracking-wider mb-3">
                    {trainer.role}
                  </p>
                  <p className="text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed mb-4">
                    {trainer.bio}
                  </p>
                </div>

                {/* Certifications preview */}
                <div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#A3A3A3] mb-4">
                    <span className="text-[10px] uppercase font-bold text-white/60">Athletes</span>
                    <span className="text-xs font-bold text-white font-space">{trainer.activeAthletes} Active</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:border-[#D7FF00] group-hover:bg-[#D7FF00]/5"
                    onClick={() => setSelectedTrainer(trainer)}
                  >
                    <span>View Bio & Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D7FF00]" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Trainer Bio Modal */}
      {selectedTrainer && (
        <Modal
          isOpen={!!selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
          title={selectedTrainer.name}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                <Image
                  src={selectedTrainer.imageUrl}
                  alt={selectedTrainer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="lime">{selectedTrainer.role}</Badge>
                  <div className="flex items-center gap-1 text-xs text-[#D7FF00] font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{selectedTrainer.clientRating} / 5.0</span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-space">
                  Specialization: {selectedTrainer.specialization}
                </h4>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {selectedTrainer.bio}
                </p>
              </div>
            </div>

            {/* Credentials & Certifications */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 font-space">
                <ShieldCheck className="w-4 h-4 text-[#D7FF00]" />
                Professional Certifications & Accreditations
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedTrainer.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-white"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-white/10">
              <span className="text-xs text-[#A3A3A3]">
                Available for 1-on-1 bespoke athletic training.
              </span>
              <a href="#contact" onClick={() => setSelectedTrainer(null)}>
                <Button size="sm" variant="primary" glow>
                  <span>Book Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
