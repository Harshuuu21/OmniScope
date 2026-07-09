'use client'

import { useChat } from '@ai-sdk/react'
import { motion } from 'framer-motion'
import { ArrowUp, Sparkles, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { InsightBlock } from '@/components/omni/primitives'
import { formatINRCompact } from '@/lib/format'
import { portfolioSummary } from '@/lib/data'

const starterPrompts = [
  'Why did my Financial Health Score decrease?',
  'Am I overexposed to Banking?',
  'Explain my Portfolio X-Ray.',
  'Which goal needs attention first?',
]

export function MentorWorkspace() {
  const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } = useChat({
    api: '/api/chat',
  })

  // We can inject custom components when the AI returns specific tools
  // Since we are mocking, we can also just parse specific AI responses to render UI

  return (
    <Card className="flex h-full flex-col overflow-hidden bg-card/50 shadow-sm border-border/60">
      <ScrollArea className="flex-1 p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-6 pt-12">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-6" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-medium text-foreground">I understand your money.</h2>
              <p className="mt-1 text-sm text-muted-foreground">What would you like to explore today?</p>
            </div>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="flex rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col space-y-6 pb-4">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role !== 'user' && (
                  <div className="mr-4 mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                )}
                
                <div className={`max-w-[85%] space-y-4 ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-5 py-3.5' : 'text-foreground pt-1'}`}>
                  {(m as any).content && (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-pretty leading-relaxed">
                      {(m as any).content}
                    </div>
                  )}
                  
                  {/* Handle Mock Tool Calls for Generative UI */}
                  {(m as any).toolInvocations?.map((toolInvocation: any) => {
                    const { toolName, toolCallId, state, args } = toolInvocation
                    
                    if (state === 'result') {
                      if (toolName === 'showPortfolioHighlight') {
                        const summary = portfolioSummary()
                        return (
                          <div key={toolCallId} className="mt-4">
                            <InsightBlock 
                              tone="neutral"
                              title="Portfolio Highlight"
                              body={`Your total portfolio value is ${formatINRCompact(summary.current)} with a lifetime return of +${summary.gainPct.toFixed(1)}%.`}
                            />
                          </div>
                        )
                      }
                      
                      if (toolName === 'showHealthCard') {
                        return (
                          <div key={toolCallId} className="mt-4">
                            <InsightBlock 
                              tone="attention"
                              title="Health Check: Protection"
                              body="Your term life cover is about 6x your income. A healthy shield is closer to 12-15x. Consider upgrading your coverage."
                            />
                          </div>
                        )
                      }
                    }
                    
                    return (
                      <div key={toolCallId} className="text-xs text-muted-foreground animate-pulse mt-2">
                        Analyzing your financial data...
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex w-full justify-start">
                <div className="mr-4 mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="size-4 animate-pulse" />
                </div>
                <div className="flex h-10 items-center space-x-1.5 pt-1">
                  <div className="size-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: '0ms' }} />
                  <div className="size-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: '150ms' }} />
                  <div className="size-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-border/60 bg-background/50 p-4 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl relative items-center"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your portfolio, risks, or goals..."
            className="h-12 w-full rounded-full border-border/60 bg-background pl-6 pr-14 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-primary/50"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input?.trim() || isLoading}
            className="absolute right-1.5 size-9 rounded-full"
          >
            <ArrowUp className="size-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          OmniScope AI is a mentor, not a financial advisor. It cannot execute trades.
        </p>
      </div>
    </Card>
  )
}
