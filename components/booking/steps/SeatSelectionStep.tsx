import React, { useState, useEffect } from 'react'
import { useBooking } from '@/lib/bookingContext'
import { Seat, SeatZone } from '@/types'
import { formatCurrency, cn } from '@/lib/utils'

// Mock seat data - in a real app this would come from an API
const generateSeatMap = (venueCapacity: number): SeatZone[] => {
  const zones: SeatZone[] = [
    {
      id: 'vip',
      name: 'VIP Pods',
      color: '#ec4899',
      minPrice: 150,
      maxPrice: 250,
      seats: []
    },
    {
      id: 'premium',
      name: 'Premium Front',
      color: '#3b82f6',
      minPrice: 100,
      maxPrice: 150,
      seats: []
    },
    {
      id: 'general',
      name: 'General Admission',
      color: '#10b981',
      minPrice: 50,
      maxPrice: 100,
      seats: []
    },
    {
      id: 'balcony',
      name: 'Balcony View',
      color: '#8b5cf6',
      minPrice: 75,
      maxPrice: 125,
      seats: []
    }
  ]

  // Generate seats for each zone
  zones.forEach(zone => {
    const seatCount = Math.floor(venueCapacity * (zone.id === 'vip' ? 0.1 : zone.id === 'premium' ? 0.2 : zone.id === 'general' ? 0.5 : 0.2))
    
    for (let row = 1; row <= Math.ceil(seatCount / 20); row++) {
      for (let seat = 1; seat <= Math.min(20, seatCount - (row - 1) * 20); seat++) {
        zone.seats.push({
          id: `${zone.id}-${row}-${seat}`,
          row: `${String.fromCharCode(64 + row)}`,
          number: seat.toString(),
          section: zone.name,
          status: Math.random() > 0.7 ? 'unavailable' : 'available',
          price: Math.floor(Math.random() * (zone.maxPrice - zone.minPrice)) + zone.minPrice,
          x: seat * 20,
          y: row * 20
        })
      }
    }
  })

  return zones
}

