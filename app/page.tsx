import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Delta, InsightBlock, StatValue } from '@/components/omni/primitives'
import { GrowthChart } from '@/components/omni/growth-chart'
import { AnimatedNumber } from '@/components/omni/animated-number'
import { DonutChart } from '@/components/omni/donut-chart'
import { ScoreRing } from '@/components/omni/score-ring'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { MentorNotes } from '@/components/omni/mentor-notes'
import {
  allocationByClass,
  goals,
  growthSeries,
  healthScore,
  learningProgress,
  portfolioSummary,
  todaysInsights,
} from '@/lib/data'
import { todaysFinancialStory } from '@/lib/data-m4'
import { formatINRCompact } from '@/lib/format'

export default function DashboardPage() {
  const summary = portfolioSummary()
  const score = healthScore()
  const allocation = allocationByClass()
  const learn = learningProgress()
  const goalsOnTrack = goals.filter((g) => g.onTrack).length
  const story = todaysFinancialStory

  return (
    <StaggerContainer>
      <StaggerItem className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-6">
          Today's Financial Story
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">What Happened</h2>
              <p className="text-base text-foreground leading-relaxed">{story.whatHappened}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">Why It Happened</h2>
              <p className="text-base text-foreground leading-relaxed">{story.whyItHappened}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">Does It Matter?</h2>
              <p className="text-base text-foreground leading-relaxed">{story.doesItMatter}</p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground">
                <Info className="size-4" />
                {story.action}
              </span>
            </div>
          </div>
          <div>
            <MentorNotes 
              title="Educational Takeaway" 
              content={story.educationalTakeaway} 
              confidence={story.confidence}
              actionable
            />
          </div>
        </div>
      </StaggerItem>

      {/* Hero: the two numbers that matter most */}
      <div className="grid gap-4 lg:grid-cols-3">
        <StaggerItem className="lg:col-span-2 flex h-full">
          <Card className="flex flex-col justify-between gap-6 p-6 w-full">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Total portfolio value</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <AnimatedNumber 
                    value={summary.current} 
                    className="text-5xl" 
                  />
                  <Delta value={summary.dayChangePct} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Invested{' '}
                  <span className="tnum font-medium text-foreground">
                    {formatINRCompact(summary.invested)}
                  </span>
                  <span className="mx-2 text-border">·</span>
                  <span className="tnum font-medium text-success">
                    {formatINRCompact(summary.gain)} gained
                  </span>
                </p>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                View holdings
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-4">
              <MiniStat label="Total return" value={`+${summary.gainPct.toFixed(1)}%`} tone="success" />
              <MiniStat
                label="Today"
                value={formatINRCompact(summary.dayChangeValue)}
                tone={summary.dayChangeValue >= 0 ? 'success' : 'danger'}
              />
              <MiniStat label="Goals on track" value={`${goalsOnTrack} of ${goals.length}`} />
              <MiniStat label="Learning" value={`${learn.pct}%`} />
            </div>
          </Card>
        </StaggerItem>

        <StaggerItem className="flex h-full">
          <Card className="flex flex-col items-center justify-center gap-4 p-6 text-center w-full">
            <p className="text-sm text-muted-foreground">Financial Health</p>
            <ScoreRing score={score} label="out of 100" />
            <Link
              href="/health"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              See what to improve
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Card>
        </StaggerItem>
      </div>

      {/* Today's insights */}
      <StaggerItem>
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Worth your attention today
          </h2>
          <StaggerContainer className="grid gap-3 md:grid-cols-3">
            {todaysInsights.map((insight) => (
              <StaggerItem key={insight.id}>
                <InsightBlock
                  tone={insight.tone}
                  title={insight.title}
                  body={insight.body}
                  action={
                    insight.href && insight.cta ? (
                      <Link
                        href={insight.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        {insight.cta}
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    ) : undefined
                  }
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </StaggerItem>

      {/* Growth + allocation */}
      <section className="mt-10 grid gap-4 lg:grid-cols-5">
        <StaggerItem className="lg:col-span-3 flex h-full">
          <Card className="p-6 w-full">
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Portfolio growth</h2>
                <p className="text-sm text-muted-foreground">How your wealth has changed</p>
              </div>
              <Delta value={summary.gainPct} size="sm" />
            </div>
            <GrowthChart data={growthSeries} />
            <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground">
              <LegendDot color="var(--chart-1)" label="Portfolio value" />
              <LegendDot color="var(--chart-5)" label="Amount invested" dashed />
            </div>
          </Card>
        </StaggerItem>

        <StaggerItem className="lg:col-span-2 flex h-full">
          <Card className="p-6 w-full">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-foreground">Where your money is</h2>
              <p className="text-sm text-muted-foreground">Allocation across asset classes</p>
            </div>
            <DonutChart
              data={allocation}
              centerValue={`${allocation.length}`}
              centerLabel="asset classes"
            />
          </Card>
        </StaggerItem>
      </section>
    </StaggerContainer>
  )
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'success' | 'danger'
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={
          'tnum mt-1 text-lg font-semibold ' +
          (tone === 'success'
            ? 'text-success'
            : tone === 'danger'
              ? 'text-danger'
              : 'text-foreground')
        }
      >
        {value}
      </p>
    </div>
  )
}

function LegendDot({
  color,
  label,
  dashed,
}: {
  color: string
  label: string
  dashed?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block h-0.5 w-4"
        style={{
          backgroundColor: dashed ? 'transparent' : color,
          borderTop: dashed ? `2px dashed ${color}` : undefined,
        }}
        aria-hidden
      />
      {label}
    </span>
  )
}
