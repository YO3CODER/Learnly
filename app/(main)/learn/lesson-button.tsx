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
      style={{
        pointerEvents: locked ? "none" : "auto",
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
      }}
      className="animate-in fade-in slide-in-from-bottom-4"
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
                path: { stroke: "url(#progressGradient)", strokeLinecap: "round" },
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
                  "relative overflow-hidden group",
                  !locked && "!bg-blue-500 hover:!bg-blue-600 !border-b-blue-700 shadow-lg shadow-blue-200",
                )}
              >
                {/* Brillance fixe */}
                <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/30 rounded-full blur-sm" />
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-full" />
                </div>

                {/* Shimmer étoile automatique toutes les 3s */}
                <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
                  <div className="absolute inset-0 animate-[shimmer_3s_ease-in-out_infinite]
                    bg-[conic-gradient(from_0deg,transparent_0%,white_10%,transparent_20%)]
                    opacity-0"
                    style={{ animationDelay: `${index * 400}ms` }}
                  />
                </div>

                {/* Étoiles scintillantes */}
                <div className="absolute inset-0 pointer-events-none">
                  <span className="absolute top-1 right-2 text-white/80 text-[8px]
                    animate-[twinkle_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${index * 400}ms` }}
                  >✦</span>
                  <span className="absolute bottom-2 left-1 text-white/60 text-[6px]
                    animate-[twinkle_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${index * 400 + 500}ms` }}
                  >✦</span>
                </div>

                <Icon className="h-9 w-9 fill-white text-white relative z-10" />
              </Button>
            </CircularProgressbarWithChildren>
          </div>

        ) : (
          <div className="relative group">
            {/* Halo hover */}
            {!locked && (
              <div className={cn(
                "absolute inset-0 rounded-full blur-md scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500",
                isPerfect ? "bg-yellow-300/50" : "bg-blue-300/40"
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
                "relative h-[70px] w-[70px] border-b-[6px] overflow-hidden transition-all duration-300",
                "hover:scale-110 hover:-translate-y-1 active:scale-95 active:translate-y-0",
                !locked && "!bg-blue-500 hover:!bg-blue-600 !border-b-blue-700 shadow-md shadow-blue-200",
                isCompleted && !isPerfect && "!bg-blue-400 !border-b-blue-600",
                isPerfect && "!bg-gradient-to-br !from-yellow-400 !to-amber-500 !border-b-amber-600 shadow-md shadow-amber-200",
                locked && "opacity-60",
              )}
            >
              {/* Brillance fixe */}
              {!locked && (
                <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/30 rounded-full blur-sm" />
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-full" />
                </div>
              )}

              {/* Shimmer étoile automatique toutes les 3s */}
              {!locked && (
                <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
                  <div
                    className="absolute inset-0 animate-[shimmer_3s_ease-in-out_infinite]
                      bg-[conic-gradient(from_0deg,transparent_0%,white_10%,transparent_20%)]
                      opacity-0"
                    style={{ animationDelay: `${index * 400}ms` }}
                  />
                </div>
              )}

              {/* Étoiles scintillantes automatiques */}
              {!locked && (
                <div className="absolute inset-0 pointer-events-none">
                  <span
                    className="absolute top-1 right-2 text-white/80 text-[8px] animate-[twinkle_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${index * 400}ms` }}
                  >✦</span>
                  <span
                    className="absolute bottom-2 left-1 text-white/60 text-[6px] animate-[twinkle_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${index * 400 + 500}ms` }}
                  >✦</span>
                  <span
                    className="absolute top-2 left-2 text-white/50 text-[5px] animate-[twinkle_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${index * 400 + 1000}ms` }}
                  >✧</span>
                </div>
              )}

              <Icon
                className={cn(
                  "h-9 w-9 relative z-10 transition-transform duration-300 group-hover:scale-110",
                  locked
                    ? "fill-neutral-300 text-neutral-300 stroke-neutral-300"
                    : "fill-white text-white drop-shadow-sm",
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