'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-md border-b border-cyber-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-cyber font-bold text-neon animate-glow">
              TIC IT
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/events" 
              className="text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-futura font-medium"
            >
              Events
            </Link>
            <Link 
              href="/artists" 
              className="text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-futura font-medium"
            >
              Artists
            </Link>
            <Link 
              href="/venues" 
              className="text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-futura font-medium"
            >
              Venues
            </Link>
            <Link 
              href="/my-tickets" 
              className="text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-futura font-medium"
            >
              My Tickets
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/search" 
                className="text-gray-300 hover:text-cyber-blue transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-300 hover:text-cyber-blue transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-cyber-blue transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyber-blue"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-900/95 border-t border-cyber-blue/20">
              <Link 
                href="/events" 
                className="block px-3 py-2 text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-futura font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/artists" 
                className="block px-3 py-2 text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-futura font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </Link>
              <Link 
                href="/venues" 
                className="block px-3 py-2 text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-futura font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Venues
              </Link>
              <Link 
                href="/my-tickets" 
                className="block px-3 py-2 text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-futura font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                My Tickets
              </Link>
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link 
                  href="/search" 
                  className="text-gray-300 hover:text-cyber-blue transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link 
                  href="/profile" 
                  className="text-gray-300 hover:text-cyber-blue transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
