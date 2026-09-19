"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MockDb, MemberProfile } from "@/lib/mock-db";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Flame,
  QrCode,
  Dumbbell,
  Download,
  CheckCircle2,
  LogOut,
  MessageSquare,
  Activity,
  Calendar,
  Award,
} from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0C] text-[#FF5E14] font-mono text-sm">
        <div className="w-5 h-5 border-2 border-[#FF5E14] border-t-transparent rounded-full animate-spin mr-3" />
        LOADING ATHLETE TELEMETRY...
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
    <div className="min-h-screen bg-[#0A0A0C] text-[#FFF5EE] flex flex-col selection:bg-[#FF5E14] selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-[#262933] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5E14] to-[#FF7A00] flex items-center justify-center shadow-md shadow-[#FF5E14]/25">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-black tracking-tight text-[#FFF5EE] font-space uppercase">
              DITO<span className="text-[#FF5E14]">.</span>PORTAL
            </span>
          </Link>
          <span className="hidden sm:inline-block text-xs font-mono text-[#64748B]">
            ATHLETE DASHBOARD
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQrModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FF5E14]/15 border border-[#FF5E14]/40 text-[#FF5E14] text-xs font-mono font-bold hover:bg-[#FF5E14]/25 transition-all cursor-pointer shadow-sm"
          >
            <QrCode className="w-4 h-4" />
            <span>DIGITAL PASS</span>
          </button>

          <Link href="/login">
            <button
              type="button"
              className="p-2 rounded-lg text-[#64748B] hover:text-[#FFF5EE] hover:bg-[#1A1C24] transition-colors cursor-pointer"
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
        <div className="relative bg-[#121318] border border-[#262933] rounded-2xl p-6 sm:p-8 overflow-hidden shadow-xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF5E14]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E14] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E14] font-mono">
                  STATUS: VERIFIED ACTIVE ATHLETE
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#FFF5EE] font-space tracking-tight">
                WELCOME BACK, {member.fullName}
              </h1>
              <p className="text-xs text-[#94A3B8] mt-1 font-sans">
                Assigned Protocol: <strong className="text-[#FF7A00]">{member.assignedWorkout}</strong> • Coach: {member.trainerName}
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCoachModalOpen(true)}
                className="shadow-md shadow-[#FF5E14]/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>MESSAGE COACH</span>
              </Button>

              <button
                type="button"
                onClick={() => setRenewModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[#1A1C24] border border-[#262933] hover:border-[#FF5E14]/50 text-[#FFF5EE] transition-all cursor-pointer"
              >
                RENEW MEMBERSHIP
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#262933]">
            <div className="p-3 rounded-xl bg-[#1A1C24]/50 border border-[#262933]/60">
              <span className="text-[11px] uppercase font-bold text-[#64748B] font-mono tracking-wider block mb-0.5">
                MEMBERSHIP TIER
              </span>
              <span className="text-xl font-black text-[#FF5E14] font-space">
                {member.membershipPlanName}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#1A1C24]/50 border border-[#262933]/60">
              <span className="text-[11px] uppercase font-bold text-[#64748B] font-mono tracking-wider block mb-0.5">
                DAYS REMAINING
              </span>
              <span className="text-xl font-black text-[#FFF5EE] font-space">
                {member.daysRemaining} Days
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#1A1C24]/50 border border-[#262933]/60">
              <span className="text-[11px] uppercase font-bold text-[#64748B] font-mono tracking-wider block mb-0.5">
                ACTIVE STREAK
              </span>
              <span className="text-xl font-black text-[#FFF5EE] font-space flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#FF5E14]" />
                {member.attendanceStreak} Days
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#1A1C24]/50 border border-[#262933]/60">
              <span className="text-[11px] uppercase font-bold text-[#64748B] font-mono tracking-wider block mb-0.5">
                WORKOUTS LOGGED
              </span>
              <span className="text-xl font-black text-[#FF7A00] font-space">
                {member.workoutsCompleted} Sessions
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#262933] pb-1 overflow-x-auto">
          {[
            { id: "overview", label: "01 // OVERVIEW & SCHEDULE" },
            { id: "workout", label: "02 // TODAY'S WORKOUT" },
            { id: "progress", label: "03 // BIOMETRIC METRICS" },
            { id: "payments", label: "04 // INVOICE HISTORY" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                activeTab === tab.id
                  ? "bg-[#FF5E14] text-white border-[#FF5E14] shadow-md shadow-[#FF5E14]/25"
                  : "border-transparent text-[#94A3B8] hover:text-[#FFF5EE] hover:bg-[#1A1C24]"
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
              <div className="p-6 sm:p-7 bg-[#121318] border border-[#262933] rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-4 border-b border-[#262933] pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF5E14] font-mono">
                      // TODAY'S TRAINING PRESCRIPTION
                    </span>
                    <h3 className="text-xl font-black text-[#FFF5EE] uppercase font-space mt-0.5">
                      Chest + Triceps Progressive Overload
                    </h3>
                  </div>
                  <Badge variant="orange">Phase 2 / Week 4</Badge>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-6 font-sans">
                  Focus on full humeral adduction and 3-second eccentric pauses on bench press. Bar velocity monitored by coach Rahul Shetty.
                </p>

                <div className="space-y-2.5 mb-6">
                  {[
                    { name: "Barbell Bench Press", sets: "4 × 8 reps", target: "85 KG" },
                    { name: "Incline Dumbbell Press", sets: "3 × 10 reps", target: "32 KG / hand" },
                    { name: "Cable Chest Fly", sets: "3 × 12 reps", target: "Peak Contraction" },
                    { name: "Dual Rope Triceps Pushdown", sets: "3 × 12 reps", target: "Drop Set" },
                  ].map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-[#0A0A0C] border border-[#262933] text-[#FF5E14] flex items-center justify-center font-mono font-bold">
                          0{idx + 1}
                        </span>
                        <span className="font-bold text-[#FFF5EE]">{ex.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[#94A3B8] font-mono">{ex.sets}</span>
                        <span className="px-2.5 py-1 rounded-md bg-[#0A0A0C] border border-[#262933] text-[#FF5E14] font-mono font-bold text-[11px]">
                          {ex.target}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-[#64748B] font-mono">ESTIMATED DURATION: 45 MIN</span>
                  <Link href="/#workout">
                    <Button variant="primary" size="sm" className="shadow-md shadow-[#FF5E14]/20">
                      <span>OPEN LIVE WORKOUT TRACKER</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Workout History Timeline */}
              <div className="p-6 sm:p-7 bg-[#121318] border border-[#262933] rounded-2xl shadow-lg">
                <h3 className="text-lg font-bold text-[#FFF5EE] uppercase font-space tracking-wide mb-4 flex items-center justify-between border-b border-[#262933] pb-3">
                  <span>RECENT WORKOUT LOGS</span>
                  <span className="text-xs text-[#64748B] font-mono">PAST 3 SESSIONS</span>
                </h3>

                <div className="space-y-2.5 text-xs">
                  {[
                    { date: "Yesterday, 6:45 PM", title: "Back & Biceps Kinetic Pull", volume: "14,800 KG Total Volume", status: "Completed" },
                    { date: "16 Sep 2026, 7:15 AM", title: "Barbell Back Squat & Posterior Chain", volume: "18,200 KG Total Volume", status: "Completed" },
                    { date: "14 Sep 2026, 6:00 PM", title: "HIIT Sprint Turf Conditioning", volume: "450 kcal Burn", status: "Completed" },
                  ].map((log, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#1A1C24] border border-[#262933] rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[#FFF5EE] block mb-0.5">{log.title}</span>
                        <span className="text-[#64748B] text-[11px] font-mono">{log.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#FF5E14] font-mono font-bold block">{log.volume}</span>
                        <span className="text-[10px] text-[#FF7A00] uppercase font-mono font-bold">{log.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 4 cols: Digital Pass & Coach Card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Digital Access Card */}
              <div className="p-6 bg-[#121318] border border-[#262933] rounded-2xl text-center shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5E14] font-mono block mb-3">
                  // BIOMETRIC DIGITAL PASS
                </span>

                <div className="w-40 h-40 mx-auto bg-white rounded-xl p-3 flex flex-col items-center justify-center shadow-xl mb-4">
                  <div className="w-full h-full border-4 border-[#0A0A0C] p-1.5 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-7 h-7 bg-[#0A0A0C]" />
                      <div className="w-7 h-7 bg-[#0A0A0C]" />
                    </div>
                    <div className="flex items-center justify-center">
                      <Flame className="w-7 h-7 text-[#FF5E14]" />
                    </div>
                    <div className="flex justify-between">
                      <div className="w-7 h-7 bg-[#0A0A0C]" />
                      <div className="w-4 h-4 bg-[#0A0A0C] self-end" />
                    </div>
                  </div>
                </div>

                <span className="text-sm font-mono font-black text-[#FF5E14] tracking-widest block mb-1">
                  {member.qrCodeToken}
                </span>

                <p className="text-[11px] text-[#94A3B8]">
                  Scannable optical key for 24/7 automated entry and locker allocation.
                </p>
              </div>

              {/* Assigned Coach Card */}
              <div className="p-6 bg-[#121318] border border-[#262933] rounded-2xl shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] font-mono block mb-3">
                  ASSIGNED PERFORMANCE COACH
                </span>

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF5E14] to-[#FF7A00] flex items-center justify-center text-white font-black text-base shadow-md shadow-[#FF5E14]/25">
                    RS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#FFF5EE]">{member.trainerName}</h4>
                    <p className="text-xs text-[#FF5E14] font-mono font-semibold">Senior Hypertrophy Coach</p>
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 font-sans">
                  Biomechanical review scheduled: Friday at 17:00 IST.
                </p>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => setCoachModalOpen(true)}
                >
                  <span>DISPATCH MESSAGE</span>
                </Button>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Today's Prescription */}
        {activeTab === "workout" && (
          <div className="p-8 bg-[#121318] border border-[#262933] rounded-2xl text-center space-y-6 shadow-xl">
            <h3 className="text-2xl font-black text-[#FFF5EE] uppercase font-space">
              SESSION TELEMETRY ENGINE
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-lg mx-auto font-sans leading-relaxed">
              Real-time exercise protocol with interactive set logging, rest countdown counters, and volume trackers.
            </p>
            <div className="pt-2">
              <Link href="/#workout">
                <Button variant="primary" size="lg" className="shadow-lg shadow-[#FF5E14]/25">
                  <span>LAUNCH TELEMETRY CONSOLE</span>
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Tab 3: Biometrics & BMI */}
        {activeTab === "progress" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#121318] border border-[#262933] rounded-2xl shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-mono block mb-1">
                BODY MASS INDEX (BMI)
              </span>
              <span className="text-4xl font-black text-[#FF5E14] font-space block mb-1">
                {member.bmi}
              </span>
              <span className="text-xs text-[#94A3B8]">Normal Reference Range (18.5 – 24.9)</span>
            </div>

            <div className="p-6 bg-[#121318] border border-[#262933] rounded-2xl shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-mono block mb-1">
                CURRENT MASS
              </span>
              <span className="text-4xl font-black text-[#FFF5EE] font-space block mb-1">
                {member.currentWeightKg} kg
              </span>
              <span className="text-xs text-[#FF7A00] font-mono">Target Standard: {member.targetWeightKg} kg</span>
            </div>

            <div className="p-6 bg-[#121318] border border-[#262933] rounded-2xl shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-mono block mb-1">
                STANDING HEIGHT
              </span>
              <span className="text-4xl font-black text-[#FFF5EE] font-space block mb-1">
                {member.heightCm} cm
              </span>
              <span className="text-xs text-[#94A3B8]">Biomechanical Baseline Point</span>
            </div>
          </div>
        )}

        {/* Tab 4: Payments & Invoices */}
        {activeTab === "payments" && (
          <div className="p-6 sm:p-8 bg-[#121318] border border-[#262933] rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-[#FFF5EE] uppercase font-space mb-6 border-b border-[#262933] pb-3">
              MEMBERSHIP INVOICE HISTORY
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#262933] text-[#64748B] font-bold uppercase tracking-wider font-mono">
                    <th className="pb-3">Invoice ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Plan Description</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262933]">
                  {member.invoices.map((inv) => (
                    <tr key={inv.id} className="text-[#94A3B8] hover:bg-white/[0.02]">
                      <td className="py-4 font-mono font-bold text-[#FFF5EE]">{inv.id}</td>
                      <td className="py-4 font-mono">{inv.date}</td>
                      <td className="py-4 font-sans font-medium text-[#FFF5EE]">{inv.plan}</td>
                      <td className="py-4 font-mono font-bold text-[#FF5E14]">
                        {formatINR(inv.amount)}
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/30 font-bold text-[10px] uppercase font-mono">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Downloading official PDF receipt for ${inv.id}`)}
                          className="p-1.5 text-[#64748B] hover:text-[#FF5E14] transition-colors cursor-pointer"
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
          <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-2xl">
            <div className="w-full h-full border-4 border-[#0A0A0C] p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="w-8 h-8 bg-[#0A0A0C]" />
                <div className="w-8 h-8 bg-[#0A0A0C]" />
              </div>
              <div className="flex items-center justify-center">
                <Flame className="w-8 h-8 text-[#FF5E14]" />
              </div>
              <div className="flex justify-between">
                <div className="w-8 h-8 bg-[#0A0A0C]" />
                <div className="w-5 h-5 bg-[#0A0A0C] self-end" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-[#FFF5EE]">{member.fullName}</h4>
            <p className="text-xs text-[#FF5E14] font-mono font-bold mt-0.5">{member.qrCodeToken}</p>
            <p className="text-xs text-[#94A3B8] mt-2">
              Valid at all turnstiles, lockers, and recovery suites.
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
            <div className="w-12 h-12 rounded-full bg-[#FF5E14]/20 text-[#FF5E14] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <p className="text-sm font-bold text-[#FFF5EE]">MESSAGE DELIVERED</p>
            <p className="text-xs text-[#94A3B8]">Coach will review your bar path & payload within 2 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
            <p className="text-[#94A3B8]">
              Submit telemetry inquiry, bar path check, or programming adjustment request directly to coaching faculty.
            </p>

            <div>
              <textarea
                rows={4}
                required
                placeholder="Coach, please review my bar velocity from today's set 3..."
                value={coachMessage}
                onChange={(e) => setCoachMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] placeholder:text-[#64748B]/50 focus:border-[#FF5E14] focus:outline-none resize-none font-sans"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setCoachModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="shadow-md shadow-[#FF5E14]/20">
                <span>SEND MESSAGE</span>
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Renew Modal */}
      <Modal
        isOpen={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
        title="EXTEND MEMBERSHIP"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-[#94A3B8]">
          <p>
            Extend current <strong className="text-[#FF5E14]">{member.membershipPlanName}</strong> contract term with 1-click execution.
          </p>
          <div className="p-4 rounded-xl bg-[#1A1C24] border border-[#262933] flex items-center justify-between">
            <span className="text-[#FFF5EE]">Next Cycle Allocation (30 Days)</span>
            <span className="text-base font-black text-[#FF5E14] font-space">
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
              className="shadow-md shadow-[#FF5E14]/20"
              onClick={() => {
                alert("Contract extended by 30 days. Record updated.");
                setRenewModalOpen(false);
              }}
            >
              <span>CONFIRM EXTENSION</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

