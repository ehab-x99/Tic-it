export interface Event {
  id: string
  title: string
  artist: string
  venue: string
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
