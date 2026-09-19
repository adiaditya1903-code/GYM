import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lime" | "silver" | "dark" | "outline" | "danger" | "warning";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "lime",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    lime: "bg-[#C8FF00]/10 text-[#C8FF00] border border-[#C8FF00]/30 shadow-[0_0_12px_rgba(200,255,0,0.15)]",
    silver: "bg-white/[0.06] text-[#F1F0EA] border border-white/10",
    dark: "bg-[#151515] text-[#858585] border border-white/10",
    outline: "border border-white/15 text-[#858585]",
    danger: "bg-red-500/10 text-red-400 border border-red-500/30",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
