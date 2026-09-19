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
      "relative inline-flex items-center justify-center font-space font-bold tracking-wider uppercase transition-all duration-150 select-none disabled:opacity-50 disabled:cursor-not-allowed rounded-md";

    const sizeStyles = {
      sm: "text-[11px] px-3.5 py-1.5 gap-1.5",
      md: "text-xs px-5 py-2.5 gap-2",
      lg: "text-xs sm:text-sm px-7 py-3.5 gap-2.5",
      xl: "text-sm sm:text-base px-9 py-4 gap-3",
    };

    const variantStyles = {
      primary:
        "bg-[#FF5E14] text-white hover:bg-[#FF7A00] hover:shadow-[0_0_30px_rgba(255,94,20,0.55)] active:scale-[0.98] border border-white/20",
      secondary:
        "bg-[#121318] text-[#F8FAFC] border border-[#262933] hover:bg-[#1A1C24] hover:border-[#FF5E14]/40 active:scale-[0.98]",
      outline:
        "bg-transparent text-[#F8FAFC] border border-white/15 hover:border-[#FF5E14] hover:text-[#FF7A00] hover:bg-[#FF5E14]/10 active:scale-[0.98]",
      ghost: "bg-transparent text-[#94A3B8] hover:text-[#FF5E14] hover:bg-[#FF5E14]/10",
      danger: "bg-rose-500/15 text-rose-400 border border-rose-500/30 hover:bg-rose-500/25",
    };

    const glowStyle = glow && variant === "primary" ? "shadow-[0_0_32px_rgba(255,94,20,0.5)]" : "";

    return (
      <button
        ref={ref}
        data-cursor="go"
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], glowStyle, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
