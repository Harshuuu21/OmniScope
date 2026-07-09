'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { PageHeader, InsightBlock } from '@/components/omni/primitives'
import { ScoreRing } from '@/components/omni/score-ring'
import { healthPillars, healthScore, healthEvolutionHistory } from '@/lib/data'
import { cn } from '@/lib/utils'
import { HealthEvolutionChart } from '@/components/omni/health-chart'
import { Sparkles, TrendingUp, Activity, CheckCircle2 } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { motion, AnimatePresence } from 'framer-motion'

const statusMeta = {
  strong: { label: 'Strong', color: 'text-success', bar: 'bg-success', ring: 'bg-success-muted' },
  fair: { label: 'Fair', color: 'text-gold', bar: 'bg-gold', ring: 'bg-gold-muted' },
  weak: { label: 'Needs attention', color: 'text-danger', bar: 'bg-danger', ring: 'bg-danger-muted' },
} as const

export default function HealthPage() {
  const score = healthScore()
  const weakest = [...healthPillars].sort((a, b) => a.score - b.score)[0]
  
  // Default to the last significant event
  const events = healthEvolutionHistory.filter(h => h.event)
  const [activeData, setActiveData] = useState(events[events.length - 1])

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Financial Health"
          title="How healthy are you financially?"
          question="Six pillars decide your financial wellbeing. Here is where you stand — and how you've grown."
        />
      </StaggerItem>

      {/* Evolution Section */}
      <div className="grid gap-6 lg:grid-cols-12 mb-8 mt-8">
        <StaggerItem className="lg:col-span-7">
          <HealthEvolutionChart 
            onSelectPoint={(data) => {
              if (data.event) setActiveData(data)
            }} 
            activeMonth={activeData.month}
          />
          <p className="text-xs text-muted-foreground mt-2 text-center">Click on a point in the chart to see what drove that month's growth.</p>
        </StaggerItem>

        <StaggerItem className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.month}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Card className="p-6 h-full border-l-4 border-l-primary bg-primary/5">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{activeData.month}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-1">{activeData.event}</h3>
                  </div>
                  <span className="tnum font-serif text-2xl text-success">+{activeData.score - (healthEvolutionHistory.find(h => h.month === 'Jan 24')?.score || 62)}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-foreground">
                      <Activity className="size-4 text-primary" />
                      <h4 className="font-medium text-sm">What happened</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{activeData.whatHappened}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1 text-foreground">
                      <TrendingUp className="size-4 text-success" />
                      <h4 className="font-medium text-sm">Why the score changed</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{activeData.whyItChanged}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 text-foreground">
                      <Sparkles className="size-4 text-gold" />
                      <h4 className="font-medium text-sm">Behavior behind the win</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{activeData.behavior}</p>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 mb-1 text-info">
                      <CheckCircle2 className="size-4" />
                      <h4 className="font-medium text-sm">What to continue</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{activeData.action}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </StaggerItem>
      </div>

      {/* Overall score */}
      <StaggerItem>
        <Card className="flex flex-col items-center gap-8 p-8 sm:flex-row sm:items-center sm:gap-12">
          <ScoreRing score={score} label="out of 100" size={188} />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-medium text-muted-foreground">Your financial health is</p>
            <p className="mt-1 font-serif text-3xl tracking-tight text-foreground">
              {score >= 75 ? 'Strong and steady' : score >= 55 ? 'Solid, with room to grow' : 'Worth some care'}
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground text-pretty">
              You have built a resilient foundation. Your biggest opportunity right now is{' '}
              <span className="font-medium text-foreground">{weakest.label.toLowerCase()}</span> —
              improving it would meaningfully lift your overall score.
            </p>
          </div>
        </Card>
      </StaggerItem>

      {/* Pillars */}
      <section className="mt-8">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          The six pillars
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {healthPillars.map((p) => {
            const meta = statusMeta[p.status]
            return (
              <StaggerItem key={p.id}>
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{p.label}</h3>
                      <p className="text-sm text-muted-foreground">{p.question}</p>
                    </div>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
                        meta.ring,
                        meta.color,
                      )}
                    >
                      {meta.label}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className={cn('h-full rounded-full', meta.bar)} style={{ width: `${p.score}%` }} />
                    </div>
                    <span className="tnum w-9 text-right text-sm font-semibold text-foreground">
                      {p.score}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {p.insight}
                  </p>
                </Card>
              </StaggerItem>
            )
          })}
        </div>
      </section>

      <StaggerItem className="mt-8">
        <InsightBlock
          tone="positive"
          title="Contextual AI Insight"
          body="Your health score is incredibly robust for your age bracket. Most investors struggle with the Savings Rate and Emergency Fund pillars. Because you have secured those, you have the psychological safety net required to ride out market volatility in your equity investments."
        />
      </StaggerItem>
    </StaggerContainer>
  )
}
