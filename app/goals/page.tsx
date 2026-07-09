import { Car, GraduationCap, Home, Palmtree, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/omni/primitives'
import { goals, type Goal } from '@/lib/data'
import { formatINRCompact } from '@/lib/format'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Goals — OmniScope',
}

const iconMap = {
  home: Home,
  graduation: GraduationCap,
  palm: Palmtree,
  car: Car,
  shield: ShieldCheck,
}

export default function GoalsPage() {
  const totalTarget = goals.reduce((s, g) => s + g.target, 0)
  const totalCurrent = goals.reduce((s, g) => s + g.current, 0)
  const onTrack = goals.filter((g) => g.onTrack).length

  return (
    <div>
      <PageHeader
        eyebrow="Goals"
        title="Are you getting closer to your dreams?"
        question="Every rupee you invest is quietly working toward something. Here is how close each dream is."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Saved toward goals</p>
          <p className="tnum mt-2 font-serif text-3xl tracking-tight text-foreground">
            {formatINRCompact(totalCurrent)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            of {formatINRCompact(totalTarget)} target
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">On track</p>
          <p className="tnum mt-2 font-serif text-3xl tracking-tight text-success">
            {onTrack} of {goals.length}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">goals progressing well</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Monthly commitment</p>
          <p className="tnum mt-2 font-serif text-3xl tracking-tight text-foreground">
            {formatINRCompact(goals.reduce((s, g) => s + g.monthly, 0))}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">invested every month</p>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {goals.map((g) => (
          <GoalCard key={g.id} goal={g} />
        ))}
      </div>
    </div>
  )
}

function GoalCard({ goal }: { goal: Goal }) {
  const Icon = iconMap[goal.icon]
  const pct = Math.min(100, Math.round((goal.current / goal.target) * 100))

  return (
    <Card className="flex flex-col p-6">
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
        <span
          className={cn(
            'shrink-0 rounded-full px-2.5 py-1 text-xs font-medium',
            goal.onTrack ? 'bg-success-muted text-success' : 'bg-warning-muted text-warning',
          )}
        >
          {goal.onTrack ? 'On track' : 'Slightly behind'}
        </span>
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
            className={cn('h-full rounded-full', goal.onTrack ? 'bg-success' : 'bg-warning')}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="tnum mt-1.5 text-xs text-muted-foreground">{pct}% funded</p>
      </div>

      <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
        {goal.note}
      </p>
    </Card>
  )
}
