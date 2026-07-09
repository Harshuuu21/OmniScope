'use client'

import { cn } from '@/lib/utils'

/** A calm circular gauge for a 0-100 score. */
export function ScoreRing({
  score,
  size = 176,
  stroke = 12,
  label,
  className,
}: {
  score: number
  size?: number
  stroke?: number
  label?: string
  className?: string
}) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color =
    score >= 75 ? 'var(--success)' : score >= 55 ? 'var(--gold)' : 'var(--danger)'

  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="tnum font-serif text-5xl tracking-tight text-foreground">
          {score}
        </span>
        {label && (
          <span className="mt-1 text-xs font-medium text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  )
}
