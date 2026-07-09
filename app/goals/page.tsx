'use client'

import { useState } from 'react'
import { Car, GraduationCap, Home, Palmtree, ShieldCheck, ChevronDown, ChevronUp, Target, AlertTriangle, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PageHeader, InsightBlock } from '@/components/omni/primitives'
import { goals, type Goal } from '@/lib/data'
import { formatINRCompact } from '@/lib/format'
import { cn } from '@/lib/utils'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { motion, AnimatePresence } from 'framer-motion'

export default function GoalsPage() {
  const totalTarget = goals.reduce((s, g) => s + g.target, 0)
  const totalCurrent = goals.reduce((s, g) => s + g.current, 0)
  const onTrack = goals.filter((g) => g.onTrack).length

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Goals"
          title="Are you getting closer to your dreams?"
          question="Every rupee you invest is quietly working toward something. Here is how close each dream is."
        />
      </StaggerItem>

      <div className="grid gap-4 sm:grid-cols-3">
        <StaggerItem>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Saved toward goals</p>
            <p className="tnum mt-2 font-serif text-3xl tracking-tight text-foreground">
              {formatINRCompact(totalCurrent)}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              of {formatINRCompact(totalTarget)} target
            </p>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">On track</p>
            <p className="tnum mt-2 font-serif text-3xl tracking-tight text-success">
              {onTrack} of {goals.length}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">goals progressing well</p>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Monthly commitment</p>
            <p className="tnum mt-2 font-serif text-3xl tracking-tight text-foreground">
              {formatINRCompact(goals.reduce((s, g) => s + g.monthly, 0))}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">invested every month</p>
          </Card>
        </StaggerItem>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {goals.map((g) => (
          <StaggerItem key={g.id}>
            <GoalCard goal={g} />
          </StaggerItem>
        ))}
      </div>
      
      <StaggerItem className="mt-8">
        <InsightBlock
          tone="attention"
          title="Contextual AI Insight"
          body="Your total required monthly savings across all goals is slightly higher than your current total SIPs. Because you are heavily front-loading your retirement goal, you are covering the gap. However, as Aarav's education approaches in 2035, you may need to re-route some retirement contributions to that specific bucket."
        />
      </StaggerItem>
    </StaggerContainer>
  )
}

const iconMap = {
  home: Home,
  graduation: GraduationCap,
  palm: Palmtree,
  car: Car,
  shield: ShieldCheck,
}

function GoalCard({ goal }: { goal: Goal }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = iconMap[goal.icon]
  const pct = Math.min(100, Math.round((goal.current / goal.target) * 100))

  return (
    <Card 
      className={cn("flex flex-col transition-colors cursor-pointer", isExpanded ? "border-primary/40 ring-1 ring-primary/20" : "hover:border-primary/40")}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-base font-semibold text-foreground">{goal.name}</h3>
              <p className="text-sm text-muted-foreground">Target {goal.targetYear}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium hidden sm:inline-flex',
                goal.onTrack ? 'bg-success-muted text-success' : 'bg-warning-muted text-warning',
              )}
            >
              {goal.onTrack ? 'On track' : 'Slightly behind'}
            </span>
            <button className="text-muted-foreground hover:text-foreground">
              {isExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="tnum font-serif text-2xl tracking-tight text-foreground">
              {formatINRCompact(goal.current)}
            </span>
            <span className="tnum text-sm text-muted-foreground">
              of {formatINRCompact(goal.target)}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn('h-full rounded-full transition-all duration-1000', goal.onTrack ? 'bg-success' : 'bg-warning')}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <p className="tnum text-xs text-muted-foreground">{pct}% funded</p>
            <p className="tnum text-xs text-muted-foreground">SIP: {formatINRCompact(goal.monthly)}/mo</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' as any }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-border bg-accent/10">
              
              <div className="grid grid-cols-2 gap-4 mb-6 pt-4">
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1 text-muted-foreground">
                    <Target className="size-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Probability</span>
                  </div>
                  <span className={cn("text-xl font-serif", goal.probability >= 85 ? "text-success" : goal.probability >= 70 ? "text-info" : "text-warning")}>
                    {goal.probability}%
                  </span>
                </div>
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1 text-muted-foreground">
                    <Lightbulb className="size-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Required SIP</span>
                  </div>
                  <span className="text-xl font-serif text-foreground">
                    {formatINRCompact(goal.requiredMonthlySavings)}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="size-3.5 text-warning" />
                    Risk Factors
                  </h4>
                  <ul className="space-y-1.5">
                    {goal.riskFactors.map((risk, i) => (
                      <li key={i} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-warning mt-1 leading-none">•</span> {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <InsightBlock
                tone="neutral"
                title="AI Goal Intelligence"
                body={goal.aiRecommendation}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
