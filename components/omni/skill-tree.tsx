'use client'

import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  Edge,
  Node,
  Position,
  Handle,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { learningModules, LearningModule } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Lock, Unlock, PlayCircle } from 'lucide-react'

// Custom Node Component
function ModuleNode({ data }: { data: { module: LearningModule, isActive: boolean } }) {
  const { module, isActive } = data
  const isCompleted = module.lessons.every(l => l.done)
  const isStarted = module.lessons.some(l => l.done) && !isCompleted
  
  return (
    <div 
      className={cn(
        "px-4 py-3 rounded-xl border bg-card w-64 shadow-sm transition-colors",
        module.unlocked ? (isActive ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50") : "border-border/50 opacity-60 bg-muted/30 grayscale"
      )}
    >
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="flex justify-between items-start mb-2">
        <span className={cn(
          "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full",
          isCompleted ? "bg-success-muted text-success" : 
          isStarted ? "bg-info-muted text-info" : 
          module.unlocked ? "bg-accent text-foreground" : "bg-muted text-muted-foreground"
        )}>
          {isCompleted ? 'Completed' : isStarted ? 'In Progress' : module.unlocked ? 'Available' : 'Locked'}
        </span>
        {module.unlocked ? <Unlock className="size-3 text-muted-foreground" /> : <Lock className="size-3 text-muted-foreground" />}
      </div>
      <h3 className="font-semibold text-sm text-foreground mb-1">{module.title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{module.description}</p>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  )
}

const nodeTypes = {
  moduleNode: ModuleNode,
}

export function SkillTree({ onSelectModule, activeModuleId }: { onSelectModule: (id: string) => void, activeModuleId: string }) {
  
  // Layout math (hardcoded for simplicity since it's a fixed known tree structure)
  const nodes: Node[] = useMemo(() => {
    return [
      {
        id: 'foundations',
        type: 'moduleNode',
        position: { x: 250, y: 50 },
        data: { 
          module: learningModules.find(m => m.id === 'foundations')!,
          isActive: activeModuleId === 'foundations'
        }
      },
      {
        id: 'diversification',
        type: 'moduleNode',
        position: { x: 100, y: 200 },
        data: { 
          module: learningModules.find(m => m.id === 'diversification')!,
          isActive: activeModuleId === 'diversification'
        }
      },
      {
        id: 'india',
        type: 'moduleNode',
        position: { x: 400, y: 200 },
        data: { 
          module: learningModules.find(m => m.id === 'india')!,
          isActive: activeModuleId === 'india'
        }
      },
      {
        id: 'advanced-debt',
        type: 'moduleNode',
        position: { x: 250, y: 350 },
        data: { 
          module: learningModules.find(m => m.id === 'advanced-debt')!,
          isActive: activeModuleId === 'advanced-debt'
        }
      }
    ]
  }, [activeModuleId])

  const edges: Edge[] = useMemo(() => {
    const edgeList: Edge[] = []
    learningModules.forEach(mod => {
      mod.dependencies.forEach(dep => {
        const isUnlocked = mod.unlocked
        edgeList.push({
          id: `e-${dep}-${mod.id}`,
          source: dep,
          target: mod.id,
          animated: isUnlocked && !mod.lessons.every(l => l.done), // animate edges to unlocked but unfinished nodes
          style: { stroke: isUnlocked ? 'var(--primary)' : 'var(--border)', strokeWidth: 2, opacity: isUnlocked ? 0.6 : 0.3 }
        })
      })
    })
    return edgeList
  }, [])

  const onNodeClick = useCallback((_: any, node: Node) => {
    onSelectModule(node.id)
  }, [onSelectModule])

  return (
    <div className="h-[450px] w-full bg-card rounded-xl border border-border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={true}
      >
        <Background color="var(--border)" gap={20} size={1} />
        <Controls showInteractive={false} className="opacity-50" />
      </ReactFlow>
    </div>
  )
}
