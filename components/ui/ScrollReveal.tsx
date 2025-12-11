'use client'

import React, { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  threshold?: number
  once?: boolean
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  threshold = 0.1,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            setHasAnimated(true)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, once])

  const getDirectionClasses = () => {
    if (isVisible && !hasAnimated) {
      switch (direction) {
        case 'up':
          return 'animate-slide-up'
        case 'down':
          return 'animate-slide-down'
        case 'left':
          return 'animate-slide-left'
        case 'right':
          return 'animate-slide-right'
        case 'scale':
          return 'animate-scale-in'
        default:
          return 'animate-slide-up'
      }
    }
    
    if (!isVisible && !hasAnimated) {
      return 'scroll-reveal'
    }
    
    return ''
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        getDirectionClasses(),
        className
      )}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}