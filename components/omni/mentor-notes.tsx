import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MentorNotesProps {
  title?: string
  content: string
  className?: string
  confidence?: 'High' | 'Medium' | 'Low'
  actionable?: boolean
}

export function MentorNotes({ title, content, className, confidence, actionable }: MentorNotesProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-primary/10 bg-primary/5 p-5 md:p-6", className)}>
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-4" aria-hidden />
        </div>
        <div className="flex-1 space-y-1.5">
          {title && (
            <h4 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              {title}
              {confidence && (
                <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/50">
                  {confidence} Confidence
                </span>
              )}
            </h4>
          )}
          <p className="text-sm leading-relaxed text-muted-foreground">
            {content}
          </p>
          {actionable && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline cursor-pointer transition-colors">
                Explore this further &rarr;
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
