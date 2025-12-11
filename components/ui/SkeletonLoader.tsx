'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
  animate?: boolean
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animate = true
}) => {
  const baseClasses = cn(
    'bg-dark-800/50',
    animate && 'skeleton',
    className
  )

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'rounded h-4'
      case 'circular':
        return 'rounded-full'
      case 'rectangular':
        return 'rounded-md'
      default:
        return 'rounded-md'
    }
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={cn(baseClasses, getVariantClasses())}
            style={{
              ...style,
              width: index === lines - 1 && lines > 1 ? '75%' : style.width
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(baseClasses, getVariantClasses())}
      style={style}
    />
  )
}

// Predefined skeleton components for common use cases
export const EventCardSkeleton: React.FC = () => (
  <div className="cyber-card p-6 space-y-4">
    <SkeletonLoader variant="rectangular" height={200} className="w-full" />
    <div className="space-y-2">
      <SkeletonLoader variant="text" width="80%" />
      <SkeletonLoader variant="text" width="60%" />
      <SkeletonLoader variant="text" width="40%" />
    </div>
    <div className="flex justify-between items-center">
      <SkeletonLoader variant="text" width="30%" />
      <SkeletonLoader variant="rectangular" width={80} height={32} />
    </div>
  </div>
)

export const ProfileSkeleton: React.FC = () => (
  <div className="cyber-card p-8 space-y-6">
    <div className="flex items-center space-x-4">
      <SkeletonLoader variant="circular" width={64} height={64} />
      <div className="space-y-2 flex-1">
        <SkeletonLoader variant="text" width="50%" />
        <SkeletonLoader variant="text" width="70%" />
      </div>
    </div>
    <div className="space-y-4">
      <SkeletonLoader variant="text" width="90%" />
      <SkeletonLoader variant="text" width="95%" />
      <SkeletonLoader variant="text" width="80%" />
    </div>
  </div>
)

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => (
  <div className="space-y-2">
    {/* Header */}
    <div className="flex space-x-4 pb-2 border-b border-cyber-blue/20">
      {Array.from({ length: columns }, (_, index) => (
        <SkeletonLoader key={index} variant="text" width="100%" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4 py-2">
        {Array.from({ length: columns }, (_, colIndex) => (
          <SkeletonLoader key={colIndex} variant="text" width="100%" />
        ))}
      </div>
    ))}
  </div>
)