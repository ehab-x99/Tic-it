'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import {
  BookingState,
  BookingContextType,
  BookingStep,
  EventDetail,
  BookingSelection,
  BookingQuantity,
  BookingSeating,
  BookingUserInfo,
  BookingPayment,
} from '@/types'

type BookingAction =
  | { type: 'SET_CURRENT_STEP'; payload: BookingStep }
  | { type: 'SET_EVENT_DETAILS'; payload: EventDetail }
  | { type: 'SET_SELECTION'; payload: BookingSelection }
  | { type: 'SET_QUANTITY'; payload: BookingQuantity }
  | { type: 'SET_SEATING'; payload: BookingSeating }
  | { type: 'SET_USER_INFO'; payload: BookingUserInfo }
  | { type: 'SET_PAYMENT'; payload: BookingPayment }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: { field: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_BOOKING' }

const initialState: BookingState = {
  currentStep: 'selection',
  eventId: null,
  eventDetails: null,
  selection: null,
  quantity: null,
  seating: null,
  userInfo: null,
  payment: null,
  isLoading: false,
  errors: {},
}

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload }
    
    case 'SET_EVENT_DETAILS':
      return { 
        ...state, 
        eventId: action.payload.id,
        eventDetails: action.payload 
      }
    
    case 'SET_SELECTION':
      return { ...state, selection: action.payload }
    
    case 'SET_QUANTITY':
      return { ...state, quantity: action.payload }
    
    case 'SET_SEATING':
      return { ...state, seating: action.payload }
    
    case 'SET_USER_INFO':
      return { ...state, userInfo: action.payload }
    
    case 'SET_PAYMENT':
      return { ...state, payment: action.payload }
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.payload.field]: action.payload.message },
      }
    
    case 'CLEAR_ERROR': {
      const newErrors = { ...state.errors }
      delete newErrors[action.payload]
      return { ...state, errors: newErrors }
    }
    
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} }
    
    case 'RESET_BOOKING':
      return initialState
    
    default:
      return state
  }
}

const steps: BookingStep[] = ['selection', 'quantity', 'seating', 'details', 'review', 'payment']

const BookingContext = createContext<BookingContextType | undefined>(undefined)

interface BookingProviderProps {
  children: ReactNode
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  const setCurrentStep = (step: BookingStep) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step })
  }

  const setEventDetails = (event: EventDetail) => {
    dispatch({ type: 'SET_EVENT_DETAILS', payload: event })
  }

  const setSelection = (selection: BookingSelection) => {
    dispatch({ type: 'SET_SELECTION', payload: selection })
  }

  const setQuantity = (quantity: BookingQuantity) => {
    dispatch({ type: 'SET_QUANTITY', payload: quantity })
  }

  const setSeating = (seating: BookingSeating) => {
    dispatch({ type: 'SET_SEATING', payload: seating })
  }

  const setUserInfo = (userInfo: BookingUserInfo) => {
    dispatch({ type: 'SET_USER_INFO', payload: userInfo })
  }

  const setPayment = (payment: BookingPayment) => {
    dispatch({ type: 'SET_PAYMENT', payload: payment })
  }

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const setError = (field: string, message: string) => {
    dispatch({ type: 'SET_ERROR', payload: { field, message } })
  }

  const clearError = (field: string) => {
    dispatch({ type: 'CLEAR_ERROR', payload: field })
  }

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' })
  }

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(state.currentStep)
    if (currentIndex < steps.length - 1) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: steps[currentIndex + 1] })
    }
  }

  const goToPreviousStep = () => {
    const currentIndex = steps.indexOf(state.currentStep)
    if (currentIndex > 0) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: steps[currentIndex - 1] })
    }
  }

  const canProceedFromStep = (step: BookingStep): boolean => {
    switch (step) {
      case 'selection':
        return state.selection !== null
      case 'quantity':
        return state.quantity !== null && state.quantity.selectedTickets > 0
      case 'seating':
        return true // Seating is optional for some events
      case 'details':
        return state.userInfo !== null && 
               state.userInfo.firstName.trim() !== '' &&
               state.userInfo.lastName.trim() !== '' &&
               state.userInfo.email.trim() !== '' &&
               state.userInfo.phone.trim() !== ''
      case 'review':
        return true
      case 'payment':
        return state.payment !== null
      default:
        return false
    }
  }

  const contextValue: BookingContextType = {
    ...state,
    setCurrentStep,
    setEventDetails,
    setSelection,
    setQuantity,
    setSeating,
    setUserInfo,
    setPayment,
    setLoading,
    setError,
    clearError,
    clearErrors,
    resetBooking,
    goToNextStep,
    goToPreviousStep,
    canProceedFromStep,
  }

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}