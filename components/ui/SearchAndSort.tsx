'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export type SortOption = 'date' | 'price-asc' | 'price-desc' | 'popularity'
export type ViewMode = 'grid' | 'list'

interface SearchAndSortProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="space-y-6 mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for artists, events, venues..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-5 py-3 bg-dark-900 border-2 border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyber-blue transition-colors duration-300 font-futura"
        />
        <svg
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1">
          <label className="block text-sm font-cyber font-semibold text-gray-400 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-3 bg-dark-900 border-2 border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-cyber-blue transition-colors duration-300 font-futura cursor-pointer"
          >
            <option value="date">Earliest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-sm font-cyber font-semibold text-gray-400">View</span>
          <button
            onClick={() => onViewModeChange('grid')}
            className={cn(
              'p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-110',
              viewMode === 'grid'
                ? 'border-cyber-blue bg-cyber-blue/20 text-cyber-blue'
                : 'border-gray-600 text-gray-400 hover:border-cyber-blue'
            )}
            title="Grid view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={cn(
              'p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-110',
              viewMode === 'list'
                ? 'border-cyber-blue bg-cyber-blue/20 text-cyber-blue'
                : 'border-gray-600 text-gray-400 hover:border-cyber-blue'
            )}
            title="List view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
