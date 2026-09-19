"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState<"default" | "active">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Suppress on touch devices
    if (typeof window !== "undefined") {
      const checkTouch = () => {
        return (
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
        );
      };
      if (checkTouch()) {
        setIsTouch(true);
        return;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorElement = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorElement) {
        const text = cursorElement.getAttribute("data-cursor");
        if (text === "rotate") {
          setCursorText("ROTATE");
        } else if (text === "explore") {
          setCursorText("VIEW");
        } else if (text === "go") {
          setCursorText("GO");
        } else {
          setCursorText(text?.toUpperCase() || "SELECT");
        }
        setCursorVariant("active");
        return;
      }

      if (target.closest("button") || target.closest("a[href]") || target.closest('[role="button"]')) {
        setCursorText("GO");
        setCursorVariant("active");
        return;
      }

      if (target.closest("canvas")) {
        setCursorText("3D:ROT");
        setCursorVariant("active");
        return;
      }

      if (target.closest("img") || target.closest("[data-gallery-item]")) {
        setCursorText("INSPECT");
        setCursorVariant("active");
        return;
      }

      setCursorText(null);
      setCursorVariant("default");
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let currentX = -100;
    let currentY = -100;

    const animate = () => {
      currentX += (targetPos.x - currentX) * 0.28;
      currentY += (targetPos.y - currentY) * 0.28;
      setPosition({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetPos.x, targetPos.y, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out select-none"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {cursorVariant === "active" && cursorText ? (
        <div className="relative -top-4 -left-4 px-2.5 py-1 bg-[#FF5E14] text-white font-space font-bold text-[10px] tracking-wider uppercase rounded-full shadow-[0_0_20px_rgba(255,94,20,0.7)] flex items-center gap-1 border border-white/40">
          <span>{cursorText}</span>
        </div>
      ) : (
        <div className="relative -top-1.5 -left-1.5 w-3.5 h-3.5 rounded-full bg-[#FF5E14] shadow-[0_0_12px_rgba(255,94,20,0.85)] border border-white/60" />
      )}
    </div>
  );
}
