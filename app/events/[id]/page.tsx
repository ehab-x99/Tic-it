'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/layout/Navigation'
import { getEventDetail } from '@/lib/eventDetails'
import { mockEvents } from '@/lib/mockData'
import {
  Event,
  EventGalleryItem,
  EventHighlight,
  TicketTier,
  TicketTierAccent,
} from '@/types'
import { cn, formatCurrency, formatDate } from '@/lib/utils'

interface EventDetailPageProps {
  params: {
    id: string
  }
}

const CARD_REVEAL_OPTIONS: IntersectionObserverInit = {
  threshold: 0.25,
  rootMargin: '0px 0px -60px 0px',
}

const HIGHLIGHT_REVEAL_OPTIONS: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px',
}

const GALLERY_REVEAL_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px',
}

const ACCENT_BACKGROUNDS: Record<TicketTierAccent, string> = {
  pink: 'from-cyber-pink/20 via-transparent to-transparent',
  blue: 'from-cyber-blue/20 via-transparent to-transparent',
  green: 'from-cyber-green/20 via-transparent to-transparent',
  purple: 'from-cyber-purple/20 via-transparent to-transparent',
  amber: 'from-cyber-orange/30 via-transparent to-transparent',
}

const ACCENT_RING: Record<TicketTierAccent, string> = {
  pink: 'border-cyber-pink/60 text-cyber-pink',
  blue: 'border-cyber-blue/60 text-cyber-blue',
  green: 'border-cyber-green/60 text-cyber-green',
  purple: 'border-cyber-purple/60 text-cyber-purple',
  amber: 'border-cyber-orange/60 text-cyber-orange',
}

