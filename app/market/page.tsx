'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHeader, InsightBlock } from '@/components/omni/primitives'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { marketIntelligenceData, type MarketEvent } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Activity, BookOpen, Clock, Lightbulb, ShieldAlert, TrendingDown, TrendingUp, Zap } from 'lucide-react'

export default function MarketIntelligencePage() {
  const [activeEventId, setActiveEventId] = useState(marketIntelligenceData[0].id)
  const activeEvent = marketIntelligenceData.find(e => e.id === activeEventId)!

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Market Intelligence"
          title="Why does this matter to me?"
          question="Moving beyond the noise. Understand exactly how the world impacts your wealth."
        />
      </StaggerItem>

      <div className="grid gap-6 lg:grid-cols-12 mb-6">
        {/* Timeline Feed */}
        <StaggerItem className="lg:col-span-4 flex flex-col gap-4">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-1">
            Event Feed
          </h3>
          <div className="space-y-3">
            {marketIntelligenceData.map((event) => (
              <button
                key={event.id}
                onClick={() => setActiveEventId(event.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-200",
                  activeEventId === event.id 
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                    : "border-border bg-card hover:border-primary/40 hover:bg-accent/50"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">{event.date}</span>
                  {event.impactScore > 50 && (
                    <span className="flex size-4 items-center justify-center rounded-full bg-warning/20 text-warning">
                      <Zap className="size-2.5" />
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-foreground text-sm leading-tight mb-1">{event.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </button>
            ))}
          </div>
        </StaggerItem>

        {/* Intelligence Detail */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Impact Meter */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="size-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Portfolio Impact</h3>
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-3xl font-serif tracking-tight text-foreground">{activeEvent.impactScore}<span className="text-sm text-muted-foreground font-sans">/100</span></span>
                    <span className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      activeEvent.impactScore > 50 ? "bg-warning-muted text-warning" : "bg-success-muted text-success"
                    )}>
                      {activeEvent.impactScore > 50 ? 'High' : 'Moderate'} Impact
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        activeEvent.impactScore > 50 ? "bg-warning" : "bg-primary"
                      )} 
                      style={{ width: `${activeEvent.impactScore}%` }} 
                    />
                  </div>
                </Card>

                {/* Affected Holdings */}
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <ShieldAlert className="size-5 text-primary" />
                      Affected Holdings
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 bg-accent rounded text-muted-foreground">
                      {activeEvent.confidence} Confidence
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {activeEvent.affectedHoldings.map(holding => (
                      <li key={holding.symbol} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{holding.name}</span>
                        <div className="flex items-center gap-1.5">
                          {holding.impact === 'positive' && <TrendingUp className="size-3 text-success" />}
                          {holding.impact === 'negative' && <TrendingDown className="size-3 text-danger" />}
                          {holding.impact === 'neutral' && <Activity className="size-3 text-muted-foreground" />}
                          <span className={cn(
                            "text-xs font-medium capitalize",
                            holding.impact === 'positive' ? "text-success" : 
                            holding.impact === 'negative' ? "text-danger" : "text-muted-foreground"
                          )}>
                            {holding.impact}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Contextual Understanding */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6 border-l-4 border-l-info bg-info-muted/5">
                  <div className="flex items-center gap-2 mb-3 text-info">
                    <Lightbulb className="size-5" />
                    <h3 className="font-semibold text-foreground">Why It Matters To You</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeEvent.whyItMatters}
                  </p>
                </Card>

                <Card className="p-6 border-l-4 border-l-gold bg-gold-muted/5">
                  <div className="flex items-center gap-2 mb-3 text-gold">
                    <Clock className="size-5" />
                    <h3 className="font-semibold text-foreground">Historical Context</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeEvent.historicalContext}
                  </p>
                </Card>
              </div>

              <Card className="p-6">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <BookOpen className="size-5" />
                  <h3 className="font-semibold text-foreground">Educational Explanation</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeEvent.educationalExplanation}
                </p>
              </Card>

              {/* AI Perspective */}
              <InsightBlock
                tone="attention"
                title="AI Perspective"
                body={activeEvent.aiPerspective}
                cta={activeEvent.suggestedAction}
              />

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </StaggerContainer>
  )
}