export const SeatSelectionStep: React.FC = () => {
  const { quantity, seating, setSeating } = useBooking()
  const [seatZones, setSeatZones] = useState<SeatZone[]>([])
  const [selectedZone, setSelectedZone] = useState<string>('general')
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (quantity && quantity.selectedTickets > 0) {
      // Generate seat map based on venue capacity
      const venueCapacity = 20000 // This would come from event details
      const zones = generateSeatMap(venueCapacity)
      setSeatZones(zones)
    }
  }, [quantity])

  useEffect(() => {
    if (seating) {
      setSelectedSeats(new Set(seating.seatIds))
    }
  }, [seating])

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'unavailable') return

    const newSelectedSeats = new Set(selectedSeats)
    
    if (selectedSeats.has(seat.id)) {
      newSelectedSeats.delete(seat.id)
    } else {
      if (selectedSeats.size < (quantity?.selectedTickets || 1)) {
        newSelectedSeats.add(seat.id)
      }
    }
    
    setSelectedSeats(newSelectedSeats)
  }

  const handleConfirmSelection = () => {
    if (selectedSeats.size > 0) {
      setSeating({
        seatIds: Array.from(selectedSeats),
        section: seatZones.find(z => z.id === selectedZone)?.name
      })
    } else {
      // Allow proceeding without seat selection (GA tickets)
      setSeating({
        seatIds: [],
        section: 'General Admission'
      })
    }
  }

  const currentZone = seatZones.find(z => z.id === selectedZone)
  const selectedSeatsList = Array.from(selectedSeats)
  const availableSeatCount = currentZone?.seats.filter(s => s.status === 'available').length || 0

  if (!quantity) {
    return (
      <div className="text-center py-12">
        <p className="text-cyber-pink">Please select ticket quantity first</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-cyber text-white mb-2">Choose Your Seats</h2>
        <p className="text-gray-400">
          Select {quantity.selectedTickets} seat{quantity.selectedTickets > 1 ? 's' : ''} for the best experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Zone Selection Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-cyber text-white uppercase tracking-[0.3em] mb-4">Select Zone</h3>
          {seatZones.map(zone => {
            const availableSeats = zone.seats.filter(s => s.status === 'available').length
            const isSelected = selectedZone === zone.id
            
            return (
              <div
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={cn(
                  'p-4 rounded-lg border-2 cursor-pointer transition-all duration-300',
                  isSelected
                    ? 'border-cyber-pink bg-cyber-pink/10'
                    : 'border-white/20 hover:border-white/40'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-cyber text-white text-sm">{zone.name}</h4>
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: zone.color, borderColor: zone.color }}
                  />
                </div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>{formatCurrency(zone.minPrice)} - {formatCurrency(zone.maxPrice)}</div>
                  <div>{availableSeats} seats available</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Seat Map */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stage */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-cyber-pink to-cyber-blue px-8 py-3 rounded-lg">
              <span className="text-white font-cyber text-lg tracking-[0.3em] uppercase">Stage</span>
            </div>
          </div>

          {/* Seat Grid */}
          {currentZone && (
            <div className="bg-dark-900/50 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-cyber text-white">{currentZone.name}</h4>
                <div className="text-sm text-gray-400">
                  Selected: {selectedSeats.size} / {quantity.selectedTickets}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg border border-white/10">
                {/* Seat Map Grid */}
                <div className="grid gap-1 p-4 max-w-4xl" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(24px, 1fr))' }}>
                  {currentZone.seats.map((seat) => (
                    <button
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      disabled={seat.status === 'unavailable'}
                      className={cn(
                        'w-6 h-6 text-xs font-cyber rounded-sm transition-all duration-200 border',
                        selectedSeats.has(seat.id) && 'border-cyber-pink bg-cyber-pink/30 text-white',
                        !selectedSeats.has(seat.id) && seat.status === 'available' && 'border-gray-600 text-gray-400 hover:border-cyber-blue hover:bg-cyber-blue/20',
                        seat.status === 'unavailable' && 'border-gray-800 text-gray-800 bg-gray-800 cursor-not-allowed'
                      )}
                      title={`Row ${seat.row}, Seat ${seat.number} - ${formatCurrency(seat.price)}`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>

                {/* Seat Map Legend */}
                <div className="flex items-center justify-center space-x-6 py-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-gray-600 bg-transparent rounded-sm"></div>
                    <span className="text-xs text-gray-400">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-cyber-pink bg-cyber-pink/30 rounded-sm"></div>
                    <span className="text-xs text-gray-400">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border border-gray-800 bg-gray-800 rounded-sm"></div>
                    <span className="text-xs text-gray-400">Unavailable</span>
                  </div>
                </div>
              </div>

              {/* Selected Seats Summary */}
              {selectedSeatsList.length > 0 && (
                <div className="mt-4 p-4 bg-cyber-pink/10 border border-cyber-pink/20 rounded-lg">
                  <h5 className="text-sm font-cyber text-white mb-2 uppercase tracking-[0.3em]">Selected Seats</h5>
                  <div className="text-xs text-gray-300 space-y-1">
                    {selectedSeatsList.map(seatId => {
                      const seat = currentZone.seats.find(s => s.id === seatId)
                      return seat ? (
                        <div key={seatId} className="flex justify-between">
                          <span>Row {seat.row}, Seat {seat.number}</span>
                          <span>{formatCurrency(seat.price)}</span>
                        </div>
                      ) : null
                    })}
                    <div className="border-t border-cyber-pink/20 pt-2 mt-2">
                      <div className="flex justify-between font-cyber text-white">
                        <span>Total</span>
                        <span>
                          {formatCurrency(
                            selectedSeatsList.reduce((total, seatId) => {
                              const seat = currentZone.seats.find(s => s.id === seatId)
                              return total + (seat?.price || 0)
                            }, 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleConfirmSelection}
          disabled={selectedSeats.size === 0 && selectedZone !== 'general'}
          className={cn(
            'px-8 py-4 rounded-lg font-cyber text-sm tracking-[0.3em] uppercase transition-all duration-300',
            selectedSeats.size > 0 || selectedZone === 'general'
              ? 'bg-cyber-pink text-white hover:bg-cyber-pink/80 hover:scale-105'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          )}
        >
          {selectedSeats.size > 0 ? 'Confirm Seats' : 'Skip Seating'}
        </button>
      </div>
    </div>
  )
}