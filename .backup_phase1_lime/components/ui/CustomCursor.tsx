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
    // Disable on touch devices
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

      // Check hovered element for cursor type
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorElement = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorElement) {
        const text = cursorElement.getAttribute("data-cursor");
        setCursorText(text);
        setCursorVariant("active");
        return;
      }

      // Check standard tags
      if (target.closest("button") || target.closest("a[href]") || target.closest('[role="button"]')) {
        setCursorText("GO");
        setCursorVariant("active");
        return;
      }

      if (target.closest("canvas")) {
        setCursorText("ROTATE");
        setCursorVariant("active");
        return;
      }

      if (target.closest("img") || target.closest('[data-gallery-item]')) {
        setCursorText("EXPLORE");
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

    // Smooth RAF loop
    let currentX = -100;
    let currentY = -100;

    const animate = () => {
      currentX += (targetPos.x - currentX) * 0.22;
      currentY += (targetPos.y - currentY) * 0.22;
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
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {cursorVariant === "active" && cursorText ? (
        <div className="relative -top-5 -left-5 w-10 h-10 rounded-full bg-[#C8FF00] text-[#070707] flex items-center justify-center font-mono font-bold text-[9px] tracking-wider uppercase shadow-[0_0_20px_rgba(200,255,0,0.5)] transform scale-110 transition-transform duration-200">
          {cursorText}
        </div>
      ) : (
        <div className="relative -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-[#F1F0EA] border border-[#070707] shadow-[0_0_8px_rgba(241,240,234,0.4)]" />
      )}
    </div>
  );
}
