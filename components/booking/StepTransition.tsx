import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface StepTransitionProps {
  children: React.ReactNode
  isActive: boolean
  direction?: 'forward' | 'backward'
  className?: string
}

export const StepTransition: React.FC<StepTransitionProps> = ({
  children,
  isActive,
  direction = 'forward',
  className
}) => {
  const [isVisible, setIsVisible] = useState(isActive)
  const [slideDirection, setSlideDirection] = useState<'enter' | 'exit'>('enter')

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      setSlideDirection('enter')
    } else {
      setSlideDirection('exit')
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  if (!isVisible) return null

  const getAnimationClasses = () => {
    if (slideDirection === 'enter') {
      return direction === 'forward'
        ? 'opacity-0 translate-x-8'
        : 'opacity-0 -translate-x-8'
    } else {
      return direction === 'forward'
        ? 'opacity-0 translate-x-8'
        : 'opacity-0 -translate-x-8'
    }
  }

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        slideDirection === 'enter' 
          ? 'opacity-100 translate-x-0' 
          : getAnimationClasses(),
        className
      )}
    >
      {children}
    </div>
  )
}