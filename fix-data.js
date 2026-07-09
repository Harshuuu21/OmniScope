const fs = require('fs');

let content = fs.readFileSync('lib/data.ts', 'utf-8');
content = content.replace(/\r\n/g, '\n');

// 1. Goals
content = content.replace(
  "export type Goal = {\n  id: string\n  name: string\n  icon: 'home' | 'graduation' | 'palm' | 'car' | 'shield'\n  target: number\n  current: number\n  monthly: number\n  targetYear: number\n  onTrack: boolean\n  note: string\n}",
  `export type Goal = {
  id: string
  name: string
  icon: 'home' | 'graduation' | 'palm' | 'car' | 'shield'
  target: number
  current: number
  monthly: number
  targetYear: number
  onTrack: boolean
  note: string
  probability: number
  confidence: 'High' | 'Medium' | 'Low'
  riskFactors: string[]
  requiredMonthlySavings: number
  aiRecommendation: string
}`
);

content = content.replace(
  "note: 'At your current SIP and a 11% assumed return, you reach this a year early.',",
  `note: 'At your current SIP and a 11% assumed return, you reach this a year early.',
    probability: 92,
    confidence: 'High',
    riskFactors: ['Sustained high inflation (>7%)', 'Pausing SIPs during market crashes'],
    requiredMonthlySavings: 28000,
    aiRecommendation: "You are ahead of schedule. Your current SIP of ₹32,000 exceeds the required ₹28,000. Maintain this discipline; the compounding is doing the heavy lifting now.",`
);

content = content.replace(
  "note: 'Slightly behind. Increasing this SIP by \\u20B94,000/month closes the gap.',",
  `note: 'Slightly behind. Increasing this SIP by ₹4,000/month closes the gap.',
    probability: 65,
    confidence: 'Medium',
    riskFactors: ['Education inflation (>10%) outpaces portfolio growth', 'High equity allocation near target year'],
    requiredMonthlySavings: 19000,
    aiRecommendation: "You are saving ₹15,000 but need ₹19,000 to reach 90% probability of success. Consider bumping this SIP up at your next salary appraisal.",`
);

content = content.replace(
  "note: 'On track. Consider moving this to safer debt funds as the date nears.',",
  `note: 'On track. Consider moving this to safer debt funds as the date nears.',
    probability: 88,
    confidence: 'High',
    riskFactors: ['Market crash in the next 24 months'],
    requiredMonthlySavings: 42000,
    aiRecommendation: "Because this goal is only 4 years away, start moving the accumulated ₹26.5L from pure equity into safer debt instruments. Protect what you have built.",`
);

content = content.replace(
  "note: 'Comfortably on track for your target year.',",
  `note: 'Comfortably on track for your target year.',
    probability: 95,
    confidence: 'High',
    riskFactors: ['Upgrading to a much more expensive car'],
    requiredMonthlySavings: 10000,
    aiRecommendation: "You are completely on track. In fact, if your current investments continue at this rate, you could buy the car 6 months early.",`
);

// 2. Learning Modules
content = content.replace(
  "export type LearningModule = {\n  id: string\n  title: string\n  description: string\n  level: 'Beginner' | 'Intermediate' | 'Advanced'\n  lessons: Lesson[]\n}",
  `export type LearningModule = {
  id: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  lessons: Lesson[]
  unlocked: boolean
  dependencies: string[]
  aiRecommendation?: string
}`
);

const newLearningModulesArray = `export const learningModules: LearningModule[] = [
  {
    id: 'foundations',
    title: 'Foundations of Investing',
    description: 'The vocabulary and mindset every investor needs.',
    level: 'Beginner',
    unlocked: true,
    dependencies: [],
    lessons: [
      { id: 'f1', title: 'What actually is a stock?', minutes: 4, done: true },
      { id: 'f2', title: 'Risk, reward, and time', minutes: 6, done: true },
      { id: 'f3', title: 'Why costs quietly matter', minutes: 5, done: true },
      { id: 'f4', title: 'The magic of compounding', minutes: 7, done: true },
    ],
  },
  {
    id: 'diversification',
    title: 'Diversification & Risk',
    description: 'Understand the risk hiding inside your own portfolio.',
    level: 'Intermediate',
    unlocked: true,
    dependencies: ['foundations'],
    aiRecommendation: "Based on your Wealth DNA, you tend to concentrate in large-caps. This module will help you spot hidden overlaps.",
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
    unlocked: true,
    dependencies: ['foundations'],
    lessons: [
      { id: 'i1', title: 'SIP vs lumpsum', minutes: 5, done: true },
      { id: 'i2', title: 'Understanding LTCG & STCG', minutes: 7, done: false },
      { id: 'i3', title: 'ELSS and tax saving', minutes: 6, done: false },
      { id: 'i4', title: 'Sovereign Gold Bonds', minutes: 5, done: false },
    ],
  },
  {
    id: 'advanced-debt',
    title: 'Mastering Debt',
    description: 'How to use debt to your advantage, not just pay it off.',
    level: 'Advanced',
    unlocked: false,
    dependencies: ['diversification', 'india'],
    lessons: [
      { id: 'ad1', title: 'Good debt vs Bad debt', minutes: 5, done: false },
      { id: 'ad2', title: 'Interest rates and bond prices', minutes: 8, done: false },
    ],
  }
]`;
content = content.replace(/export const learningModules: LearningModule\[\] = \[[\s\S]*?\]\n\nexport function learningProgress/, newLearningModulesArray + '\n\nexport function learningProgress');

