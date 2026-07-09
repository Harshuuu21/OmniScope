export const runtime = 'edge'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function POST(req: Request) {
  const { messages } = await req.json()
  const latestMessage = messages[messages.length - 1]?.content || ''

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const sendChunk = (text: string) => {
        controller.enqueue(encoder.encode(text))
      }

      // 1. Simulate network delay
      await delay(600)

      // 2. Logic to pick mock response based on prompt
      if (latestMessage.includes('Health Score') || latestMessage.includes('Protection') || latestMessage.includes('health')) {
        sendChunk('0:"Your Financial Health Score dropped slightly this month because your term life coverage is below the recommended threshold. Let\'s look at your protection metrics:\\n"\n')
        await delay(500)
        sendChunk('9:{"id":"call_health","toolName":"showHealthCard","args":{}}\n')
        await delay(300)
        sendChunk('a:{"toolCallId":"call_health","result":"rendered"}\n')
        await delay(300)
        sendChunk('0:"\\nWe recommend bringing this closer to 12-15x your income to ensure your family is fully shielded."\n')
      } 
      else if (latestMessage.includes('Portfolio') || latestMessage.includes('highlight') || latestMessage.includes('X-Ray')) {
        sendChunk('0:"I analyzed your portfolio across all brokers and funds. You have been investing consistently, and it shows.\\n"\n')
        await delay(500)
        sendChunk('9:{"id":"call_portfolio","toolName":"showPortfolioHighlight","args":{}}\n')
        await delay(300)
        sendChunk('a:{"toolCallId":"call_portfolio","result":"rendered"}\n')
        await delay(300)
        sendChunk('0:"\\nHowever, your Portfolio X-Ray reveals hidden concentration in a few large-cap stocks via your mutual funds. Would you like to explore that next?"\n')
      }
      else {
        // Generic response
        sendChunk('0:"That\'s a great question. Investing is a journey, and every decision matters.\\n"\n')
        await delay(400)
        sendChunk('0:"Based on your current profile, you are doing well with your emergency fund and savings rate. "\n')
        await delay(400)
        sendChunk('0:"If you are thinking about reallocating, remember to consider the long-term impact and diversification."\n')
      }

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'x-vercel-ai-data-stream': 'v1',
    },
  })
}
