'use client'

import React, { useState, useRef, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { AnimatedTooltip } from './AnimatedTooltip'

interface AnimatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  variant?: 'default' | 'filled' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  success?: boolean
  animated?: boolean
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ 
    className, 
    label, 
    error, 
    hint, 
    variant = 'default',
    size = 'medium',
    icon,
    iconPosition = 'left',
    loading = false,
    success = false,
    animated = true,
    disabled,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const sizeClasses = {
      small: 'h-9 px-3 text-sm',
      medium: 'h-11 px-4 py-2 text-base',
      large: 'h-13 px-4 py-3 text-lg',
    }

    const variantClasses = {
      default: cn(
        'cyber-input',
        isFocused && 'ring-2 ring-cyber-blue/50 scale-105',
        success && 'border-green-500 focus:ring-green-500/50',
        error && 'border-red-500 focus:ring-red-500/50'
      ),
      filled: cn(
        'bg-dark-800/50 border border-dark-700 text-gray-100 rounded-md',
        'focus:bg-dark-800 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50',
        'hover:border-dark-600 transition-all duration-200',
        success && 'border-green-500 focus:ring-green-500/50',
        error && 'border-red-500 focus:ring-red-500/50'
      ),
      ghost: cn(
        'bg-transparent border border-transparent text-gray-100 rounded-md',
        'focus:bg-dark-800/50 focus:border-cyber-blue/50 focus:ring-2 focus:ring-cyber-blue/50',
        'hover:bg-dark-800/30 transition-all duration-200',
        success && 'border-green-500/50 focus:ring-green-500/50',
        error && 'border-red-500/50 focus:ring-red-500/50'
      )
    }

    const LoadingSpinner = () => (
      <div className="cyber-loader-small animate-spin" />
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value)
      props.onChange?.(e)
    }

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label className={cn(
            'block text-sm font-cyber font-medium text-gray-300 transition-all duration-200',
            isFocused && 'text-cyber-blue',
            error && 'text-red-400',
            success && 'text-green-400'
          )}>
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {loading ? <LoadingSpinner /> : icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={(node) => {
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
              inputRef.current = node
            }}
            className={cn(
              'w-full',
              'font-futura transition-all duration-300 ease-out',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus:outline-none focus:ring-0',
              sizeClasses[size],
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              variantClasses[variant],
              animated && 'gpu-accelerated',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            disabled={disabled || loading}
            {...props}
          />

          {/* Right Icon */}
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {loading ? <LoadingSpinner /> : success ? (
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : error ? (
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                icon
              )}
            </div>
          )}

          {/* Focus Ring */}
          {animated && (
            <div className={cn(
              'absolute inset-0 rounded-md pointer-events-none transition-all duration-300',
              isFocused ? 'ring-2 ring-cyber-blue/20 scale-105' : 'ring-0 scale-100'
            )} />
          )}
        </div>

        {/* Error or Hint Message */}
        {(error || hint) && (
          <div className="flex items-start space-x-2">
            {error && (
              <AnimatedTooltip content={error} position="top">
                <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </AnimatedTooltip>
            )}
            {hint && !error && (
              <AnimatedTooltip content={hint} position="top">
                <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </AnimatedTooltip>
            )}
            <p className={cn(
              'text-sm font-futura',
              error && 'text-red-400',
              hint && !error && 'text-gray-400'
            )}>
              {error || hint}
            </p>
          </div>
        )}
      </div>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput'

// Animated TextArea Component
interface AnimatedTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  variant?: 'default' | 'filled' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  animated?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

export const AnimatedTextArea = forwardRef<HTMLTextAreaElement, AnimatedTextAreaProps>(
  ({ 
    className, 
    label, 
    error, 
    hint, 
    variant = 'default',
    size = 'medium',
    animated = true,
    resize = 'vertical',
    disabled,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const sizeClasses = {
      small: 'min-h-[80px] px-3 py-2 text-sm',
      medium: 'min-h-[120px] px-4 py-3 text-base',
      large: 'min-h-[160px] px-4 py-3 text-lg',
    }

    const variantClasses = {
      default: cn(
        'cyber-input resize-none',
        isFocused && 'ring-2 ring-cyber-blue/50',
        error && 'border-red-500 focus:ring-red-500/50'
      ),
      filled: cn(
        'bg-dark-800/50 border border-dark-700 text-gray-100 rounded-md',
        'focus:bg-dark-800 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50',
        'hover:border-dark-600 transition-all duration-200',
        error && 'border-red-500 focus:ring-red-500/50'
      ),
      ghost: cn(
        'bg-transparent border border-transparent text-gray-100 rounded-md',
        'focus:bg-dark-800/50 focus:border-cyber-blue/50 focus:ring-2 focus:ring-cyber-blue/50',
        'hover:bg-dark-800/30 transition-all duration-200',
        error && 'border-red-500/50 focus:ring-red-500/50'
      )
    }

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    }

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label className={cn(
            'block text-sm font-cyber font-medium text-gray-300 transition-all duration-200',
            isFocused && 'text-cyber-blue',
            error && 'text-red-400'
          )}>
            {label}
          </label>
        )}

        {/* TextArea */}
        <textarea
          ref={ref}
          className={cn(
            'w-full',
            'font-futura transition-all duration-300 ease-out',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'focus:outline-none focus:ring-0',
            sizeClasses[size],
            variantClasses[variant],
            resizeClasses[resize],
            animated && 'gpu-accelerated',
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          {...props}
        />

        {/* Error or Hint Message */}
        {(error || hint) && (
          <p className={cn(
            'text-sm font-futura flex items-center space-x-2',
            error && 'text-red-400',
            hint && !error && 'text-gray-400'
          )}>
            {error && (
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{error || hint}</span>
          </p>
        )}
      </div>
    )
  }
)

AnimatedTextArea.displayName = 'AnimatedTextArea'