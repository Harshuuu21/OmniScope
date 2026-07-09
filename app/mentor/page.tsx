import { PageHeader } from '@/components/omni/primitives'
import { MentorWorkspace } from '@/components/mentor/mentor-workspace'

export const metadata = {
  title: 'AI Mentor — OmniScope',
}

export default function MentorPage() {
  return (
    <div className="flex h-[calc(100svh-6rem)] flex-col">
      <PageHeader
        eyebrow="AI Mentor"
        title="What should we understand next?"
        question="A quiet space to ask questions, model scenarios, and explore the 'why' behind your wealth."
      />
      
      <div className="flex-1 overflow-hidden">
        <MentorWorkspace />
      </div>
    </div>
  )
}
