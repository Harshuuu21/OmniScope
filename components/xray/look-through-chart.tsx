import type { LookThrough } from '@/lib/data'

export function LookThroughChart({ data }: { data: LookThrough[] }) {
  const max = Math.max(...data.map((d) => d.total))

  return (
    <div>
      <div className="mb-5 flex items-center gap-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-chart-1" aria-hidden />
          Held directly
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-chart-1/35" aria-hidden />
          Held via funds
        </span>
      </div>

      <ul className="space-y-4">
        {data.map((d) => (
          <li key={d.company}>
            <div className="mb-1.5 flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-foreground">{d.company}</span>
              <span className="tnum text-sm font-semibold text-foreground">
                {d.total.toFixed(1)}%
              </span>
            </div>
            <div
              className="flex h-6 w-full items-stretch overflow-hidden rounded-md bg-muted"
              style={{ maxWidth: `${(d.total / max) * 100}%` }}
            >
              {d.directWeight > 0 && (
                <div
                  className="h-full bg-chart-1"
                  style={{ width: `${(d.directWeight / d.total) * 100}%` }}
                  title={`Direct: ${d.directWeight}%`}
                />
              )}
              {d.viaFunds > 0 && (
                <div
                  className="h-full bg-chart-1/35"
                  style={{ width: `${(d.viaFunds / d.total) * 100}%` }}
                  title={`Via funds: ${d.viaFunds}%`}
                />
              )}
            </div>
            {d.directWeight === 0 && (
              <p className="mt-1 text-xs text-muted-foreground">
                You don&apos;t own this directly — it&apos;s entirely inside your funds.
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
