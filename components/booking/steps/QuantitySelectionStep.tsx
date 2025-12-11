import React, { useState, useEffect } from 'react'
import { useBooking } from '@/lib/bookingContext'
import { formatCurrency, cn } from '@/lib/utils'

export const QuantitySelectionStep: React.FC = () => {
  const { selection, quantity, setQuantity, setError, clearError } = useBooking()
  const [localQuantity, setLocalQuantity] = useState(quantity?.selectedTickets || 1)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    if (selection) {
      const newTotal = localQuantity * selection.price
      setTotalAmount(newTotal)
    }
  }, [localQuantity, selection])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      setLocalQuantity(1)
      setQuantity({ selectedTickets: 1, totalAmount: selection ? selection.price : 0 })
      return
    }

    setLocalQuantity(newQuantity)
    const total = newQuantity * (selection?.price || 0)
    setTotalAmount(total)
    
    setQuantity({
      selectedTickets: newQuantity,
      totalAmount: total
    })

    // Clear any previous errors
    clearError('quantity')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    handleQuantityChange(value)
  }

  const handleBlur = () => {
    if (localQuantity < 1) {
      handleQuantityChange(1)
      setError('quantity', 'Minimum 1 ticket required')
    }
  }

  if (!selection) {
    return (
      <div className="text-center py-12">
        <p className="text-cyber-pink">Please select a ticket tier first</p>
      </div>
    )
  }

  const maxTickets = 8 // You can make this dynamic based on availability

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-cyber text-white mb-2">How Many Tickets?</h2>
        <p className="text-gray-400">Select the number of tickets for {selection.tierName}</p>
      </div>

      {/* Current Selection Summary */}
      <div className="cyber-card p-6 border border-cyber-blue/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-cyber text-white">{selection.tierName}</h3>
            <p className="text-gray-400">{formatCurrency(selection.price)} per ticket</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">Selected Tier</p>
            <div className="w-6 h-6 bg-cyber-pink rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="cyber-card p-8 text-center">
        <div className="space-y-6">
          {/* Quantity Input */}
          <div className="space-y-4">
            <label className="block text-sm font-cyber text-gray-300 uppercase tracking-[0.3em]">
              Number of Tickets
            </label>
            
            <div className="flex items-center justify-center space-x-4">
              {/* Decrease Button */}
              <button
                type="button"
                onClick={() => handleQuantityChange(localQuantity - 1)}
                disabled={localQuantity <= 1}
                className={cn(
                  'w-12 h-12 rounded-full border-2 font-cyber text-lg transition-all duration-300',
                  localQuantity <= 1
                    ? 'border-gray-600 text-gray-600 cursor-not-allowed'
                    : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white hover:scale-110'
                )}
              >
                −
              </button>

              {/* Number Input */}
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max={maxTickets}
                  value={localQuantity}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="w-24 h-16 bg-dark-800 border-2 border-cyber-blue/40 rounded-lg text-center text-2xl font-cyber text-white focus:border-cyber-pink focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Increase Button */}
              <button
                type="button"
                onClick={() => handleQuantityChange(localQuantity + 1)}
                disabled={localQuantity >= maxTickets}
                className={cn(
                  'w-12 h-12 rounded-full border-2 font-cyber text-lg transition-all duration-300',
                  localQuantity >= maxTickets
                    ? 'border-gray-600 text-gray-600 cursor-not-allowed'
                    : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white hover:scale-110'
                )}
              >
                +
              </button>
            </div>

            <div className="text-xs text-gray-500">
              Maximum {maxTickets} tickets per order
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-white/10 pt-6 space-y-3">
            <div className="flex items-center justify-between text-gray-300">
              <span>Tickets ({localQuantity})</span>
              <span>{formatCurrency(localQuantity * selection.price)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>Processing Fee</span>
              <span>{formatCurrency(localQuantity * 1.5)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span>Service Charge</span>
              <span>{formatCurrency(localQuantity * 0.75)}</span>
            </div>
            <div className="border-t border-white/20 pt-3">
              <div className="flex items-center justify-between text-xl font-cyber text-white">
                <span>Total</span>
                <span className="text-cyber-pink">{formatCurrency(totalAmount + (localQuantity * 2.25))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="space-y-4">
        <p className="text-center text-sm text-gray-400 uppercase tracking-[0.3em]">Quick Select</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[1, 2, 4, 6, 8].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleQuantityChange(num)}
              className={cn(
                'px-6 py-3 rounded-lg border font-cyber text-sm tracking-[0.3em] uppercase transition-all duration-300',
                localQuantity === num
                  ? 'bg-cyber-pink border-cyber-pink text-white'
                  : 'border-white/30 text-gray-300 hover:border-cyber-blue hover:text-cyber-blue'
              )}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}