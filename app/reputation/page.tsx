import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/omni/primitives'
import { MentorNotes } from '@/components/omni/mentor-notes'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { financialReputation } from '@/lib/data-m4'
import { ShieldCheck, Target, TrendingUp, BookOpen, Clock, Activity, Medal, CheckCircle2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Financial Identity — OmniScope',
}

function StatBar({ label, value, icon: Icon }: { label: string, value: number, icon: any }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2 text-foreground font-medium text-sm">
          <Icon className="size-4 text-muted-foreground" />
          {label}
        </div>
        <span className="text-sm font-semibold tnum">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-1000" 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function ReputationPage() {
  const data = financialReputation

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Financial Identity"
          title="Who are you as an investor?"
          question="Wealth is what you have. Identity is how you behave. This tracks your long-term discipline and consistency over time."
        />
      </StaggerItem>

      <div className="grid gap-6 lg:grid-cols-3 mt-4 mb-10">
        <StaggerItem className="lg:col-span-1">
          <Card className="p-6 h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-sidebar to-sidebar-accent/50">
            <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none">
              <ShieldCheck className="size-48" />
            </div>
            
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary border border-primary/20 mb-6">
                Investor since {data.memberSince}
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Reputation Score</p>
              <div className="text-6xl font-serif text-foreground tracking-tighter mb-4">{data.score}</div>
              <div className="text-xl font-medium text-foreground">{data.level}</div>
            </div>
          </Card>
        </StaggerItem>
        
        <StaggerItem className="lg:col-span-2">
          <Card className="p-6 h-full flex flex-col justify-center gap-6">
            <StatBar label="Discipline (SIP Consistency)" value={data.discipline} icon={Clock} />
            <StatBar label="Behavioral Consistency" value={data.consistency} icon={Activity} />
            <StatBar label="Asset Diversification" value={data.diversification} icon={PieChartIcon} />
            <StatBar label="Continuous Learning" value={data.learning} icon={BookOpen} />
            <StatBar label="Goal Adherence" value={data.goalProgress} icon={Target} />
          </Card>
        </StaggerItem>
      </div>

      <StaggerItem className="mb-10">
        <MentorNotes 
          title="Mentor Notes"
          content={data.mentorNotes}
          confidence="High"
        />
      </StaggerItem>

      <div className="grid gap-6 lg:grid-cols-2 mb-10">
        <StaggerItem>
          <Card className="p-6 h-full">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-5">
              <TrendingUp className="size-5 text-success" />
              Core Strengths
            </h3>
            <ul className="space-y-4">
              {data.strengths.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <CheckCircle2 className="size-5 text-success shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="p-6 h-full">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-5">
              <Target className="size-5 text-gold" />
              Improvement Areas
            </h3>
            <ul className="space-y-4">
              {data.improvementAreas.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <div className="size-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        </StaggerItem>
      </div>

      <StaggerItem>
        <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Key Achievements
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.achievements.map((ach, i) => (
            <Card key={i} className="p-5 flex flex-col items-center justify-center text-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Medal className="size-5" />
              </div>
              <p className="text-sm font-medium text-foreground">{ach}</p>
            </Card>
          ))}
        </div>
      </StaggerItem>

    </StaggerContainer>
  )
}

function PieChartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  )
}
