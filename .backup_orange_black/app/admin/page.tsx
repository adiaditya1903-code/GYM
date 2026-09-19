"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MockDb, TourInquiry, MemberProfile } from "@/lib/mock-db";
import { MembershipPlan } from "@/data/memberships";
import { TRAINERS } from "@/data/trainers";
import { PROGRAMS } from "@/data/programs";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Flame,
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Mail,
  Search,
  CheckCircle,
  Edit2,
  LogOut,
  Layers,
  Sparkles,
  ArrowUpRight,
  Shield,
  Activity,
  Dumbbell,
} from "lucide-react";

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<TourInquiry[]>([]);
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [activeTab, setActiveTab] = useState<"inquiries" | "members" | "pricing" | "trainers" | "programs">("inquiries");
  
  const [searchMemberQuery, setSearchMemberQuery] = useState("");
  const [selectedPlanForEdit, setSelectedPlanForEdit] = useState<MembershipPlan | null>(null);
  const [editPriceMonthly, setEditPriceMonthly] = useState<number>(0);
  const [editPriceYearly, setEditPriceYearly] = useState<number>(0);

  useEffect(() => {
    setInquiries(MockDb.getInquiries());
    setMembers(MockDb.getMembers());
    setPlans(MockDb.getPlans());
  }, []);

  const handleUpdateInquiryStatus = (id: string, status: TourInquiry["status"]) => {
    const updated = MockDb.updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  const handleSavePriceEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForEdit) return;
    const updated = MockDb.updatePlanPrice(selectedPlanForEdit.id, editPriceMonthly, editPriceYearly);
    setPlans(updated);
    setSelectedPlanForEdit(null);
  };

  const filteredMembers = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(searchMemberQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchMemberQuery.toLowerCase()) ||
      m.membershipPlanName.toLowerCase().includes(searchMemberQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#FFF5EE] flex flex-col selection:bg-[#FF5E14] selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#262933] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5E14] to-[#FF7A00] flex items-center justify-center text-white shadow-md shadow-[#FF5E14]/25 group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-[#FFF5EE] uppercase font-space">
                DITO<span className="text-[#FF5E14]">.ADMIN</span> // COMMAND CENTER
              </span>
              <span className="text-[10px] text-[#94A3B8] font-mono tracking-wider">
                STAFF MANAGEMENT SUITE
              </span>
            </div>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full border border-[#FF5E14]/30 bg-[#FF5E14]/10 text-[#FF5E14] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse"></span>
            ROOT ACCESS GRANTED
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs text-[#94A3B8] hover:text-[#FF5E14] transition-colors flex items-center gap-1 font-mono"
          >
            <span>Live Website</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5E14]" />
          </Link>
          <Link href="/login">
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg border border-[#262933] hover:border-rose-500/50 hover:bg-rose-500/10 text-[#94A3B8] hover:text-rose-400 transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-mono"
              title="Terminate Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main Admin View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top 5 KPI Metrics Panels */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-4 rounded-xl bg-[#121318] border border-[#262933] hover:border-[#FF5E14]/40 transition-all shadow-md">
            <div className="flex items-center justify-between text-[#94A3B8] mb-1.5 font-mono">
              <span className="text-[10px] uppercase tracking-wider">ACTIVE ATHLETES</span>
              <Users className="w-3.5 h-3.5 text-[#FF5E14]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#FFF5EE] font-space">542</span>
            <span className="text-[10px] text-[#FF5E14] block mt-1 font-mono font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3 inline" /> +12.4% this month
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#121318] border border-[#262933] hover:border-[#FF5E14]/40 transition-all shadow-md">
            <div className="flex items-center justify-between text-[#94A3B8] mb-1.5 font-mono">
              <span className="text-[10px] uppercase tracking-wider">RETENTION RATE</span>
              <CheckCircle className="w-3.5 h-3.5 text-[#FF7A00]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#FF5E14] font-space">93.7%</span>
            <span className="text-[10px] text-[#94A3B8] block mt-1 font-mono">508 / 542 active renewals</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121318] border border-[#262933] hover:border-amber-400/40 transition-all shadow-md">
            <div className="flex items-center justify-between text-[#94A3B8] mb-1.5 font-mono">
              <span className="text-[10px] uppercase tracking-wider">EXPIRING PASSES</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-space">14</span>
            <span className="text-[10px] text-[#94A3B8] block mt-1 font-mono">renewal alerts (7 days)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121318] border border-[#262933] hover:border-[#FF7A00]/40 transition-all shadow-md">
            <div className="flex items-center justify-between text-[#94A3B8] mb-1.5 font-mono">
              <span className="text-[10px] uppercase tracking-wider">MONTHLY REVENUE</span>
              <CreditCard className="w-3.5 h-3.5 text-[#FF7A00]" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-[#FFF5EE] font-space">₹10,48,500</span>
            <span className="text-[10px] text-[#FF7A00] block mt-1 font-mono font-bold">settled in INR</span>
          </div>

          <div className="p-4 rounded-xl bg-[#121318] border border-[#262933] col-span-2 lg:col-span-1 hover:border-[#FF5E14]/40 transition-all shadow-md">
            <div className="flex items-center justify-between text-[#94A3B8] mb-1.5 font-mono">
              <span className="text-[10px] uppercase tracking-wider">NEW INTAKE</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#FF5E14]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#FF5E14] font-space">+68</span>
            <span className="text-[10px] text-[#94A3B8] block mt-1 font-mono">athletes this month</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#262933] pb-2 overflow-x-auto">
          {[
            { id: "inquiries", label: `VIP Inquiries (${inquiries.length})`, icon: Mail },
            { id: "members", label: `Athletes Directory (${members.length})`, icon: Users },
            { id: "pricing", label: "Pricing Architecture", icon: CreditCard },
            { id: "trainers", label: `Coaching Faculty (${TRAINERS.length})`, icon: Sparkles },
            { id: "programs", label: `Training Protocols (${PROGRAMS.length})`, icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? "bg-[#FF5E14] text-white border-[#FF5E14] shadow-md shadow-[#FF5E14]/25"
                    : "bg-[#121318] border-[#262933] text-[#94A3B8] hover:text-[#FFF5EE] hover:border-[#262933]/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#94A3B8]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Tour Inquiries Inbox */}
        {activeTab === "inquiries" && (
          <div className="bg-[#121318] border border-[#262933] rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-[#262933] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#FF5E14] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-ping"></span>
                  <span>LIVE INTAKE PIPELINE</span>
                </div>
                <h3 className="text-base font-bold text-[#FFF5EE] uppercase font-space mt-1 flex items-center gap-2">
                  VIP Consultations & Tour Requests
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5 font-sans">
                  Real-time athlete leads queued via website consultation forms.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#262933] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                    <th className="pb-3">Applicant Name</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Goal</th>
                    <th className="pb-3">Tier</th>
                    <th className="pb-3">Slot</th>
                    <th className="pb-3">Lead Status</th>
                    <th className="pb-3 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262933]">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="text-[#94A3B8] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 font-bold text-[#FFF5EE]">
                        <div className="text-sm font-semibold">{inq.fullName}</div>
                        <div className="text-[10px] text-[#FF7A00] font-mono mt-0.5">id: {inq.id}</div>
                      </td>
                      <td className="py-3.5 font-mono">
                        <div className="text-[#FFF5EE]">{inq.phone}</div>
                        <div className="text-[#64748B] text-[11px]">{inq.email}</div>
                      </td>
                      <td className="py-3.5 text-[#FF5E14] font-medium font-sans">{inq.goal}</td>
                      <td className="py-3.5 font-mono">
                        <span className="px-2 py-0.5 rounded bg-[#1A1C24] border border-[#262933] text-[#FFF5EE]">
                          {inq.preferredMembership}
                        </span>
                      </td>
                      <td className="py-3.5 text-[#94A3B8] font-mono">{inq.preferredDate}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider inline-block border ${
                            inq.status === "New"
                              ? "bg-[#FF5E14]/15 text-[#FF5E14] border-[#FF5E14]/30"
                              : inq.status === "Contacted"
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : inq.status === "Tour Scheduled"
                              ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                              : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleUpdateInquiryStatus(
                              inq.id,
                              e.target.value as TourInquiry["status"]
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] text-xs focus:border-[#FF5E14] focus:outline-none cursor-pointer font-mono"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Tour Scheduled">Tour Scheduled</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Members Directory */}
        {activeTab === "members" && (
          <div className="bg-[#121318] border border-[#262933] rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-[#262933] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#FF7A00] font-mono">
                  <Shield className="w-3.5 h-3.5" />
                  <span>REGISTRY: ATHLETE PROFILES</span>
                </div>
                <h3 className="text-base font-bold text-[#FFF5EE] uppercase font-space mt-1 flex items-center gap-2">
                  Athlete Management Roster
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5 font-sans">
                  Biometric athlete records, digital pass tokens, and subscription lifespans.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search athlete, email or plan..."
                  value={searchMemberQuery}
                  onChange={(e) => setSearchMemberQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] text-xs placeholder:text-[#64748B] focus:border-[#FF5E14] focus:outline-none font-sans"
                />
                <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#262933] text-[#64748B] font-mono uppercase tracking-wider text-[11px]">
                    <th className="pb-3">Athlete</th>
                    <th className="pb-3">Plan Tier</th>
                    <th className="pb-3">Cycle</th>
                    <th className="pb-3">Pass Token</th>
                    <th className="pb-3">Expiry</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262933]">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="text-[#94A3B8] hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5">
                        <div className="font-bold text-[#FFF5EE] text-sm">{m.fullName}</div>
                        <div className="text-[11px] text-[#64748B] font-mono">{m.email}</div>
                      </td>
                      <td className="py-3.5 font-bold text-[#FF5E14] font-mono">{m.membershipPlanName}</td>
                      <td className="py-3.5 uppercase text-[#FFF5EE] font-mono">{m.billingCycle}</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded bg-[#1A1C24] border border-[#262933] text-[#FF7A00] font-mono font-bold text-[11px]">
                          {m.qrCodeToken}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono">
                        <div className="text-[#FFF5EE]">{m.expiryDate}</div>
                        <div className="text-[10px] text-[#64748B]">({m.daysRemaining}d left)</div>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider inline-block border ${
                            m.status === "Active"
                              ? "bg-[#FF5E14]/15 text-[#FF5E14] border-[#FF5E14]/30"
                              : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Reviewing athlete telemetry dump for ${m.fullName}`)}
                          className="px-2.5 py-1 rounded-lg bg-[#FF5E14]/10 hover:bg-[#FF5E14]/20 text-[#FF5E14] text-xs transition-colors cursor-pointer border border-[#FF5E14]/30 font-mono font-bold"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Pricing Configuration Manager */}
        {activeTab === "pricing" && (
          <div className="bg-[#121318] border border-[#262933] rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="mb-5 border-b border-[#262933] pb-4">
              <div className="flex items-center gap-2 text-xs text-[#FF5E14] font-mono">
                <CreditCard className="w-3.5 h-3.5" />
                <span>CENTRALIZED MEMBERSHIP RATES</span>
              </div>
              <h3 className="text-base font-bold text-[#FFF5EE] uppercase font-space mt-1 flex items-center gap-2">
                Membership Pricing Architecture
              </h3>
              <p className="text-xs text-[#94A3B8] mt-0.5 font-sans">
                Centralized rate configuration. Edits dynamically propagate to landing pricing cards, calculator matching, and checkout flows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-5 rounded-2xl bg-[#1A1C24] border border-[#262933] hover:border-[#FF5E14]/40 transition-all flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black text-[#FFF5EE] uppercase font-space">
                        {plan.name}
                      </span>
                      {plan.isPopular && <Badge variant="orange">RECOMMENDED</Badge>}
                    </div>

                    <p className="text-xs text-[#94A3B8] mb-4 font-sans">{plan.tagline}</p>

                    <div className="space-y-2 mb-4 p-3.5 rounded-xl bg-[#121318] border border-[#262933]">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#94A3B8] font-mono">Monthly Rate:</span>
                        <span className="font-bold text-[#FFF5EE] font-mono">{formatINR(plan.monthlyPrice)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#94A3B8] font-mono">Annual Rate:</span>
                        <span className="font-bold text-[#FF5E14] font-mono">{formatINR(plan.yearlyPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      setSelectedPlanForEdit(plan);
                      setEditPriceMonthly(plan.monthlyPrice);
                      setEditPriceYearly(plan.yearlyPrice);
                    }}
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1.5 text-[#FF5E14]" />
                    <span>Edit Tier Pricing</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Trainers Directory */}
        {activeTab === "trainers" && (
          <div className="bg-[#121318] border border-[#262933] rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="mb-5 border-b border-[#262933] pb-4">
              <div className="flex items-center gap-2 text-xs text-[#FF7A00] font-mono">
                <Users className="w-3.5 h-3.5" />
                <span>COACHING FACULTY ROSTER</span>
              </div>
              <h3 className="text-base font-bold text-[#FFF5EE] uppercase font-space mt-1 flex items-center gap-2">
                Coaching Staff Roster & Load Allocation
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRAINERS.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-[#1A1C24] border border-[#262933] hover:border-[#FF5E14]/30 transition-all flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#FFF5EE] text-sm">{t.name}</h4>
                    <p className="text-xs text-[#FF5E14] font-mono mt-0.5">{t.role}</p>
                    <p className="text-xs text-[#94A3B8] mt-1 font-sans">{t.specialization}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-[#FFF5EE] font-space">{t.activeAthletes}</span>
                    <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider block font-mono">Athletes Assigned</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Programs Overview */}
        {activeTab === "programs" && (
          <div className="bg-[#121318] border border-[#262933] rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="mb-5 border-b border-[#262933] pb-4">
              <div className="flex items-center gap-2 text-xs text-[#FF5E14] font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>PERFORMANCE PROTOCOLS</span>
              </div>
              <h3 className="text-base font-bold text-[#FFF5EE] uppercase font-space mt-1 flex items-center gap-2">
                Active Training Protocols
              </h3>
            </div>
            <div className="space-y-2.5">
              {PROGRAMS.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-[#1A1C24] border border-[#262933] hover:border-[#FF5E14]/40 transition-all flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#FFF5EE] text-sm font-space">{p.number} — {p.name}</h4>
                    <p className="text-xs text-[#94A3B8] mt-0.5 font-sans">{p.shortDescription}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono text-[#FF5E14] font-bold">{p.duration}</span>
                    <Badge variant="orange">{p.difficulty}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Edit Pricing Modal */}
      {selectedPlanForEdit && (
        <Modal
          isOpen={!!selectedPlanForEdit}
          onClose={() => setSelectedPlanForEdit(null)}
          title={`EDIT PRICING: ${selectedPlanForEdit.name.toUpperCase()}`}
          maxWidth="md"
        >
          <form onSubmit={handleSavePriceEdit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#94A3B8] font-mono mb-1.5">
                Monthly Rate (INR):
              </label>
              <input
                type="number"
                required
                value={editPriceMonthly}
                onChange={(e) => setEditPriceMonthly(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] text-xs focus:border-[#FF5E14] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#94A3B8] font-mono mb-1.5">
                Annual Rate (INR):
              </label>
              <input
                type="number"
                required
                value={editPriceYearly}
                onChange={(e) => setEditPriceYearly(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] text-xs focus:border-[#FF5E14] focus:outline-none font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <Button variant="outline" size="sm" onClick={() => setSelectedPlanForEdit(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="shadow-md shadow-[#FF5E14]/25">
                Save Price Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

