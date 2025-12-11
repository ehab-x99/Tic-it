'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

export const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = 'primary', size = 'medium', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-cyber font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue disabled:pointer-events-none disabled:opacity-50'
    
    const variantClasses = {
      primary: 'cyber-button',
      secondary: 'bg-cyber-purple text-white border-2 border-cyber-purple hover:bg-transparent hover:text-cyber-purple',
      outline: 'bg-transparent border-2 border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-dark-950',
      ghost: 'bg-transparent border-none text-cyber-blue hover:bg-cyber-blue/10',
    }
    
    const sizeClasses = {
      small: 'h-9 px-4 text-sm',
      medium: 'h-11 px-6 py-2 text-base',
      large: 'h-13 px-8 py-4 text-lg',
    }

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

CyberButton.displayName = 'CyberButton'
