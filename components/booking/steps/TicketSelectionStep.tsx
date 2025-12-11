import React from 'react'
import { useBooking } from '@/lib/bookingContext'
import { TicketTier } from '@/types'
import { formatCurrency, cn } from '@/lib/utils'

interface TicketSelectionStepProps {
  ticketTiers: TicketTier[]
}

export const TicketSelectionStep: React.FC<TicketSelectionStepProps> = ({ ticketTiers }) => {
  const { selection, setSelection, errors } = useBooking()

  const ACCENT_BACKGROUNDS = {
    pink: 'from-cyber-pink/20 via-transparent to-transparent',
    blue: 'from-cyber-blue/20 via-transparent to-transparent',
    green: 'from-cyber-green/20 via-transparent to-transparent',
    purple: 'from-cyber-purple/20 via-transparent to-transparent',
    amber: 'from-cyber-orange/30 via-transparent to-transparent',
  }

  const ACCENT_RING = {
    pink: 'border-cyber-pink/60 text-cyber-pink',
    blue: 'border-cyber-blue/60 text-cyber-blue',
    green: 'border-cyber-green/60 text-cyber-green',
    purple: 'border-cyber-purple/60 text-cyber-purple',
    amber: 'border-cyber-orange/60 text-cyber-orange',
  }

  const handleSelection = (tier: TicketTier) => {
    setSelection({
      tierId: tier.id,
      tierName: tier.name,
      price: tier.price,
      accent: tier.accent,
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cyber text-white mb-2">Choose Your Experience</h2>
        <p className="text-gray-400">Select the ticket tier that matches your desired experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {ticketTiers.map((tier) => {
          const isSelected = selection?.tierId === tier.id
          const accent = tier.accent ?? 'blue'
          const progress = Math.min(
            100,
            Math.round((tier.availability.remaining / tier.availability.total) * 100)
          )

          return (
            <div
              key={tier.id}
              onClick={() => handleSelection(tier)}
              className={cn(
                'relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105',
                isSelected
                  ? 'border-cyber-pink shadow-lg shadow-cyber-pink/30'
                  : 'border-white/20 hover:border-cyber-blue/60'
              )}
            >
              {/* Background gradient */}
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none', ACCENT_BACKGROUNDS[accent])} />
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 z-10 w-6 h-6 bg-cyber-pink rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}

              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-1">Tier</p>
                    <h3 className="text-2xl font-cyber text-white">{tier.name}</h3>
                  </div>
                  <span className={cn('px-3 py-1 rounded-full text-xs font-cyber border uppercase tracking-[0.3em]', ACCENT_RING[accent])}>
                    {accent}
                  </span>
                </div>

                <p className="text-gray-200 text-sm mb-4">{tier.description}</p>

                <p className="text-4xl font-cyber text-neon mb-2">{formatCurrency(tier.price)}</p>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4">Per access</p>

                <ul className="space-y-2 text-sm text-gray-200 mb-6">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-cyber-blue mt-0.5">✦</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>{tier.availability.remaining} left</span>
                    <span>{tier.availability.total} total</span>
                  </div>
                  <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-pink via-cyber-blue to-cyber-purple transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelection(tier)
                  }}
                  className={cn(
                    'w-full py-3 font-cyber text-xs tracking-[0.4em] uppercase transition-all duration-300',
                    isSelected
                      ? 'bg-cyber-pink text-white border border-cyber-pink'
                      : 'bg-transparent text-cyber-blue border border-cyber-blue/40 hover:border-cyber-pink hover:text-cyber-pink'
                  )}
                >
                  {isSelected ? 'Selected' : 'Select Tier'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {errors.selection && (
        <div className="text-center text-cyber-pink text-sm mt-4">
          {errors.selection}
        </div>
      )}
    </div>
  )
}