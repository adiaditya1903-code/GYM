"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FACILITIES, FacilityZone } from "@/data/facilities";
import { ArrowRight, Maximize2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export default function GallerySection() {
  const [activeZone, setActiveZone] = useState<FacilityZone | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "ALL SPACES" },
    { id: "lifting", label: "FREE WEIGHTS" },
    { id: "athletic", label: "TURF & CARDIO" },
    { id: "recovery", label: "RECOVERY & STEAM" },
  ];

  const filteredFacilities = FACILITIES.filter((zone) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "lifting") return zone.id === "strength-zone" || zone.id === "free-weights";
    if (filterCategory === "athletic") return zone.id === "functional-training" || zone.id === "cardio-zone";
    if (filterCategory === "recovery") return zone.id === "recovery-area" || zone.id === "locker-room";
    return true;
  });

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] relative overflow-hidden font-sans select-none">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>08 // SPATIAL ARCHITECTURE</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">FACILITY SANCTUARY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              SPATIAL <span className="text-[#FF5E14] orange-glow">GALLERY.</span>
            </h2>
          </div>

          {/* Minimalist Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121318] p-1.5 rounded-full border border-[#262933]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full font-space text-xs font-bold uppercase transition-all ${
                  filterCategory === cat.id
                    ? "bg-[#FF5E14] text-white shadow-[0_0_12px_rgba(255,94,20,0.5)]"
                    : "text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-white/[0.05]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Gallery Layout */}
        <div className="space-y-8">
          
          {/* Row 1: Asymmetric 7 / 5 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Main Featured Zone (7 cols) */}
            {filteredFacilities[0] && (
              <div
                onClick={() => setActiveZone(filteredFacilities[0])}
                data-cursor="explore"
                className="lg:col-span-7 relative h-[420px] sm:h-[500px] border border-[#262933] rounded-2xl group cursor-pointer overflow-hidden bg-[#121318] shadow-2xl"
              >
                <Image
                  src={filteredFacilities[0].imageUrl}
                  alt={filteredFacilities[0].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:contrast-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 left-4 font-space text-xs text-white bg-[#0A0A0C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>SECTOR 01 // {filteredFacilities[0].tag.toUpperCase()}</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-space font-black uppercase text-[#FFFFFF]">
                      {filteredFacilities[0].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-md font-sans">
                      {filteredFacilities[0].description}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-[#262933] bg-[#0A0A0C]/90 text-[#94A3B8] group-hover:text-[#FF5E14] group-hover:border-[#FF5E14] transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* Tall Vertical Zone (5 cols) */}
            {filteredFacilities[1] && (
              <div
                onClick={() => setActiveZone(filteredFacilities[1])}
                data-cursor="explore"
                className="lg:col-span-5 relative h-[420px] sm:h-[500px] border border-[#262933] rounded-2xl group cursor-pointer overflow-hidden bg-[#121318] shadow-2xl"
              >
                <Image
                  src={filteredFacilities[1].imageUrl}
                  alt={filteredFacilities[1].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:contrast-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80" />

                <div className="absolute top-4 left-4 font-space text-xs text-white bg-[#0A0A0C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>SECTOR 02 // {filteredFacilities[1].tag.toUpperCase()}</span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-space font-black uppercase text-[#FFFFFF]">
                      {filteredFacilities[1].name}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-1 font-sans">
                      {filteredFacilities[1].highlights[0]}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl border border-[#262933] bg-[#0A0A0C]/90 text-[#94A3B8] group-hover:text-[#FF5E14] group-hover:border-[#FF5E14] transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Row 2: Overlapping Panoramic Bleed Moment */}
          {filteredFacilities[2] && (
            <div
              onClick={() => setActiveZone(filteredFacilities[2])}
              data-cursor="explore"
              className="relative h-[340px] sm:h-[400px] w-full border border-[#262933] rounded-2xl group cursor-pointer overflow-hidden bg-[#121318] shadow-2xl"
            >
              <Image
                src={filteredFacilities[2].imageUrl}
                alt={filteredFacilities[2].name}
                fill
                sizes="100vw"
                className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:contrast-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-transparent to-[#0A0A0C]/80" />

              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between">
                <div className="font-space text-xs text-white bg-[#0A0A0C]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 w-fit flex items-center gap-2 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>SECTOR 03 // PANORAMIC TURF</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-space font-black uppercase text-[#FFFFFF]">
                      {filteredFacilities[2].name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-xl font-sans">
                      {filteredFacilities[2].description}
                    </p>
                  </div>

                  <div className="font-space text-xs text-[#FF5E14] font-bold flex items-center gap-2 bg-[#0A0A0C]/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <span>EXPLORE SPACE</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Row 3: Staggered Secondary Zones */}
          {filteredFacilities.length > 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {filteredFacilities.slice(3, 6).map((zone, idx) => (
                <div
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  data-cursor="explore"
                  className="relative h-64 border border-[#262933] rounded-xl group cursor-pointer overflow-hidden bg-[#121318]"
                >
                  <Image
                    src={zone.imageUrl}
                    alt={zone.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale contrast-125 group-hover:scale-105 group-hover:contrast-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="font-space text-[10px] text-[#FF5E14] font-bold block mb-0.5 uppercase">
                        SECTOR 0{idx + 4}
                      </span>
                      <h4 className="font-space font-bold uppercase text-sm sm:text-base text-[#FFFFFF]">
                        {zone.name}
                      </h4>
                    </div>
                    <Maximize2 className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#FF5E14]" />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* High-Resolution Zone Inspect Modal */}
      {activeZone && (
        <Modal
          isOpen={!!activeZone}
          onClose={() => setActiveZone(null)}
          title={`FACILITY SECTOR // ${activeZone.name.toUpperCase()}`}
          maxWidth="3xl"
        >
          <div className="space-y-6 font-space">
            <div className="relative aspect-[16/9] w-full rounded-xl border border-[#262933] overflow-hidden">
              <Image
                src={activeZone.imageUrl}
                alt={activeZone.name}
                fill
                className="object-cover contrast-110"
              />
            </div>

            <div>
              <span className="text-xs text-[#FF5E14] uppercase font-bold tracking-wider">
                FACILITY CATEGORY: {activeZone.tag.toUpperCase()}
              </span>
              <p className="text-sm text-[#94A3B8] font-sans mt-1 leading-relaxed">
                {activeZone.description}
              </p>
            </div>

            <div className="p-4 bg-[#1A1C24] rounded-xl border border-[#262933] text-xs space-y-2">
              <span className="text-[#94A3B8] block text-[11px] font-bold uppercase">APPARATUS SPECIFICATIONS</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {activeZone.highlights.map((eq, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#FFFFFF]">
                    <span className="text-[#FF5E14] font-bold">&gt;</span>
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button size="md" variant="outline" onClick={() => setActiveZone(null)}>
                <span>CLOSE PREVIEW</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </section>
  );
}
