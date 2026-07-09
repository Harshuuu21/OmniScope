'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { Search, Compass, BarChart, Target, Sparkles, BookOpen, ShieldCheck, PieChart } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl sm:max-w-[600px] border-border bg-sidebar rounded-xl">
        <DialogTitle className="sr-only">Command Palette</DialogTitle>
        <Command className="flex h-full w-full flex-col overflow-hidden bg-sidebar text-foreground">
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search or jump to..."
            />
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                onSelect={() => runCommand(() => router.push('/'))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <Compass className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/portfolio'))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <BarChart className="mr-2 h-4 w-4" />
                <span>Portfolio</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/goals'))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <Target className="mr-2 h-4 w-4" />
                <span>Goals</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/x-ray'))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <PieChart className="mr-2 h-4 w-4" />
                <span>Portfolio X-Ray 3.0</span>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px w-full bg-border" />

            <Command.Group heading="Intelligence" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item
                onSelect={() => runCommand(() => router.push('/dna'))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                <span>Wealth DNA</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/learn'))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Learning Center</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push('/reputation'))}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
              >
                <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                <span>Financial Reputation</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
