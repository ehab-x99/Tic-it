import { Event, EventCategory } from '@/types'

const genres: EventCategory[] = ['rave', 'techno', 'edc', 'edm', 'pop', 'rock', 'hip-hop', 'electronic']

const artists = [
  'The Weeknd',
  'Dua Lipa',
  'David Guetta',
  'Zedd',
  'Marshmello',
  'Calvin Harris',
  'Skrillex',
  'Deadmau5',
  'Tiësto',
  'Diplo',
  'A Great Big World',
  'Arctic Monkeys',
  'Gorillaz',
  'Post Malone',
  'Billie Eilish',
  'The 1975',
]

const venues = [
  'Madison Square Garden',
  'Crypto.com Arena',
  'United Center',
  'American Airlines Center',
  'FedEx Forum',
  'Toyota Center',
  'Wells Fargo Center',
  'Pepsi Center',
  'Barclays Center',
  'Smoothie King Center',
]

const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Dallas, TX',
  'Houston, TX',
  'Denver, CO',
  'Phoenix, AZ',
  'Miami, FL',
  'Boston, MA',
  'Seattle, WA',
]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function generateMockEvents(count: number): Event[] {
  const events: Event[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const daysFromNow = Math.floor(Math.random() * 180) + 1
    const eventDate = new Date(now)
    eventDate.setDate(eventDate.getDate() + daysFromNow)

    const category = getRandomElement(genres)
    const artist = getRandomElement(artists)
    const venue = getRandomElement(venues)
    const city = getRandomElement(cities)
    const price = Math.floor(Math.random() * 200) + 25

    const event: Event = {
      id: `event-${i + 1}`,
      title: `${artist} Live Concert`,
      artist,
      venue,
      city,
      date: eventDate,
      price,
      description: `Experience an unforgettable night with ${artist} performing live. This is a once-in-a-lifetime opportunity to see one of the biggest artists in the industry perform their greatest hits and newest tracks.`,
      imageUrl: `https://picsum.photos/600/400?random=${i}`,
      availableTickets: Math.floor(Math.random() * 500) + 50,
      totalTickets: 1000,
      category,
      tags: [category, city.split(',')[0], 'music'],
      status: 'upcoming',
    }

    events.push(event)
  }

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export const mockEvents = generateMockEvents(24)
