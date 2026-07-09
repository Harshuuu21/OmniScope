'use client'

import { useCallback } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { lookThrough } from '@/lib/data'

// Custom node component for a cleaner, OmniScope-aligned look
const CustomNode = ({ data }: any) => {
  return (
    <div className={`px-4 py-2 shadow-sm rounded-lg border ${data.type === 'user' ? 'bg-primary text-primary-foreground border-primary' : data.type === 'fund' ? 'bg-card text-foreground border-border' : 'bg-muted/50 text-foreground border-border'}`}>
      <Handle type="target" position={Position.Left} className="w-2 h-2 rounded-full bg-border" />
      <div className="font-medium text-sm">{data.label}</div>
      {data.value && <div className="text-xs opacity-80 mt-0.5">{data.value}</div>}
      <Handle type="source" position={Position.Right} className="w-2 h-2 rounded-full bg-border" />
    </div>
  )
}

const nodeTypes = { custom: CustomNode }

export function DependencyGraph() {
  // Generate nodes and edges from lookThrough data
  const initialNodes: any[] = [
    { id: 'user', type: 'custom', position: { x: 0, y: 250 }, data: { label: 'Your Portfolio', type: 'user' } }
  ]
  const initialEdges: any[] = []

  const funds = new Set<string>()
  lookThrough.forEach(item => {
    item.funds.forEach(f => funds.add(f))
  })

  // Add fund nodes
  let fundY = 50
  Array.from(funds).forEach(fund => {
    initialNodes.push({
      id: `fund-${fund}`,
      type: 'custom',
      position: { x: 250, y: fundY },
      data: { label: fund, type: 'fund' }
    })
    initialEdges.push({
      id: `e-user-fund-${fund}`,
      source: 'user',
      target: `fund-${fund}`,
      animated: true,
      style: { stroke: 'hsl(var(--muted-foreground))', strokeOpacity: 0.4 }
    })
    fundY += 80
  })

  // Add direct investment node
  initialNodes.push({
    id: 'direct',
    type: 'custom',
    position: { x: 250, y: fundY + 20 },
    data: { label: 'Direct Stocks', type: 'fund' }
  })
  initialEdges.push({
    id: 'e-user-direct',
    source: 'user',
    target: 'direct',
    animated: true,
    style: { stroke: 'hsl(var(--muted-foreground))', strokeOpacity: 0.4 }
  })

  // Add stock nodes
  let stockY = 20
  lookThrough.forEach(stock => {
    initialNodes.push({
      id: `stock-${stock.company}`,
      type: 'custom',
      position: { x: 550, y: stockY },
      data: { label: stock.company, value: `${stock.total.toFixed(1)}% Exposure`, type: 'stock' }
    })

    // Edges from funds
    stock.funds.forEach(fund => {
      initialEdges.push({
        id: `e-fund-${fund}-stock-${stock.company}`,
        source: `fund-${fund}`,
        target: `stock-${stock.company}`,
        style: { stroke: 'hsl(var(--border))' }
      })
    })

    // Edge from direct
    if (stock.directWeight > 0) {
      initialEdges.push({
        id: `e-direct-stock-${stock.company}`,
        source: 'direct',
        target: `stock-${stock.company}`,
        style: { stroke: 'hsl(var(--chart-1))', strokeWidth: 2 }
      })
    }
    
    stockY += 70
  })

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="h-[500px] w-full rounded-xl border border-border bg-card/30">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="hsl(var(--muted-foreground))" gap={16} size={1} />
        <Controls showInteractive={false} className="opacity-50" />
      </ReactFlow>
    </div>
  )
}
