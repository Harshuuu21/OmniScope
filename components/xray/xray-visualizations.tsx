'use client'

import React from 'react'
import {
  Treemap,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip
} from 'recharts'
import { Card } from '@/components/ui/card'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

// ---- Risk Radar ----

const riskData = [
  { subject: 'Concentration', A: 80, fullMark: 100 },
  { subject: 'Volatility', A: 65, fullMark: 100 },
  { subject: 'Liquidity Risk', A: 30, fullMark: 100 },
  { subject: 'Currency Risk', A: 40, fullMark: 100 },
  { subject: 'Credit Risk', A: 25, fullMark: 100 },
  { subject: 'Inflation Risk', A: 70, fullMark: 100 },
]

export function RiskRadarChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={riskData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Risk Profile" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ---- Correlation Matrix ----

const matrixData = [
  { name: 'Large Cap', values: [1.0, 0.8, 0.4, -0.1] },
  { name: 'Mid Cap', values: [0.8, 1.0, 0.6, -0.2] },
  { name: 'Intl Tech', values: [0.4, 0.6, 1.0, -0.3] },
  { name: 'Gold', values: [-0.1, -0.2, -0.3, 1.0] },
]

export function CorrelationMatrix() {
  const getColor = (val: number) => {
    if (val === 1) return 'bg-primary'
    if (val > 0.5) return 'bg-primary/60'
    if (val > 0) return 'bg-primary/30'
    return 'bg-secondary/40'
  }

  return (
    <div className="w-full overflow-x-auto pt-2">
      <div className="min-w-[280px]">
        <div className="grid grid-cols-5 gap-1 mb-1">
          <div className="col-span-1"></div>
          {matrixData.map(d => (
            <div key={d.name} className="text-[10px] text-center text-muted-foreground truncate">{d.name}</div>
          ))}
        </div>
        {matrixData.map((row, i) => (
          <div key={row.name} className="grid grid-cols-5 gap-1 mb-1 items-center">
            <div className="text-[10px] text-muted-foreground truncate pr-2 text-right">{row.name}</div>
            {row.values.map((val, j) => (
              <div 
                key={j} 
                className={cn("h-8 rounded-sm flex items-center justify-center text-xs font-medium", getColor(val))}
              >
                {val.toFixed(1)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ---- Treemap ----

const treeData = [
  {
    name: 'Equities',
    children: [
      { name: 'Financials', size: 400 },
      { name: 'Tech', size: 300 },
      { name: 'Consumer', size: 200 },
    ],
  },
  {
    name: 'Debt',
    children: [
      { name: 'Govt Bonds', size: 150 },
      { name: 'Corporate', size: 100 },
    ],
  },
  {
    name: 'Alts',
    children: [
      { name: 'Gold', size: 80 },
    ],
  },
]

export function AllocationTreemap() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={treeData}
          dataKey="size"
          stroke="hsl(var(--background))"
          fill="hsl(var(--primary)/0.2)"
        />
      </ResponsiveContainer>
    </div>
  )
}

// ---- Geographic Exposure (Mock SVG map) ----
export function GeographicExposure() {
  return (
    <div className="h-[250px] w-full flex items-center justify-center relative bg-muted/10 rounded-lg overflow-hidden border border-border/50">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="text-center relative z-10">
        <div className="inline-flex gap-8 mb-4">
          <div>
            <div className="text-2xl font-serif text-foreground">84%</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">India</div>
          </div>
          <div>
            <div className="text-2xl font-serif text-foreground">16%</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">Global</div>
          </div>
        </div>
        <div className="w-48 h-2 bg-muted rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-primary w-[84%]"></div>
        </div>
      </div>
    </div>
  )
}

// ---- Rebalancing Action Card ----
export function RebalancingSuggestion() {
  return (
    <div className="border border-gold/30 bg-gold/5 rounded-xl p-5">
      <div className="flex gap-3">
        <Info className="size-5 text-gold shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-foreground">Rebalancing Opportunity</h4>
          <p className="text-sm text-muted-foreground mt-1 mb-4 leading-relaxed">
            Your equity exposure has drifted to 82%, above your 75% target. Harvesting some gains now and moving them to debt maintains your desired risk profile.
          </p>
          <button className="text-sm font-medium bg-background border border-border px-4 py-2 rounded-lg hover:bg-accent transition-colors shadow-sm">
            Review Rebalance Plan
          </button>
        </div>
      </div>
    </div>
  )
}
