import Link from "next/link";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
  color?: string; // Personnalisation de la couleur principale
  accentColor?: string; // Personnalisation de la couleur d'accentuation
};

export const UnitBanner = ({
  title,
  description,
  color = "blue", // Valeur par défaut
  accentColor = "blue", // Valeur par défaut
}: Props) => {
  // Mapping des couleurs pour les gradients
  const getGradientColors = () => {
    const colors: Record<string, string> = {
      blue: "from-blue-400/80 to-blue-500/80",
      purple: "from-purple-400/80 to-purple-500/80",
      green: "from-green-400/80 to-green-500/80",
      red: "from-red-400/80 to-red-500/80",
      orange: "from-orange-400/80 to-orange-500/80",
      pink: "from-pink-400/80 to-pink-500/80",
      indigo: "from-indigo-400/80 to-indigo-500/80",
      teal: "from-teal-400/80 to-teal-500/80",
    };
    return colors[color] || colors.blue;
  };

  const getShadowColor = () => {
    const shadows: Record<string, string> = {
      blue: "shadow-blue-100/50",
      purple: "shadow-purple-100/50",
      green: "shadow-green-100/50",
      red: "shadow-red-100/50",
      orange: "shadow-orange-100/50",
      pink: "shadow-pink-100/50",
      indigo: "shadow-indigo-100/50",
      teal: "shadow-teal-100/50",
    };
    return shadows[color] || shadows.blue;
  };

  const getAccentColorClass = () => {
    const accents: Record<string, string> = {
      blue: "border-blue-300/30 bg-blue-500/20 hover:bg-blue-500/30",
      purple: "border-purple-300/30 bg-purple-500/20 hover:bg-purple-500/30",
      green: "border-green-300/30 bg-green-500/20 hover:bg-green-500/30",
      red: "border-red-300/30 bg-red-500/20 hover:bg-red-500/30",
      orange: "border-orange-300/30 bg-orange-500/20 hover:bg-orange-500/30",
      pink: "border-pink-300/30 bg-pink-500/20 hover:bg-pink-500/30",
      indigo: "border-indigo-300/30 bg-indigo-500/20 hover:bg-indigo-500/30",
      teal: "border-teal-300/30 bg-teal-500/20 hover:bg-teal-500/30",
    };
    return accents[accentColor] || accents.blue;
  };

  return (
    <div className={`w-full rounded-2xl p-6 flex items-center justify-between
      bg-gradient-to-r ${getGradientColors()}
      shadow-md ${getShadowColor()}
      relative overflow-hidden`}
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
        <p className="text-white/70 text-sm font-medium">
          {description}
        </p>
      </div>

      {/* CTA */}
      <Link href="/lesson" className="relative z-10">
       <Link href="/lesson" className="relative z-10">
  <Button
    size="default"  // 👈 Changé de "lg" à "default" (plus petit)
    variant="secondary"
    className="flex items-center gap-x-1.5  // 👈 Gap plus petit
      bg-white/20 hover:bg-white/30 backdrop-blur-sm
      text-white font-semibold text-sm  // 👈 Texte plus petit
      border border-white/20
      rounded-lg  // 👈 Coins moins arrondis (était rounded-xl)
      transition-all duration-200
      shadow-sm active:scale-95
      px-4 py-1.5  // 👈 Padding personnalisé plus petit
      h-auto  // 👈 Hauteur automatique au lieu de fixe
    "
  >
    <NotebookText className="h-4 w-4" /> 
    Continue
  </Button>
</Link>
      </Link>
    </div>
  );
};