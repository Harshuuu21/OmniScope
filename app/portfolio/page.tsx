import { Card } from '@/components/ui/card'
import { Delta, PageHeader, StatValue, InsightBlock } from '@/components/omni/primitives'
import { HoldingsTable } from '@/components/portfolio/holdings-table'
import { computeHoldings, portfolioSummary } from '@/lib/data'
import { formatINRCompact } from '@/lib/format'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'

export const metadata = {
  title: 'Portfolio — OmniScope',
}

export default function PortfolioPage() {
  const holdings = computeHoldings()
  const summary = portfolioSummary()

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Portfolio"
          title="What do you own?"
          question="Every holding across stocks, funds, gold and more — in one honest, uncluttered list."
        />
      </StaggerItem>

      <div className="grid gap-4 sm:grid-cols-3">
        <StaggerItem>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Current value</p>
            <StatValue value={formatINRCompact(summary.current)} className="mt-2 block text-3xl" />
            <Delta value={summary.dayChangePct} size="sm" className="mt-2" />
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Total invested</p>
            <StatValue value={formatINRCompact(summary.invested)} className="mt-2 block text-3xl" />
            <p className="mt-2 text-xs text-muted-foreground">Across {holdings.length} holdings</p>
          </Card>
        </StaggerItem>
        <StaggerItem>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Total gain</p>
            <StatValue
              value={formatINRCompact(summary.gain)}
              className="mt-2 block text-3xl text-success"
            />
            <Delta value={summary.gainPct} size="sm" className="mt-2" />
          </Card>
        </StaggerItem>
      </div>

      <StaggerItem>
        <Card className="mt-6 p-4 sm:p-6 mb-6">
          <HoldingsTable holdings={holdings} />
        </Card>
      </StaggerItem>

      <StaggerItem>
        <InsightBlock
          tone="positive"
          title="Contextual AI Insight"
          body="Your portfolio is highly efficient. The 18.9% total gain is primarily driven by your consistent SIPs in large-cap funds. By avoiding the temptation to over-trade direct stocks, you've allowed compounding to work undisturbed. Continue holding steady."
          cta="See Portfolio X-Ray"
          href="/x-ray"
        />
      </StaggerItem>
    </StaggerContainer>
  )
}
