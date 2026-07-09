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
import { healthEvolutionHistory, type HealthEvolutionData } from '@/lib/data'
import { cn } from '@/lib/utils'

export function HealthEvolutionChart({ onSelectPoint, activeMonth }: { onSelectPoint: (data: HealthEvolutionData) => void, activeMonth: string }) {
  return (
    <Card className="p-6 h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Health Evolution</h3>
          <p className="text-xs text-muted-foreground mt-1">Your 12-month trajectory</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={healthEvolutionHistory} 
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            onClick={(e: any) => {
              if (e && e.activePayload) {
                onSelectPoint(e.activePayload[0].payload)
              }
            }}
          >
            <defs>
              <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              domain={['dataMin - 5', 'dataMax + 5']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            <Area
              type="monotone"
              dataKey="score"
              stroke="var(--success)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorHealth)"
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--success)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload as HealthEvolutionData
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-md">
        <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className="flex items-center justify-between gap-4 py-1">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-success" />
            Health Score
          </span>
          <span className="tnum text-sm font-medium text-foreground">
            {data.score}
          </span>
        </div>
        {data.event && (
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-[11px] font-medium text-info">{data.event}</p>
          </div>
        )}
      </div>
    )
  }
  return null
}
