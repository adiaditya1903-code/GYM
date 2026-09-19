import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lime" | "cyan" | "silver" | "dark" | "outline" | "danger" | "warning";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "lime",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    lime: "bg-[#00F08B]/10 text-[#00F08B] border border-[#00F08B]/30 shadow-[0_0_15px_rgba(0,240,139,0.12)]",
    cyan: "bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 shadow-[0_0_15px_rgba(0,212,255,0.12)]",
    silver: "bg-white/[0.08] text-slate-200 border border-white/15",
    dark: "bg-[#121724] text-slate-300 border border-white/10",
    outline: "border border-white/15 text-slate-300",
    danger: "bg-red-500/10 text-red-400 border border-red-500/30",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}


