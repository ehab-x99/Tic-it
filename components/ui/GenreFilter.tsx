'use client'

import React from 'react'
import { EventCategory } from '@/types'
import { cn } from '@/lib/utils'

interface GenreFilterProps {
  selectedGenres: EventCategory[]
  onGenreChange: (genres: EventCategory[]) => void
}

const GENRES: { label: string; value: EventCategory }[] = [
  { label: 'Rave', value: 'rave' },
  { label: 'Techno', value: 'techno' },
  { label: 'EDC', value: 'edc' },
  { label: 'EDM', value: 'edm' },
  { label: 'Pop', value: 'pop' },
  { label: 'Rock', value: 'rock' },
  { label: 'Hip-Hop', value: 'hip-hop' },
  { label: 'Electronic', value: 'electronic' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Classical', value: 'classical' },
  { label: 'Country', value: 'country' },
  { label: 'Alternative', value: 'alternative' },
  { label: 'Indie', value: 'indie' },
  { label: 'Metal', value: 'metal' },
]

export const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenres, onGenreChange }) => {
  const handleGenreClick = (genre: EventCategory) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre]
    onGenreChange(newGenres)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-cyber font-semibold text-cyber-blue">
        Genres
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3">
        {GENRES.map((genre) => (
          <button
            key={genre.value}
            onClick={() => handleGenreClick(genre.value)}
            className={cn(
              'px-4 py-3 rounded-lg font-cyber font-semibold text-sm transition-all duration-300 transform hover:scale-105',
              selectedGenres.includes(genre.value)
                ? 'bg-gradient-to-r from-cyber-pink to-cyber-blue text-white shadow-cyber'
                : 'border-2 border-gray-600 text-gray-300 hover:border-cyber-blue hover:text-cyber-blue'
            )}
          >
            {genre.label}
          </button>
        ))}
      </div>
    </div>
  )
}
