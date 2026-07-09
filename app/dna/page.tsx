import { PageHeader, LabelValue, InsightBlock } from '@/components/omni/primitives'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { Card } from '@/components/ui/card'
import { TraitRadar } from '@/components/omni/trait-radar'
import { wealthDnaData } from '@/lib/data'
import { Dna, Target, Brain, Shield, Workflow, MessageSquare } from 'lucide-react'

export default function WealthDnaPage() {
  const {
    archetype,
    riskStyle,
    decisionStyle,
    diversificationStyle,
    learningStyle,
    communicationStyle,
    traits,
    strengths,
    growthAreas,
    monthlyEvolution,
    aiReflection,
  } = wealthDnaData

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Wealth DNA"
          title="Who am I as an investor?"
          question="Your unique financial personality, built from every decision you've ever made."
        />
      </StaggerItem>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Investor Archetype Card */}
        <StaggerItem className="lg:col-span-1">
          <Card className="p-6 h-full flex flex-col justify-center border-l-4 border-l-primary">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Dna className="size-6" aria-hidden />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Investor Archetype
                </p>
                <h2 className="text-2xl font-serif text-foreground">
                  {archetype}
                </h2>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Your financial DNA is built on consistency and emotional resilience. You are not swayed by short-term market noise, preferring automated systems and long-term compounding over quick gains.
            </p>
          </Card>
        </StaggerItem>

        {/* Behavioral Radar */}
        <StaggerItem className="lg:col-span-2">
          <TraitRadar traits={traits} />
        </StaggerItem>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Core Styles */}
        <StaggerItem>
          <Card className="p-6 h-full">
            <h3 className="text-base font-semibold text-foreground mb-6">Your Operating System</h3>
            <div className="space-y-2">
              <StyleRow icon={Shield} label="Risk Style" value={riskStyle} />
              <StyleRow icon={Workflow} label="Decision Style" value={decisionStyle} />
              <StyleRow icon={Target} label="Diversification" value={diversificationStyle} />
              <StyleRow icon={Brain} label="Learning Style" value={learningStyle} />
              <StyleRow icon={MessageSquare} label="Communication" value={communicationStyle} />
            </div>
          </Card>
        </StaggerItem>

        {/* Strengths & Growth */}
        <StaggerItem>
          <Card className="p-6 h-full flex flex-col gap-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3 text-success">Strengths</h3>
              <ul className="space-y-3">
                {strengths.map((str, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-success mt-0.5">•</span> {str}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-border">
              <h3 className="text-base font-semibold text-foreground mb-3 text-warning">Growth Areas</h3>
              <ul className="space-y-3">
                {growthAreas.map((area, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-warning mt-0.5">•</span> {area}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </StaggerItem>
      </div>

      {/* Monthly Evolution & Reflection */}
      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        <StaggerItem className="lg:col-span-1">
          <Card className="p-6 h-full">
            <h3 className="text-base font-semibold text-foreground mb-4">Monthly Evolution</h3>
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-border pl-6">
              {monthlyEvolution.map((evo, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[29px] top-1.5 size-2 rounded-full bg-muted-foreground ring-4 ring-background" />
                  <p className="text-xs font-medium text-muted-foreground">{evo.month}</p>
                  <p className="text-sm text-foreground mt-1">{evo.focus}</p>
                </div>
              ))}
            </div>
          </Card>
        </StaggerItem>

        <StaggerItem className="lg:col-span-2">
          <InsightBlock
            tone="positive"
            title="AI Reflection: Your DNA at a Glance"
            body={aiReflection}
          />
        </StaggerItem>
      </div>

    </StaggerContainer>
  )
}

function StyleRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
      <div className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground shrink-0">
        <Icon className="size-4" aria-hidden />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
