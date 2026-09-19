"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MockDb, MemberProfile } from "@/lib/mock-db";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Dumbbell,
  QrCode,
  Calendar,
  Clock,
  Flame,
  Award,
  TrendingUp,
  User,
  CreditCard,
  Download,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  LogOut,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function MemberDashboard() {
  const [member, setMember] = useState<MemberProfile | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "workout" | "progress" | "payments">("overview");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [coachMessage, setCoachMessage] = useState("");
  const [coachSent, setCoachSent] = useState(false);

  useEffect(() => {
    const data = MockDb.getActiveMember();
    setMember(data);
  }, []);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08090D] text-white text-sm">
        <div className="w-6 h-6 border-2 border-[#00F08B] border-t-transparent rounded-full animate-spin mr-3" />
        Loading Member Telemetry...
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachMessage) return;
    setCoachSent(true);
    setTimeout(() => {
      setCoachModalOpen(false);
      setCoachSent(false);
      setCoachMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#08090D]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00F08B] to-[#00A862] flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-[#08090D] rotate-45" />
            </div>
            <span className="text-lg font-black tracking-wider text-white font-space">
              DITO <span className="text-[#00F08B]">PORTAL</span>
            </span>
          </Link>
          <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
            | ATHLETE PASS
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQrModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#00F08B]/10 border border-[#00F08B]/30 text-[#00F08B] text-xs font-bold hover:bg-[#00F08B]/20 transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Digital Pass</span>
          </button>

          <Link href="/login">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </header>

      {/* Main Member View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0E121B] via-[#121724] to-[#0E121B] border border-white/[0.08] p-6 sm:p-8 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F08B]/[0.05] rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#00F08B]">
                  ATHLETE STATUS: ACTIVE
                </span>
                <span className="w-2 h-2 rounded-full bg-[#00F08B] animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white font-space tracking-tight">
                Welcome back, {member.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Assigned Protocol: <strong className="text-white">{member.assignedWorkout}</strong> with coach {member.trainerName}
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                glow
                onClick={() => setCoachModalOpen(true)}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Coach</span>
              </Button>

              <button
                type="button"
                onClick={() => setRenewModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/[0.05] border border-white/10 hover:border-[#00F08B]/40 text-slate-200 transition-all cursor-pointer"
              >
                Extend Membership
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/[0.06]">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
                Current Tier
              </span>
              <span className="text-lg font-black text-[#00F08B] font-space">
                {member.membershipPlanName}
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
                Days Remaining
              </span>
              <span className="text-lg font-black text-white font-space">
                {member.daysRemaining} Days
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
                Attendance Streak
              </span>
              <span className="text-lg font-black text-white font-space flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#00F08B]" />
                {member.attendanceStreak} Days
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">
                Logged Workouts
              </span>
              <span className="text-lg font-black text-white font-space">
                {member.workoutsCompleted} Sessions
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1 overflow-x-auto">
          {[
            { id: "overview", label: "Overview & Schedule" },
            { id: "workout", label: "Today's Prescription" },
            { id: "progress", label: "Biometrics & BMI" },
            { id: "payments", label: "Invoices & Billing" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#00F08B] to-[#00D488] text-[#08090D] shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 cols: Today's Routine & Schedule */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Daily Workout preview */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0E121B] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#00F08B]">
                      PROGRAMMED SESSION
                    </span>
                    <h3 className="text-xl font-black text-white uppercase font-space mt-0.5">
                      Chest + Triceps Progressive Overload
                    </h3>
                  </div>
                  <Badge variant="lime">Phase 2 / Week 4</Badge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Focus on full humeral adduction and 3-second eccentric pauses on bench press. Track bar velocity with coach Rahul Shetty.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    { name: "Barbell Bench Press", sets: "4 × 8 reps", target: "85 KG" },
                    { name: "Incline Dumbbell Press", sets: "3 × 10 reps", target: "32 KG / hand" },
                    { name: "Cable Chest Fly", sets: "3 × 12 reps", target: "Peak Contraction" },
                    { name: "Dual Rope Triceps Pushdown", sets: "3 × 12 reps", target: "Drop Set" },
                  ].map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md bg-[#00F08B]/10 text-[#00F08B] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white">{ex.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-400 font-mono">{ex.sets}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[#00F08B] font-mono text-[11px]">
                          {ex.target}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Estimated Duration: 45 Mins</span>
                  <Link href="/#workout">
                    <Button variant="primary" size="sm" glow>
                      Launch Live Workout Tracker
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Workout History Timeline */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0E121B] border border-white/[0.08]">
                <h3 className="text-lg font-bold text-white uppercase font-space tracking-wide mb-4">
                  Recent Workout Logs
                </h3>

                <div className="space-y-3 text-xs">
                  {[
                    { date: "Yesterday, 6:45 PM", title: "Back & Biceps Kinetic Pull", volume: "14,800 KG Total Volume", status: "Completed" },
                    { date: "16 Sep 2026, 7:15 AM", title: "Barbell Back Squat & Posterior Chain", volume: "18,200 KG Total Volume", status: "Completed" },
                    { date: "14 Sep 2026, 6:00 PM", title: "HIIT Sprint Turf Conditioning", volume: "450 kcal Burn", status: "Completed" },
                  ].map((log, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-white block mb-0.5">{log.title}</span>
                        <span className="text-slate-400">{log.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#00F08B] font-mono font-bold block">{log.volume}</span>
                        <span className="text-[10px] text-slate-400 uppercase">{log.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 4 cols: Digital Pass & Coach Card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Digital Access Card */}
              <div className="p-6 rounded-3xl bg-[#121724] border border-[#00F08B]/30 shadow-[0_0_30px_rgba(0,240,139,0.1)] text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00F08B] block mb-3">
                  FACILITY BIOMETRIC PASS
                </span>

                <div className="w-40 h-40 mx-auto rounded-2xl bg-white p-3 flex flex-col items-center justify-center shadow-lg mb-4">
                  {/* High visual QR placeholder */}
                  <div className="w-full h-full border-4 border-[#08090D] rounded-lg p-1.5 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-7 h-7 bg-[#08090D] rounded-sm" />
                      <div className="w-7 h-7 bg-[#08090D] rounded-sm" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-[#08090D]" />
                    </div>
                    <div className="flex justify-between">
                      <div className="w-7 h-7 bg-[#08090D] rounded-sm" />
                      <div className="w-4 h-4 bg-[#08090D] rounded-sm self-end" />
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-white tracking-widest block mb-1">
                  {member.qrCodeToken}
                </span>

                <p className="text-[11px] text-slate-400">
                  Tap at turnstiles for 24/7 automated entry and locker allocation.
                </p>
              </div>

              {/* Assigned Coach Card */}
              <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
                  ASSIGNED MASTER COACH
                </span>

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F08B] to-[#00A862] flex items-center justify-center text-[#08090D] font-black text-lg">
                    RS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{member.trainerName}</h4>
                    <p className="text-xs text-[#00F08B]">Senior Hypertrophy Coach</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Your weekly biomechanical review is scheduled for this Friday at 5:00 PM.
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setCoachModalOpen(true)}
                >
                  Direct Message Coach
                </Button>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Today's Prescription */}
        {activeTab === "workout" && (
          <div className="p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] text-center space-y-6">
            <h3 className="text-2xl font-black text-white uppercase font-space">
              Interactive Workout Telemetry
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Our interactive exercise protocol contains live set checkboxes, rest interval timers, and telemetry metrics.
            </p>
            <div className="pt-2">
              <Link href="/#workout">
                <Button variant="primary" size="lg" glow>
                  Open Live Workout Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Tab 3: Biometrics & BMI */}
        {activeTab === "progress" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Body Mass Index
              </span>
              <span className="text-4xl font-black text-[#00F08B] font-space block mb-1">
                {member.bmi}
              </span>
              <span className="text-xs text-slate-300">Normal Range (18.5 – 24.9)</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Current Weight
              </span>
              <span className="text-4xl font-black text-white font-space block mb-1">
                {member.currentWeightKg} kg
              </span>
              <span className="text-xs text-slate-300">Target: {member.targetWeightKg} kg</span>
            </div>

            <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08]">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Height Reference
              </span>
              <span className="text-4xl font-black text-white font-space block mb-1">
                {member.heightCm} cm
              </span>
              <span className="text-xs text-slate-300">Standing Stature</span>
            </div>
          </div>
        )}

        {/* Tab 4: Payments & Invoices */}
        {activeTab === "payments" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08]">
            <h3 className="text-xl font-bold text-white uppercase font-space mb-6">
              Billing History & Tax Receipts
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3">Invoice ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Plan Description</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {member.invoices.map((inv) => (
                    <tr key={inv.id} className="text-slate-300 hover:bg-white/[0.02]">
                      <td className="py-4 font-mono font-bold text-white">{inv.id}</td>
                      <td className="py-4">{inv.date}</td>
                      <td className="py-4">{inv.plan}</td>
                      <td className="py-4 font-mono font-bold text-[#00F08B]">
                        {formatINR(inv.amount)}
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#00F08B]/10 text-[#00F08B] font-bold text-[10px] uppercase">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Downloading official PDF receipt for ${inv.id}`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          title="Download Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* QR Code Pass Modal */}
      <Modal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        title="DIGITAL BIOMETRIC PASS"
        maxWidth="sm"
      >
        <div className="py-4 text-center space-y-4">
          <div className="w-48 h-48 mx-auto rounded-2xl bg-white p-4 flex flex-col items-center justify-center shadow-2xl">
            <div className="w-full h-full border-4 border-[#08090D] rounded-lg p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-8 h-8 bg-[#08090D] rounded-sm" />
                <div className="w-8 h-8 bg-[#08090D] rounded-sm" />
              </div>
              <div className="flex items-center justify-center">
                <Dumbbell className="w-8 h-8 text-[#08090D]" />
              </div>
              <div className="flex justify-between">
                <div className="w-8 h-8 bg-[#08090D] rounded-sm" />
                <div className="w-5 h-5 bg-[#08090D] rounded-sm self-end" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-white">{member.fullName}</h4>
            <p className="text-xs text-[#00F08B] font-mono font-bold mt-0.5">{member.qrCodeToken}</p>
            <p className="text-xs text-slate-400 mt-2">
              Valid at all turnstiles, lockers, and recovery spa suites.
            </p>
          </div>
        </div>
      </Modal>

      {/* Coach Direct Message Modal */}
      <Modal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        title={`MESSAGE COACH ${member.trainerName.toUpperCase()}`}
        maxWidth="md"
      >
        {coachSent ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#00F08B]/20 text-[#00F08B] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <p className="text-sm font-bold text-white">Message Dispatched</p>
            <p className="text-xs text-slate-400">Coach will respond via portal notification within 2 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-4">
            <p className="text-xs text-slate-300">
              Submit your form check video link, nutrition question, or schedule adjustment request directly to your coach.
            </p>

            <div>
              <textarea
                rows={4}
                required
                placeholder="Coach, please review my bench press bar path from today's set 3..."
                value={coachMessage}
                onChange={(e) => setCoachMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#121724] border border-white/10 text-white placeholder:text-slate-500 focus:border-[#00F08B] focus:outline-none text-sm resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setCoachModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" glow>
                Send Message
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Renew Modal */}
      <Modal
        isOpen={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
        title="EXTEND DITO PASS"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <p>
            Extend your current <strong className="text-white">{member.membershipPlanName}</strong> tier with 1-click renewal.
          </p>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <span>Next Cycle (30 Days)</span>
            <span className="text-base font-black text-[#00F08B] font-space">
              {formatINR(1999)}
            </span>
          </div>
          <div className="pt-2 flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => setRenewModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              glow
              onClick={() => {
                alert("Membership extended by 30 days! Thank you.");
                setRenewModalOpen(false);
              }}
            >
              Confirm Extension
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

