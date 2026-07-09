'use client'

import { useState } from 'react'
import { PageHeader, InsightBlock } from '@/components/omni/primitives'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { futureSelfScenarios } from '@/lib/data'
import { FutureChart } from '@/components/omni/future-chart'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AlertCircle, ArrowRight, Lightbulb } from 'lucide-react'

export default function FutureSelfPage() {
  const [activeScenarioId, setActiveScenarioId] = useState(futureSelfScenarios[0].id)
  
  const activeScenario = futureSelfScenarios.find(s => s.id === activeScenarioId)!

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Future Self"
          title="Where am I heading?"
          question="Explore alternative financial paths. The goal is education, not perfect prediction."
        />
      </StaggerItem>

      <div className="grid gap-6 lg:grid-cols-4 mb-6">
        {/* Scenarios List */}
        <StaggerItem className="lg:col-span-1 flex flex-col gap-3">
          <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase mb-2">
            Alternative Strategies
          </h3>
          {futureSelfScenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenarioId(scenario.id)}
              className={cn(
                "text-left p-4 rounded-xl border transition-all duration-200",
                activeScenarioId === scenario.id 
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                  : "border-border bg-card hover:border-primary/40 hover:bg-accent/50"
              )}
            >
              <h4 className="font-medium text-foreground text-sm">{scenario.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {scenario.description}
              </p>
            </button>
          ))}
        </StaggerItem>

        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <StaggerItem>
            <FutureChart 
              data={activeScenario.data} 
              alternativeLabel={activeScenario.title}
            />
          </StaggerItem>

          <div className="grid gap-6 md:grid-cols-2">
            <StaggerItem>
              <Card className="p-6 h-full border-l-4 border-l-info bg-info-muted/10">
                <div className="flex items-center gap-2 mb-4 text-info">
                  <Lightbulb className="size-5" />
                  <h3 className="font-semibold text-foreground">Educational Insight</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activeScenario.educationalInsight}
                </p>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="p-6 h-full border-l-4 border-l-warning bg-warning-muted/10">
                <div className="flex items-center gap-2 mb-4 text-warning">
                  <AlertCircle className="size-5" />
                  <h3 className="font-semibold text-foreground">Assumptions & Trade-offs</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Trade-offs</p>
                    <ul className="space-y-2">
                      {activeScenario.tradeOffs.map((trade, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-warning mt-0.5">•</span> {trade}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Assumptions</p>
                    <ul className="space-y-2">
                      {activeScenario.assumptions.map((assump, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-muted-foreground/60 mt-0.5">•</span> {assump}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          </div>
          
          <StaggerItem>
            <InsightBlock
              tone="positive"
              title="AI Reflection"
              body={activeScenario.aiReflection}
            />
          </StaggerItem>
        </div>
      </div>
    </StaggerContainer>
  )
}
