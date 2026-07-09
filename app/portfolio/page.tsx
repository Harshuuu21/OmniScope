import { Card } from '@/components/ui/card'
import { Delta, PageHeader, StatValue } from '@/components/omni/primitives'
import { HoldingsTable } from '@/components/portfolio/holdings-table'
import { computeHoldings, portfolioSummary } from '@/lib/data'
import { formatINRCompact } from '@/lib/format'

export const metadata = {
  title: 'Portfolio — OmniScope',
}

export default function PortfolioPage() {
  const holdings = computeHoldings()
  const summary = portfolioSummary()

  return (
    <div>
      <PageHeader
        eyebrow="Portfolio"
        title="What do you own?"
        question="Every holding across stocks, funds, gold and more — in one honest, uncluttered list."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Current value</p>
          <StatValue value={formatINRCompact(summary.current)} className="mt-2 block text-3xl" />
          <Delta value={summary.dayChangePct} size="sm" className="mt-2" />
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total invested</p>
          <StatValue value={formatINRCompact(summary.invested)} className="mt-2 block text-3xl" />
          <p className="mt-2 text-xs text-muted-foreground">Across {holdings.length} holdings</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total gain</p>
          <StatValue
            value={formatINRCompact(summary.gain)}
            className="mt-2 block text-3xl text-success"
          />
          <Delta value={summary.gainPct} size="sm" className="mt-2" />
        </Card>
      </div>

      <Card className="mt-6 p-4 sm:p-6">
        <HoldingsTable holdings={holdings} />
      </Card>
    </div>
  )
}
