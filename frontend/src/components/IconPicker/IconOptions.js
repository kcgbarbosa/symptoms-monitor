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
} from 'lucide-react';

export const ICON_OPTIONS = {
  DefaultIcon: {
    icon: AlertCircle,
    tailwind: 'text-red-500',
    hex: '#ef4444',
  },
  Activity: {
    icon: Activity,
    tailwind: 'text-green-500',
    hex: '#22c55e',
  },
  Flame: {
    icon: Flame,
    tailwind: 'text-orange-500',
    hex: '#f97316',
  },
  Zap: {
    icon: Zap,
    tailwind: 'text-yellow-500',
    hex: '#eab308',
  },
  Waves: {
    icon: Waves,
    tailwind: 'text-blue-500',
    hex: '#3b82f6',
  },
  Focus: {
    icon: Focus,
    tailwind: 'text-indigo-500',
    hex: '#6366f1',
  },
  Heart: {
    icon: Heart,
    tailwind: 'text-red-500',
    hex: '#ef4444',
  },
  SmilePlus: {
    icon: SmilePlus,
    tailwind: 'text-yellow-400',
    hex: '#facc15',
  },
  Moon: {
    icon: Moon,
    tailwind: 'text-indigo-400',
    hex: '#818cf8',
  },
  Wind: {
    icon: Wind,
    tailwind: 'text-cyan-400',
    hex: '#22d3ee',
  },
  HeartPulse: {
    icon: HeartPulse,
    tailwind: 'text-pink-500',
    hex: '#ec4899',
  },
  Droplet: {
    icon: Droplet,
    tailwind: 'text-blue-500',
    hex: '#3b82f6',
  },
  Utensils: {
    icon: Utensils,
    tailwind: 'text-orange-400',
    hex: '#fb923c',
  },
  BicepsFlexed: {
    icon: BicepsFlexed,
    tailwind: 'text-amber-600',
    hex: '#d97706',
  },
  Cloud: {
    icon: Cloud,
    tailwind: 'text-gray-400',
    hex: '#9ca3af',
  },
  Sparkles: {
    icon: Sparkles,
    tailwind: 'text-green-400',
    hex: '#4ade80',
  },
  PersonStanding: {
    icon: PersonStanding,
    tailwind: 'text-yellow-600',
    hex: '#ca8a04',
  },
  Bone: {
    icon: Bone,
    tailwind: 'text-yellow-600',
    hex: '#ca8a04',
  },
  Eye: {
    icon: Eye,
    tailwind: 'text-blue-400',
    hex: '#60a5fa',
  },
  Frown: {
    icon: Frown,
    tailwind: 'text-gray-500',
    hex: '#6b7280',
  },
  RotateCcw: {
    icon: RotateCcw,
    tailwind: 'text-cyan-500',
    hex: '#06b6d4',
  },
  Bed: {
    icon: Bed,
    tailwind: 'text-indigo-500',
    hex: '#6366f1',
  },
  Ear: {
    icon: Ear,
    tailwind: 'text-amber-500',
    hex: '#f59e0b',
  },
  Brain: {
    icon: Brain,
    tailwind: 'text-purple-500',
    hex: '#a855f7',
  },
};

export function getIconColor(iconName, format = 'hex') {
  const option = ICON_OPTIONS[iconName] || ICON_OPTIONS.DefaultIcon;
  return format === 'tailwind' ? option.tailwind : option.hex;
}