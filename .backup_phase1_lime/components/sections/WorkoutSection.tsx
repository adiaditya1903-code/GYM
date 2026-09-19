"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { WEEKLY_WORKOUT_PLAN, DayOfWeek, DayWorkoutPlan } from "@/data/workouts";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Play, Pause, RotateCcw, Check, Flame, Clock, Award, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const DAYS: { key: DayOfWeek; label: string; full: string }[] = [
  { key: "mon", label: "MON", full: "Monday" },
  { key: "tue", label: "TUE", full: "Tuesday" },
  { key: "wed", label: "WED", full: "Wednesday" },
  { key: "thu", label: "THU", full: "Thursday" },
  { key: "fri", label: "FRI", full: "Friday" },
  { key: "sat", label: "SAT", full: "Saturday" },
  { key: "sun", label: "SUN", full: "Sunday" },
];

export default function WorkoutSection() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("mon");
  const workout: DayWorkoutPlan = WEEKLY_WORKOUT_PLAN[selectedDay];

  // Track completed sets per exercise
  const [completedSets, setCompletedSets] = useState<{ [exerciseId: string]: number }>({});

  // Workout active session state
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Rest interval timer
  const [restTimerSeconds, setRestTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Calculate total sets across current day's exercises
  const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const totalCompleted = workout.exercises.reduce((acc, ex) => acc + (completedSets[ex.id] || 0), 0);
  const progressPercent = totalSets > 0 ? Math.min(Math.round((totalCompleted / totalSets) * 100), 100) : 0;

  // Reset timer on tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && restTimerSeconds > 0) {
      interval = setInterval(() => {
        setRestTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (restTimerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, restTimerSeconds]);

  const toggleSet = (exerciseId: string, setIndex: number, totalExSets: number) => {
    if (!isWorkoutActive) setIsWorkoutActive(true);

    setCompletedSets((prev) => {
      const current = prev[exerciseId] || 0;
      let next: number;
      if (setIndex < current) {
        next = setIndex;
      } else {
        next = setIndex + 1;
        setRestTimerSeconds(60);
        setIsTimerRunning(true);
      }

      const updated = { ...prev, [exerciseId]: next };
      const newTotal = workout.exercises.reduce((acc, ex) => acc + (updated[ex.id] || 0), 0);

      if (newTotal === totalSets && !sessionCompleted && totalSets > 0) {
        setSessionCompleted(true);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      }

      return updated;
    });
  };

  const handleResetWorkout = () => {
    setCompletedSets({});
    setIsWorkoutActive(false);
    setSessionCompleted(false);
    setIsTimerRunning(false);
    setRestTimerSeconds(60);
  };

  const resetTimer = () => {
    setRestTimerSeconds(60);
    setIsTimerRunning(false);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <section id="workout" className="py-28 bg-[#111111] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-3">
            <Flame className="w-3.5 h-3.5 text-[#D7FF00]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
              LIVE TELEMETRY TRACKER
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space">
            TODAY&apos;S <span className="text-[#D7FF00]">DITO WORKOUT.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A3A3A3] mt-2 leading-relaxed">
            Interactive weekly telemetry tracker. Select any training day, log your working sets live, and time your rest intervals.
          </p>
        </div>

        {/* 7-Day Selector Bar */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#171717] border border-white/10 shadow-2xl">
            {DAYS.map((day) => {
              const isActive = selectedDay === day.key;
              return (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => {
                    setSelectedDay(day.key);
                    setIsTimerRunning(false);
                  }}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black font-space tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#D7FF00] text-[#080808] shadow-lg shadow-[#D7FF00]/25 scale-105"
                      : "text-[#A3A3A3] hover:text-white hover:bg-white/5"
                  }`}
                  title={day.full}
                >
                  <span className="block">{day.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workout Dashboard Card */}
        <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          
          {/* Top Workout Metadata Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-lg sm:text-xl font-black text-white font-space tracking-wide">
                  {workout.title}
                </span>
                <Badge variant="lime">{workout.level}</Badge>
              </div>
              <p className="text-xs text-[#A3A3A3] max-w-xl leading-relaxed">
                {workout.description}
              </p>
            </div>

            <div className="flex items-center gap-6 self-start sm:self-center shrink-0">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D7FF00]" />
                <div>
                  <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block leading-tight">Duration</span>
                  <span className="text-sm font-bold text-white font-mono">{workout.durationMinutes} Mins</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block leading-tight">Est. Burn</span>
                  <span className="text-sm font-bold text-white font-mono">{workout.estCalories} kcal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar & Timer Row */}
          <div className="mb-8 p-4 rounded-2xl bg-[#111111] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold uppercase tracking-wider text-white font-space">Workout Completion</span>
                <span className="font-mono text-[#D7FF00] font-bold">{progressPercent}% ({totalCompleted}/{totalSets} Sets)</span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D7FF00] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Rest Timer Module */}
            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-6">
              <div>
                <span className="text-[10px] text-[#A3A3A3] uppercase font-bold block mb-0.5">Rest Timer</span>
                <span className="text-2xl font-black font-mono text-white tracking-widest">
                  {formatSeconds(restTimerSeconds)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isTimerRunning ? "Pause Rest" : "Start Rest"}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
                  title="Reset 60s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Session Complete Banner */}
          {sessionCompleted && (
            <div className="mb-6 p-4 rounded-2xl bg-[#D7FF00]/10 border border-[#D7FF00]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#D7FF00]" />
                <div>
                  <h5 className="font-bold text-white text-sm uppercase font-space">
                    Session Protocol Completed!
                  </h5>
                  <p className="text-xs text-[#D7FF00]">
                    All {totalSets} sets logged successfully for {workout.dayName}. Outstanding work!
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={handleResetWorkout}>
                Reset Session
              </Button>
            </div>
          )}

          {/* Exercises List */}
          <div className="space-y-3.5">
            {workout.exercises.map((exercise, index) => {
              const completedCount = completedSets[exercise.id] || 0;
              const isExerciseComplete = completedCount >= exercise.sets;

              return (
                <div
                  key={exercise.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                    isExerciseComplete
                      ? "bg-[#D7FF00]/[0.04] border-[#D7FF00]/30"
                      : "bg-[#111111] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-bold flex items-center justify-center text-[#D7FF00]">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-white font-space tracking-wide">
                          {exercise.name}
                        </h4>
                        <span className="text-[11px] text-[#A3A3A3]">
                          Target: <strong className="text-white">{exercise.targetMuscle}</strong> • Notes: {exercise.notes}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-[#A3A3A3]">
                      <span>{exercise.sets} Sets</span>
                      <span className="text-white font-bold">{exercise.reps}</span>
                      {exercise.restSec > 0 ? (
                        <span className="text-[10px] text-white/60 uppercase">{exercise.restSec}s Rest</span>
                      ) : (
                        <span className="text-[10px] text-[#D7FF00] uppercase font-bold">Active Flow</span>
                      )}
                    </div>
                  </div>

                  {/* Set Checkboxes Bar */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#A3A3A3] tracking-wider">
                      Log Sets:
                    </span>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                        const isSetComplete = setIdx < completedCount;
                        return (
                          <button
                            key={setIdx}
                            type="button"
                            onClick={() => toggleSet(exercise.id, setIdx, exercise.sets)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                              isSetComplete
                                ? "bg-[#D7FF00] text-[#080808] border-[#D7FF00] shadow-[0_0_10px_rgba(215,255,0,0.3)]"
                                : "bg-white/5 text-[#A3A3A3] border-white/10 hover:border-white/25 hover:text-white"
                            }`}
                          >
                            <span>Set {setIdx + 1}</span>
                            {isSetComplete && <Check className="w-3 h-3 stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Callout */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#A3A3A3] text-center sm:text-left">
              Want customized periodized workout prescriptions delivered every morning?
            </span>
            <Link href="/login?tab=register">
              <Button size="sm" variant="primary" glow>
                Activate Athlete Portal
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
