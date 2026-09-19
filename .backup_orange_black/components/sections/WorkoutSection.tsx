"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { WEEKLY_WORKOUT_PLAN, DayOfWeek, DayWorkoutPlan } from "@/data/workouts";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Play, Pause, RotateCcw, Check, Flame, Clock, Award, Dumbbell } from "lucide-react";
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
    <section id="workout" className="py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] relative overflow-hidden font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-12 gap-6 select-none">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>11 // TACTICAL SESSION LOG</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">DAILY WORKOUT TRACKER</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              SESSION <span className="text-[#FF5E14] orange-glow">TRACKER.</span>
            </h2>
          </div>

          {/* 7-Day Selector Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121318] p-1.5 rounded-full border border-[#262933] font-space text-xs font-bold">
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
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#FF5E14] text-white shadow-[0_0_12px_rgba(255,94,20,0.5)]"
                      : "text-[#94A3B8] hover:text-[#FFFFFF]"
                  }`}
                  title={day.full}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workout Dashboard Card */}
        <div className="bg-[#121318] border border-[#262933] rounded-2xl p-6 sm:p-8 lg:p-10 relative shadow-2xl">
          
          {/* Top Workout Metadata Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#262933] gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className="text-xl sm:text-2xl font-black text-[#FFFFFF] font-space tracking-wide uppercase">
                  {workout.title}
                </span>
                <span className="px-2.5 py-0.5 bg-[#FFF5EE] text-[#0A0A0C] font-space font-bold text-[10px] rounded-full uppercase">
                  {workout.level}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed font-sans">
                {workout.description}
              </p>
            </div>

            <div className="flex items-center gap-6 self-start sm:self-center shrink-0 font-space font-bold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF5E14]" />
                <div>
                  <span className="text-[10px] text-[#94A3B8] uppercase block leading-tight">DURATION</span>
                  <span className="text-sm font-bold text-[#FFFFFF]">{workout.durationMinutes}m</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FF7A00]" />
                <div>
                  <span className="text-[10px] text-[#94A3B8] uppercase block leading-tight">EST. BURN</span>
                  <span className="text-sm font-bold text-[#FF5E14]">{workout.estCalories} kcal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar & Timer Row */}
          <div className="mb-8 p-4 bg-[#1A1C24] border border-[#262933] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-space">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[#FFFFFF]">SESSION ADHERENCE:</span>
                <span className="text-[#FF5E14] font-bold">{progressPercent}% ({totalCompleted}/{totalSets} sets confirmed)</span>
              </div>
              <div className="h-2.5 w-full bg-[#121318] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF5E14] rounded-full shadow-[0_0_10px_rgba(255,94,20,0.8)] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Rest Timer Module */}
            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-[#262933] pt-3 sm:pt-0 sm:pl-6">
              <div>
                <span className="text-[10px] text-[#94A3B8] uppercase font-bold block mb-0.5">REST TIMER</span>
                <span className="text-2xl font-black font-space text-[#FF5E14] tracking-widest">
                  {formatSeconds(restTimerSeconds)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-2.5 bg-[#121318] border border-[#262933] rounded-lg hover:border-[#FF5E14] text-[#FFFFFF] transition-colors cursor-pointer"
                  title={isTimerRunning ? "Pause Rest" : "Start Rest"}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4 text-[#FF5E14]" /> : <Play className="w-4 h-4 text-[#FF5E14]" />}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="p-2.5 bg-[#121318] border border-[#262933] rounded-lg hover:border-white/20 text-[#94A3B8] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                  title="Reset 60s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Session Complete Banner */}
          {sessionCompleted && (
            <div className="mb-6 p-4 bg-[#FF5E14]/15 border border-[#FF5E14]/40 rounded-xl flex items-center justify-between font-space">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#FF5E14]" />
                <div>
                  <h5 className="font-bold text-[#FFFFFF] text-sm uppercase">
                    WORKOUT SESSION COMPLETED!
                  </h5>
                  <p className="text-xs text-[#FF5E14]">
                    All {totalSets} sets confirmed for {workout.dayName}. Great work!
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={handleResetWorkout}>
                RESET LOG
              </Button>
            </div>
          )}

          {/* Exercises List */}
          <div className="space-y-3 font-space">
            {workout.exercises.map((exercise, index) => {
              const completedCount = completedSets[exercise.id] || 0;
              const isExerciseComplete = completedCount >= exercise.sets;

              return (
                <div
                  key={exercise.id}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isExerciseComplete
                      ? "bg-[#FF5E14]/[0.05] border-[#FF5E14]/40"
                      : "bg-[#1A1C24] border-[#262933] hover:border-[#262933]/90"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-[#121318] border border-[#262933] text-xs font-mono font-bold flex items-center justify-center text-[#FF5E14]">
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-[#FFFFFF] font-space tracking-wide">
                          {exercise.name}
                        </h4>
                        <span className="text-xs text-[#94A3B8] font-sans">
                          Target: <strong className="text-white">{exercise.targetMuscle}</strong> • Notes: {exercise.notes}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-space text-[#94A3B8]">
                      <span>{exercise.sets} sets</span>
                      <span className="text-[#FFFFFF] font-bold">{exercise.reps}</span>
                      {exercise.restSec > 0 ? (
                        <span className="text-[10px] text-[#94A3B8] uppercase">{exercise.restSec}s rest</span>
                      ) : (
                        <span className="text-[10px] text-[#FF5E14] uppercase font-bold">continuous flow</span>
                      )}
                    </div>
                  </div>

                  {/* Set Checkboxes Bar */}
                  <div className="pt-3 border-t border-[#262933] flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                      LOG COMPLETED SETS:
                    </span>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                        const isSetComplete = setIdx < completedCount;
                        return (
                          <button
                            key={setIdx}
                            type="button"
                            onClick={() => toggleSet(exercise.id, setIdx, exercise.sets)}
                            className={`px-3.5 py-1 text-xs font-space font-bold transition-all cursor-pointer flex items-center gap-1.5 rounded-lg border ${
                              isSetComplete
                                ? "bg-[#FF5E14] text-white border-[#FF5E14] shadow-[0_0_10px_rgba(255,94,20,0.4)]"
                                : "bg-[#121318] text-[#94A3B8] border-[#262933] hover:border-[#FF5E14]/40 hover:text-[#FFFFFF]"
                            }`}
                          >
                            <span>SET {setIdx + 1}</span>
                            {isSetComplete && <Check className="w-3.5 h-3.5 stroke-[3]" />}
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
          <div className="mt-8 pt-6 border-t border-[#262933] flex flex-col sm:flex-row items-center justify-between gap-4 font-space">
            <span className="text-xs text-[#94A3B8] text-center sm:text-left">
              Want automated telemetry tracking and personalized coach routines?
            </span>
            <Link href="/login?tab=register">
              <Button size="sm" variant="primary" glow>
                <span>ACTIVATE ATHLETE MEMBERSHIP</span>
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