// 3. Append Market & Health data
const newData = `\n// ---- Market Intelligence --------------------------------------------------\n
export type MarketEvent = {
  id: string
  date: string
  title: string
  description: string
  impactScore: number // 1-100
  confidence: 'High' | 'Medium' | 'Low'
  affectedHoldings: { symbol: string; name: string; impact: 'positive' | 'negative' | 'neutral' }[]
  whyItMatters: string
  historicalContext: string
  educationalExplanation: string
  aiPerspective: string
  suggestedAction?: string
}

export const marketIntelligenceData: MarketEvent[] = [
  {
    id: 'rbi-rate-hold',
    date: 'Today, 10:00 AM',
    title: 'RBI holds repo rate at 6.5%',
    description: "The Monetary Policy Committee voted to keep the policy repo rate unchanged, maintaining a stance of withdrawal of accommodation.",
    impactScore: 65,
    confidence: 'High',
    affectedHoldings: [
      { symbol: 'HDFCBANK', name: 'HDFC Bank', impact: 'positive' },
      { symbol: 'BAJFINANCE', name: 'Bajaj Finance', impact: 'positive' },
      { symbol: 'FD-7.1', name: 'Fixed Deposit', impact: 'neutral' },
    ],
    whyItMatters: "Banks and NBFCs in your portfolio will maintain their current net interest margins. Borrowing costs for consumers won't drop, keeping credit growth steady rather than accelerating.",
    historicalContext: "The RBI has held rates steady for multiple consecutive meetings to fight inflation, prioritizing currency stability over rapid growth.",
    educationalExplanation: "When central banks hold interest rates, it means money isn't getting cheaper to borrow, but it isn't getting more expensive either. For banks, this provides predictability. For your existing Fixed Deposits, it means your 7.1% rate remains competitive.",
    aiPerspective: "Your portfolio is heavily weighted (27%) towards Financials. This pause is a net positive as it avoids margin compression for HDFC and Bajaj Finance. However, your 14% personal loan will not get cheaper to refinance anytime soon.",
    suggestedAction: "Consider accelerating your personal loan repayment rather than waiting for rate cuts.",
  },
  {
    id: 'tech-earnings-beat',
    date: 'Yesterday',
    title: 'US Tech Earnings exceed expectations',
    description: "Major US technology companies reported strong Q2 earnings, citing massive growth in AI-related revenue and cloud infrastructure.",
    impactScore: 40,
    confidence: 'Medium',
    affectedHoldings: [
      { symbol: 'MO-N100', name: 'Motilal Nasdaq 100 FoF', impact: 'positive' },
      { symbol: 'INFY', name: 'Infosys', impact: 'positive' },
      { symbol: 'TCS', name: 'TCS', impact: 'positive' },
    ],
    whyItMatters: "Your direct US exposure via the Nasdaq 100 FoF benefits immediately. Additionally, Indian IT companies (Infosys, TCS) often see positive sentiment when US tech spending increases, as they rely on US clients.",
    historicalContext: "Historically, strong US tech spending trickles down to Indian IT outsourcing within 2-3 quarters as budgets for digital transformation expand.",
    educationalExplanation: "Earnings seasons are when companies reveal how much money they actually made versus what analysts guessed. A 'beat' means they made more than expected, which generally drives up stock prices as future projections are upgraded.",
    aiPerspective: "This reduces the short-term risk in your IT holdings. However, remember that tech earnings are cyclical. While your Nasdaq FoF is up, your overall US exposure is only 6%. This news feels big, but its actual mathematical impact on your ₹1.6Cr portfolio is minimal.",
  }
]

// ---- Financial Evolution -------------------------------------------

export type HealthEvolutionData = {
  month: string
  score: number
  event?: string
  whatHappened?: string
  whyItChanged?: string
  behavior?: string
  action?: string
}

export const healthEvolutionHistory: HealthEvolutionData[] = [
  { month: 'Jan 24', score: 62 },
  { month: 'Feb 24', score: 64 },
  { month: 'Mar 24', score: 65 },
  { 
    month: 'Apr 24', 
    score: 72, 
    event: 'Emergency Fund Completed',
    whatHappened: 'You fully funded 6 months of expenses into a liquid FD.',
    whyItChanged: 'Your "Emergency Fund" pillar jumped from Weak to Strong.',
    behavior: 'Consistent monthly savings finally hit the safety threshold.',
    action: 'Keep this money untouched. It is insurance, not an investment.'
  },
  { month: 'May 24', score: 71 },
  { month: 'Jun 24', score: 73 },
  { month: 'Jul 24', score: 74 },
  { 
    month: 'Aug 24', 
    score: 79,
    event: 'Consolidated Mutual Funds',
    whatHappened: 'You sold overlapping index funds and consolidated into two distinct categories.',
    whyItChanged: 'Your "Diversification" pillar improved as hidden concentration risk was removed.',
    behavior: 'You acted on an OmniScope X-Ray insight, choosing simplicity over complexity.',
    action: 'Avoid adding new funds without checking overlap first.'
  },
  { month: 'Sep 24', score: 79 },
  { month: 'Oct 24', score: 78 },
  { month: 'Nov 24', score: 81 },
  { month: 'Dec 24', score: 82 },
]
`;
if (!content.includes('Market Intelligence')) {
  content = content + newData;
}

fs.writeFileSync('lib/data.ts', content);
console.log('Fixed lib/data.ts successfully');
