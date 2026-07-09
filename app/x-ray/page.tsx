import { Card } from '@/components/ui/card'
import { InsightBlock, PageHeader } from '@/components/omni/primitives'
import { LookThroughChart } from '@/components/xray/look-through-chart'
import { OverlapList } from '@/components/xray/overlap-list'
import { MarketCapBar } from '@/components/xray/market-cap-bar'
import { DependencyGraph } from '@/components/xray/dependency-graph'
import { RiskRadarChart, CorrelationMatrix, AllocationTreemap, GeographicExposure, RebalancingSuggestion } from '@/components/xray/xray-visualizations'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { MentorNotes } from '@/components/omni/mentor-notes'
import {
  fundOverlaps,
  lookThrough,
  marketCapSplit,
  sectorExposure,
  xrayInsights,
} from '@/lib/data'
import { ArrowRight, LockKeyhole, Search, SlidersHorizontal, Map, Layers } from 'lucide-react'

export const metadata = {
  title: 'Portfolio X-Ray 3.0 — OmniScope',
}

export default function XRayPage() {
  const sectors = sectorExposure()

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Portfolio X-Ray"
          title="What are you actually exposed to?"
          question="Your funds hold companies too. We look through every fund and ETF to reveal the concentration hiding beneath the surface."
        />
      </StaggerItem>

      {/* The headline insights */}
      <StaggerItem>
        <div className="grid gap-3 lg:grid-cols-3">
          {xrayInsights.map((i) => (
            <InsightBlock key={i.title} tone={i.severity} title={i.title} body={i.body} />
          ))}
        </div>
      </StaggerItem>

      {/* Dependency Graph Module */}
      <StaggerItem className="mt-6">
        <Card className="p-6">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Exposure Flow
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Follow your money. See exactly how your mutual funds and direct investments map to individual companies.
              </p>
            </div>
          </div>
          <DependencyGraph />
        </Card>
      </StaggerItem>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <StaggerItem className="flex h-full">
          {/* Look-through: direct vs via funds */}
          <Card className="p-6 w-full">
            <h2 className="text-base font-semibold text-foreground">
              Your true exposure, company by company
            </h2>
            <p className="mb-6 mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
              The solid bar is what you hold directly. The lighter bar is what you own indirectly.
            </p>
            <LookThroughChart data={lookThrough} />
          </Card>
        </StaggerItem>

        <div className="flex flex-col gap-4">
          {/* Fund overlap */}
          <StaggerItem>
            <Card className="p-6">
              <h2 className="text-base font-semibold text-foreground">
                Are your funds secretly the same?
              </h2>
              <p className="mb-5 mt-1 text-sm text-muted-foreground">
                High overlap means you are paying twice for the same companies.
              </p>
              <OverlapList overlaps={fundOverlaps} />
            </Card>
          </StaggerItem>

          {/* Market cap split */}
          <StaggerItem>
            <Card className="p-6">
              <h2 className="text-base font-semibold text-foreground">
                Where does your equity sit?
              </h2>
              <p className="mb-5 mt-1 text-sm text-muted-foreground">
                The balance between stability (large cap) and growth (mid & small).
              </p>
              <MarketCapBar data={marketCapSplit} />
            </Card>
          </StaggerItem>
          
          {/* Sector exposure */}
          <StaggerItem>
            <Card className="p-6">
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
          </StaggerItem>
        </div>
      </div>

      <StaggerItem className="mt-8">
        <MentorNotes
          title="AI Perspective"
          content="While your surface-level portfolio looks diversified across 12 funds and stocks, your Correlation Matrix and Geographic Exposure reveal high reliance on the Indian large-cap financial sector. Consider reviewing the Rebalancing Opportunity to optimize your risk-adjusted returns."
          confidence="Medium"
          actionable
        />
      </StaggerItem>

      {/* Advanced Visualizations */}
      <StaggerItem className="mt-10">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Advanced Portfolio Intelligence
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="p-5 col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">Risk Radar</h3>
            <RiskRadarChart />
          </Card>
          <Card className="p-5 col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">Asset Allocation</h3>
            <AllocationTreemap />
          </Card>
          <Card className="p-5 col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">Correlation Matrix</h3>
            <CorrelationMatrix />
          </Card>
          <Card className="p-5 col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">Geographic Exposure</h3>
            <GeographicExposure />
          </Card>
        </div>
        <RebalancingSuggestion />
      </StaggerItem>

    </StaggerContainer>
  )
}
