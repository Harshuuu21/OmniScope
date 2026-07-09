// OmniScope sample data — a realistic Indian retail investor.
// Frontend-only. Every screen is a window into this shared dataset.

export type AssetClass =
  | 'Indian Stocks'
  | 'Mutual Funds'
  | 'ETFs'
  | 'Gold'
  | 'Fixed Income'
  | 'International'
  | 'Cash'

export type Holding = {
  id: string
  name: string
  symbol: string
  assetClass: AssetClass
  sector: string
  units: number
  avgPrice: number
  ltp: number
  dayChangePct: number
}

export type HoldingComputed = Holding & {
  invested: number
  current: number
  gain: number
  gainPct: number
  weight: number
}

// ---- Raw holdings ---------------------------------------------------------

export const holdings: Holding[] = [
  // Indian stocks
  { id: 'reliance', name: 'Reliance Industries', symbol: 'RELIANCE', assetClass: 'Indian Stocks', sector: 'Energy', units: 120, avgPrice: 2180, ltp: 2942, dayChangePct: 0.82 },
  { id: 'hdfcbank', name: 'HDFC Bank', symbol: 'HDFCBANK', assetClass: 'Indian Stocks', sector: 'Financials', units: 90, avgPrice: 1520, ltp: 1712, dayChangePct: -0.34 },
  { id: 'infy', name: 'Infosys', symbol: 'INFY', assetClass: 'Indian Stocks', sector: 'Information Technology', units: 110, avgPrice: 1340, ltp: 1878, dayChangePct: 1.24 },
  { id: 'tcs', name: 'Tata Consultancy Services', symbol: 'TCS', assetClass: 'Indian Stocks', sector: 'Information Technology', units: 40, avgPrice: 3210, ltp: 4066, dayChangePct: 0.61 },
  { id: 'itc', name: 'ITC', symbol: 'ITC', assetClass: 'Indian Stocks', sector: 'Consumer Staples', units: 300, avgPrice: 398, ltp: 462, dayChangePct: -0.18 },
  { id: 'bajfin', name: 'Bajaj Finance', symbol: 'BAJFINANCE', assetClass: 'Indian Stocks', sector: 'Financials', units: 12, avgPrice: 6800, ltp: 7240, dayChangePct: 2.05 },
  { id: 'tatamotors', name: 'Tata Motors', symbol: 'TATAMOTORS', assetClass: 'Indian Stocks', sector: 'Automobile', units: 150, avgPrice: 640, ltp: 968, dayChangePct: -1.12 },

  // Mutual funds
  { id: 'ppfas', name: 'Parag Parikh Flexi Cap', symbol: 'PPFAS-FC', assetClass: 'Mutual Funds', sector: 'Flexi Cap', units: 820.44, avgPrice: 58.2, ltp: 78.6, dayChangePct: 0.44 },
  { id: 'axisbc', name: 'Axis Bluechip Fund', symbol: 'AXIS-BC', assetClass: 'Mutual Funds', sector: 'Large Cap', units: 640.11, avgPrice: 44.1, ltp: 52.8, dayChangePct: 0.31 },
  { id: 'nifty50idx', name: 'UTI Nifty 50 Index Fund', symbol: 'UTI-N50', assetClass: 'Mutual Funds', sector: 'Index', units: 410.9, avgPrice: 118.4, ltp: 151.2, dayChangePct: 0.52 },
  { id: 'midcap', name: 'Kotak Emerging Equity (Mid Cap)', symbol: 'KOTAK-MC', assetClass: 'Mutual Funds', sector: 'Mid Cap', units: 210.7, avgPrice: 72.5, ltp: 108.3, dayChangePct: 1.02 },

  // ETFs
  { id: 'niftyetf', name: 'Nippon Nifty BeES', symbol: 'NIFTYBEES', assetClass: 'ETFs', sector: 'Index', units: 180, avgPrice: 218, ltp: 268, dayChangePct: 0.49 },

  // Gold
  { id: 'sgb', name: 'Sovereign Gold Bond 2023', symbol: 'SGB23', assetClass: 'Gold', sector: 'Commodity', units: 60, avgPrice: 5920, ltp: 7480, dayChangePct: 0.28 },

  // Fixed income
  { id: 'fd', name: 'HDFC Bank Fixed Deposit', symbol: 'FD-7.1', assetClass: 'Fixed Income', sector: 'Debt', units: 1, avgPrice: 400000, ltp: 428400, dayChangePct: 0.02 },

  // International
  { id: 'motilalnasdaq', name: 'Motilal Oswal Nasdaq 100 FoF', symbol: 'MO-N100', assetClass: 'International', sector: 'US Technology', units: 920.5, avgPrice: 19.8, ltp: 31.4, dayChangePct: -0.42 },
]

