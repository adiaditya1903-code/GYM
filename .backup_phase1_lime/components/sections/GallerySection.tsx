"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FACILITIES, FacilityZone } from "@/data/facilities";
import { Sparkles, Maximize2, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function GallerySection() {
  const [activeZone, setActiveZone] = useState<FacilityZone | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Zones" },
    { id: "lifting", label: "Compound & Free Weights" },
    { id: "athletic", label: "Functional & Cardio" },
    { id: "recovery", label: "Recovery & Suites" },
  ];

  const filteredFacilities = FACILITIES.filter((zone) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "lifting") return zone.id === "strength-zone" || zone.id === "free-weights";
    if (filterCategory === "athletic") return zone.id === "functional-training" || zone.id === "cardio-zone";
    if (filterCategory === "recovery") return zone.id === "recovery-area" || zone.id === "locker-room";
    return true;
  });

  return (
    <section id="gallery" className="py-28 bg-[#111111] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D7FF00]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
                TRAINING SANCTUARY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space">
              CLUB <span className="text-[#D7FF00]">FACILITIES.</span>
            </h2>
          </div>
          <p className="text-sm text-[#A3A3A3] max-w-md leading-relaxed">
            Engineered with surgical acoustic dampening, hospital-grade air purification, and competition Eleiko platforms.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filterCategory === cat.id
                  ? "bg-[#D7FF00] text-[#080808] shadow-[0_0_20px_rgba(215,255,0,0.25)]"
                  : "bg-[#171717] text-[#A3A3A3] border border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((zone) => (
            <div
              key={zone.id}
              className="group rounded-3xl overflow-hidden bg-[#171717] border border-white/10 hover:border-[#D7FF00]/40 transition-all duration-300 flex flex-col hover:-translate-y-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-pointer"
              onClick={() => setActiveZone(zone)}
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={zone.imageUrl}
                  alt={zone.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-80 group-hover:brightness-95 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />

                {/* Tag pill */}
                <div className="absolute top-4 left-4">
                  <Badge variant="lime">{zone.tag}</Badge>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#080808]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-[#D7FF00]" />
                </div>
              </div>

              {/* Zone Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1.5 font-space group-hover:text-[#D7FF00] transition-colors">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed mb-4">
                    {zone.description}
                  </p>
                </div>

                {/* Specs Pill Summary */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#A3A3A3]">
                  <span>{zone.specs.area}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span>{zone.specs.equipmentCount}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="text-[#D7FF00] font-semibold">{zone.specs.temperature}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Facility Zone Lightbox Modal */}
      {activeZone && (
        <Modal
          isOpen={!!activeZone}
          onClose={() => setActiveZone(null)}
          title={activeZone.name}
          maxWidth="3xl"
        >
          <div className="space-y-6">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={activeZone.imageUrl}
                alt={activeZone.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <Badge variant="lime">{activeZone.tag}</Badge>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-1 font-space uppercase">
                {activeZone.subtitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                {activeZone.description}
              </p>
            </div>

            {/* Technical Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-[#111111] border border-white/10">
                <span className="text-[10px] uppercase text-[#A3A3A3] block mb-0.5">Floor Space</span>
                <span className="text-sm font-black text-white font-space">{activeZone.specs.area}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111111] border border-white/10">
                <span className="text-[10px] uppercase text-[#A3A3A3] block mb-0.5">Capacities</span>
                <span className="text-sm font-black text-white font-space">{activeZone.specs.equipmentCount}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111111] border border-white/10">
                <span className="text-[10px] uppercase text-[#A3A3A3] block mb-0.5">Climate Control</span>
                <span className="text-sm font-black text-[#D7FF00] font-space">{activeZone.specs.temperature}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#111111] border border-white/10">
                <span className="text-[10px] uppercase text-[#A3A3A3] block mb-0.5">Air Exchange</span>
                <span className="text-sm font-black text-white font-space">HEPA Ultra</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white font-space">
                Apparatus & Architecture Highlights:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeZone.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                    <Check className="w-4 h-4 text-[#D7FF00] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-white/10">
              <span className="text-xs text-[#A3A3A3]">
                Tour the facility in person with a master coach.
              </span>
              <a href="#contact" onClick={() => setActiveZone(null)}>
                <Button size="sm" variant="primary" glow>
                  <span>Book Facility Walkthrough</span>
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
