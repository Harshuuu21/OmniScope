import { Card } from '@/components/ui/card'
import { InsightBlock, PageHeader } from '@/components/omni/primitives'
import { LookThroughChart } from '@/components/xray/look-through-chart'
import { OverlapList } from '@/components/xray/overlap-list'
import { MarketCapBar } from '@/components/xray/market-cap-bar'
import {
  fundOverlaps,
  lookThrough,
  marketCapSplit,
  sectorExposure,
  xrayInsights,
} from '@/lib/data'

export const metadata = {
  title: 'Portfolio X-Ray — OmniScope',
}

export default function XRayPage() {
  const sectors = sectorExposure()

  return (
    <div>
      <PageHeader
        eyebrow="Portfolio X-Ray"
        title="What are you actually exposed to?"
        question="Your funds hold companies too. We look through every fund and ETF to reveal the concentration hiding beneath the surface."
      />

      {/* The headline insights */}
      <div className="grid gap-3 lg:grid-cols-3">
        {xrayInsights.map((i) => (
          <InsightBlock key={i.title} tone={i.severity} title={i.title} body={i.body} />
        ))}
      </div>

      {/* Look-through: direct vs via funds */}
      <Card className="mt-6 p-6">
        <div className="mb-1 flex items-baseline justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Your true exposure, company by company
          </h2>
        </div>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The solid bar is what you hold directly. The lighter bar is what you own
          indirectly through your funds. Together, they are your real exposure.
        </p>
        <LookThroughChart data={lookThrough} />
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Fund overlap */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-foreground">
            Are your funds secretly the same?
          </h2>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">
            High overlap means you are paying twice for the same companies.
          </p>
          <OverlapList overlaps={fundOverlaps} />
        </Card>

        {/* Market cap split */}
        <Card className="p-6">
          <h2 className="text-base font-semibold text-foreground">
            Where does your equity sit?
          </h2>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">
            The balance between stability (large cap) and growth (mid & small).
          </p>
          <MarketCapBar data={marketCapSplit} />
        </Card>
      </div>

      {/* Sector exposure */}
      <Card className="mt-6 p-6">
        <h2 className="text-base font-semibold text-foreground">
          Which industries are you relying on?
        </h2>
        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          True sector exposure across your direct stocks and funds combined.
        </p>
        <ul className="space-y-4">
          {sectors.map((s) => (
            <li key={s.name}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="text-foreground">{s.name}</span>
                <span className="tnum font-medium text-foreground">
                  {s.pct.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-chart-2"
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