// ---- Derived portfolio ----------------------------------------------------

export function computeHoldings(): HoldingComputed[] {
  const withValues = holdings.map((h) => {
    const invested = h.units * h.avgPrice
    const current = h.units * h.ltp
    const gain = current - invested
    const gainPct = (gain / invested) * 100
    return { ...h, invested, current, gain, gainPct, weight: 0 }
  })
  const total = withValues.reduce((s, h) => s + h.current, 0)
  return withValues
    .map((h) => ({ ...h, weight: (h.current / total) * 100 }))
    .sort((a, b) => b.current - a.current)
}

export function portfolioSummary() {
  const computed = computeHoldings()
  const current = computed.reduce((s, h) => s + h.current, 0)
  const invested = computed.reduce((s, h) => s + h.invested, 0)
  const gain = current - invested
  const gainPct = (gain / invested) * 100
  // Weighted day change
  const dayChangeValue = computed.reduce(
    (s, h) => s + (h.current * h.dayChangePct) / 100,
    0,
  )
  const dayChangePct = (dayChangeValue / current) * 100
  return { current, invested, gain, gainPct, dayChangeValue, dayChangePct }
}

// ---- Portfolio growth (24 months) ----------------------------------------

export type GrowthPoint = { month: string; invested: number; value: number }

export const growthSeries: GrowthPoint[] = (() => {
  const months = [
    'Jan 24', 'Feb 24', 'Mar 24', 'Apr 24', 'May 24', 'Jun 24',
    'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24',
    'Jan 25', 'Feb 25', 'Mar 25', 'Apr 25', 'May 25', 'Jun 25',
    'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25',
  ]
  let invested = 1650000
  let value = 1610000
  const drifts = [
    0.9, -1.1, 2.2, 3.1, 1.4, -0.6, 2.8, 1.1, -1.8, 3.4, 4.1, 1.2,
    2.0, -0.4, 1.6, 2.9, 1.0, 2.4, 3.2, -1.0, 1.8, 2.6, 1.5, 2.1,
  ]
  return months.map((month, i) => {
    invested += 42000 // monthly SIP contributions
    value = value * (1 + drifts[i] / 100) + 42000
    return { month, invested: Math.round(invested), value: Math.round(value) }
  })
})()

// ---- Asset allocation -----------------------------------------------------

export function allocationByClass() {
  const computed = computeHoldings()
  const total = computed.reduce((s, h) => s + h.current, 0)
  const map = new Map<AssetClass, number>()
  for (const h of computed) {
    map.set(h.assetClass, (map.get(h.assetClass) ?? 0) + h.current)
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value, pct: (value / total) * 100 }))
    .sort((a, b) => b.value - a.value)
}

export function sectorExposure() {
  const computed = computeHoldings()
  // Only equity-like exposure for sector view
  const equity = computed.filter((h) =>
    ['Indian Stocks', 'Mutual Funds', 'ETFs', 'International'].includes(
      h.assetClass,
    ),
  )
  const total = equity.reduce((s, h) => s + h.current, 0)
  const map = new Map<string, number>()
  for (const h of equity) {
    // Attribute funds to their broad style, stocks to their sector
    const key =
      h.assetClass === 'Indian Stocks' ? h.sector : `Diversified (${h.assetClass})`
    map.set(key, (map.get(key) ?? 0) + h.current)
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value, pct: (value / total) * 100 }))
    .sort((a, b) => b.value - a.value)
}

// ---- Portfolio X-Ray ------------------------------------------------------
// The hidden truth: what you're *actually* exposed to once funds are unpacked.

export type LookThrough = {
  company: string
  directWeight: number // held directly
  viaFunds: number // held indirectly through funds/ETFs
  total: number // combined true exposure
  funds: string[]
}

