import { ArrowRight, CircleCheck, GraduationCap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/omni/primitives'
import { learningModules, learningProgress, type LearningModule } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Learn — OmniScope',
}

const levelMeta = {
  Beginner: 'bg-success-muted text-success',
  Intermediate: 'bg-info-muted text-info',
  Advanced: 'bg-gold-muted text-gold',
} as const

export default function LearnPage() {
  const progress = learningProgress()

  return (
    <div>
      <PageHeader
        eyebrow="Learn"
        title="Do you understand your money?"
        question="Short, plain-language lessons tied to what you actually own. Understanding compounds just like your portfolio."
      />

      {/* Progress hero */}
      <Card className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
            <GraduationCap className="size-6" aria-hidden />
          </span>
          <div>
            <p className="tnum font-serif text-3xl tracking-tight text-foreground">
              {progress.done} of {progress.total}
            </p>
            <p className="text-sm text-muted-foreground">lessons completed</p>
          </div>
        </div>
        <div className="w-full sm:max-w-xs">
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Overall progress</span>
            <span className="tnum font-medium text-foreground">{progress.pct}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Modules */}
      <section className="mt-8 space-y-4">
        {learningModules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </section>
    </div>
  )
}

function ModuleCard({ module }: { module: LearningModule }) {
  const done = module.lessons.filter((l) => l.done).length
  const pct = Math.round((done / module.lessons.length) * 100)

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <h2 className="text-base font-semibold text-foreground">{module.title}</h2>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-medium',
                levelMeta[module.level],
              )}
            >
              {module.level}
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-pretty">{module.description}</p>
        </div>
        <span className="tnum shrink-0 text-sm text-muted-foreground">
          {done}/{module.lessons.length} · {pct}%
        </span>
      </div>

      <ul className="mt-5 divide-y divide-border">
        {module.lessons.map((lesson) => (
          <li key={lesson.id} className="flex items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3">
              {lesson.done ? (
                <CircleCheck className="size-5 shrink-0 text-success" aria-hidden />
              ) : (
                <span
                  className="size-5 shrink-0 rounded-full border-2 border-border"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  'text-sm',
                  lesson.done ? 'text-muted-foreground' : 'font-medium text-foreground',
                )}
              >
                {lesson.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="tnum text-xs text-muted-foreground">{lesson.minutes} min</span>
              {!lesson.done && (
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
