'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
  className?: string
  disabled?: boolean
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  delay = 100,
  className,
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    if (disabled) return
    
    const id = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-50 px-2 py-1 text-sm bg-dark-800 border border-cyber-blue/50 rounded-md shadow-lg whitespace-nowrap'
    
    if (trigger === 'click') {
      return isVisible ? `${baseClasses} animate-fade-in` : `${baseClasses} animate-fade-out`
    }
    
    return isVisible ? `${baseClasses} animate-scale-in` : 'opacity-0 pointer-events-none'
  }

  const getTooltipPosition = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2'
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2'
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
    }
  }

  const getEventHandlers = () => {
    const baseHandlers = {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
      onFocus: showTooltip,
      onBlur: hideTooltip,
    }

    if (trigger === 'click') {
      return {
        onClick: () => setIsVisible(!isVisible),
        onMouseLeave: trigger === 'click' ? undefined : hideTooltip,
      }
    }

    return baseHandlers
  }

  return (
    <div className="relative inline-block">
      <div {...getEventHandlers()}>
        {children}
      </div>
      <div
        className={cn(
          getPositionClasses(),
          getTooltipPosition(),
          className
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        {content}
        {/* Arrow */}
        <div className={cn(
          'absolute w-2 h-2 bg-dark-800 border border-cyber-blue/50 transform rotate-45',
          {
            'top-full left-1/2 -translate-x-1/2 -mt-1': position === 'top',
            'bottom-full left-1/2 -translate-x-1/2 -mb-1': position === 'bottom',
            'right-full top-1/2 -translate-y-1/2 -mr-1': position === 'left',
            'left-full top-1/2 -translate-y-1/2 -ml-1': position === 'right',
          }
        )} />
      </div>
    </div>
  )
}