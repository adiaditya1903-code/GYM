import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", glow = false, children, ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-bold tracking-wider transition-all duration-300 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-xs sm:text-sm px-5 py-2.5 gap-2",
      lg: "text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 gap-2.5",
      xl: "text-base sm:text-lg px-8 sm:px-9 py-3.5 sm:py-4 gap-3",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-[#00F08B] to-[#00D488] text-[#08090D] hover:from-[#15FFA0] hover:to-[#00F08B] shadow-[0_4px_20px_rgba(0,240,139,0.25)] hover:shadow-[0_6px_28px_rgba(0,240,139,0.4)] border border-[#00F08B]/40 hover:-translate-y-0.5",
      secondary:
        "bg-gradient-to-b from-white to-[#E2E8F0] text-[#08090D] hover:from-white hover:to-white shadow-md hover:-translate-y-0.5",
      outline:
        "bg-transparent text-[#F8FAFC] border border-white/15 hover:border-[#00F08B]/60 hover:text-[#00F08B] hover:bg-[#00F08B]/5 hover:-translate-y-0.5",
      ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.06]",
      danger: "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25",
    };

    const glowStyle = glow ? "shadow-[0_0_28px_rgba(0,240,139,0.35)]" : "";

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], glowStyle, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";


