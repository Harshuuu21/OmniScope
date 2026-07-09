'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { GrowthPoint } from '@/lib/data'
import { formatINRCompact } from '@/lib/format'

export function GrowthChart({ data }: { data: GrowthPoint[] }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="valueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.24} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="var(--border)"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            interval={3}
            dy={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={64}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            tickFormatter={(v) => formatINRCompact(v)}
          />
          <Tooltip
            cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              const value = payload.find((p) => p.dataKey === 'value')?.value as number
              const invested = payload.find((p) => p.dataKey === 'invested')
                ?.value as number
              return (
                <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
                  <p className="mb-1 font-medium text-popover-foreground">{label}</p>
                  <p className="tnum text-muted-foreground">
                    Value{' '}
                    <span className="font-medium text-foreground">
                      {formatINRCompact(value)}
                    </span>
                  </p>
                  <p className="tnum text-muted-foreground">
                    Invested{' '}
                    <span className="font-medium text-foreground">
                      {formatINRCompact(invested)}
                    </span>
                  </p>
                </div>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="invested"
            stroke="var(--chart-5)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--chart-1)"
            strokeWidth={2.5}
            fill="url(#valueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
