import { Card } from '@/components/ui/card'
import { InsightBlock, PageHeader } from '@/components/omni/primitives'
import { LookThroughChart } from '@/components/xray/look-through-chart'
import { OverlapList } from '@/components/xray/overlap-list'
import { MarketCapBar } from '@/components/xray/market-cap-bar'
import { DependencyGraph } from '@/components/xray/dependency-graph'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import {
  fundOverlaps,
  lookThrough,
  marketCapSplit,
  sectorExposure,
  xrayInsights,
} from '@/lib/data'
import { ArrowRight, LockKeyhole, Search, SlidersHorizontal, Map, Layers } from 'lucide-react'

export const metadata = {
  title: 'Portfolio X-Ray — OmniScope',
}

function PlaceholderCard({ title, description, icon: Icon }: { title: string, description: string, icon: any }) {
  return (
    <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[200px] border-dashed border-2 bg-muted/20">
      <div className="mb-3 rounded-full bg-muted p-3 text-muted-foreground">
        <Icon className="size-6" />
      </div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground max-w-[200px]">{description}</p>
    </Card>
  )
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

      {/* Placeholders for future modular visualisations */}
      <StaggerItem className="mt-10">
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Coming Soon to X-Ray
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PlaceholderCard 
            title="Sankey Diagram" 
            description="Visualize the full flow of capital across asset classes."
            icon={SlidersHorizontal} 
          />
          <PlaceholderCard 
            title="Geographic Exposure" 
            description="See your wealth mapped globally."
            icon={Map} 
          />
          <PlaceholderCard 
            title="Risk Radar" 
            description="Multi-dimensional risk analysis vs benchmarks."
            icon={Search} 
          />
          <PlaceholderCard 
            title="Hidden Holdings" 
            description="Uncover deeply nested unlisted investments."
            icon={LockKeyhole} 
          />
        </div>
      </StaggerItem>

    </StaggerContainer>
  )
}
