"use client";

import React, { useState } from "react";
import { MEMBERSHIP_PLANS, MembershipPlan } from "@/data/memberships";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  ArrowRight,
  Target,
  Calendar,
  UserCheck,
  CheckCircle2,
  Activity,
  Scale,
  Ruler,
  User,
  Flame,
  Heart,
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
      return { label: "Underweight", color: "text-sky-400", bg: "bg-sky-500", border: "border-sky-500/30", range: "< 18.5" };
    } else if (val <= 24.9) {
      return { label: "Normal Weight", color: "text-[#D7FF00]", bg: "bg-[#D7FF00]", border: "border-[#D7FF00]/30", range: "18.5 – 24.9" };
    } else if (val <= 29.9) {
      return { label: "Overweight", color: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/30", range: "25.0 – 29.9" };
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
    <section id="calculator" className="py-24 bg-[#080808] border-t border-white/10 relative scroll-mt-12">
      <div id="bmi" className="scroll-mt-24" />
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D7FF00]/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D7FF00]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
              ANALYTICAL SUITE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space">
            BIOMETRICS & <span className="text-[#D7FF00]">PLAN MATCHER.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2">
            Compute baseline biometrics or determine your optimal DITO athletic membership tier.
          </p>

          {/* Suite Tab Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-[#171717] border border-white/10 shadow-xl">
            <button
              type="button"
              onClick={() => setActiveSuiteTab("plan-matcher")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeSuiteTab === "plan-matcher"
                  ? "bg-[#D7FF00] text-[#080808] shadow-md"
                  : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              <Target className="w-4 h-4" />
              <span>AI Plan Matcher</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSuiteTab("bmi-screener")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeSuiteTab === "bmi-screener"
                  ? "bg-[#D7FF00] text-[#080808] shadow-md"
                  : "text-[#A3A3A3] hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Biometric BMI Screener</span>
            </button>
          </div>
        </div>

        {/* --- VIEW 1: PLAN MATCHER --- */}
        {activeSuiteTab === "plan-matcher" && (
          <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: 3 Questions */}
              <div className="lg:col-span-7 space-y-7">
                {/* Question 1: Goal */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                    <Target className="w-4 h-4 text-[#D7FF00]" />
                    <span>1. What is your primary athletic goal?</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(["Muscle Gain", "Fat Loss", "Strength", "General Fitness", "Athletic Performance"] as Goal[]).map(
                      (g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGoal(g)}
                          className={`p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left border ${
                            goal === g
                              ? "bg-[#D7FF00]/15 border-[#D7FF00] text-white shadow-[0_0_15px_rgba(215,255,0,0.15)]"
                              : "bg-[#111111] border-white/10 text-[#A3A3A3] hover:border-white/20 hover:text-white"
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
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                    <Calendar className="w-4 h-4 text-[#D7FF00]" />
                    <span>2. Weekly Training Commitment</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(["2–3 days", "4–5 days", "6+ days"] as Frequency[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFrequency(f)}
                        className={`p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center border ${
                          frequency === f
                            ? "bg-[#D7FF00]/15 border-[#D7FF00] text-white shadow-[0_0_15px_rgba(215,255,0,0.15)]"
                              : "bg-[#111111] border-white/10 text-[#A3A3A3] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question 3: Coaching Support */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3 font-space">
                    <UserCheck className="w-4 h-4 text-[#D7FF00]" />
                    <span>3. Coaching & Guidance Level</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(["Self Training", "Trainer Support", "Personal Trainer"] as Coaching[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCoaching(c)}
                        className={`p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center border ${
                          coaching === c
                            ? "bg-[#D7FF00]/15 border-[#D7FF00] text-white shadow-[0_0_15px_rgba(215,255,0,0.15)]"
                            : "bg-[#111111] border-white/10 text-[#A3A3A3] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Recommendation */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#D7FF00]/30 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D7FF00]/[0.06] rounded-full blur-[40px] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#D7FF00]">
                      RECOMMENDED TIER
                    </span>
                    <Badge variant="lime">{recommendation.matchScore}% MATCH</Badge>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-space tracking-tight mb-2">
                    {recommendation.plan.name}
                  </h3>

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-3xl font-black text-white font-space">
                      {formatINR(recommendation.plan.monthlyPrice)}
                    </span>
                    <span className="text-xs text-[#A3A3A3] font-medium">/ month</span>
                  </div>

                  <p className="text-xs text-[#A3A3A3] leading-relaxed mb-5">
                    {recommendation.reasoning}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#171717] border border-white/10 mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] block mb-1">
                      SUGGESTED PROTOCOL
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {recommendation.suggestedSchedule}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {recommendation.plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                        <CheckCircle2 className="w-4 h-4 text-[#D7FF00] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a href="#membership" className="w-full">
                  <Button variant="primary" size="md" glow className="w-full">
                    <span>ENROLL IN {recommendation.plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>

            </div>
          </div>
        )}

        {/* --- VIEW 2: BIOMETRIC BMI SCREENER --- */}
        {activeSuiteTab === "bmi-screener" && (
          <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300">
            {/* Unit Toggle Bar */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center p-1 rounded-xl bg-[#111111] border border-white/10">
                <button
                  type="button"
                  onClick={() => setUnitSystem("metric")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    unitSystem === "metric"
                      ? "bg-[#D7FF00] text-[#080808] shadow-sm"
                      : "text-[#A3A3A3] hover:text-white"
                  }`}
                >
                  Metric (CM / KG)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem("imperial")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    unitSystem === "imperial"
                      ? "bg-[#D7FF00] text-[#080808] shadow-sm"
                      : "text-[#A3A3A3] hover:text-white"
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
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-white mb-2">
                    <span className="flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 text-[#D7FF00]" /> Height
                    </span>
                    <span className="text-white font-mono font-bold text-sm">
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
                      className="w-full accent-[#D7FF00] h-2 bg-[#111111] rounded-lg cursor-pointer"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-[#A3A3A3] block mb-1">Feet</label>
                        <input
                          type="number"
                          min={4}
                          max={7}
                          value={heightFt}
                          onChange={(e) => setHeightFt(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-white text-xs focus:border-[#D7FF00] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#A3A3A3] block mb-1">Inches</label>
                        <input
                          type="number"
                          min={0}
                          max={11}
                          value={heightIn}
                          onChange={(e) => setHeightIn(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-white text-xs focus:border-[#D7FF00] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Weight Input */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-white mb-2">
                    <span className="flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-[#D7FF00]" /> Weight
                    </span>
                    <span className="text-white font-mono font-bold text-sm">
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
                      className="w-full accent-[#D7FF00] h-2 bg-[#111111] rounded-lg cursor-pointer"
                    />
                  ) : (
                    <input
                      type="range"
                      min={90}
                      max={350}
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                      className="w-full accent-[#D7FF00] h-2 bg-[#111111] rounded-lg cursor-pointer"
                    />
                  )}
                </div>

                {/* Age Input */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-white mb-2">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#D7FF00]" /> Age
                    </span>
                    <span className="text-white font-mono font-bold text-sm">{age} years</span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={80}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-[#D7FF00] h-2 bg-[#111111] rounded-lg cursor-pointer"
                  />
                </div>

                {/* Biometric Readouts Card */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#111111] border border-white/10">
                    <div className="flex items-center gap-1.5 text-[#A3A3A3] text-[10px] font-bold uppercase mb-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400" /> Target HR Zone
                    </div>
                    <div className="text-sm font-black text-white font-space">
                      {targetHeartRateMin} – {targetHeartRateMax} <span className="text-[10px] text-[#A3A3A3]">BPM</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111111] border border-white/10">
                    <div className="flex items-center gap-1.5 text-[#A3A3A3] text-[10px] font-bold uppercase mb-1">
                      <Flame className="w-3.5 h-3.5 text-[#D7FF00]" /> Baseline BMR
                    </div>
                    <div className="text-sm font-black text-white font-space">
                      ~{estimatedBmr} <span className="text-[10px] text-[#A3A3A3]">kcal / day</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Score Gauge & Analysis */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A3A3A3] mb-1">
                  ESTIMATED BODY MASS INDEX
                </span>
                <span className="text-6xl sm:text-7xl font-black font-space text-white tracking-tight my-2">
                  {bmi}
                </span>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border bg-white/5">
                  <span className={`w-2 h-2 rounded-full ${category.bg}`} />
                  <span className={category.color}>{category.label} ({category.range})</span>
                </div>

                {/* Visual Gauge Bar */}
                <div className="w-full max-w-sm mb-6">
                  <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-sky-500 via-[#D7FF00] via-amber-500 to-rose-500">
                    <div
                      className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] -translate-x-1/2 transition-all duration-300"
                      style={{ left: `${gaugePercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#A3A3A3] mt-1.5">
                    <span>14 (Under)</span>
                    <span>18.5</span>
                    <span>25.0</span>
                    <span>35+ (Obese)</span>
                  </div>
                </div>

                <p className="text-xs text-[#A3A3A3] max-w-md leading-relaxed mb-6">
                  {bmi < 18.5
                    ? "Your baseline index indicates a caloric surplus with progressive resistance loading may support lean mass gains."
                    : bmi <= 24.9
                    ? "You are within the optimal athletic reference standard. Ideal foundation for strength periodization and hypertrophy."
                    : bmi <= 29.9
                    ? "Elevated mass index. For athletes, high lean muscle mass can elevate this score. Focus on conditioning and metabolic density."
                    : "Comprehensive metabolic and nutrition coaching recommended to reduce cardiovascular workload and support recovery."}
                </p>

                <a href="#membership">
                  <Button variant="outline" size="sm">
                    <span>CONSULT A MASTER COACH</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>

            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 pt-4 border-t border-white/10 text-[11px] text-[#A3A3A3] text-center leading-relaxed">
          * Disclaimer: This interactive suite provides general athletic and nutritional guidelines based on user inputs. It does not replace clinical medical counsel. Consult a physician before initiating high-intensity physical conditioning.
        </div>

      </div>
    </section>
  );
}
