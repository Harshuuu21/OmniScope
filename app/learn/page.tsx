'use client'

import { useState } from 'react'
import { ArrowRight, CircleCheck, GraduationCap, LayoutGrid, Network } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { PageHeader, InsightBlock } from '@/components/omni/primitives'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { learningModules, learningProgress, type LearningModule } from '@/lib/data'
import { SkillTree } from '@/components/omni/skill-tree'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const levelMeta = {
  Beginner: 'bg-success-muted text-success',
  Intermediate: 'bg-info-muted text-info',
  Advanced: 'bg-gold-muted text-gold',
} as const

export default function LearnPage() {
  const progress = learningProgress()
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree')
  const [activeModuleId, setActiveModuleId] = useState<string>('diversification')
  
  const activeModule = learningModules.find(m => m.id === activeModuleId) || learningModules[0]

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Learn"
          title="Do you understand your money?"
          question="Short, plain-language lessons tied to what you actually own. Understanding compounds just like your portfolio."
        />
      </StaggerItem>

      {/* Progress hero */}
      <StaggerItem>
        <Card className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between mb-8">
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
      </StaggerItem>

      <StaggerItem className="flex justify-between items-end mb-4">
        <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Your Learning Journey
        </h3>
        <div className="flex bg-accent/50 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('tree')}
            className={cn("p-1.5 rounded-md transition-colors", viewMode === 'tree' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <Network className="size-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn("p-1.5 rounded-md transition-colors", viewMode === 'list' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <LayoutGrid className="size-4" />
          </button>
        </div>
      </StaggerItem>

      {viewMode === 'tree' ? (
        <div className="grid gap-6 lg:grid-cols-12">
          <StaggerItem className="lg:col-span-7">
            <SkillTree onSelectModule={setActiveModuleId} activeModuleId={activeModuleId} />
          </StaggerItem>
          
          <StaggerItem className="lg:col-span-5 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col gap-4"
              >
                <ModuleCard module={activeModule} />
                
                {activeModule.aiRecommendation && (
                  <InsightBlock
                    tone="positive"
                    title="AI Recommendation"
                    body={activeModule.aiRecommendation}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </StaggerItem>
        </div>
      ) : (
        <StaggerItem className="space-y-4">
          {learningModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </StaggerItem>
      )}

    </StaggerContainer>
  )
}

function ModuleCard({ module }: { module: LearningModule }) {
  const done = module.lessons.filter((l) => l.done).length
  const pct = Math.round((done / module.lessons.length) * 100)

  return (
    <Card className={cn("p-6", !module.unlocked && "opacity-60 grayscale bg-muted/20")}>
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
            {!module.unlocked && (
              <span className="rounded-full px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground">
                Locked
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground text-pretty">{module.description}</p>
        </div>
        <span className="tnum shrink-0 text-sm text-muted-foreground">
          {done}/{module.lessons.length} · {pct}%
        </span>
      </div>

      <ul className="mt-5 divide-y divide-border">
        {module.lessons.map((lesson) => (
          <li key={lesson.id} className={cn("flex items-center justify-between gap-4 py-3", !module.unlocked && "pointer-events-none")}>
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
              {!lesson.done && module.unlocked && (
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              )}
            </div>
          </li>
        ))}
      </ul>
      
      {!module.unlocked && module.dependencies.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground flex gap-1 items-center">
          Requires completion of: <span className="font-medium text-foreground">{module.dependencies.join(', ')}</span>
        </div>
      )}
    </Card>
  )
}
