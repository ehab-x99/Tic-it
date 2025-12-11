import React, { useState } from 'react'
import { useBooking } from '@/lib/bookingContext'
import { cn } from '@/lib/utils'
import { BookingStep } from '@/types'

interface StepNavigationProps {
  onNext: () => void
  onPrevious: () => void
  canProceed: boolean
  isLoading?: boolean
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  onNext,
  onPrevious,
  canProceed,
  isLoading = false
}) => {
  const { currentStep } = useBooking()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = async () => {
    if (!canProceed || isLoading) return
    
    setIsAnimating(true)
    // Add slight delay for animation
    await new Promise(resolve => setTimeout(resolve, 300))
    onNext()
    setIsAnimating(false)
  }

  const isFirstStep = currentStep === 'selection'
  const isLastStep = currentStep === 'payment'

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 bg-dark-950/95 backdrop-blur-sm border-t border-white/10 p-6 transition-all duration-500',
      isAnimating ? 'transform translate-y-0 opacity-100' : ''
    )}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <div className="flex-1">
            {!isFirstStep && (
              <button
                type="button"
                onClick={onPrevious}
                disabled={isLoading}
                className={cn(
                  'px-8 py-4 border border-white/30 rounded-lg font-cyber text-sm tracking-[0.3em] uppercase transition-all duration-300',
                  isLoading
                    ? 'border-gray-600 text-gray-600 cursor-not-allowed'
                    : 'text-gray-300 hover:border-cyber-blue hover:text-cyber-blue hover:scale-105'
                )}
              >
                ← Previous
              </button>
            )}
          </div>

          {/* Step Info */}
          <div className="text-center px-6">
            <div className="text-xs text-gray-500 uppercase tracking-[0.3em] mb-1">
              {isLastStep ? 'Final Step' : 'Continue to next step'}
            </div>
            <div className="text-sm text-gray-400">
              {canProceed ? 'Ready to proceed' : 'Complete required fields'}
            </div>
          </div>

          {/* Next Button */}
          <div className="flex-1 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed || isLoading}
              className={cn(
                'px-8 py-4 rounded-lg font-cyber text-sm tracking-[0.3em] uppercase transition-all duration-300',
                canProceed && !isLoading
                  ? 'bg-cyber-pink text-white hover:bg-cyber-pink/80 hover:scale-105 shadow-lg'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : isLastStep ? (
                'Complete Booking'
              ) : (
                'Continue →'
              )}
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-dark-950/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-cyber-pink border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <div className="text-sm font-cyber text-white">Processing...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}