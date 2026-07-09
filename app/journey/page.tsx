'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, InsightBlock } from '@/components/omni/primitives'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { wealthJourneyMilestones, type JourneyMilestone } from '@/lib/data'
import { ChevronDown, ChevronUp, History } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function WealthJourneyPage() {
  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Wealth Journey"
          title="How have I grown?"
          question="Your financial autobiography. Every milestone is a story of decisions, patience, and growth."
        />
      </StaggerItem>

      <div className="max-w-3xl mx-auto mt-10">
        <div className="relative border-l-2 border-border/60 ml-6 pl-8 space-y-12">
          {wealthJourneyMilestones.map((milestone, index) => (
            <StaggerItem key={milestone.id}>
              <MilestoneCard milestone={milestone} index={index} />
            </StaggerItem>
          ))}
        </div>
      </div>
    </StaggerContainer>
  )
}

function MilestoneCard({ milestone, index }: { milestone: JourneyMilestone, index: number }) {
  const [isExpanded, setIsExpanded] = useState(index === wealthJourneyMilestones.length - 1) // default expand latest

  return (
    <div className="relative">
      {/* Node indicator */}
      <div className="absolute -left-[41px] top-1 flex size-5 items-center justify-center rounded-full bg-background border-2 border-primary text-primary shadow-sm z-10">
        <div className="size-2 rounded-full bg-primary" />
      </div>

      {/* Date badge */}
      <div className="mb-2">
        <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
          {milestone.date}
        </span>
      </div>

      {/* Content Card */}
      <div 
        className={cn(
          "rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-colors cursor-pointer hover:border-primary/50",
          isExpanded ? "border-primary/30" : ""
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <History className="size-5" aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-serif text-foreground">{milestone.achievement}</h3>
              {!isExpanded && (
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                  {milestone.story}
                </p>
              )}
            </div>
          </div>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            {isExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                <div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {milestone.story}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-lg bg-accent/50 p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Financial Impact</p>
                    <p className="text-sm font-medium text-foreground">{milestone.financialImpact}</p>
                  </div>
                  <div className="rounded-lg bg-accent/50 p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Lesson Learned</p>
                    <p className="text-sm font-medium text-foreground">{milestone.lessonLearned}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <InsightBlock
                    tone="neutral"
                    title="AI Reflection"
                    body={milestone.aiReflection}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
