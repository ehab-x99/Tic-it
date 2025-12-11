'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  animated?: boolean
  pulse?: boolean
  glowEffect?: boolean
}

export const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'medium', 
    children, 
    loading = false,
    icon,
    iconPosition = 'left',
    animated = true,
    pulse = false,
    glowEffect = false,
    disabled,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isPressed, setIsPressed] = useState(false)

    const baseClasses = cn(
      'inline-flex items-center justify-center font-cyber font-semibold uppercase tracking-wider',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue',
      'disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
      animated && 'transition-all duration-300 ease-out gpu-accelerated',
      pulse && 'animate-pulse-slow',
      glowEffect && 'animate-glow-pulse'
    )
    
    const variantClasses = {
      primary: cn(
        'cyber-button cyber-button-interactive',
        isHovered && 'shadow-lg scale-105',
        isPressed && 'scale-95'
      ),
      secondary: cn(
        'bg-cyber-purple text-white border-2 border-cyber-purple',
        'hover:bg-transparent hover:text-cyber-purple hover:shadow-lg hover:scale-105',
        'active:scale-95 transition-all duration-200',
        isPressed && 'scale-95'
      ),
      outline: cn(
        'bg-transparent border-2 border-cyber-blue text-cyber-blue',
        'hover:bg-cyber-blue hover:text-dark-950 hover:shadow-lg hover:scale-105',
        'active:scale-95 transition-all duration-200',
        isPressed && 'scale-95'
      ),
      ghost: cn(
        'bg-transparent border-none text-cyber-blue',
        'hover:bg-cyber-blue/10 hover:scale-105',
        'active:scale-95 transition-all duration-200',
        isPressed && 'scale-95'
      ),
      danger: cn(
        'bg-red-500/20 text-red-400 border-2 border-red-500',
        'hover:bg-red-500 hover:text-white hover:shadow-lg hover:scale-105',
        'active:scale-95 transition-all duration-200',
        isPressed && 'scale-95'
      ),
      success: cn(
        'bg-green-500/20 text-green-400 border-2 border-green-500',
        'hover:bg-green-500 hover:text-white hover:shadow-lg hover:scale-105',
        'active:scale-95 transition-all duration-200',
        isPressed && 'scale-95'
      ),
    }
    
    const sizeClasses = {
      small: 'h-9 px-4 text-sm gap-2',
      medium: 'h-11 px-6 py-2 text-base gap-2',
      large: 'h-13 px-8 py-4 text-lg gap-3',
    }

    const LoadingSpinner = () => (
      <div className="cyber-loader-small animate-spin" />
    )

    return (
      <button
        className={cn(
          baseClasses, 
          variantClasses[variant], 
          sizeClasses[size], 
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsPressed(false)
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        {...props}
      >
        {loading && <LoadingSpinner />}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        
        <span className={cn(
          'transition-all duration-200',
          loading && 'opacity-70'
        )}>
          {children}
        </span>
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        
        {/* Interactive overlay effect */}
        {animated && (
          <div 
            className={cn(
              'absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent',
              'transform -skew-x-12 -translate-x-full transition-transform duration-700',
              isHovered && 'translate-x-full'
            )}
          />
        )}
      </button>
    )
  }
)

CyberButton.displayName = 'CyberButton'
