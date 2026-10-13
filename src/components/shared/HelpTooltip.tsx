"use client";

import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HelpTooltipProps {
  content: string;
  className?: string;
  side?: "top" | "bottom" | "right" | "left";
}

export function HelpTooltip({ content, className, side = "top" }: HelpTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-flex items-center align-middle ml-2 group">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
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
            "absolute z-50 w-64 sm:w-72 p-2.5 rounded-lg bg-ink text-white text-[11px] sm:text-xs font-normal leading-relaxed shadow-xl border border-white/10 pointer-events-none animate-fadeIn",
            side === "top" && "bottom-full left-1/2 -translate-x-1/2 mb-2",
            side === "bottom" && "top-full left-1/2 -translate-x-1/2 mt-2",
            side === "right" && "left-full top-1/2 -translate-y-1/2 ml-2",
            side === "left" && "right-full top-1/2 -translate-y-1/2 mr-2"
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
