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
  Dumbbell,
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Mail,
  ShieldCheck,
  Search,
  CheckCircle,
  Clock,
  Edit2,
  LogOut,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  ArrowUpRight,
  Activity,
  Filter,
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
    <div className="min-h-screen bg-[#08090D] text-slate-100 flex flex-col selection:bg-[#00F08B] selection:text-[#08090D]">
      {/* Admin Header */}
      <header className="sticky top-0 z-30 bg-[#0D111A]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg shadow-black/40">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F08B] to-[#00D4FF] flex items-center justify-center shadow-md shadow-[#00F08B]/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-4 h-4 text-[#08090D] rotate-45" />
            </div>
            <span className="text-base sm:text-lg font-black tracking-wider text-white font-space">
              DITO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F08B] to-[#00D4FF]">COMMAND</span>
            </span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-[#00F08B]/10 text-[#00F08B] border border-[#00F08B]/30 font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F08B] animate-pulse"></span>
            ROOT ACCESS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-400 hover:text-[#00F08B] transition-colors flex items-center gap-1"
          >
            <span>Live Portal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/login">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer border border-white/[0.06]"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </header>

      {/* Main Admin View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top 5 KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#111722] to-[#0D111A] border border-white/[0.08] relative overflow-hidden group hover:border-[#00F08B]/40 transition-all shadow-md shadow-black/30">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-300">Total Members</span>
              <Users className="w-4 h-4 text-[#00F08B]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white font-space">542</span>
            <span className="text-[11px] text-[#00F08B] font-semibold block mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 inline" /> +12% vs last month
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#111722] to-[#0D111A] border border-white/[0.08] relative overflow-hidden group hover:border-[#00F08B]/40 transition-all shadow-md shadow-black/30">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-300">Active Plans</span>
              <CheckCircle className="w-4 h-4 text-[#00F08B]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#00F08B] font-space">508</span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">93.7% Retention rate</span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#111722] to-[#0D111A] border border-white/[0.08] relative overflow-hidden group hover:border-amber-400/40 transition-all shadow-md shadow-black/30">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-300">Expiring (7D)</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-space">14</span>
            <span className="text-[11px] text-slate-400 font-medium block mt-1">Renewal notices queued</span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#111722] to-[#0D111A] border border-white/[0.08] relative overflow-hidden group hover:border-[#00D4FF]/40 transition-all shadow-md shadow-black/30">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-300">Monthly MRR</span>
              <CreditCard className="w-4 h-4 text-[#00D4FF]" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-white font-space">₹10,48,500</span>
            <span className="text-[11px] text-[#00D4FF] font-semibold block mt-1">Recurring revenue</span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#111722] to-[#0D111A] border border-white/[0.08] col-span-2 lg:col-span-1 relative overflow-hidden group hover:border-[#00F08B]/40 transition-all shadow-md shadow-black/30">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-300">New Onboards</span>
              <TrendingUp className="w-4 h-4 text-[#00F08B]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white font-space">+68</span>
            <span className="text-[11px] text-[#00F08B] font-semibold block mt-1">This billing cycle</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2 overflow-x-auto">
          {[
            { id: "inquiries", label: `Tour Inquiries (${inquiries.length})`, icon: Mail },
            { id: "members", label: `Member Roster (${members.length})`, icon: Users },
            { id: "pricing", label: "Plans & Pricing Config", icon: CreditCard },
            { id: "trainers", label: `Trainers (${TRAINERS.length})`, icon: Sparkles },
            { id: "programs", label: `Programs (${PROGRAMS.length})`, icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#00F08B] text-[#08090D] shadow-lg shadow-[#00F08B]/25"
                    : "bg-white/[0.02] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#08090D]" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Tour Inquiries Inbox */}
        {activeTab === "inquiries" && (
          <div className="bg-[#0E121B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white uppercase font-space flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#00F08B]" />
                  VIP Tour & Consultation Requests
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Real-time leads dispatched through the homepage contact and booking forms.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3.5">Applicant Name</th>
                    <th className="pb-3.5">Contact</th>
                    <th className="pb-3.5">Target Goal</th>
                    <th className="pb-3.5">Preferred Tier</th>
                    <th className="pb-3.5">Requested Slot</th>
                    <th className="pb-3.5">Lead Status</th>
                    <th className="pb-3.5 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 font-bold text-white">
                        <div className="text-sm font-semibold">{inq.fullName}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{inq.id}</div>
                      </td>
                      <td className="py-4">
                        <div className="text-slate-200 font-medium">{inq.phone}</div>
                        <div className="text-slate-400 text-[11px]">{inq.email}</div>
                      </td>
                      <td className="py-4 font-semibold text-[#00F08B]">{inq.goal}</td>
                      <td className="py-4 font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300">
                          {inq.preferredMembership}
                        </span>
                      </td>
                      <td className="py-4 text-slate-300">{inq.preferredDate}</td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider inline-block ${
                            inq.status === "New"
                              ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                              : inq.status === "Contacted"
                              ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                              : inq.status === "Tour Scheduled"
                              ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                              : "bg-[#00F08B]/15 text-[#00F08B] border border-[#00F08B]/30"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleUpdateInquiryStatus(
                              inq.id,
                              e.target.value as TourInquiry["status"]
                            )
                          }
                          className="px-2.5 py-1.5 rounded-xl bg-[#08090D] border border-white/10 text-slate-200 text-xs focus:border-[#00F08B] focus:ring-1 focus:ring-[#00F08B]/40 focus:outline-none cursor-pointer transition-all"
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
          <div className="bg-[#0E121B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white uppercase font-space flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00F08B]" />
                  Member Management Roster
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Biometric athlete accounts, RFID tokens, and expiry dates.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search athlete, email or plan..."
                  value={searchMemberQuery}
                  onChange={(e) => setSearchMemberQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#08090D] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:border-[#00F08B] focus:ring-1 focus:ring-[#00F08B]/40 focus:outline-none transition-all"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="pb-3.5">Athlete</th>
                    <th className="pb-3.5">Plan Tier</th>
                    <th className="pb-3.5">Cycle</th>
                    <th className="pb-3.5">Pass Token</th>
                    <th className="pb-3.5">Expiry</th>
                    <th className="pb-3.5">Status</th>
                    <th className="pb-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="text-slate-300 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-white text-sm">{m.fullName}</div>
                        <div className="text-[11px] text-slate-400">{m.email}</div>
                      </td>
                      <td className="py-4 font-bold text-[#00F08B]">{m.membershipPlanName}</td>
                      <td className="py-4 uppercase font-mono text-slate-300">{m.billingCycle}</td>
                      <td className="py-4 font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-400 text-[11px]">
                          {m.qrCodeToken}
                        </span>
                      </td>
                      <td className="py-4 font-mono">
                        <div className="text-slate-200">{m.expiryDate}</div>
                        <div className="text-[10px] text-slate-500">({m.daysRemaining} days remaining)</div>
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider inline-block ${
                            m.status === "Active"
                              ? "bg-[#00F08B]/15 text-[#00F08B] border border-[#00F08B]/30"
                              : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          onClick={() => alert(`Reviewing biometric telemetry for ${m.fullName}`)}
                          className="px-2.5 py-1 rounded-lg bg-[#00F08B]/10 hover:bg-[#00F08B]/20 text-[#00F08B] font-bold text-xs transition-colors cursor-pointer border border-[#00F08B]/30"
                        >
                          Telemetry
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
          <div className="bg-[#0E121B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white uppercase font-space flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#00F08B]" />
                Membership Pricing Architecture
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Centralized rate configuration. Changes update across landing pricing cards, calculator matching, and checkout flows immediately.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-6 rounded-2xl bg-[#111622] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-black text-white uppercase font-space">
                        {plan.name}
                      </span>
                      {plan.isPopular && <Badge variant="lime">POPULAR</Badge>}
                    </div>

                    <p className="text-xs text-slate-400 mb-6">{plan.tagline}</p>

                    <div className="space-y-3 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Monthly Rate:</span>
                        <span className="font-bold text-white font-mono text-sm">{formatINR(plan.monthlyPrice)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Annual Rate:</span>
                        <span className="font-bold text-[#00F08B] font-mono text-sm">{formatINR(plan.yearlyPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedPlanForEdit(plan);
                      setEditPriceMonthly(plan.monthlyPrice);
                      setEditPriceYearly(plan.yearlyPrice);
                    }}
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                    <span>Edit Tier Pricing</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Trainers Directory */}
        {activeTab === "trainers" && (
          <div className="bg-[#0E121B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white uppercase font-space mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00F08B]" />
              Coaching Staff Roster & Client Allocation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TRAINERS.map((t) => (
                <div key={t.id} className="p-5 rounded-2xl bg-[#111622] border border-white/[0.08] hover:border-[#00F08B]/30 transition-all flex items-center justify-between shadow-md">
                  <div>
                    <h4 className="font-bold text-white text-base">{t.name}</h4>
                    <p className="text-xs text-[#00F08B] font-semibold mt-0.5">{t.role}</p>
                    <p className="text-xs text-slate-400 mt-1">{t.specialization}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-white font-space">{t.activeAthletes}</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Active Athletes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Programs Overview */}
        {activeTab === "programs" && (
          <div className="bg-[#0E121B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white uppercase font-space mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00F08B]" />
              Active Performance Protocols
            </h3>
            <div className="space-y-3">
              {PROGRAMS.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-[#111622] border border-white/[0.06] hover:border-white/[0.15] transition-all flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{p.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{p.shortDescription}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-mono font-semibold text-[#00F08B]">{p.duration}</span>
                    <Badge variant="dark">{p.difficulty}</Badge>
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
          title={`EDIT PRICING: ${selectedPlanForEdit.name}`}
          maxWidth="md"
        >
          <form onSubmit={handleSavePriceEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Monthly Price (INR)
              </label>
              <input
                type="number"
                required
                value={editPriceMonthly}
                onChange={(e) => setEditPriceMonthly(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#08090D] border border-white/10 text-white text-sm focus:border-[#00F08B] focus:ring-1 focus:ring-[#00F08B]/40 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Annual Price (INR)
              </label>
              <input
                type="number"
                required
                value={editPriceYearly}
                onChange={(e) => setEditPriceYearly(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#08090D] border border-white/10 text-white text-sm focus:border-[#00F08B] focus:ring-1 focus:ring-[#00F08B]/40 focus:outline-none transition-all"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setSelectedPlanForEdit(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" glow>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}


