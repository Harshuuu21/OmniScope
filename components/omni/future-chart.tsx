'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts'
import { Card } from '@/components/ui/card'
import { formatINRCompact } from '@/lib/format'

type ProjectionData = {
  year: number
  currentStrategy: number
  alternativeStrategy: number
}

export function FutureChart({
  data,
  currentLabel = "Current Strategy",
  alternativeLabel = "Alternative Strategy",
}: {
  data: ProjectionData[]
  currentLabel?: string
  alternativeLabel?: string
}) {
  return (
    <Card className="p-6 h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Projected Net Worth</h3>
          <p className="text-xs text-muted-foreground mt-1">Comparing strategies over 20 years</p>
        </div>
        <div className="flex gap-4">
          <LegendDot color="var(--chart-1)" label={currentLabel} />
          <LegendDot color="var(--chart-2)" label={alternativeLabel} />
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAlternative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              tickFormatter={(val) => formatINRCompact(val)}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            <Area
              type="monotone"
              dataKey="currentStrategy"
              name={currentLabel}
              stroke="var(--chart-1)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCurrent)"
            />
            <Area
              type="monotone"
              dataKey="alternativeStrategy"
              name={alternativeLabel}
              stroke="var(--chart-2)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAlternative)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-md">
        <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 py-1">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="tnum text-sm font-medium text-foreground">
              {formatINRCompact(entry.value)}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span
        className="inline-block size-2 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      {label}
    </span>
  )
}
