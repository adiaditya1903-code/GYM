"use client";

import React, { useState } from "react";
import { MEMBERSHIP_PLANS, MembershipPlan } from "@/data/memberships";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowRight,
  Target,
  Calendar,
  UserCheck,
  Activity,
  Scale,
  Ruler,
  User,
  Flame,
  Heart,
  Cpu,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

type Goal = "Muscle Gain" | "Fat Loss" | "Strength" | "General Fitness" | "Athletic Performance";
type Frequency = "2–3 days" | "4–5 days" | "6+ days";
type Coaching = "Self Training" | "Trainer Support" | "Personal Trainer";

export default function CalculatorSection() {
  // Main Suite Tab: "plan-matcher" | "bmi-screener"
  const [activeSuiteTab, setActiveSuiteTab] = useState<"plan-matcher" | "bmi-screener">("plan-matcher");

  // --- 1. Plan Matcher State ---
  const [goal, setGoal] = useState<Goal>("Muscle Gain");
  const [frequency, setFrequency] = useState<Frequency>("4–5 days");
  const [coaching, setCoaching] = useState<Coaching>("Trainer Support");

  const getRecommendation = (): {
    plan: MembershipPlan;
    matchScore: number;
    reasoning: string;
    suggestedSchedule: string;
  } => {
    if (coaching === "Personal Trainer" || goal === "Athletic Performance") {
      return {
        plan: MEMBERSHIP_PLANS[2], // Elite
        matchScore: 98,
        reasoning: "Your goal for dedicated coaching or athletic performance requires comprehensive biomechanical oversight, nutrition protocols, and priority access.",
        suggestedSchedule: "4 structured weekly sessions + 1 recovery sauna session",
      };
    } else if (
      coaching === "Trainer Support" ||
      frequency === "4–5 days" ||
      frequency === "6+ days" ||
      goal === "Muscle Gain" ||
      goal === "Strength"
    ) {
      return {
        plan: MEMBERSHIP_PLANS[1], // Pro
        matchScore: 95,
        reasoning: "DITO PRO gives you full progressive workout plans, bi-weekly telemetry tracking, and coach guidance to sustain progressive overload.",
        suggestedSchedule: `${frequency} upper/lower or push/pull/legs split`,
      };
    } else {
      return {
        plan: MEMBERSHIP_PLANS[0], // Starter
        matchScore: 92,
        reasoning: "Ideal for self-directed athletes requiring complete access to competition equipment, recovery suites, and our digital workout tracking library.",
        suggestedSchedule: "3 full-body sessions per week",
      };
    }
  };

  const recommendation = getRecommendation();

  // --- 2. BMI & Body Comp Screener State ---
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [age, setAge] = useState<number>(26);

  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(165);

  const effectiveHeightM =
    unitSystem === "metric"
      ? heightCm / 100
      : (heightFt * 12 + heightIn) * 0.0254;

  const effectiveWeightKg =
    unitSystem === "metric" ? weightKg : weightLbs * 0.453592;

  const bmi =
    effectiveHeightM > 0
      ? Number((effectiveWeightKg / (effectiveHeightM * effectiveHeightM)).toFixed(1))
      : 0;

  const getBmiCategory = (val: number) => {
    if (val < 18.5) {
      return { label: "Underweight", color: "text-[#FF8A3D]", bg: "bg-[#FF8A3D]", border: "border-[#FF8A3D]/30", range: "< 18.5" };
    } else if (val <= 24.9) {
      return { label: "Optimal Standard", color: "text-[#FF5E14]", bg: "bg-[#FF5E14]", border: "border-[#FF5E14]/30", range: "18.5 – 24.9" };
    } else if (val <= 29.9) {
      return { label: "Overweight / High Mass", color: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/30", range: "25.0 – 29.9" };
    } else {
      return { label: "Obese Class", color: "text-rose-400", bg: "bg-rose-500", border: "border-rose-500/30", range: "≥ 30.0" };
    }
  };

  const category = getBmiCategory(bmi);
  const gaugePercent = Math.min(Math.max(((bmi - 14) / (35 - 14)) * 100, 5), 95);

  const targetHeartRateMin = Math.round((220 - age) * 0.65);
  const targetHeartRateMax = Math.round((220 - age) * 0.85);
  const estimatedBmr = Math.round(10 * effectiveWeightKg + 6.25 * (effectiveHeightM * 100) - 5 * age + 5);

  return (
    <section id="calculator" className="py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] relative scroll-mt-12 font-sans select-none">
      <div id="bmi" className="scroll-mt-24" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-12 gap-6 select-none">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>10 // ANALYTICAL SUITE</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">BIOMETRICS & MATCH ENGINE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              PERFORMANCE <span className="text-[#FF5E14] orange-glow">CALCULATOR.</span>
            </h2>
          </div>

          {/* Suite Tab Switcher */}
          <div className="inline-flex items-center p-1.5 bg-[#121318] border border-[#262933] rounded-full font-space text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveSuiteTab("plan-matcher")}
              className={`flex items-center gap-2 px-5 py-2 uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeSuiteTab === "plan-matcher"
                  ? "bg-[#FF5E14] text-white shadow-[0_0_15px_rgba(255,94,20,0.5)]"
                  : "text-[#94A3B8] hover:text-[#FFFFFF]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>PLAN MATCHER</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSuiteTab("bmi-screener")}
              className={`flex items-center gap-2 px-5 py-2 uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeSuiteTab === "bmi-screener"
                  ? "bg-[#FF5E14] text-white shadow-[0_0_15px_rgba(255,94,20,0.5)]"
                  : "text-[#94A3B8] hover:text-[#FFFFFF]"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>BMI & CALORIES</span>
            </button>
          </div>
        </div>

        {/* --- VIEW 1: PLAN MATCHER --- */}
        {activeSuiteTab === "plan-matcher" && (
          <div className="bg-[#121318] border border-[#262933] rounded-2xl p-6 sm:p-10 transition-all duration-300 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: 3 Questions */}
              <div className="lg:col-span-7 space-y-7 font-space">
                {/* Question 1: Goal */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5E14] mb-3">
                    <Target className="w-4 h-4 text-[#FF5E14]" />
                    <span>01 // PRIMARY ATHLETIC OBJECTIVE</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    {(["Muscle Gain", "Fat Loss", "Strength", "General Fitness", "Athletic Performance"] as Goal[]).map(
                      (g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGoal(g)}
                          className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer font-bold ${
                            goal === g
                              ? "bg-[#FF5E14] text-white border-[#FF5E14] shadow-[0_0_15px_rgba(255,94,20,0.4)]"
                              : "bg-[#1A1C24] border-[#262933] text-[#94A3B8] hover:border-[#FF5E14]/40 hover:text-[#FFFFFF]"
                          }`}
                        >
                          {g}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Question 2: Frequency */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5E14] mb-3">
                    <Calendar className="w-4 h-4 text-[#FF5E14]" />
                    <span>02 // WEEKLY FREQUENCY</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    {(["2–3 days", "4–5 days", "6+ days"] as Frequency[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFrequency(f)}
                        className={`p-3.5 rounded-xl text-center border transition-all cursor-pointer font-bold ${
                          frequency === f
                            ? "bg-[#FF5E14] text-white border-[#FF5E14] shadow-[0_0_15px_rgba(255,94,20,0.4)]"
                            : "bg-[#1A1C24] border-[#262933] text-[#94A3B8] hover:border-[#FF5E14]/40 hover:text-[#FFFFFF]"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3: Coaching Support */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF5E14] mb-3">
                    <UserCheck className="w-4 h-4 text-[#FF5E14]" />
                    <span>03 // COACHING ALLOCATION</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    {(["Self Training", "Trainer Support", "Personal Trainer"] as Coaching[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCoaching(c)}
                        className={`p-3.5 rounded-xl text-center border transition-all cursor-pointer font-bold ${
                          coaching === c
                            ? "bg-[#FF5E14] text-white border-[#FF5E14] shadow-[0_0_15px_rgba(255,94,20,0.4)]"
                            : "bg-[#1A1C24] border-[#262933] text-[#94A3B8] hover:border-[#FF5E14]/40 hover:text-[#FFFFFF]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Recommendation */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#1A1C24] border border-[#262933] rounded-2xl relative overflow-hidden font-space shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-[#262933] pb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E14]">
                      OPTIMAL TIER MATCH
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#FFF5EE] text-[#0A0A0C] text-[10px] font-bold rounded-full">
                      {recommendation.matchScore}% MATCH
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#FFFFFF] tracking-tight mb-1">
                    {recommendation.plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-[#FF5E14]">
                      {formatINR(recommendation.plan.monthlyPrice)}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-medium">/ month</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-5 font-sans">
                    {recommendation.reasoning}
                  </p>

                  <div className="p-4 bg-[#121318] border border-[#262933] rounded-xl mb-6 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
                      SUGGESTED SCHEDULE
                    </span>
                    <span className="text-xs font-bold text-white">
                      {recommendation.suggestedSchedule}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {recommendation.plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-[#94A3B8]">
                        <span className="text-[#FF5E14] font-bold">&gt;</span>
                        <span className="text-white/90 font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="#membership" className="w-full">
                  <Button variant="primary" size="md" glow className="w-full justify-center">
                    <span>SELECT {recommendation.plan.name}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </a>
              </div>

            </div>
          </div>
        )}

        {/* --- VIEW 2: BIOMETRIC BMI SCREENER --- */}
        {activeSuiteTab === "bmi-screener" && (
          <div className="bg-[#121318] border border-[#262933] rounded-2xl p-6 sm:p-10 transition-all duration-300 shadow-2xl font-space">
            {/* Unit Toggle Bar */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center p-1 bg-[#1A1C24] border border-[#262933] rounded-full text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUnitSystem("metric")}
                  className={`px-5 py-1.5 uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    unitSystem === "metric"
                      ? "bg-[#FF5E14] text-white shadow-sm"
                      : "text-[#94A3B8] hover:text-[#FFFFFF]"
                  }`}
                >
                  Metric (CM / KG)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem("imperial")}
                  className={`px-5 py-1.5 uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    unitSystem === "imperial"
                      ? "bg-[#FF5E14] text-white shadow-sm"
                      : "text-[#94A3B8] hover:text-[#FFFFFF]"
                  }`}
                >
                  Imperial (FT / LBS)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Input Sliders & Fields */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Height Input */}
                <div>
                  <div className="flex justify-between items-center text-xs uppercase text-[#FFFFFF] mb-2 font-bold">
                    <span className="flex items-center gap-2 text-[#FF5E14]">
                      <Ruler className="w-4 h-4" /> HEIGHT
                    </span>
                    <span className="text-[#FFFFFF] font-bold text-sm">
                      {unitSystem === "metric" ? `${heightCm} cm` : `${heightFt} ft ${heightIn} in`}
                    </span>
                  </div>

                  {unitSystem === "metric" ? (
                    <input
                      type="range"
                      min={120}
                      max={220}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-[#FF5E14] h-2 bg-[#1A1C24] rounded-lg cursor-pointer"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-[#94A3B8] block mb-1">FEET</label>
                        <input
                          type="number"
                          min={4}
                          max={7}
                          value={heightFt}
                          onChange={(e) => setHeightFt(Number(e.target.value))}
                          className="w-full px-3 py-2.5 bg-[#1A1C24] border border-[#262933] rounded-lg text-[#FFFFFF] text-xs focus:border-[#FF5E14] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#94A3B8] block mb-1">INCHES</label>
                        <input
                          type="number"
                          min={0}
                          max={11}
                          value={heightIn}
                          onChange={(e) => setHeightIn(Number(e.target.value))}
                          className="w-full px-3 py-2.5 bg-[#1A1C24] border border-[#262933] rounded-lg text-[#FFFFFF] text-xs focus:border-[#FF5E14] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Weight Input */}
                <div>
                  <div className="flex justify-between items-center text-xs uppercase text-[#FFFFFF] mb-2 font-bold">
                    <span className="flex items-center gap-2 text-[#FF5E14]">
                      <Scale className="w-4 h-4" /> WEIGHT
                    </span>
                    <span className="text-[#FFFFFF] font-bold text-sm">
                      {unitSystem === "metric" ? `${weightKg} kg` : `${weightLbs} lbs`}
                    </span>
                  </div>

                  {unitSystem === "metric" ? (
                    <input
                      type="range"
                      min={40}
                      max={180}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-[#FF5E14] h-2 bg-[#1A1C24] rounded-lg cursor-pointer"
                    />
                  ) : (
                    <input
                      type="range"
                      min={90}
                      max={350}
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                      className="w-full accent-[#FF5E14] h-2 bg-[#1A1C24] rounded-lg cursor-pointer"
                    />
                  )}
                </div>

                {/* Age Input */}
                <div>
                  <div className="flex justify-between items-center text-xs uppercase text-[#FFFFFF] mb-2 font-bold">
                    <span className="flex items-center gap-2 text-[#FF5E14]">
                      <User className="w-4 h-4" /> AGE
                    </span>
                    <span className="text-[#FFFFFF] font-bold text-sm">{age} YEARS</span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={80}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-[#FF5E14] h-2 bg-[#1A1C24] rounded-lg cursor-pointer"
                  />
                </div>

                {/* Biometric Readouts Card */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 bg-[#1A1C24] border border-[#262933] rounded-xl">
                    <div className="flex items-center gap-1.5 text-[#94A3B8] text-[11px] font-bold uppercase mb-1">
                      <Heart className="w-3.5 h-3.5 text-[#FF5E14]" /> TARGET HR ZONE
                    </div>
                    <div className="text-base sm:text-lg font-black text-[#FFFFFF]">
                      {targetHeartRateMin} – {targetHeartRateMax} <span className="text-xs text-[#94A3B8]">BPM</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#1A1C24] border border-[#262933] rounded-xl">
                    <div className="flex items-center gap-1.5 text-[#94A3B8] text-[11px] font-bold uppercase mb-1">
                      <Flame className="w-3.5 h-3.5 text-[#FF5E14]" /> BASELINE BMR
                    </div>
                    <div className="text-base sm:text-lg font-black text-[#FF5E14]">
                      ~{estimatedBmr} <span className="text-xs text-[#94A3B8]">kcal / day</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Score Gauge & Analysis */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 bg-[#1A1C24] border border-[#262933] rounded-2xl text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-1">
                  ESTIMATED BODY MASS INDEX
                </span>
                <span className="text-6xl sm:text-7xl font-black text-[#FFFFFF] tracking-tight my-2">
                  {bmi}
                </span>

                <div className="inline-flex items-center gap-2 px-4 py-1 text-xs font-bold uppercase tracking-wider mb-6 rounded-full border border-white/10 bg-[#121318]">
                  <span className={`w-2 h-2 rounded-full ${category.bg}`} />
                  <span className={category.color}>{category.label} ({category.range})</span>
                </div>

                {/* Visual Gauge Bar */}
                <div className="w-full max-w-sm mb-6">
                  <div className="relative h-2.5 rounded-full bg-gradient-to-r from-amber-500 via-[#FF5E14] to-rose-500 overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 w-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,1)] -translate-x-1/2 transition-all duration-300"
                      style={{ left: `${gaugePercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#94A3B8] mt-1.5 font-bold">
                    <span>14 (Under)</span>
                    <span>18.5</span>
                    <span>25.0</span>
                    <span>35+ (High)</span>
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] max-w-md leading-relaxed mb-6 font-sans">
                  {bmi < 18.5
                    ? "Your baseline index indicates a caloric surplus with progressive resistance loading may support lean mass gains."
                    : bmi <= 24.9
                    ? "You are within the optimal athletic reference standard. Ideal foundation for strength periodization and hypertrophy."
                    : bmi <= 29.9
                    ? "Elevated mass index. For athletes, high lean muscle mass can elevate this score. Focus on conditioning and metabolic density."
                    : "Comprehensive metabolic and nutrition coaching recommended to reduce cardiovascular workload and support recovery."}
                </p>

                <a href="#contact">
                  <Button variant="outline" size="sm">
                    <span>BOOK BIO-SCAN CONSULTATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>

            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 pt-4 border-t border-[#262933] text-xs text-[#94A3B8] text-center leading-relaxed font-sans">
          Disclaimer: This interactive calculator computes athletic guidelines. Consult a physician or DITO coach before starting intensive conditioning.
        </div>

      </div>
    </section>
  );
}
