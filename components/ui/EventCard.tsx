'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Event } from '@/types'
import { formatDate, formatCurrency, cn } from '@/lib/utils'

interface EventCardProps {
  event: Event
  viewMode?: 'grid' | 'list'
}

export const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  ({ event, viewMode = 'grid' }, ref) => {
    const availabilityPercentage = (event.availableTickets / event.totalTickets) * 100

    if (viewMode === 'list') {
      return (
        <div
          ref={ref}
          className="cyber-card p-6 flex gap-6 transition-all duration-300 hover:border-cyber-blue/50 hover:shadow-cyber"
        >
          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/20 to-cyber-blue/20 z-10"></div>
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>

          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-cyber font-semibold text-cyber-blue mb-1">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{event.artist}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-cyber font-semibold bg-cyber-pink/20 text-cyber-pink whitespace-nowrap">
                  {event.category.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1 4.5 4.5 0 11-4.814 6.98z" />
                  </svg>
                  <span>{formatDate(new Date(event.date))}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L9.9 13.95a.75.75 0 01-1.06-1.06l5.159-5.159a5.5 5.5 0 00-7.778-7.778l-2.171 2.171A.75.75 0 014.05 4.05z" clipRule="evenodd" />
                  </svg>
                  <span>{event.venue}</span>
                </div>
              </div>

              <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-pink to-cyber-blue transition-all duration-500"
                  style={{ width: `${availabilityPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {event.availableTickets} of {event.totalTickets} tickets available
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <div className="text-right">
              <p className="text-2xl font-cyber font-bold text-neon">
                {formatCurrency(event.price)}
              </p>
              <p className="text-xs text-gray-400">per ticket</p>
            </div>
            <Link
              href={`/events/${event.id}`}
              className="px-6 py-2 bg-gradient-to-r from-cyber-pink to-cyber-blue text-white font-cyber font-semibold rounded-lg hover:shadow-cyber transition-all duration-300 hover:scale-105"
            >
              Book Now
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className="cyber-card overflow-hidden h-full transition-all duration-300 hover:border-cyber-blue/50 hover:shadow-cyber hover:scale-105"
      >
        <div className="relative h-48 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/30 to-cyber-blue/30 z-10 group-hover:from-cyber-pink/50 group-hover:to-cyber-blue/50 transition-all duration-300"></div>
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute top-3 right-3 z-20 inline-flex items-center px-3 py-1 rounded-full text-xs font-cyber font-semibold bg-cyber-pink/90 text-white backdrop-blur-sm">
            {event.category.toUpperCase()}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-cyber font-semibold text-cyber-blue mb-1 line-clamp-1">
            {event.title}
          </h3>
          <p className="text-sm text-gray-400 mb-3">{event.artist}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1 4.5 4.5 0 11-4.814 6.98z" />
              </svg>
              <span>{formatDate(new Date(event.date))}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400 line-clamp-1">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L9.9 13.95a.75.75 0 01-1.06-1.06l5.159-5.159a5.5 5.5 0 00-7.778-7.778l-2.171 2.171A.75.75 0 014.05 4.05z" clipRule="evenodd" />
              </svg>
              <span>{event.venue}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="w-full bg-dark-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyber-pink to-cyber-blue transition-all duration-500"
                style={{ width: `${availabilityPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {event.availableTickets} tickets left
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-cyber font-bold text-neon">
              {formatCurrency(event.price)}
            </p>
            <Link
              href={`/events/${event.id}`}
              className="px-4 py-2 bg-gradient-to-r from-cyber-pink to-cyber-blue text-white font-cyber font-semibold text-sm rounded-lg hover:shadow-cyber transition-all duration-300 hover:scale-105"
            >
              Book
            </Link>
          </div>
        </div>
      </div>
    )
  }
)

EventCard.displayName = 'EventCard'
