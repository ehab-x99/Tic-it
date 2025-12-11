import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface StepTransitionProps {
  children: React.ReactNode
  isActive: boolean
  direction?: 'forward' | 'backward'
  className?: string
  animationType?: 'slide' | 'fade' | 'scale' | 'rotate' | 'slide-up'
  duration?: number
  easing?: string
}

export const StepTransition: React.FC<StepTransitionProps> = ({
  children,
  isActive,
  direction = 'forward',
  animationType = 'slide',
  duration = 300,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  className
}) => {
  const [isVisible, setIsVisible] = useState(isActive)
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('entered')
  const [displayChildren, setDisplayChildren] = useState(children)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const previousChildren = useRef(children)

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      setAnimationState('entering')
      
      // Enter animation
      timeoutRef.current = setTimeout(() => {
        setAnimationState('entered')
      }, 50)
    } else {
      setAnimationState('exiting')
      
      // Exit animation
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false)
        setAnimationState('exited')
      }, duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isActive, duration])

  // Handle content changes during transitions
  useEffect(() => {
    if (children !== previousChildren.current) {
      setDisplayChildren(children)
      previousChildren.current = children
    }
  }, [children])

  if (!isVisible && animationState === 'exited') return null

  const getAnimationClasses = () => {
    const baseClasses = 'gpu-accelerated'
    
    if (animationState === 'entering') {
      switch (animationType) {
        case 'slide':
          return cn(
            baseClasses,
            'opacity-0',
            direction === 'forward' ? 'translate-x-8' : '-translate-x-8'
          )
        case 'fade':
          return cn(baseClasses, 'opacity-0')
        case 'scale':
          return cn(baseClasses, 'opacity-0 scale-95')
        case 'rotate':
          return cn(baseClasses, 'opacity-0 rotate-1')
        case 'slide-up':
          return cn(baseClasses, 'opacity-0 translate-y-8')
        default:
          return cn(baseClasses, 'opacity-0 translate-x-8')
      }
    }
    
    if (animationState === 'exiting') {
      switch (animationType) {
        case 'slide':
          return cn(
            baseClasses,
            'opacity-0',
            direction === 'forward' ? '-translate-x-8' : 'translate-x-8'
          )
        case 'fade':
          return cn(baseClasses, 'opacity-0')
        case 'scale':
          return cn(baseClasses, 'opacity-0 scale-95')
        case 'rotate':
          return cn(baseClasses, 'opacity-0 -rotate-1')
        case 'slide-up':
          return cn(baseClasses, 'opacity-0 -translate-y-8')
        default:
          return cn(baseClasses, 'opacity-0 translate-x-8')
      }
    }
    
    // Entered state
    return cn(baseClasses, 'opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0')
  }

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        `duration-${duration}`,
        getAnimationClasses(),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: easing,
        willChange: 'transform, opacity'
      }}
    >
      {displayChildren}
    </div>
  )
}

// Enhanced step transition with stagger support for list items
interface StaggeredStepTransitionProps extends StepTransitionProps {
  staggerDelay?: number
  staggerChildren?: boolean
}

export const StaggeredStepTransition: React.FC<StaggeredStepTransitionProps> = ({
  children,
  staggerDelay = 100,
  staggerChildren = false,
  ...props
}) => {
  const [visibleChildren, setVisibleChildren] = useState<React.ReactNode[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (props.isActive) {
      if (staggerChildren && Array.isArray(children)) {
        setVisibleChildren(children)
      } else if (staggerChildren && React.Children.count(children) > 1) {
        const childArray = React.Children.toArray(children)
        childArray.forEach((child, index) => {
          setTimeout(() => {
            setVisibleChildren(prev => [...prev, child])
          }, index * staggerDelay)
        })
      } else {
        setVisibleChildren([children])
      }
    } else {
      setVisibleChildren([])
    }
  }, [children, props.isActive, staggerDelay, staggerChildren])

  return (
    <StepTransition {...props}>
      <div ref={containerRef}>
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className={cn(
              'transition-all duration-300 ease-out',
              'gpu-accelerated'
            )}
            style={{
              animationDelay: staggerChildren ? `${index * staggerDelay}ms` : '0ms'
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </StepTransition>
  )
}