export const lookThrough: LookThrough[] = [
  { company: 'Reliance Industries', directWeight: 9.6, viaFunds: 3.8, total: 13.4, funds: ['UTI Nifty 50', 'Nifty BeES', 'Axis Bluechip'] },
  { company: 'HDFC Bank', directWeight: 4.4, viaFunds: 4.1, total: 8.5, funds: ['UTI Nifty 50', 'Axis Bluechip', 'Nifty BeES'] },
  { company: 'Infosys', directWeight: 5.9, viaFunds: 2.7, total: 8.6, funds: ['UTI Nifty 50', 'Axis Bluechip', 'PPFAS Flexi Cap'] },
  { company: 'ICICI Bank', directWeight: 0, viaFunds: 3.9, total: 3.9, funds: ['UTI Nifty 50', 'Axis Bluechip', 'Nifty BeES'] },
  { company: 'TCS', directWeight: 3.2, viaFunds: 1.9, total: 5.1, funds: ['UTI Nifty 50', 'Nifty BeES'] },
  { company: 'Bharti Airtel', directWeight: 0, viaFunds: 2.4, total: 2.4, funds: ['UTI Nifty 50', 'Axis Bluechip'] },
  { company: 'Microsoft', directWeight: 0, viaFunds: 2.1, total: 2.1, funds: ['Motilal Nasdaq 100'] },
  { company: 'Apple', directWeight: 0, viaFunds: 2.0, total: 2.0, funds: ['Motilal Nasdaq 100'] },
]

export type FundOverlap = {
  fundA: string
  fundB: string
  overlapPct: number
}

export const fundOverlaps: FundOverlap[] = [
  { fundA: 'UTI Nifty 50 Index', fundB: 'Nippon Nifty BeES', overlapPct: 98 },
  { fundA: 'UTI Nifty 50 Index', fundB: 'Axis Bluechip', overlapPct: 71 },
  { fundA: 'Axis Bluechip', fundB: 'PPFAS Flexi Cap', overlapPct: 38 },
  { fundA: 'PPFAS Flexi Cap', fundB: 'Kotak Emerging Equity', overlapPct: 12 },
]

export const marketCapSplit = [
  { name: 'Large Cap', pct: 68 },
  { name: 'Mid Cap', pct: 19 },
  { name: 'Small Cap', pct: 7 },
  { name: 'International', pct: 6 },
]

export const xrayInsights = [
  {
    severity: 'high' as const,
    title: 'Hidden concentration in Reliance',
    body: 'You think Reliance is 9.6% of your portfolio. After looking through your index funds and ETFs, your true exposure is 13.4%. A single company drives more than 1 in every 8 rupees you own.',
  },
  {
    severity: 'high' as const,
    title: 'Two funds are nearly identical',
    body: 'UTI Nifty 50 Index and Nippon Nifty BeES overlap 98%. You are effectively paying for and tracking the same 50 companies twice. Consolidating simplifies your portfolio with almost no change in exposure.',
  },
  {
    severity: 'medium' as const,
    title: 'Financials are your largest true sector',
    body: 'Across direct stocks and funds, banks and financial companies make up roughly 27% of your equity. This is normal for Indian portfolios, but worth watching.',
  },
]

// ---- Financial Health -----------------------------------------------------

export type HealthPillar = {
  id: string
  label: string
  score: number // 0-100
  question: string
  insight: string
  status: 'strong' | 'fair' | 'weak'
}

export const healthPillars: HealthPillar[] = [
  {
    id: 'diversification',
    label: 'Diversification',
    score: 72,
    question: 'Is your money spread wisely?',
    insight:
      'Good spread across asset classes, but hidden stock concentration pulls this down. Reducing fund overlap would lift this quickly.',
    status: 'fair',
  },
  {
    id: 'emergency',
    label: 'Emergency Fund',
    score: 88,
    question: 'Can you handle a surprise?',
    insight:
      'You hold roughly 6.4 months of expenses in liquid form. This is a strong, calm foundation.',
    status: 'strong',
  },
  {
    id: 'savings',
    label: 'Savings Rate',
    score: 81,
    question: 'Are you paying your future self?',
    insight:
      'You invest about 31% of your income each month through SIPs. Well above the 20% that builds real wealth.',
    status: 'strong',
  },
  {
    id: 'debt',
    label: 'Debt Health',
    score: 64,
    question: 'Is debt working for you?',
    insight:
      'Your home loan EMI is comfortable, but a personal loan at 14% is costing more than your investments earn. Clearing it is a guaranteed return.',
    status: 'fair',
  },
  {
    id: 'protection',
    label: 'Protection',
    score: 45,
    question: 'Is your family shielded?',
    insight:
      'Your term life cover is about 6x your income. A healthy shield is closer to 12-15x. Health cover looks adequate.',
    status: 'weak',
  },
  {
    id: 'goals',
    label: 'Goal Coverage',
    score: 76,
    question: 'Are your dreams funded?',
    insight:
      'Most goals are on track at current contribution levels. Your child\u2019s education goal needs a small nudge.',
    status: 'fair',
  },
]

