import { Event, EventDetail, EventGalleryItem, EventHighlight, TicketTier } from '@/types'
import { mockEvents } from './mockData'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1465188035480-cf3a60801e4d?auto=format&fit=crop&w=2000&q=80',
]

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1200&q=80',
]

const DEFAULT_AMENITIES = [
  'Immersive holo-stage with 360° visuals',
  'Quantum acoustic array with adaptive audio',
  'Biometric express entry portals',
  'Molecular gastronomy food labs',
  'Augmented reality navigation beacons',
  'Neon marketplace + merch drones',
]

const HIGHLIGHT_TEMPLATES = [
  {
    title: 'Quantum Sound Lab',
    description: 'A 64-speaker spatial audio rig tracks every movement for a fully immersive wave field experience.',
    icon: '🎧',
  },
  {
    title: 'Holographic Runway',
    description: 'Laser-sculpted visuals react to beats in real-time, creating a floating runway beneath the artist.',
    icon: '🌌',
  },
  {
    title: 'Neon Drone Show',
    description: 'Autonomous drones paint choreographed constellations synced to the performance drops.',
    icon: '🚀',
  },
  {
    title: 'Pulse Lounge',
    description: 'Lounges with biometric lighting mirror your heartbeat for a hyper-personal ambient zone.',
    icon: '💠',
  },
]

const ticketTierBlueprints = [
  {
    key: 'vip',
    name: 'VIP Immersion Suite',
    multiplier: 2.7,
    description: 'Private skyline pods, backstage access, and molecular dining experience.',
    benefits: [
      'Backstage quantum meet & greet',
      'Complimentary molecular tasting menu',
      'Dedicated holographic concierge',
      'Private skyline viewing pod',
    ],
    capacityRatio: 0.12,
    accent: 'pink',
  },
  {
    key: 'early-bird',
    name: 'Quantum Early Bird',
    multiplier: 0.8,
    description: 'Limited release entry with priority floor access.',
    benefits: [
      'Priority floor placement',
      'Exclusive merch drop access',
      'Pulse-line expedited entry',
    ],
    capacityRatio: 0.28,
    accent: 'green',
  },
  {
    key: 'ga',
    name: 'General Admission Pulse',
    multiplier: 1.05,
    description: 'Full access to the immersive arena and neon marketplace.',
    benefits: [
      'Immersive arena access',
      'Adaptive LED wristband',
      'Neon marketplace credits',
    ],
    capacityRatio: 0.45,
    accent: 'blue',
  },
  {
    key: 'afterglow',
    name: 'Afterglow Lounge',
    multiplier: 1.45,
    description: 'Post-show micro sets with ambient projections and curated cocktails.',
    benefits: [
      'Post-show lounge access',
      'Curated cocktail program',
      'Ambient micro sets',
    ],
    capacityRatio: 0.15,
    accent: 'purple',
  },
]

type DetailOverrideFactory = (event: Event) => Partial<EventDetail>

const detailOverrides: Record<string, DetailOverrideFactory> = {
  'event-1': (event) => ({
    heroImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2000&q=80',
    longDescription: `${event.artist} brings a gravity-defying set that bends time with immersive synth waves, colossal holograms, and pulse-reactive lasers. This night at ${event.venue} is engineered for sensory overload with floating drones, AR-enhanced visuals, and an afterparty suspended above the arena floor.`,
    venueDetails: {
      address: '401 Pulse Ave',
      city: 'New York',
      state: 'NY',
      capacity: 21000,
      amenities: [
        'Floating glass atrium entry',
        'Skyline lounge with transparent floor',
        '4D rumble seating array',
      ],
    },
    highlights: [
      {
        id: `${event.id}-highlight-1`,
        title: 'Skyline Hyperdeck',
        description: 'An elevated transparent runway hovers over the crowd with responsive projections.',
        icon: '🌆',
      },
      {
        id: `${event.id}-highlight-2`,
        title: 'Aerial Drone Choir',
        description: '48 synchronized drones pulse to every beat, drawing neon constellations overhead.',
        icon: '🛸',
      },
    ],
    gallery: [
      {
        id: `${event.id}-gallery-1`,
        src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        alt: `${event.title} holographic runway`,
      },
      {
        id: `${event.id}-gallery-2`,
        src: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=1200&q=80',
        alt: `${event.title} neon crowd`,
      },
    ],
  }),
  'event-2': (event) => ({
    heroImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80',
    longDescription: `${event.artist} is transforming ${event.venue} into a cyber cathedral with levitating LED totems and immersive vapor trails. Expect AI-generated visuals, heat-reactive flooring, and a surround experience that tracks every step.`,
    highlights: [
      {
        id: `${event.id}-highlight-1`,
        title: 'AI Visual Orchestra',
        description: 'Neural networks remix the visuals in real time based on crowd energy.',
        icon: '🤖',
      },
    ],
    venueDetails: {
      address: '88 Lumen Blvd',
      city: 'Los Angeles',
      state: 'CA',
      capacity: 18000,
      amenities: [
        'Immersive infinity tunnel entry',
        'Biometric hydration stations',
        'Reactive mist cannons',
      ],
    },
  }),
  'event-3': (event) => ({
    heroImage: 'https://images.unsplash.com/photo-1465188035480-cf3a60801e4d?auto=format&fit=crop&w=2000&q=80',
    longDescription: `${event.artist} delivers a midnight rave engineered with magnetic bass cannons, synth jungles, and ultraviolet kinetic sculptures suspended across ${event.venue}.`,
    gallery: [
      {
        id: `${event.id}-gallery-1`,
        src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        alt: `${event.title} ultraviolet installations`,
      },
      {
        id: `${event.id}-gallery-2`,
        src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
        alt: `${event.title} kinetic lasers`,
      },
    ],
  }),
}

