import React from 'react'
import { useBooking } from '@/lib/bookingContext'
import { cn } from '@/lib/utils'
import { BookingStep } from '@/types'

const steps: Array<{ id: BookingStep; title: string; description: string }> = [
  {
    id: 'selection',
    title: 'Select Tickets',
    description: 'Choose your experience'
  },
  {
    id: 'quantity',
    title: 'Quantity',
    description: 'How many tickets'
  },
  {
    id: 'seating',
    title: 'Seating',
    description: 'Choose your seats'
  },
  {
    id: 'details',
    title: 'Details',
    description: 'Your information'
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Confirm order'
  },
  {
    id: 'payment',
    title: 'Payment',
    description: 'Complete purchase'
  }
]

export const BookingStepIndicator: React.FC = () => {
  const { currentStep } = useBooking()
  
  const currentIndex = steps.findIndex(step => step.id === currentStep)
  const progressPercentage = ((currentIndex + 1) / steps.length) * 100

  return (
    <div className="w-full bg-dark-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-cyber text-white">
            {steps[currentIndex]?.title || 'Booking'}
          </h3>
          <p className="text-sm text-gray-400">
            {steps[currentIndex]?.description || 'Step 1 of 6'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">Progress</p>
          <p className="text-2xl font-cyber text-cyber-blue">
            {currentIndex + 1}<span className="text-gray-500">/{steps.length}</span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyber-pink via-cyber-blue to-cyber-purple transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex
            const isCurrent = index === currentIndex
            
            return (
              <div
                key={step.id}
                className={cn(
                  'relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-500',
                  isCompleted && 'bg-cyber-blue border-cyber-blue shadow-lg shadow-cyber-blue/30',
                  isCurrent && 'bg-cyber-pink border-cyber-pink shadow-lg shadow-cyber-pink/30 animate-pulse',
                  !isCompleted && !isCurrent && 'bg-dark-700 border-gray-600'
                )}
              >
                {/* Step Number */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="flex flex-col items-center">
                    <span className={cn(
                      'text-xs font-cyber tracking-[0.2em] transition-colors duration-300',
                      (isCompleted || isCurrent) ? 'text-white' : 'text-gray-500'
                    )}>
                      {index + 1}
                    </span>
                    <span className={cn(
                      'text-xs mt-1 transition-colors duration-300',
                      (isCompleted || isCurrent) ? 'text-white' : 'text-gray-600'
                    )}>
                      {step.title}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}