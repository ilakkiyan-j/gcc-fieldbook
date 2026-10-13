"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HelpTooltipProps {
  content: string;
  className?: string;
  side?: "top" | "bottom" | "right" | "left";
}

export function HelpTooltip({ content, className, side = "bottom" }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [computedSide, setComputedSide] = useState<"top" | "bottom" | "right" | "left">(side);
  const [align, setAlign] = useState<"center" | "left" | "right">("center");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Calculate collision and optimal placement on open
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight = 110;
    const tooltipWidth = 280;

    // Vertical auto-flip: if top clearance is constrained, force bottom
    let targetSide = side;
    if (side === "top" && rect.top < tooltipHeight + 20) {
      targetSide = "bottom";
    } else if (side === "bottom" && window.innerHeight - rect.bottom < tooltipHeight + 20) {
      targetSide = rect.top > tooltipHeight + 20 ? "top" : "bottom";
    }
    setComputedSide(targetSide);

    // Horizontal clamping: ensure tooltip doesn't bleed off screen edges
    const halfWidth = tooltipWidth / 2;
    if (rect.left + rect.width / 2 < halfWidth + 16) {
      setAlign("left");
    } else if (window.innerWidth - (rect.right - rect.width / 2) < halfWidth + 16) {
      setAlign("right");
    } else {
      setAlign("center");
    }
  }, [side]);

  const handleOpen = () => {
    updatePosition();
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  // Close when clicking outside (mobile support)
  useEffect(() => {
    if (!isVisible) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible]);

  return (
    <span ref={containerRef} className="relative inline-flex items-center align-middle ml-2 group">
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        onClick={() => setIsVisible((prev) => !prev)}
        className={cn(
          "inline-flex items-center justify-center p-0.5 rounded-full text-ink-muted/70 hover:text-brand hover:bg-brand-soft/60 focus:outline-hidden focus:ring-1 focus:ring-brand transition-colors cursor-help",
          className
        )}
        aria-label="More information"
      >
        <HelpCircle className="w-4 h-4 shrink-0" />
      </button>

      {isVisible && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-[100] w-64 sm:w-72 p-3 rounded-lg bg-ink text-slate-100 text-[11px] sm:text-xs font-normal leading-relaxed shadow-2xl border border-white/10 pointer-events-none animate-fadeIn",
            // Vertical placement
            computedSide === "bottom" && "top-full mt-2.5",
            computedSide === "top" && "bottom-full mb-2.5",
            computedSide === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
            computedSide === "left" && "right-full top-1/2 -translate-y-1/2 mr-2",
            // Horizontal alignment (for top/bottom)
            (computedSide === "top" || computedSide === "bottom") && [
              align === "center" && "left-1/2 -translate-x-1/2",
              align === "left" && "left-0",
              align === "right" && "right-0",
            ]
          )}
        >
          {content}

          {/* Directional Caret Pointer */}
          {computedSide === "bottom" && (
            <span
              className={cn(
                "absolute -top-1 w-2 h-2 bg-ink border-t border-l border-white/10 rotate-45",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "left" && "left-3",
                align === "right" && "right-3"
              )}
            />
          )}
          {computedSide === "top" && (
            <span
              className={cn(
                "absolute -bottom-1 w-2 h-2 bg-ink border-b border-r border-white/10 rotate-45",
                align === "center" && "left-1/2 -translate-x-1/2",
                align === "left" && "left-3",
                align === "right" && "right-3"
              )}
            />
          )}
        </span>
      )}
    </span>
  );
}
