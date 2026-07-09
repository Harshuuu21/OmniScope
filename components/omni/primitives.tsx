import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPct } from '@/lib/format'

/** The single question a screen answers, plus a serif greeting. */
export function PageHeader({
  eyebrow,
  title,
  question,
}: {
  eyebrow?: string
  title: string
  question: string
}) {
  return (
    <header className="mb-8 lg:mb-10">
      {eyebrow && (
        <p className="mb-2 text-sm font-medium text-muted-foreground">{eyebrow}</p>
      )}
      <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-foreground text-balance lg:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
        {question}
      </p>
    </header>
  )
}

/** A big hero number — numbers are the hero. */
export function StatValue({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  return (
    <span className={cn('tnum font-serif tracking-tight', className)}>{value}</span>
  )
}

/** A directional change indicator, colored by meaning only. */
export function Delta({
  value,
  amount,
  className,
  size = 'md',
}: {
  value: number
  amount?: string
  className?: string
  size?: 'sm' | 'md'
}) {
  const positive = value >= 0
  const Icon = positive ? TrendingUp : TrendingDown
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium tnum',
        positive ? 'text-success' : 'text-danger',
        size === 'sm' ? 'text-xs' : 'text-sm',
        className,
      )}
    >
      <Icon className={size === 'sm' ? 'size-3.5' : 'size-4'} aria-hidden />
      {amount ? `${amount} · ` : ''}
      {formatPct(value, { sign: true })}
    </span>
  )
}

/** A calm labelled row for tables/lists. */
export function LabelValue({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="tnum text-sm font-medium text-foreground">{children}</span>
    </div>
  )
}

const severityMap = {
  positive: 'border-l-success bg-success-muted/40',
  attention: 'border-l-warning bg-warning-muted/40',
  achievement: 'border-l-gold bg-gold-muted/40',
  neutral: 'border-l-info bg-info-muted/40',
  high: 'border-l-danger bg-danger-muted/40',
  medium: 'border-l-warning bg-warning-muted/40',
} as const

import Link from 'next/link'

/** An insight — one purpose, one insight, an optional action. */
export function InsightBlock({
  tone,
  title,
  body,
  action,
  cta,
  href,
}: {
  tone: keyof typeof severityMap
  title: string
  body: string
  action?: ReactNode
  cta?: string
  href?: string
}) {
  return (
    <div className={cn('rounded-xl border-l-2 px-5 py-4', severityMap[tone])}>
      <p className="text-sm font-semibold text-foreground text-balance">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
        {body}
      </p>
      {action && <div className="mt-3">{action}</div>}
      {cta && (
        <div className="mt-3">
          {href ? (
            <Link href={href} className="text-xs font-medium text-primary hover:underline">
              {cta} &rarr;
            </Link>
          ) : (
            <p className="text-xs font-medium text-primary">{cta}</p>
          )}
        </div>
      )}
    </div>
  )
}
