import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Delta, InsightBlock, PageHeader, StatValue } from '@/components/omni/primitives'
import { GrowthChart } from '@/components/omni/growth-chart'
import { DonutChart } from '@/components/omni/donut-chart'
import { ScoreRing } from '@/components/omni/score-ring'
import {
  allocationByClass,
  goals,
  growthSeries,
  healthScore,
  learningProgress,
  portfolioSummary,
  todaysInsights,
} from '@/lib/data'
import { formatINRCompact } from '@/lib/format'

export default function DashboardPage() {
  const summary = portfolioSummary()
  const score = healthScore()
  const allocation = allocationByClass()
  const learn = learningProgress()
  const goalsOnTrack = goals.filter((g) => g.onTrack).length

  return (
    <div>
      <PageHeader
        eyebrow="Good evening, Rohan"
        title="How is your financial life today?"
        question="A calm, honest view of everything you own — and the one or two things worth your attention."
      />

      {/* Hero: the two numbers that matter most */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="flex flex-col justify-between gap-6 p-6 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total portfolio value</p>
              <div className="mt-2 flex items-baseline gap-3">
                <StatValue value={formatINRCompact(summary.current)} className="text-5xl" />
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

        <Card className="flex flex-col items-center justify-center gap-4 p-6 text-center">
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
      </div>

      {/* Today's insights */}
      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Worth your attention today
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {todaysInsights.map((insight) => (
            <InsightBlock
              key={insight.id}
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
          ))}
        </div>
      </section>

      {/* Growth + allocation */}
      <section className="mt-10 grid gap-4 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-3">
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

        <Card className="p-6 lg:col-span-2">
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
      </section>
    </div>
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