const useScrollReveal = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      })
    }, options)

    observer.observe(node)

    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible }
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const detail = useMemo(() => getEventDetail(params.id), [params.id])
  const [parallaxOffset, setParallaxOffset] = useState(0)

  useEffect(() => {
    if (!detail) return

    let ticking = false
    const update = () => {
      setParallaxOffset(window.scrollY * 0.3)
      ticking = false
    }
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [detail])

  const relatedEvents = useMemo(() => {
    if (!detail) return []

    const explicitMatches = detail.relatedEventIds
      .map((relatedId) => mockEvents.find((event) => event.id === relatedId))
      .filter((event): event is Event => Boolean(event))

    if (explicitMatches.length >= 4) {
      return explicitMatches
    }

    const fallback = mockEvents
      .filter((event) => event.id !== detail.id && event.category === detail.category)
      .filter((event) => !detail.relatedEventIds.includes(event.id))
      .slice(0, 6 - explicitMatches.length)

    return [...explicitMatches, ...fallback]
  }, [detail])

  if (!detail) {
    return (
      <div className="min-h-screen bg-dark-950 text-gray-100">
        <Navigation />
        <div className="flex flex-col items-center justify-center text-center py-32 px-6">
          <p className="text-cyber-pink font-cyber tracking-[0.4em] uppercase mb-4">Event Offline</p>
          <h1 className="text-4xl font-cyber mb-4">We couldn't locate that event frequency.</h1>
          <p className="text-gray-400 mb-8 max-w-2xl">
            The link may be outdated or the show has already wrapped. Browse all live experiences and jump back into the neon stream.
          </p>
          <Link
            href="/events"
            className="px-6 py-3 bg-gradient-to-r from-cyber-pink to-cyber-blue rounded-lg font-cyber text-sm tracking-[0.3em] uppercase"
          >
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const availabilityPercent = Math.round((detail.availableTickets / detail.totalTickets) * 100)

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100">
      <Navigation />

      <main className="relative">
        <section className="relative h-[70vh] min-h-[540px] overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
            >
              <Image
                src={detail.heroImage}
                alt={detail.title}
                fill
                className="object-cover scale-105"
                priority
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/20 via-dark-950/70 to-dark-950"></div>
          </div>

          <div className="relative z-10 h-full">
            <div className="max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-20">
              <p className="text-sm uppercase tracking-[0.6em] text-cyber-blue/80 mb-6">Live Frequency</p>
              <h1 className="text-4xl md:text-6xl font-cyber text-white mb-6 animate-glow">
                {detail.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-gray-200">
                <InfoPill label="Artist" value={detail.artist} />
                <InfoPill label="Date" value={formatDate(new Date(detail.date))} />
                <InfoPill label="Location" value={detail.city} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                <StatCard label="Venue" value={detail.venue} />
                <StatCard label="Status" value={detail.status.toUpperCase()} />
                <StatCard label="Availability" value={`${availabilityPercent}% Remaining`} />
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="#tickets"
                  className="px-6 py-3 bg-gradient-to-r from-cyber-pink to-cyber-blue rounded-lg font-cyber text-sm tracking-[0.3em] uppercase shadow-cyber hover:scale-105 transition"
                >
                  Select Tickets
                </Link>
                <Link
                  href="/events"
                  className="px-6 py-3 border border-white/30 rounded-lg font-cyber text-sm tracking-[0.3em] uppercase hover:border-cyber-blue transition"
                >
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-16 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="cyber-card p-8 grid grid-cols-1 lg:grid-cols-[1.8fr,1fr] gap-10">
              <div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {detail.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-cyber tracking-[0.3em] uppercase border border-white/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-lg text-gray-200 leading-relaxed mb-6">
                  {detail.longDescription}
                </p>

                <div>
                  <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-2">Ticket Flow</p>
                  <div className="w-full h-2 rounded-full bg-dark-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-pink via-cyber-blue to-cyber-purple"
                      style={{ width: `${availabilityPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {detail.availableTickets} of {detail.totalTickets} tickets remain in circulation.
                  </p>
                </div>
              </div>

              <div className="bg-dark-900/80 border border-cyber-blue/20 rounded-xl p-6 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-2">Venue</p>
                  <h3 className="text-2xl font-cyber text-white">{detail.venue}</h3>
                  <p className="text-gray-400">{detail.venueDetails.address}</p>
                  <p className="text-gray-400">
                    {detail.venueDetails.city}
                    {detail.venueDetails.state ? `, ${detail.venueDetails.state}` : ''}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Capacity</p>
                    <p className="text-3xl font-cyber text-neon">{detail.venueDetails.capacity.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.4em] text-gray-500">City</p>
                    <p className="text-lg font-cyber text-white">{detail.city}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {detail.venueDetails.amenities.map((amenity) => (
                      <span key={amenity} className="px-3 py-1 rounded-full bg-dark-800 text-xs text-gray-300">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 rounded-lg border border-cyber-blue/40 text-sm font-cyber tracking-[0.3em] uppercase hover:border-cyber-pink transition">
                  View Venue Map
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="tickets" className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-2">Ticket Matrix</p>
              <h2 className="text-3xl font-cyber text-white">Choose your experience</h2>
            </div>
            <span className="text-sm text-gray-400">Scroll for tiers · dynamic pricing active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {detail.ticketTiers.map((tier, index) => (
              <TicketTierCard key={tier.id} tier={tier} index={index} />
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-2">Immersive Highlights</p>
              <h2 className="text-3xl font-cyber text-white">What to expect</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detail.highlights.map((highlight, index) => (
              <HighlightCard key={highlight.id} highlight={highlight} index={index} />
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-2">Event Gallery</p>
              <h2 className="text-3xl font-cyber text-white">Moments from the build</h2>
            </div>
            <span className="text-sm text-gray-400">Swipe through the neon grid</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {detail.gallery.map((item, index) => (
              <GalleryTile key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {relatedEvents.length > 0 && (
          <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-2">Related Signals</p>
                <h2 className="text-3xl font-cyber text-white">You might also like</h2>
              </div>
              <Link href="/events" className="text-sm text-cyber-blue hover:text-cyber-pink transition">
                View all events →
              </Link>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 min-w-max pb-4">
                {relatedEvents.map((event) => (
                  <RelatedEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

const TicketTierCard = ({ tier, index }: { tier: TicketTier; index: number }) => {
  const { ref, isVisible } = useScrollReveal(CARD_REVEAL_OPTIONS)
  const accent = tier.accent ?? 'blue'
  const progress = Math.min(
    100,
    Math.round((tier.availability.remaining / tier.availability.total) * 100)
  )

  return (
    <div
      ref={ref}
      className={cn(
        'cyber-card relative overflow-hidden p-6 flex flex-col h-full transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none', ACCENT_BACKGROUNDS[accent])}></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-gray-500">Tier</p>
            <h3 className="text-2xl font-cyber text-white">{tier.name}</h3>
          </div>
          <span className={cn('px-3 py-1 rounded-full text-xs font-cyber border uppercase tracking-[0.3em]', ACCENT_RING[accent])}>
            {accent}
          </span>
        </div>

        <p className="text-gray-200 text-sm mb-4 flex-1">{tier.description}</p>

        <p className="text-4xl font-cyber text-neon mb-2">{formatCurrency(tier.price)}</p>
        <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4">Per access</p>

        <ul className="space-y-2 text-sm text-gray-200 mb-6">
          {tier.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <span className="text-cyber-blue mt-0.5">✦</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>{tier.availability.remaining} left</span>
            <span>{tier.availability.total} total</span>
          </div>
          <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-pink via-cyber-blue to-cyber-purple transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 group relative overflow-hidden rounded-lg border border-cyber-blue/40 py-3 font-cyber text-xs tracking-[0.4em] uppercase"
        >
          <span className="relative z-10">Select Ticket</span>
          <span className="absolute inset-0 bg-gradient-to-r from-cyber-pink to-cyber-blue opacity-0 group-hover:opacity-100 transition" />
          <span className="absolute inset-0 blur-xl bg-cyber-pink/30 opacity-0 group-hover:opacity-80 transition" />
        </button>
      </div>
    </div>
  )
}

const HighlightCard = ({ highlight, index }: { highlight: EventHighlight; index: number }) => {
  const { ref, isVisible } = useScrollReveal(HIGHLIGHT_REVEAL_OPTIONS)

  return (
    <div
      ref={ref}
      className={cn(
        'cyber-card p-6 flex gap-4 items-start transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-cyber-blue/10 flex items-center justify-center text-2xl">
        {highlight.icon}
      </div>
      <div>
        <h3 className="text-xl font-cyber text-white mb-2">{highlight.title}</h3>
        <p className="text-gray-300 text-sm">{highlight.description}</p>
      </div>
    </div>
  )
}

const GalleryTile = ({ item, index }: { item: EventGalleryItem; index: number }) => {
  const { ref, isVisible } = useScrollReveal(GALLERY_REVEAL_OPTIONS)

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 group min-h-[220px] transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-70 group-hover:opacity-40 transition" />
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-xs uppercase tracking-[0.4em] text-gray-400">Gallery</p>
        <p className="text-lg font-cyber">{item.alt}</p>
      </div>
    </div>
  )
}

const RelatedEventCard = ({ event }: { event: Event }) => (
  <Link
    href={`/events/${event.id}`}
    className="min-w-[280px] w-[280px] cyber-card overflow-hidden hover:shadow-cyber transition hover:-translate-y-1"
  >
    <div className="relative h-40 overflow-hidden">
      <Image
        src={event.imageUrl}
        alt={event.title}
        fill
        className="object-cover hover:scale-105 transition-transform duration-500"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
      <span className="absolute top-3 right-3 px-3 py-1 text-xs font-cyber rounded-full bg-dark-900/80 border border-white/20">
        {event.category.toUpperCase()}
      </span>
    </div>
    <div className="p-4 space-y-2">
      <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
        {formatDate(new Date(event.date))}
      </p>
      <h3 className="text-lg font-cyber text-white line-clamp-1">{event.title}</h3>
      <p className="text-sm text-gray-400">{event.city}</p>
      <p className="text-2xl font-cyber text-neon">{formatCurrency(event.price)}</p>
    </div>
  </Link>
)

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-dark-900/70 backdrop-blur border border-white/10 rounded-xl p-4">
    <p className="text-xs uppercase tracking-[0.4em] text-gray-500">{label}</p>
    <p className="text-xl font-cyber text-white mt-2">{value}</p>
  </div>
)

const InfoPill = ({ label, value }: { label: string; value: string }) => (
  <div className="px-4 py-2 rounded-full bg-dark-900/60 border border-white/20">
    <p className="text-xs uppercase tracking-[0.4em] text-gray-500">{label}</p>
    <p className="text-sm font-cyber text-white">{value}</p>
  </div>
)
