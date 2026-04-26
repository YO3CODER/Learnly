"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import "react-circular-progressbar/dist/styles.css";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  if (cycleIndex <= 2) indentationLevel = cycleIndex;
  else if (cycleIndex <= 4) indentationLevel = 4 - cycleIndex;
  else if (cycleIndex <= 6) indentationLevel = 4 - cycleIndex;
  else indentationLevel = cycleIndex - 8;

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;
  const isPerfect = isCompleted && percentage === 100;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="h-[102px] w-[102px] relative">

            {/* Badge Start */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10
              px-3 py-1.5 rounded-xl
              bg-gradient-to-r from-blue-500 to-indigo-500
              text-white text-xs font-extrabold uppercase tracking-widest
              shadow-lg shadow-blue-200
              animate-[bounce_1s_ease-in-out_3] whitespace-nowrap"
            >
              Start
              <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2
                w-0 h-0
                border-x-[6px] border-x-transparent
                border-t-[6px] border-t-blue-500"
              />
            </div>

            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "url(#progressGradient)",
                  strokeLinecap: "round",
                },
                trail: { stroke: "#e8e8f0" },
              }}
            >
              <svg style={{ height: 0, width: 0, position: "absolute" }}>
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className={cn(
                  "h-[70px] w-[70px] border-b-[6px] transition-all duration-300 active:scale-95",
                  !locked && "!bg-blue-500 hover:!bg-blue-600 !border-b-blue-700 shadow-lg shadow-blue-100",
                )}
              >
                <Icon className="h-9 w-9 fill-white text-white" />
              </Button>
            </CircularProgressbarWithChildren>
          </div>

        ) : (
          <div className="relative group">

            {/* Halo au survol */}
            {isCompleted && (
              <div className={cn(
                "absolute inset-0 rounded-full blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                isPerfect ? "bg-yellow-300/40" : "bg-blue-300/30"
              )} />
            )}

            {/* Badge Perfect */}
            {isPerfect && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10
                px-2 py-0.5 rounded-full
                bg-gradient-to-r from-yellow-400 to-amber-400
                text-white text-[9px] font-extrabold uppercase tracking-wider
                shadow-sm whitespace-nowrap"
              >
                ★ Perfect
              </div>
            )}

            <Button
              size="rounded"
              variant={locked ? "locked" : "secondary"}
              className={cn(
                "relative h-[70px] w-[70px] border-b-[6px] transition-all duration-300 active:scale-95",
                !locked && "!bg-blue-500 hover:!bg-blue-600 !border-b-blue-700 shadow-md shadow-blue-100",
                isCompleted && !isPerfect && "!bg-blue-400 !border-b-blue-600",
                isPerfect && "!bg-gradient-to-br !from-yellow-400 !to-amber-500 !border-b-amber-600 shadow-md shadow-amber-100",
              )}
            >
              <Icon
                className={cn(
                  "h-9 w-9",
                  locked
                    ? "fill-neutral-300 text-neutral-300 stroke-neutral-300"
                    : "fill-white text-white",
                  isCompleted && "fill-none stroke-white stroke-[4]",
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};