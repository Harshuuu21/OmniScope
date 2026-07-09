'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { Card } from '@/components/ui/card'

type TraitData = {
  subject: string
  A: number
  fullMark: number
}

export function TraitRadar({
  traits,
}: {
  traits: {
    consistency: number
    patience: number
    discipline: number
    conviction: number
    adaptability: number
  }
}) {
  const data: TraitData[] = [
    { subject: 'Consistency', A: traits.consistency, fullMark: 100 },
    { subject: 'Patience', A: traits.patience, fullMark: 100 },
    { subject: 'Discipline', A: traits.discipline, fullMark: 100 },
    { subject: 'Conviction', A: traits.conviction, fullMark: 100 },
    { subject: 'Adaptability', A: traits.adaptability, fullMark: 100 },
  ]

  return (
    <Card className="flex flex-col items-center justify-center p-6 h-[400px]">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider self-start mb-4">
        Behavioral Traits
      </h3>
      <div className="w-full h-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'var(--foreground)', fontSize: 12 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={false} 
              axisLine={false} 
            />
            <Radar
              name="Traits"
              dataKey="A"
              stroke="var(--primary)"
              fill="var(--primary)"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
