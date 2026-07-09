export type FinancialStory = {
  whatHappened: string
  whyItHappened: string
  doesItMatter: string
  action: string
  actionRequired: boolean
  confidence: 'High' | 'Medium' | 'Low'
  educationalTakeaway: string
}

export const todaysFinancialStory: FinancialStory = {
  whatHappened: "Your portfolio dipped 0.34% today, driven primarily by a mild correction in banking stocks like HDFC.",
  whyItHappened: "The RBI maintained the repo rate at 6.5%, which was expected, but some institutional investors took short-term profits.",
  doesItMatter: "In the long run, no. This is routine market noise. Your underlying asset quality remains extremely strong and your diversification is working as intended.",
  action: "No action required. Stay the course.",
  actionRequired: false,
  confidence: "High",
  educationalTakeaway: "Daily fluctuations in large-cap stocks rarely impact a 10-year investment horizon. True wealth is built by ignoring these minor ripples."
}

export type ReputationIdentity = {
  score: number
  level: string
  memberSince: string
  discipline: number
  consistency: number
  diversification: number
  learning: number
  goalProgress: number
  strengths: string[]
  improvementAreas: string[]
  achievements: string[]
  mentorNotes: string
}

export const financialReputation: ReputationIdentity = {
  score: 84,
  level: "Advanced Compounder",
  memberSince: "2019",
  discipline: 92,
  consistency: 88,
  diversification: 74,
  learning: 65,
  goalProgress: 81,
  strengths: [
    "You have not paused an SIP in over 3 years, even during market drawdowns.",
    "Your emergency fund is fully funded and untouched.",
    "You do not chase speculative assets or penny stocks."
  ],
  improvementAreas: [
    "Your learning habit is irregular. Completing one module a month would sharpen your edge.",
    "There is still a hidden concentration risk in your mutual funds."
  ],
  achievements: [
    "Crossed ₹24L in pure returns",
    "Survived the 2020 Crash without selling",
    "Automated 100% of investments"
  ],
  mentorNotes: "Your identity as an investor is rock solid. You exhibit the patience of a veteran. If you maintain this discipline, your financial freedom goal is not just possible, it is mathematically inevitable."
}

export type TrustCenterData = {
  accounts: { bank: string; status: 'Active' | 'Needs Reauth'; lastSync: string }[]
  brokers: { name: string; status: 'Active' | 'Needs Reauth'; lastSync: string }[]
  security: { mfaEnabled: boolean; trustedDevices: number }
  privacy: { dataSharing: string; aiMemoryClearable: boolean }
}

export const trustCenterInfo: TrustCenterData = {
  accounts: [
    { bank: 'HDFC Bank', status: 'Active', lastSync: '2 mins ago' },
    { bank: 'SBI', status: 'Active', lastSync: '1 hour ago' }
  ],
  brokers: [
    { name: 'Zerodha', status: 'Active', lastSync: '10 mins ago' }
  ],
  security: {
    mfaEnabled: true,
    trustedDevices: 2
  },
  privacy: {
    dataSharing: "Strictly Necessary",
    aiMemoryClearable: true
  }
}
