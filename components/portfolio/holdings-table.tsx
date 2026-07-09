'use client'

import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { AssetClass, HoldingComputed } from '@/lib/data'
import { formatINR, formatINRCompact, formatNumber, formatPct } from '@/lib/format'
import { cn } from '@/lib/utils'

const FILTERS: (AssetClass | 'All')[] = [
  'All',
  'Indian Stocks',
  'Mutual Funds',
  'ETFs',
  'Gold',
  'Fixed Income',
  'International',
]

export function HoldingsTable({ holdings }: { holdings: HoldingComputed[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [expanded, setExpanded] = useState<string | null>(null)

  const rows = useMemo(
    () => (filter === 'All' ? holdings : holdings.filter((h) => h.assetClass === filter)),
    [holdings, filter],
  )

  return (
    <div>
      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Filter by asset class">
        {FILTERS.map((f) => {
          const active = filter === f
          const count = f === 'All' ? holdings.length : holdings.filter((h) => h.assetClass === f).length
          if (count === 0 && f !== 'All') return null
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent',
              )}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* Header row (desktop) */}
      <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 border-b border-border px-4 pb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase md:grid">
        <span>Holding</span>
        <span className="text-right">Current value</span>
        <span className="text-right">Invested</span>
        <span className="text-right">Returns</span>
        <span className="text-right">Weight</span>
      </div>

      <ul className="divide-y divide-border">
        {rows.map((h) => {
          const isOpen = expanded === h.id
          const positive = h.gain >= 0
          return (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : h.id)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-2 items-center gap-4 rounded-lg px-4 py-4 text-left transition-colors hover:bg-accent/50 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
              >
                <div className="flex items-center gap-3">
                  <ChevronRight
                    className={cn(
                      'size-4 shrink-0 text-muted-foreground transition-transform',
                      isOpen && 'rotate-90',
                    )}
                    aria-hidden
                  />
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-semibold text-secondary-foreground">
                    {h.symbol.slice(0, 3)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{h.name}</p>
                    <p className="text-xs text-muted-foreground">{h.assetClass}</p>
                  </div>
                </div>

                <div className="text-right md:text-right">
                  <p className="tnum text-sm font-medium text-foreground">
                    {formatINRCompact(h.current)}
                  </p>
                  <p className="tnum text-xs text-muted-foreground md:hidden">
                    {formatPct(h.gainPct, { sign: true })}
                  </p>
                </div>

                <div className="hidden text-right md:block">
                  <p className="tnum text-sm text-muted-foreground">
                    {formatINRCompact(h.invested)}
                  </p>
                </div>

                <div className="hidden text-right md:block">
                  <p className={cn('tnum text-sm font-medium', positive ? 'text-success' : 'text-danger')}>
                    {formatPct(h.gainPct, { sign: true })}
                  </p>
                  <p className="tnum text-xs text-muted-foreground">
                    {formatINRCompact(h.gain)}
                  </p>
                </div>

                <div className="hidden text-right md:block">
                  <p className="tnum text-sm text-foreground">{h.weight.toFixed(1)}%</p>
                </div>
              </button>

              {isOpen && (
                <div className="grid gap-x-8 gap-y-3 rounded-lg bg-muted/40 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Detail label="Units held" value={formatNumber(h.units, h.units % 1 ? 2 : 0)} />
                  <Detail label="Avg. buy price" value={formatINR(h.avgPrice, { decimals: 2 })} />
                  <Detail label="Last traded price" value={formatINR(h.ltp, { decimals: 2 })} />
                  <Detail
                    label="Day change"
                    value={formatPct(h.dayChangePct, { sign: true })}
                    tone={h.dayChangePct >= 0 ? 'success' : 'danger'}
                  />
                  <Detail label="Sector / style" value={h.sector} />
                  <Detail label="Total invested" value={formatINR(h.invested)} />
                  <Detail label="Current value" value={formatINR(h.current)} />
                  <Detail
                    label="Absolute gain"
                    value={formatINR(h.gain, { sign: true })}
                    tone={positive ? 'success' : 'danger'}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Detail({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'success' | 'danger'
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          'tnum mt-0.5 text-sm font-medium',
          tone === 'success' ? 'text-success' : tone === 'danger' ? 'text-danger' : 'text-foreground',
        )}
      >
        {value}
      </p>
    </div>
  )
}
