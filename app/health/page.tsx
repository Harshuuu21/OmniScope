import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/omni/primitives'
import { ScoreRing } from '@/components/omni/score-ring'
import { healthPillars, healthScore } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Financial Health — OmniScope',
}

const statusMeta = {
  strong: { label: 'Strong', color: 'text-success', bar: 'bg-success', ring: 'bg-success-muted' },
  fair: { label: 'Fair', color: 'text-gold', bar: 'bg-gold', ring: 'bg-gold-muted' },
  weak: { label: 'Needs attention', color: 'text-danger', bar: 'bg-danger', ring: 'bg-danger-muted' },
} as const

export default function HealthPage() {
  const score = healthScore()
  const weakest = [...healthPillars].sort((a, b) => a.score - b.score)[0]

  return (
    <div>
      <PageHeader
        eyebrow="Financial Health"
        title="How healthy are you financially?"
        question="Six pillars decide your financial wellbeing. Here is where you stand — and the single thing worth fixing first."
      />

      {/* Overall score */}
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

      {/* Pillars */}
      <section className="mt-8">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          The six pillars
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {healthPillars.map((p) => {
            const meta = statusMeta[p.status]
            return (
              <Card key={p.id} className="p-6">
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
            )
          })}
        </div>
      </section>
    </div>
  )
}