export function healthScore() {
  const weights: Record<string, number> = {
    diversification: 0.2,
    emergency: 0.15,
    savings: 0.2,
    debt: 0.15,
    protection: 0.15,
    goals: 0.15,
  }
  const score = healthPillars.reduce(
    (s, p) => s + p.score * (weights[p.id] ?? 0),
    0,
  )
  return Math.round(score)
}

// ---- Goals ----------------------------------------------------------------

export type Goal = {
  id: string
  name: string
  icon: 'home' | 'graduation' | 'palm' | 'car' | 'shield'
  target: number
  current: number
  monthly: number
  targetYear: number
  onTrack: boolean
  note: string
}

export const goals: Goal[] = [
  {
    id: 'retirement',
    name: 'Financial Freedom',
    icon: 'palm',
    target: 30000000,
    current: 8640000,
    monthly: 32000,
    targetYear: 2044,
    onTrack: true,
    note: 'At your current SIP and a 11% assumed return, you reach this a year early.',
  },
  {
    id: 'education',
    name: "Aarav's Education",
    icon: 'graduation',
    target: 6000000,
    current: 1180000,
    monthly: 15000,
    targetYear: 2035,
    onTrack: false,
    note: 'Slightly behind. Increasing this SIP by \u20B94,000/month closes the gap.',
  },
  {
    id: 'home',
    name: 'Home Down Payment',
    icon: 'home',
    target: 4000000,
    current: 2650000,
    monthly: 45000,
    targetYear: 2028,
    onTrack: true,
    note: 'On track. Consider moving this to safer debt funds as the date nears.',
  },
  {
    id: 'car',
    name: 'Family Car',
    icon: 'car',
    target: 1500000,
    current: 980000,
    monthly: 12000,
    targetYear: 2027,
    onTrack: true,
    note: 'Comfortably on track for your target year.',
  },
]

// ---- Learning -------------------------------------------------------------

export type Lesson = {
  id: string
  title: string
  minutes: number
  done: boolean
}

export type LearningModule = {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  lessons: Lesson[]
}

export const learningModules: LearningModule[] = [
  {
    id: 'foundations',
    title: 'Foundations of Investing',
    description: 'The vocabulary and mindset every investor needs.',
    level: 'Beginner',
    lessons: [
      { id: 'f1', title: 'What actually is a stock?', minutes: 4, done: true },
      { id: 'f2', title: 'Risk, reward, and time', minutes: 6, done: true },
      { id: 'f3', title: 'Why costs quietly matter', minutes: 5, done: true },
      { id: 'f4', title: 'The magic of compounding', minutes: 7, done: false },
    ],
  },
  {
    id: 'diversification',
    title: 'Diversification & Risk',
    description: 'Understand the risk hiding inside your own portfolio.',
    level: 'Intermediate',
    lessons: [
      { id: 'd1', title: 'Correlation in plain English', minutes: 6, done: true },
      { id: 'd2', title: 'Fund overlap: paying twice', minutes: 5, done: false },
      { id: 'd3', title: 'Sector concentration', minutes: 6, done: false },
    ],
  },
  {
    id: 'india',
    title: 'Investing in India',
    description: 'SIPs, ELSS, SGBs, and the Indian tax landscape.',
    level: 'Intermediate',
    lessons: [
      { id: 'i1', title: 'SIP vs lumpsum', minutes: 5, done: true },
      { id: 'i2', title: 'Understanding LTCG & STCG', minutes: 7, done: false },
      { id: 'i3', title: 'ELSS and tax saving', minutes: 6, done: false },
      { id: 'i4', title: 'Sovereign Gold Bonds', minutes: 5, done: false },
    ],
  },
]

export function learningProgress() {
  const all = learningModules.flatMap((m) => m.lessons)
  const done = all.filter((l) => l.done).length
  return { done, total: all.length, pct: Math.round((done / all.length) * 100) }
}

