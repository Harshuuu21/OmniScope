'use client'

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { formatINRCompact } from '@/lib/format'

const PALETTE = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--gold)',
  'var(--info)',
]

export type DonutDatum = { name: string; value: number; pct: number }

export function DonutChart({
  data,
  centerLabel,
  centerValue,
}: {
  data: DonutDatum[]
  centerLabel?: string
  centerValue?: string
}) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <div className="relative h-[200px] w-[200px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={68}
              outerRadius={96}
              paddingAngle={2}
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {centerValue && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="tnum font-serif text-2xl tracking-tight text-foreground">
              {centerValue}
            </span>
            {centerLabel && (
              <span className="mt-0.5 text-xs text-muted-foreground">{centerLabel}</span>
            )}
          </div>
        )}
      </div>
      <ul className="w-full space-y-2.5">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-3">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
              aria-hidden
            />
            <span className="flex-1 text-sm text-foreground">{d.name}</span>
            <span className="tnum text-sm text-muted-foreground">
              {formatINRCompact(d.value)}
            </span>
            <span className="tnum w-12 text-right text-sm font-medium text-foreground">
              {d.pct.toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
