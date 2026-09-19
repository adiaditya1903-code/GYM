import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "lime" | "silver" | "dark" | "outline" | "danger" | "warning" | "cyan";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "orange",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    orange: "bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/35 shadow-[0_0_12px_rgba(255,94,20,0.2)]",
    lime: "bg-[#FF5E14]/15 text-[#FF5E14] border border-[#FF5E14]/35 shadow-[0_0_12px_rgba(255,94,20,0.2)]",
    cyan: "bg-[#FF7A00]/15 text-[#FF8A3D] border border-[#FF7A00]/35",
    silver: "bg-[#FFF5EE] text-[#0A0A0C] border border-white/90 font-bold shadow-sm",
    dark: "bg-[#121318] text-[#94A3B8] border border-[#262933]",
    outline: "border border-white/20 text-[#F8FAFC]",
    danger: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-space font-bold tracking-wider uppercase select-none rounded-full",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
