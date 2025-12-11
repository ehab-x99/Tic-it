export interface Event {
  id: string
  title: string
  artist: string
  venue: string
  city: string
  date: Date
  price: number
  description: string
  imageUrl: string
  availableTickets: number
  totalTickets: number
  category: EventCategory
  tags: string[]
  status: EventStatus
}

export interface Artist {
  id: string
  name: string
  genre: string
  description: string
  imageUrl: string
  socialMedia: {
    twitter?: string
    instagram?: string
    spotify?: string
    youtube?: string
  }
  upcomingEvents: string[]
}

export interface Venue {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  capacity: number
  description: string
  imageUrl: string
  amenities: string[]
  upcomingEvents: string[]
}

export interface Ticket {
  id: string
  eventId: string
  userId: string
  seatNumber?: string
  ticketType: TicketType
  price: number
  purchaseDate: Date
  status: TicketStatus
  qrCode: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  profileImage?: string
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  favoriteGenres: string[]
  favoriteArtists: string[]
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    showActivity: boolean
  }
}

export type EventCategory = 
  | 'rock' 
  | 'pop' 
  | 'hip-hop' 
  | 'electronic' 
  | 'jazz' 
  | 'classical' 
  | 'country' 
  | 'alternative' 
  | 'indie' 
  | 'metal'
  | 'rave'
  | 'techno'
  | 'edc'
  | 'edm'

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export type TicketType = 'general' | 'vip' | 'premium' | 'early-bird' | 'student'

export type TicketStatus = 'active' | 'used' | 'refunded' | 'transferred' | 'expired'

export interface SearchFilters {
  query?: string
  category?: EventCategory
  dateRange?: {
    start: Date
    end: Date
  }
  priceRange?: {
    min: number
    max: number
  }
  location?: string
  sortBy?: 'date' | 'price' | 'popularity' | 'alphabetical'
  sortOrder?: 'asc' | 'desc'
}

export interface BookingData {
  eventId: string
  tickets: {
    type: TicketType
    quantity: number
    seatNumbers?: string[]
  }[]
  totalAmount: number
  paymentMethod: string
  userInfo: {
    firstName: string
    lastName: string
    email: string
    phone?: string
  }
}

export type TicketTierAccent = 'pink' | 'blue' | 'green' | 'purple' | 'amber'

export interface TicketTier {
  id: string
  name: string
  description: string
  price: number
  benefits: string[]
  availability: {
    remaining: number
    total: number
  }
  accent?: TicketTierAccent
}

export interface EventHighlight {
  id: string
  title: string
  description: string
  icon: string
}

export interface EventGalleryItem {
  id: string
  src: string
  alt: string
  type?: 'image' | 'video'
}

export interface EventDetail extends Event {
  heroImage: string
  longDescription: string
  venueDetails: {
    address: string
    city: string
    state: string
    capacity: number
    amenities: string[]
  }
  ticketTiers: TicketTier[]
  gallery: EventGalleryItem[]
  highlights: EventHighlight[]
  relatedEventIds: string[]
}

// Booking System Types
export type BookingStep = 'selection' | 'quantity' | 'seating' | 'details' | 'review' | 'payment'

export interface BookingSelection {
  tierId: string
  tierName: string
  price: number
  accent?: TicketTierAccent
}

export interface BookingQuantity {
  selectedTickets: number
  totalAmount: number
}

export interface BookingSeating {
  seatIds: string[]
  section?: string
  row?: string
}

export interface BookingUserInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  marketingConsent: boolean
}

export interface BookingPayment {
  method: 'card' | 'paypal' | 'apple-pay' | 'google-pay'
  cardDetails?: {
    number: string
    expiry: string
    cvv: string
    name: string
  }
}

export interface BookingState {
  currentStep: BookingStep
  eventId: string | null
  eventDetails: EventDetail | null
  selection: BookingSelection | null
  quantity: BookingQuantity | null
  seating: BookingSeating | null
  userInfo: BookingUserInfo | null
  payment: BookingPayment | null
  isLoading: boolean
  errors: Record<string, string>
}

export interface BookingContextType extends BookingState {
  setCurrentStep: (step: BookingStep) => void
  setEventDetails: (event: EventDetail) => void
  setSelection: (selection: BookingSelection) => void
  setQuantity: (quantity: BookingQuantity) => void
  setSeating: (seating: BookingSeating) => void
  setUserInfo: (userInfo: BookingUserInfo) => void
  setPayment: (payment: BookingPayment) => void
  setLoading: (loading: boolean) => void
  setError: (field: string, message: string) => void
  clearError: (field: string) => void
  clearErrors: () => void
  resetBooking: () => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  canProceedFromStep: (step: BookingStep) => boolean
}

export interface Seat {
  id: string
  row: string
  number: string
  section: string
  status: 'available' | 'selected' | 'unavailable'
  price: number
  x: number
  y: number
}

export interface SeatZone {
  id: string
  name: string
  color: string
  seats: Seat[]
  minPrice: number
  maxPrice: number
}
