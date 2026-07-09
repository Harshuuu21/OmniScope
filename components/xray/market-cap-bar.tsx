const COLORS = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4']

export function MarketCapBar({ data }: { data: { name: string; pct: number }[] }) {
  return (
    <div>
      <div className="flex h-7 w-full items-stretch overflow-hidden rounded-md">
        {data.map((d, i) => (
          <div
            key={d.name}
            className={COLORS[i % COLORS.length]}
            style={{ width: `${d.pct}%` }}
            title={`${d.name}: ${d.pct}%`}
          />
        ))}
      </div>
      <ul className="mt-5 grid grid-cols-2 gap-3">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2.5">
            <span className={`size-2.5 shrink-0 rounded-full ${COLORS[i % COLORS.length]}`} aria-hidden />
            <span className="flex-1 text-sm text-foreground">{d.name}</span>
            <span className="tnum text-sm font-medium text-muted-foreground">{d.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
