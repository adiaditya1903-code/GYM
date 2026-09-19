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
      "relative inline-flex items-center justify-center font-mono font-bold tracking-wider uppercase transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed";

    const sizeStyles = {
      sm: "text-[11px] px-3.5 py-2 gap-1.5",
      md: "text-xs px-5 py-2.5 gap-2",
      lg: "text-xs sm:text-sm px-7 py-3.5 gap-2.5",
      xl: "text-sm sm:text-base px-8 py-4 gap-3",
    };

    const variantStyles = {
      primary:
        "bg-[#C8FF00] text-[#070707] hover:bg-[#d8ff33] hover:shadow-[0_0_24px_rgba(200,255,0,0.4)] active:scale-[0.98]",
      secondary:
        "bg-[#151515] text-[#F1F0EA] border border-white/10 hover:bg-[#202020] hover:border-white/20 active:scale-[0.98]",
      outline:
        "bg-transparent text-[#F1F0EA] border border-white/20 hover:border-[#C8FF00] hover:text-[#C8FF00] hover:bg-[#C8FF00]/5 active:scale-[0.98]",
      ghost: "bg-transparent text-[#858585] hover:text-[#F1F0EA] hover:bg-white/[0.05]",
      danger: "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25",
    };

    const glowStyle = glow && variant === "primary" ? "shadow-[0_0_28px_rgba(200,255,0,0.35)]" : "";

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
