import type { FundOverlap } from '@/lib/data'
import { cn } from '@/lib/utils'

export function OverlapList({ overlaps }: { overlaps: FundOverlap[] }) {
  return (
    <ul className="space-y-5">
      {overlaps.map((o) => {
        const tone =
          o.overlapPct >= 80 ? 'danger' : o.overlapPct >= 40 ? 'warning' : 'success'
        return (
          <li key={`${o.fundA}-${o.fundB}`}>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <span className="text-sm text-foreground">
                {o.fundA} <span className="text-muted-foreground">×</span> {o.fundB}
              </span>
              <span
                className={cn(
                  'tnum text-sm font-semibold',
                  tone === 'danger'
                    ? 'text-danger'
                    : tone === 'warning'
                      ? 'text-warning'
                      : 'text-success',
                )}
              >
                {o.overlapPct}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full rounded-full',
                  tone === 'danger'
                    ? 'bg-danger'
                    : tone === 'warning'
                      ? 'bg-warning'
                      : 'bg-success',
                )}
                style={{ width: `${o.overlapPct}%` }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