const mergeCollections = <T extends { id: string }>(
  primary: T[] | undefined,
  fallback: T[],
  limit = fallback.length
): T[] => {
  if (!primary || primary.length === 0) {
    return fallback.slice(0, limit)
  }

  const merged = [...primary]
  const seen = new Set(primary.map((item) => item.id))

  for (const item of fallback) {
    if (merged.length >= limit) {
      break
    }

    if (seen.has(item.id)) {
      continue
    }

    merged.push(item)
    seen.add(item.id)
  }

  return merged.slice(0, limit)
}

const getEventIndex = (eventId: string) => {
  const numeric = parseInt(eventId.replace(/[^0-9]/g, ''), 10)
  return Number.isNaN(numeric) ? 0 : Math.max(numeric - 1, 0)
}

const seededNumber = (seed: string, min: number, max: number) => {
  const normalizedSeed = seed
    .split('')
    .reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0)
  const random = Math.abs(Math.sin(normalizedSeed) * 10000) % 1
  return Math.round(min + random * (max - min))
}

const createTicketTiers = (event: Event): TicketTier[] => {
  const availabilityRatio = event.availableTickets / event.totalTickets

  return ticketTierBlueprints.map((tier, index) => {
    const total = Math.max(20, Math.round(event.totalTickets * tier.capacityRatio))
    const decay = Math.max(0.45, 1 - index * 0.15)
    const remaining = Math.min(
      total,
      Math.max(8, Math.round(total * availabilityRatio * decay))
    )

    return {
      id: `${event.id}-${tier.key}`,
      name: tier.name,
      description: tier.description,
      price: Math.max(25, Math.round(event.price * tier.multiplier)),
      benefits: tier.benefits,
      availability: {
        remaining,
        total,
      },
      accent: tier.accent,
    }
  })
}

const createVenueDetails = (event: Event) => {
  const [cityName, stateCode] = event.city.split(',').map((value) => value.trim())
  const capacity = seededNumber(`${event.id}-capacity`, 8000, 24000)
  const addressNumber = seededNumber(`${event.id}-address`, 100, 999)
  const startIndex = getEventIndex(event.id) % DEFAULT_AMENITIES.length
  const amenities = Array.from({ length: 4 }).map((_, idx) =>
    DEFAULT_AMENITIES[(startIndex + idx) % DEFAULT_AMENITIES.length]
  )

  return {
    address: `${addressNumber} Pulse Avenue`,
    city: cityName ?? event.city,
    state: stateCode ?? '',
    capacity,
    amenities,
  }
}

const createGallery = (event: Event): EventGalleryItem[] => {
  const index = getEventIndex(event.id)
  return Array.from({ length: 4 }).map((_, galleryIndex) => {
    const src = GALLERY_IMAGES[(index + galleryIndex) % GALLERY_IMAGES.length]
    return {
      id: `${event.id}-gallery-${galleryIndex}`,
      src,
      alt: `${event.title} experience shot ${galleryIndex + 1}`,
    }
  })
}

const createHighlights = (event: Event): EventHighlight[] => {
  return HIGHLIGHT_TEMPLATES.map((highlight, index) => ({
    ...highlight,
    id: `${event.id}-highlight-${index}`,
    description: highlight.description.replace('the artist', event.artist),
  }))
}

const createLongDescription = (event: Event) => {
  return `${event.artist} is amplifying ${event.venue} with a futuristic build of kinetic lasers, levitating LED totems, and AI-generated visuals. Expect immersive bass, scent-reactive fog, and a crowd wrapped in neon frequencies from the moment doors open.`
}

const getRelatedEventIds = (event: Event) => {
  return mockEvents
    .filter((candidate) => candidate.id !== event.id && candidate.category === event.category)
    .slice(0, 6)
    .map((candidate) => candidate.id)
}

export const getEventDetail = (eventId: string): EventDetail | null => {
  const event = mockEvents.find((candidate) => candidate.id === eventId)
  if (!event) {
    return null
  }

  const overrideFactory = detailOverrides[eventId]
  const override = overrideFactory ? overrideFactory(event) : undefined
  const fallbackHero = HERO_IMAGES[getEventIndex(event.id) % HERO_IMAGES.length]

  const venueDetails = {
    ...createVenueDetails(event),
    ...(override?.venueDetails ?? {}),
  }

  const fallbackGallery = createGallery(event)
  const fallbackHighlights = createHighlights(event)

  const gallery = mergeCollections(override?.gallery, fallbackGallery, fallbackGallery.length)
  const highlights = mergeCollections(override?.highlights, fallbackHighlights, fallbackHighlights.length)
  const ticketTiers = override?.ticketTiers ?? createTicketTiers(event)

  return {
    ...event,
    heroImage: override?.heroImage ?? fallbackHero ?? event.imageUrl,
    longDescription: override?.longDescription ?? createLongDescription(event),
    venueDetails,
    ticketTiers,
    gallery,
    highlights,
    relatedEventIds: override?.relatedEventIds ?? getRelatedEventIds(event),
  }
}
