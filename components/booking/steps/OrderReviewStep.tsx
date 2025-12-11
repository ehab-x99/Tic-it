import React from 'react'
import { useBooking } from '@/lib/bookingContext'
import { formatCurrency, formatDate, cn } from '@/lib/utils'

export const OrderReviewStep: React.FC = () => {
  const { eventDetails, selection, quantity, seating, userInfo } = useBooking()

  if (!eventDetails || !selection || !quantity || !userInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-cyber-pink">Incomplete booking information</p>
      </div>
    )
  }

  const processingFee = quantity.selectedTickets * 1.5
  const serviceCharge = quantity.selectedTickets * 0.75
  const subtotal = quantity.totalAmount
  const total = subtotal + processingFee + serviceCharge

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-cyber text-white mb-2">Review Your Order</h2>
        <p className="text-gray-400">Please confirm all details before proceeding to payment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event & Ticket Details */}
        <div className="space-y-6">
          {/* Event Information */}
          <div className="cyber-card p-6 bg-dark-900/50 border border-white/10">
            <h3 className="text-lg font-cyber text-white mb-4 uppercase tracking-[0.3em]">Event Details</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-cyber text-white">{eventDetails.title}</h4>
                <p className="text-gray-400">{eventDetails.artist}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 uppercase tracking-[0.3em]">Date</span>
                  <p className="text-white">{formatDate(new Date(eventDetails.date))}</p>
                </div>
                <div>
                  <span className="text-gray-500 uppercase tracking-[0.3em]">Venue</span>
                  <p className="text-white">{eventDetails.venue}</p>
                </div>
                <div>
                  <span className="text-gray-500 uppercase tracking-[0.3em]">Location</span>
                  <p className="text-white">{eventDetails.city}</p>
                </div>
                <div>
                  <span className="text-gray-500 uppercase tracking-[0.3em]">Status</span>
                  <p className="text-cyber-green uppercase font-cyber">{eventDetails.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="cyber-card p-6 bg-dark-900/50 border border-white/10">
            <h3 className="text-lg font-cyber text-white mb-4 uppercase tracking-[0.3em]">Ticket Information</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-cyber">{selection.tierName}</h4>
                  <p className="text-gray-400 text-sm">{formatCurrency(selection.price)} per ticket</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-cyber text-cyber-pink">{quantity.selectedTickets}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.3em]">tickets</p>
                </div>
              </div>
              
              {seating && seating.seatIds.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <h5 className="text-sm font-cyber text-gray-300 mb-2 uppercase tracking-[0.3em]">Selected Seats</h5>
                  <div className="space-y-1 text-sm text-gray-400">
                    {seating.seatIds.map(seatId => (
                      <div key={seatId}>Seat {seatId}</div>
                    ))}
                  </div>
                </div>
              )}

              {seating && seating.seatIds.length === 0 && (
                <div className="border-t border-white/10 pt-4">
                  <h5 className="text-sm font-cyber text-gray-300 mb-2 uppercase tracking-[0.3em]">Admission Type</h5>
                  <p className="text-sm text-gray-400">General Admission</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer & Payment Summary */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="cyber-card p-6 bg-dark-900/50 border border-white/10">
            <h3 className="text-lg font-cyber text-white mb-4 uppercase tracking-[0.3em]">Customer Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-[0.3em]">Name</span>
                <span className="text-white">{userInfo.firstName} {userInfo.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-[0.3em]">Email</span>
                <span className="text-white">{userInfo.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-[0.3em]">Phone</span>
                <span className="text-white">{userInfo.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase tracking-[0.3em]">Marketing</span>
                <span className={userInfo.marketingConsent ? 'text-cyber-green' : 'text-gray-500'}>
                  {userInfo.marketingConsent ? 'Subscribed' : 'Opted out'}
                </span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="cyber-card p-6 bg-dark-900/50 border border-white/10">
            <h3 className="text-lg font-cyber text-white mb-4 uppercase tracking-[0.3em]">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>Tickets ({quantity.selectedTickets})</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Processing Fee</span>
                <span>{formatCurrency(processingFee)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Service Charge</span>
                <span>{formatCurrency(serviceCharge)}</span>
              </div>
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between text-xl font-cyber text-white">
                  <span>Total</span>
                  <span className="text-cyber-pink">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="cyber-card p-6 bg-cyber-blue/5 border border-cyber-blue/20">
            <h3 className="text-sm font-cyber text-cyber-blue mb-3 uppercase tracking-[0.3em]">Important Information</h3>
            <div className="space-y-2 text-xs text-gray-300">
              <p>• Tickets will be delivered via email within 15 minutes of purchase</p>
              <p>• Please bring a valid photo ID to the event</p>
              <p>• No refunds or exchanges after 48 hours from event date</p>
              <p>• Venue policies apply - check event page for details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="text-center">
        <label className="flex items-center justify-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-cyber-pink bg-dark-800 border-2 border-white/20 rounded focus:ring-cyber-pink focus:ring-2"
          />
          <span className="text-sm text-gray-400">
            I agree to the <span className="text-cyber-blue hover:underline cursor-pointer">Terms of Service</span> 
            {' '}and{' '}
            <span className="text-cyber-blue hover:underline cursor-pointer">Privacy Policy</span>
          </span>
        </label>
      </div>

      {/* Order Actions */}
      <div className="text-center space-y-4">
        <div className="text-xs text-gray-500 uppercase tracking-[0.3em]">
          Ready to complete your booking
        </div>
        <div className="text-lg font-cyber text-cyber-green">
          {formatCurrency(total)}
        </div>
      </div>
    </div>
  )
}