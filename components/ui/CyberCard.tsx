'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CyberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CyberCard = React.forwardRef<HTMLDivElement, CyberCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'cyber-card p-6 transition-all duration-300 hover:border-cyber-blue/50 hover:shadow-cyber',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CyberCard.displayName = 'CyberCard'
