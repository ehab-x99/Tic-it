'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { AnimatedTooltip } from './AnimatedTooltip'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  animation?: 'fade' | 'scale' | 'slide' | 'slide-up'
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  className?: string
  title?: string
}

export const AnimatedModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  animation = 'scale',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  title
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      previousActiveElement.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      
      // Focus management
      if (modalRef.current) {
        modalRef.current.focus()
      }
    } else {
      setIsVisible(false)
      document.body.style.overflow = ''
      
      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md'
      case 'md':
        return 'max-w-lg'
      case 'lg':
        return 'max-w-2xl'
      case 'xl':
        return 'max-w-4xl'
      case 'full':
        return 'max-w-full max-h-full m-4'
      default:
        return 'max-w-lg'
    }
  }

  const getAnimationClasses = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade':
          return 'opacity-0'
        case 'scale':
          return 'opacity-0 scale-95'
        case 'slide':
          return 'opacity-0 translate-y-4'
        case 'slide-up':
          return 'opacity-0 translate-y-8'
        default:
          return 'opacity-0 scale-95'
      }
    }
    
    return 'opacity-100 scale-100 translate-y-0'
  }

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/60 backdrop-blur-sm',
          isVisible ? 'animate-fade-in' : 'animate-fade-out'
        )}
        onClick={handleBackdropClick}
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative bg-dark-900 border border-cyber-blue/30 rounded-lg shadow-2xl',
          'transition-all duration-300 ease-out',
          'gpu-accelerated',
          getSizeClasses(),
          getAnimationClasses(),
          className
        )}
        style={{
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-cyber-blue/20">
            {title && (
              <h2 className="text-xl font-cyber font-semibold text-neon">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <AnimatedTooltip content="Close">
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-cyber-blue transition-colors focus-ring rounded-md"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </AnimatedTooltip>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )

  if (typeof window === 'undefined') return null

  return createPortal(modalContent, document.body)
}

// Confirm Modal Component
interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  loading = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          iconColor: 'text-red-400',
          confirmButton: 'cyber-button bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500 hover:text-white'
        }
      case 'warning':
        return {
          iconColor: 'text-yellow-400',
          confirmButton: 'cyber-button bg-yellow-500/20 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black'
        }
      default:
        return {
          iconColor: 'text-cyber-blue',
          confirmButton: 'cyber-button'
        }
    }
  }

  const { iconColor, confirmButton } = getVariantStyles()

  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      animation="scale"
    >
      <div className="text-center">
        <div className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-dark-800/50 mb-4 ${iconColor}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-cyber font-semibold mb-2">
          {title}
        </h3>
        
        <p className="text-gray-300 mb-6">
          {message}
        </p>
        
        <div className="flex space-x-4 justify-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="cyber-button variant-outline"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(confirmButton, loading && 'opacity-50 cursor-not-allowed')}
          >
            {loading ? (
              <div className="cyber-loader-small mr-2" />
            ) : null}
            {confirmText}
          </button>
        </div>
      </div>
    </AnimatedModal>
  )
}