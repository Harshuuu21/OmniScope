import type { LucideIcon } from 'lucide-react'
import {
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  ScanSearch,
  Sparkles,
  Target,
  Wallet,
  Dna,
  Route,
  Telescope,
} from 'lucide-react'

export type NavItem = {
  href: string
  label: string
  question: string
  icon: LucideIcon
}

// Navigation contains only primary experiences. Each answers one question.
export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', question: 'How is my financial life today?', icon: LayoutDashboard },
  { href: '/portfolio', label: 'Portfolio', question: 'What do I own?', icon: Wallet },
  { href: '/x-ray', label: 'Portfolio X-Ray', question: 'What am I actually exposed to?', icon: ScanSearch },
  { href: '/health', label: 'Financial Health', question: 'How healthy am I financially?', icon: HeartPulse },
  { href: '/goals', label: 'Goals', question: 'Am I getting closer to my dreams?', icon: Target },
  { href: '/learn', label: 'Learning', question: 'What should I understand next?', icon: GraduationCap },
  { href: '/mentor', label: 'AI Mentor', question: 'What should I do now?', icon: Sparkles },
  { href: '/dna', label: 'Wealth DNA', question: 'Who am I as an investor?', icon: Dna },
  { href: '/journey', label: 'Wealth Journey', question: 'How have I grown?', icon: Route },
  { href: '/future', label: 'Future Self', question: 'Where am I heading?', icon: Telescope },
]
