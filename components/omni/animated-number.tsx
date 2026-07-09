'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { cn } from '@/lib/utils'
import { formatINRCompact } from '@/lib/format'

export function AnimatedNumber({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const [displayValue, setDisplayValue] = useState(formatINRCompact(0))
  const motionValue = useMotionValue(0)

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        setDisplayValue(formatINRCompact(latest))
      },
    })
    return controls.stop
  }, [value, motionValue])

  return <span className={cn('tnum font-serif tracking-tight', className)}>{displayValue}</span>
}
