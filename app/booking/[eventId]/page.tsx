'use client'

import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { BookingProvider } from '@/lib/bookingContext'
import { BookingPage } from '@/components/booking/BookingPage'
import { getEventDetail } from '@/lib/eventDetails'
import { Navigation } from '@/components/layout/Navigation'

export default function BookingRoute() {
  const params = useParams()
  const searchParams = useSearchParams()
  const eventId = params.eventId as string
  const initialStep = searchParams.get('step')

  return (
    <BookingProvider>
      <BookingPage 
        eventId={eventId} 
        initialStep={initialStep || undefined}
      />
    </BookingProvider>
  )
}