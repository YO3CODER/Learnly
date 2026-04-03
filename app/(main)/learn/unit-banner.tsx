import Link from "next/link";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({
  title,
  description,
}: Props) => {
  return (
    <div className="w-full rounded-2xl p-6 flex items-center justify-between
      bg-gradient-to-r from-indigo-500 to-violet-500
      shadow-lg shadow-indigo-200/50
      relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-sm" />
      <div className="absolute -bottom-8 right-24 w-24 h-24 rounded-full bg-white/10 blur-sm" />

      {/* Text */}
      <div className="space-y-1.5 relative z-10">
        <p className="text-white/60 text-xs font-semibold tracking-widest uppercase">
          Current Unit
        </p>
        <h3 className="text-2xl font-extrabold text-white tracking-tight">
          {title}
        </h3>
        <p className="text-white/80 text-sm font-medium">
          {description}
        </p>
      </div>

      {/* CTA */}
      <Link href="/lesson" className="relative z-10">
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex items-center gap-x-2
            bg-white/20 hover:bg-white/30 backdrop-blur-sm
            text-white font-bold border border-white/30
            rounded-xl transition-all duration-200
            shadow-md active:scale-95"
        >
          <NotebookText className="h-5 w-5" />
          Continue
        </Button>
      </Link>
    </div>
  );
};