// ---- Today's insights (Dashboard) ----------------------------------------

export type Insight = {
  id: string
  tone: 'positive' | 'attention' | 'neutral' | 'achievement'
  title: string
  body: string
  cta?: string
  href?: string
}

export const todaysInsights: Insight[] = [
  {
    id: 'concentration',
    tone: 'attention',
    title: 'Your true Reliance exposure is 13.4%',
    body: 'Once we look through your index funds, one company drives more than an eighth of your wealth. Worth a glance.',
    cta: 'Open Portfolio X-Ray',
    href: '/x-ray',
  },
  {
    id: 'milestone',
    tone: 'achievement',
    title: 'You crossed \u20B924 lakh in gains',
    body: 'Your portfolio has grown 18.9% over your invested amount. Steady, patient investing is working.',
  },
  {
    id: 'protection',
    tone: 'neutral',
    title: 'Your family shield could be stronger',
    body: 'Term cover at 6x income leaves a gap. This is the one number worth fixing this month.',
    cta: 'See Financial Health',
    href: '/health',
  },
]

// ---- Wealth DNA -----------------------------------------------------------

export type WealthDna = {
  archetype: string
  riskStyle: string
  decisionStyle: string
  diversificationStyle: string
  learningStyle: string
  communicationStyle: string
  traits: {
    consistency: number
    patience: number
    discipline: number
    conviction: number
    adaptability: number
  }
  strengths: string[]
  growthAreas: string[]
  monthlyEvolution: { month: string; focus: string }[]
  aiReflection: string
}

export const wealthDnaData: WealthDna = {
  archetype: 'The Patient Compounder',
  riskStyle: 'Measured & Calculated',
  decisionStyle: 'Data-Informed',
  diversificationStyle: 'Evolving, currently concentrated in large-caps',
  learningStyle: 'Visual & Narrative-driven',
  communicationStyle: 'Direct & Action-oriented',
  traits: {
    consistency: 85,
    patience: 90,
    discipline: 88,
    conviction: 75,
    adaptability: 60,
  },
  strengths: [
    'Excellent SIP discipline, rarely pausing even during drawdowns.',
    'Strong emergency buffer prevents panic selling.',
    'Long-term horizon naturally filters out market noise.',
  ],
  growthAreas: [
    'Heavy reliance on large-cap financials limits broader growth capture.',
    'Debt management (personal loan) drags down overall returns.',
    'Overlap in index funds suggests room for simplification.',
  ],
  monthlyEvolution: [
    { month: 'Apr 24', focus: 'Started building emergency fund' },
    { month: 'May 24', focus: 'Maintained SIPs despite market dip' },
    { month: 'Jun 24', focus: 'Increased learning about diversification' },
    { month: 'Jul 24', focus: 'Consolidated mutual fund portfolio' },
  ],
  aiReflection:
    'You are a steady, long-term investor. Your ability to ignore market noise is your superpower. By simply untangling your fund overlaps and paying down that high-interest debt, your money will compound even faster. You don\'t need to take more risk; you just need to optimize the risk you\'re already taking.',
}

// ---- Wealth Journey -------------------------------------------------------

export type JourneyMilestone = {
  id: string
  date: string
  achievement: string
  story: string
  financialImpact: string
  lessonLearned: string
  aiReflection: string
}

