'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  description?: string
}

interface AnimatedDropdownProps {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  variant?: 'default' | 'filled' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  searchable?: boolean
  loading?: boolean
  error?: string
  icon?: React.ReactNode
}

export const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  disabled = false,
  className,
  variant = 'default',
  size = 'medium',
  searchable = false,
  loading = false,
  error,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOptions, setFilteredOptions] = useState(options)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    if (searchable && searchTerm) {
      setFilteredOptions(
        options.filter(option =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      setFilteredOptions(options)
    }
  }, [options, searchTerm, searchable])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setSearchTerm('')
        buttonRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      
      // Focus search input when dropdown opens
      if (searchable) {
        setTimeout(() => searchInputRef.current?.focus(), 100)
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, searchable])

  const handleToggle = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen)
      if (isOpen) {
        setSearchTerm('')
      }
    }
  }

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
    setSearchTerm('')
  }

  const sizeClasses = {
    small: 'h-9 px-3 text-sm',
    medium: 'h-11 px-4 py-2 text-base',
    large: 'h-13 px-4 py-3 text-lg',
  }

  const variantClasses = {
    default: cn(
      'cyber-input cursor-pointer',
      isOpen && 'ring-2 ring-cyber-blue/50',
      error && 'border-red-500 focus:ring-red-500/50',
      disabled && 'opacity-50 cursor-not-allowed'
    ),
    filled: cn(
      'bg-dark-800/50 border border-dark-700 text-gray-100 rounded-md cursor-pointer',
      'hover:border-dark-600 transition-colors duration-200',
      isOpen && 'border-cyber-blue ring-2 ring-cyber-blue/50',
      error && 'border-red-500 focus:ring-red-500/50',
      disabled && 'opacity-50 cursor-not-allowed'
    ),
    ghost: cn(
      'bg-transparent border border-transparent text-gray-100 rounded-md cursor-pointer',
      'hover:bg-dark-800/30 transition-colors duration-200',
      isOpen && 'bg-dark-800/50 border-cyber-blue/50 ring-2 ring-cyber-blue/50',
      error && 'border-red-500/50 focus:ring-red-500/50',
      disabled && 'opacity-50 cursor-not-allowed'
    )
  }

  const LoadingSpinner = () => (
    <div className="cyber-loader-small animate-spin" />
  )

  return (
    <div className={cn('relative', className)}>
      {/* Label */}
      {label && (
        <label className={cn(
          'block text-sm font-cyber font-medium text-gray-300 mb-2 transition-colors duration-200',
          isOpen && 'text-cyber-blue',
          error && 'text-red-400'
        )}>
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled || loading}
        className={cn(
          'w-full flex items-center justify-between text-left',
          'focus:outline-none focus:ring-0',
          sizeClasses[size],
          variantClasses[variant]
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          {icon && (
            <div className="flex-shrink-0 text-gray-400">
              {icon}
            </div>
          )}
          <span className="truncate">
            {loading ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner />
                <span>Loading...</span>
              </div>
            ) : selectedOption ? (
              <div className="flex items-center space-x-2">
                {selectedOption.icon && (
                  <div className="flex-shrink-0">
                    {selectedOption.icon}
                  </div>
                )}
                <span>{selectedOption.label}</span>
              </div>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
        </div>

        {/* Arrow Icon */}
        <div className={cn(
          'flex-shrink-0 ml-2 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Portal */}
      {isOpen && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50" ref={dropdownRef}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className={cn(
            'absolute z-50 mt-1 w-full bg-dark-900 border border-cyber-blue/30 rounded-lg shadow-2xl',
            'backdrop-blur-md animate-scale-in gpu-accelerated'
          )}>
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-cyber-blue/20">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search options..."
                  className="w-full px-3 py-2 bg-dark-800/50 border border-dark-700 rounded-md text-gray-100 focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50 focus:outline-none"
                />
              </div>
            )}

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto py-2">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-gray-400 text-center">
                  {searchTerm ? 'No options found' : 'No options available'}
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      'w-full px-4 py-3 text-left transition-all duration-150',
                      'hover:bg-cyber-blue/10 focus:bg-cyber-blue/10 focus:outline-none',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      option.value === value && 'bg-cyber-blue/20 text-cyber-blue',
                      index === 0 && 'rounded-t-lg',
                      index === filteredOptions.length - 1 && 'rounded-b-lg'
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      {option.icon && (
                        <div className="flex-shrink-0 mt-0.5">
                          {option.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-gray-400 mt-1">
                            {option.description}
                          </div>
                        )}
                      </div>
                      {option.value === value && (
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-cyber-blue" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}