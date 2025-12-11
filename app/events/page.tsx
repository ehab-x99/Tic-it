'use client'

import { useState, useMemo } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { EventCard } from '@/components/ui/EventCard'
import { GenreFilter } from '@/components/ui/GenreFilter'
import { SearchAndSort, SortOption, ViewMode } from '@/components/ui/SearchAndSort'
import { mockEvents } from '@/lib/mockData'
import { Event, EventCategory } from '@/types'
import { debounce } from '@/lib/utils'

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<EventCategory[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  const debouncedSearch = useMemo(
    () => debounce((query: string) => setSearchQuery(query), 300),
    []
  )

  const filteredAndSortedEvents = useMemo(() => {
    let events = [...mockEvents]

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase()
      events = events.filter(
        (event) =>
          event.title.toLowerCase().includes(lowerQuery) ||
          event.artist.toLowerCase().includes(lowerQuery) ||
          event.venue.toLowerCase().includes(lowerQuery)
      )
    }

    if (selectedGenres.length > 0) {
      events = events.filter((event) => selectedGenres.includes(event.category))
    }

    events.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'popularity':
          return (
            (b.totalTickets - b.availableTickets) -
            (a.totalTickets - a.availableTickets)
          )
        default:
          return 0
      }
    })

    return events
  }, [searchQuery, selectedGenres, sortBy])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-cyber font-bold text-neon mb-4 animate-glow">
              Discover Events
            </h1>
            <p className="text-lg text-gray-400">
              Find and book tickets for the hottest concerts and events
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <GenreFilter
                  selectedGenres={selectedGenres}
                  onGenreChange={setSelectedGenres}
                />

                {selectedGenres.length > 0 && (
                  <button
                    onClick={() => setSelectedGenres([])}
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-600 rounded-lg text-gray-300 hover:border-cyber-blue hover:text-cyber-blue transition-colors duration-300 text-sm font-cyber font-semibold"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </aside>

            <main className="lg:col-span-3">
              <SearchAndSort
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />

              {filteredAndSortedEvents.length === 0 ? (
                <div className="text-center py-20">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-400 text-lg mb-2">No events found</p>
                  <p className="text-gray-500 text-sm mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedGenres([])
                      setSortBy('date')
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-cyber-pink to-cyber-blue text-white font-cyber font-semibold rounded-lg hover:shadow-cyber transition-all duration-300"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className={viewMode === 'grid' ? 'hidden' : 'block'}>
                    <div className="space-y-4">
                      {filteredAndSortedEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          viewMode="list"
                        />
                      ))}
                    </div>
                  </div>

                  <div className={viewMode === 'list' ? 'hidden' : 'block'}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredAndSortedEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          viewMode="grid"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 text-center text-gray-500">
                    <p>
                      Showing {filteredAndSortedEvents.length} of {mockEvents.length} events
                    </p>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      <footer className="py-12 px-4 border-t border-cyber-blue/20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-cyber font-bold mb-4 text-neon">TIC IT</h3>
          <p className="text-gray-400 mb-6">The future of concert ticketing</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
