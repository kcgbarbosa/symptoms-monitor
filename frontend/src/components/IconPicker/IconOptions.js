import {
  AlertCircle,
  Activity,
  Flame,
  Zap,
  Brain,
  Eye,
  Waves,
  Focus,
  Heart,
  SmilePlus,
  Frown,
  Moon,
  Wind,
  HeartPulse,
  Droplet,
  Utensils,
  BicepsFlexed,
  Bone,
  Cloud,
  Sparkles,
  PersonStanding,
  RotateCcw,
  Bed,
  Ear,
} from "lucide-react";

export const ICON_OPTIONS = {
  DefaultIcon: {
    icon: AlertCircle,
    tailwind: "text-rose-500",
    hex: "#f43f5e",
  },
  Activity: {
    icon: Activity,
    tailwind: "text-emerald-500",
    hex: "#10b981",
  },
  Flame: {
    icon: Flame,
    tailwind: "text-orange-500",
    hex: "#f97316",
  },
  Zap: {
    icon: Zap,
    tailwind: "text-amber-500",
    hex: "#f59e0b",
  },
  Waves: {
    icon: Waves,
    tailwind: "text-sky-500",
    hex: "#0ea5e9",
  },
  Focus: {
    icon: Focus,
    tailwind: "text-violet-500",
    hex: "#8b5cf6",
  },
  Heart: {
    icon: Heart,
    tailwind: "text-rose-500",
    hex: "#f43f5e",
  },
  SmilePlus: {
    icon: SmilePlus,
    tailwind: "text-amber-400",
    hex: "#fbbf24",
  },
  Moon: {
    icon: Moon,
    tailwind: "text-indigo-400",
    hex: "#818cf8",
  },
  Wind: {
    icon: Wind,
    tailwind: "text-cyan-400",
    hex: "#22d3ee",
  },
  HeartPulse: {
    icon: HeartPulse,
    tailwind: "text-pink-500",
    hex: "#ec4899",
  },
  Droplet: {
    icon: Droplet,
    tailwind: "text-sky-500",
    hex: "#0ea5e9",
  },
  Utensils: {
    icon: Utensils,
    tailwind: "text-orange-400",
    hex: "#fb923c",
  },
  BicepsFlexed: {
    icon: BicepsFlexed,
    tailwind: "text-amber-600",
    hex: "#d97706",
  },
  Cloud: {
    icon: Cloud,
    tailwind: "text-stone-400",
    hex: "#a8a29e",
  },
  Sparkles: {
    icon: Sparkles,
    tailwind: "text-emerald-400",
    hex: "#34d399",
  },
  PersonStanding: {
    icon: PersonStanding,
    tailwind: "text-teal-500",
    hex: "#14b8a6",
  },
  Bone: {
    icon: Bone,
    tailwind: "text-stone-400",
    hex: "#a8a29e",
  },
  Eye: {
    icon: Eye,
    tailwind: "text-sky-400",
    hex: "#38bdf8",
  },
  Frown: {
    icon: Frown,
    tailwind: "text-stone-500",
    hex: "#78716c",
  },
  RotateCcw: {
    icon: RotateCcw,
    tailwind: "text-cyan-500",
    hex: "#06b6d4",
  },
  Bed: {
    icon: Bed,
    tailwind: "text-indigo-500",
    hex: "#6366f1",
  },
  Ear: {
    icon: Ear,
    tailwind: "text-teal-400",
    hex: "#2dd4bf",
  },
  Brain: {
    icon: Brain,
    tailwind: "text-purple-500",
    hex: "#a855f7",
  },
};

export function getIconColor(iconName, format = "hex") {
  const option = ICON_OPTIONS[iconName] || ICON_OPTIONS.DefaultIcon;
  return format === "tailwind" ? option.tailwind : option.hex;
}
