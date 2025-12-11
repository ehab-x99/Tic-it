import React, { useState, useEffect, useCallback } from 'react'
import { useBooking } from '@/lib/bookingContext'
import { BookingStepIndicator } from '@/components/booking/BookingStepIndicator'
import { TicketSelectionStep } from '@/components/booking/steps/TicketSelectionStep'
import { QuantitySelectionStep } from '@/components/booking/steps/QuantitySelectionStep'
import { SeatSelectionStep } from '@/components/booking/steps/SeatSelectionStep'
import { UserDetailsStep } from '@/components/booking/steps/UserDetailsStep'
import { OrderReviewStep } from '@/components/booking/steps/OrderReviewStep'
import { PaymentStep } from '@/components/booking/steps/PaymentStep'
import { StepNavigation } from '@/components/booking/StepNavigation'
import { Navigation } from '@/components/layout/Navigation'
import { cn } from '@/lib/utils'

interface BookingPageProps {
  eventId: string
  initialStep?: string
}

export const BookingPage: React.FC<BookingPageProps> = ({ eventId, initialStep }) => {
  const {
    currentStep,
    setCurrentStep,
    eventDetails,
    setEventDetails: setContextEventDetails,
    goToNextStep,
    goToPreviousStep,
    canProceedFromStep,
    isLoading,
    resetBooking,
    setEventDetails
  } = useBooking()

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  // Initialize event details on mount
  useEffect(() => {
    if (eventId && !eventDetails) {
      // Fetch event details using the existing function
      const { getEventDetail } = require('@/lib/eventDetails')
      const eventData = getEventDetail(eventId)
      if (eventData) {
        setContextEventDetails(eventData)
      }
    }
  }, [eventId, eventDetails, setContextEventDetails])

  // Handle initial step from URL
  useEffect(() => {
    if (initialStep && ['selection', 'quantity', 'seating', 'details', 'review', 'payment'].includes(initialStep)) {
      setCurrentStep(initialStep as any)
    }
  }, [initialStep, setCurrentStep])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && canProceedFromStep(currentStep)) {
      e.preventDefault()
      handleNext()
    } else if (e.key === 'ArrowLeft' && currentStep !== 'selection') {
      e.preventDefault()
      handlePrevious()
    }
  }, [currentStep, canProceedFromStep, handleNext, handlePrevious])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleNext = async () => {
    if (!canProceedFromStep(currentStep) || isLoading) return

    setIsTransitioning(true)
    setDirection('forward')
    
    // Add delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 150))
    goToNextStep()
    await new Promise(resolve => setTimeout(resolve, 150))
    setIsTransitioning(false)
  }

  const handlePrevious = async () => {
    if (currentStep === 'selection' || isLoading) return

    setIsTransitioning(true)
    setDirection('backward')
    
    // Add delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 150))
    goToPreviousStep()
    await new Promise(resolve => setTimeout(resolve, 150))
    setIsTransitioning(false)
  }

  const canProceed = canProceedFromStep(currentStep)

  const renderCurrentStep = () => {
    if (!eventDetails) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-cyber-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="text-cyber-pink font-cyber">Loading event details...</div>
          </div>
        </div>
      )
    }

    switch (currentStep) {
      case 'selection':
        return <TicketSelectionStep ticketTiers={eventDetails.ticketTiers} />
      case 'quantity':
        return <QuantitySelectionStep />
      case 'seating':
        return <SeatSelectionStep />
      case 'details':
        return <UserDetailsStep />
      case 'review':
        return <OrderReviewStep />
      case 'payment':
        return <PaymentStep />
      default:
        return <TicketSelectionStep ticketTiers={eventDetails.ticketTiers} />
    }
  }

  // Step transition animations
  const getTransitionClasses = () => {
    if (isTransitioning) {
      return direction === 'forward'
        ? 'opacity-0 transform translate-x-8'
        : 'opacity-0 transform -translate-x-8'
    }
    return 'opacity-100 transform translate-x-0'
  }

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100">
      <Navigation />
      
      <main className="relative pb-32">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-cyber-blue/5 via-transparent to-transparent border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {eventDetails && (
              <div className="mb-6">
                <h1 className="text-2xl font-cyber text-white mb-2">{eventDetails.title}</h1>
                <p className="text-gray-400">{eventDetails.artist} • {eventDetails.city}</p>
              </div>
            )}
            
            <BookingStepIndicator />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className={cn(
            'transition-all duration-300 ease-out',
            getTransitionClasses()
          )}>
            {renderCurrentStep()}
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="cyber-card p-8 text-center">
              <div className="w-12 h-12 border-2 border-cyber-pink border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <div className="text-lg font-cyber text-white mb-2">Processing...</div>
              <div className="text-sm text-gray-400">Please wait while we handle your request</div>
            </div>
          </div>
        )}

        {/* Keyboard Navigation Hint */}
        <div className="fixed bottom-24 right-6 text-xs text-gray-600 font-cyber">
          <div className="bg-dark-900/80 border border-white/10 rounded-lg p-3">
            <div className="text-gray-500 uppercase tracking-[0.2em] mb-2">Keyboard</div>
            <div>← → Navigate steps</div>
            <div>Enter Continue</div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      <StepNavigation
        onNext={handleNext}
        onPrevious={handlePrevious}
        canProceed={canProceed}
        isLoading={isLoading || isTransitioning}
      />
    </div>
  )
}