export const wealthJourneyMilestones: JourneyMilestone[] = [
  {
    id: 'm1',
    date: 'Aug 2019',
    achievement: 'First Investment',
    story: 'You took the leap and started your first ₹2,000 SIP into Axis Bluechip Fund. It felt uncertain, but it was the beginning of an automated wealth-building habit.',
    financialImpact: 'Started with ₹2,000/month. That single decision snowballed into a ₹1.6Cr portfolio.',
    lessonLearned: 'Getting started is harder than keeping going.',
    aiReflection: 'This was your most important financial decision. Not because of the fund you chose, but because you built a system that runs without you having to think about it.',
  },
  {
    id: 'm2',
    date: 'Mar 2020',
    achievement: 'The COVID Crash',
    story: 'The market fell 30% in a month. Your portfolio was bleeding, but you didn\'t pause your SIPs. In fact, you added a little extra.',
    financialImpact: 'Units bought during this period are up over 150%.',
    lessonLearned: 'Volatility is the price of admission for long-term returns.',
    aiReflection: 'You proved your resilience early. Holding through your first major drawdown without panicking is a rare trait that will serve you for decades.',
  },
  {
    id: 'm3',
    date: 'Dec 2022',
    achievement: 'Emergency Fund Fully Funded',
    story: 'You hit your target of holding 6 months of expenses in a liquid FD. For the first time, you had a financial shock absorber.',
    financialImpact: 'Secured ₹4.2L in safe, accessible reserves.',
    lessonLearned: 'Cash isn\'t trash; it\'s emotional insurance.',
    aiReflection: 'This was the moment you stopped investing from a place of anxiety and started investing from a place of security.',
  },
  {
    id: 'm4',
    date: 'Today',
    achievement: 'Crossing ₹24L in Gains',
    story: 'Your investments have officially earned you over ₹24,000,000 in pure returns. Your money is now working as hard as you do.',
    financialImpact: 'Current value: ₹1.51Cr. Invested: ₹1.27Cr.',
    lessonLearned: 'Time in the market beats timing the market.',
    aiReflection: 'You are now seeing the true power of compounding. The next ₹24L in gains will happen much faster than the first.',
  }
]

// ---- Future Self ----------------------------------------------------------

export type FutureProjection = {
  year: number
  currentStrategy: number
  alternativeStrategy: number
}

export type FutureScenario = {
  id: string
  title: string
  description: string
  assumptions: string[]
  confidence: 'High' | 'Medium' | 'Low'
  tradeOffs: string[]
  educationalInsight: string
  aiReflection: string
  data: FutureProjection[]
}

export const futureSelfScenarios: FutureScenario[] = [
  {
    id: 'debt-clearance',
    title: 'Clearing High-Interest Debt',
    description: 'What if you paused investing briefly to wipe out your 14% personal loan?',
    assumptions: [
      'Redirect ₹15,000/mo from SIPs to loan EMI for 8 months.',
      'Resume SIPs after loan is cleared, adding the old EMI amount.',
      'Portfolio grows at a conservative 10% CAGR.',
    ],
    confidence: 'High',
    tradeOffs: [
      'Short-term dip in investment contributions.',
      'Guaranteed 14% return by avoiding interest.',
    ],
    educationalInsight: 'Paying off a 14% loan is mathematically identical to finding a guaranteed, tax-free 14% investment. It is almost impossible to beat that in the stock market safely.',
    aiReflection: 'This is the most certain path to accelerating your wealth. The stock market is volatile, but debt interest is absolute. Kill the debt, then redirect that cashflow to your future.',
    data: [
      { year: 2024, currentStrategy: 15100000, alternativeStrategy: 15100000 },
      { year: 2029, currentStrategy: 24500000, alternativeStrategy: 25200000 },
      { year: 2034, currentStrategy: 39500000, alternativeStrategy: 41800000 },
      { year: 2039, currentStrategy: 63500000, alternativeStrategy: 68500000 },
      { year: 2044, currentStrategy: 102000000, alternativeStrategy: 111000000 },
    ],
  },
  {
    id: 'step-up-sip',
    title: 'The 10% Step-Up SIP',
    description: 'What happens if you increase your investments by 10% every year as your income grows?',
    assumptions: [
      'Increase monthly SIP amount by 10% annually.',
      'Portfolio return remains constant at 11% CAGR.',
      'Inflation averages 6%.',
    ],
    confidence: 'Medium',
    tradeOffs: [
      'Requires disciplined lifestyle inflation management.',
      'Slightly less disposable income today for significantly more tomorrow.',
    ],
    educationalInsight: 'Your expenses usually grow with your income. If your investments don\'t step up alongside them, your real wealth stagnates. A step-up SIP automates lifestyle discipline.',
    aiReflection: 'You are already incredibly consistent. If you simply tie your investment growth to your salary growth, you will hit your retirement goal nearly 5 years earlier without feeling a pinch in your daily life.',
    data: [
      { year: 2024, currentStrategy: 15100000, alternativeStrategy: 15100000 },
      { year: 2029, currentStrategy: 24500000, alternativeStrategy: 26800000 },
      { year: 2034, currentStrategy: 39500000, alternativeStrategy: 46200000 },
      { year: 2039, currentStrategy: 63500000, alternativeStrategy: 81500000 },
      { year: 2044, currentStrategy: 102000000, alternativeStrategy: 145000000 },
    ],
  }
]
