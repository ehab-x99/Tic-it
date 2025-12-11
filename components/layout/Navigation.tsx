'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon?: React.ReactNode
}

const navItems: NavItem[] = [
  { href: '/events', label: 'Events' },
  { href: '/artists', label: 'Artists' },
  { href: '/venues', label: 'Venues' },
  { href: '/my-tickets', label: 'My Tickets' }
]

const iconItems = [
  { href: '/search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { href: '/profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
]

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Detect scroll direction and hide/show nav
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Scrolling down
      } else {
        setIsVisible(true) // Scrolling up
      }
      
      // Background opacity based on scroll
      setScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const NavLink = ({ href, children, icon, isMobile = false }: { href: string; children: React.ReactNode; icon?: React.ReactNode; isMobile?: boolean }) => (
    <Link 
      href={href}
      className={cn(
        'relative group font-futura font-medium transition-all duration-300',
        'hover:text-cyber-blue hover:scale-105',
        'focus:outline-none focus:ring-2 focus:ring-cyber-blue rounded-md',
        isMobile ? 'px-3 py-2' : 'px-3 py-2'
      )}
    >
      <span className="relative z-10 flex items-center space-x-2">
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{children}</span>
      </span>
      
      {/* Hover effect background */}
      <div className={cn(
        'absolute inset-0 bg-cyber-blue/10 rounded-md transition-all duration-300',
        'scale-x-0 group-hover:scale-x-100 origin-left'
      )} />
      
      {/* Bottom line effect */}
      <div className={cn(
        'absolute -bottom-1 left-0 w-full h-0.5 bg-cyber-blue transform transition-all duration-300',
        'scale-x-0 group-hover:scale-x-100 origin-center'
      )} />
    </Link>
  )

  const IconButton = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
    <Link 
      href={href}
      className={cn(
        'relative group p-2 text-gray-300 hover:text-cyber-blue transition-all duration-300',
        'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyber-blue rounded-md',
        'gpu-accelerated'
      )}
      aria-label={label}
    >
      <svg 
        className="w-5 h-5 transition-all duration-300 group-hover:rotate-12" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      
      {/* Pulse effect on hover */}
      <div className="absolute inset-0 rounded-full bg-cyber-blue/20 scale-0 group-hover:scale-150 transition-all duration-300 opacity-0 group-hover:opacity-100" />
    </Link>
  )

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
      'backdrop-blur-md border-b border-cyber-blue/20 gpu-accelerated',
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
      scrolled 
        ? 'bg-dark-950/95 shadow-lg shadow-cyber-blue/10' 
        : 'bg-dark-950/90'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
          >
            <div className={cn(
              'text-2xl font-cyber font-bold text-neon transition-all duration-300',
              'group-hover:animate-glow-pulse'
            )}>
              TIC IT
            </div>
            
            {/* Logo animation dots */}
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-cyber-blue rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="w-1 h-1 bg-cyber-pink rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-cyber-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <div 
                key={item.href}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <NavLink href={item.href}>
                  {item.label}
                </NavLink>
              </div>
            ))}
            
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-cyber-blue/20">
              {iconItems.map((item, index) => (
                <div 
                  key={item.href}
                  className="animate-fade-in"
                  style={{ animationDelay: `${(navItems.length + index) * 0.1}s` }}
                >
                  <IconButton 
                    href={item.href} 
                    icon={item.icon} 
                    label={item.label} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={cn(
                'relative p-2 text-gray-300 hover:text-cyber-blue transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-cyber-blue rounded-md',
                'gpu-accelerated hover:scale-110',
                isMenuOpen && 'rotate-90'
              )}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"
                  } 
                />
              </svg>
              
              {/* Button pulse effect */}
              <div className="absolute inset-0 rounded-full bg-cyber-blue/20 scale-0 transition-all duration-300 hover:scale-125" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          'md:hidden overflow-hidden transition-all duration-500 ease-out',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-900/95 border-t border-cyber-blue/20 backdrop-blur-sm">
            {navItems.map((item, index) => (
              <div 
                key={item.href}
                className={cn(
                  'transition-all duration-300',
                  isMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-4 opacity-0'
                )}
                style={{ 
                  transitionDelay: isMenuOpen ? `${index * 0.1}s` : '0s' 
                }}
              >
                <NavLink 
                  href={item.href} 
                  isMobile
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </div>
            ))}
            
            <div className={cn(
              'flex items-center space-x-4 px-3 py-2 pt-4 border-t border-cyber-blue/20 mt-4',
              'transition-all duration-300',
              isMenuOpen 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-4 opacity-0'
            )}
            style={{ 
              transitionDelay: isMenuOpen ? `${navItems.length * 0.1}s` : '0s' 
            }}>
              {iconItems.map((item) => (
                <IconButton 
                  key={item.href}
                  href={item.href} 
                  icon={item.icon} 
                  label={item.label}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
