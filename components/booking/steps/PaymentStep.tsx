import React, { useState } from 'react'
import { useBooking } from '@/lib/bookingContext'
import { BookingPayment } from '@/types'
import { formatCurrency, cn } from '@/lib/utils'

export const PaymentStep: React.FC = () => {
  const { payment, setPayment, quantity, selection } = useBooking()
  const [selectedMethod, setSelectedMethod] = useState<BookingPayment['method']>(
    payment?.method || 'card'
  )
  const [cardDetails, setCardDetails] = useState(payment?.cardDetails || {
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const processingFee = quantity ? quantity.selectedTickets * 1.5 : 0
  const serviceCharge = quantity ? quantity.selectedTickets * 0.75 : 0
  const subtotal = quantity ? quantity.totalAmount : 0
  const total = subtotal + processingFee + serviceCharge

  const handleMethodChange = (method: BookingPayment['method']) => {
    setSelectedMethod(method)
    
    if (method !== 'card') {
      setPayment({
        method,
        cardDetails: undefined
      })
    }
  }

  const handleCardDetailChange = (field: string, value: string) => {
    const updatedDetails = { ...cardDetails, [field]: value }
    setCardDetails(updatedDetails)
    
    setPayment({
      method: selectedMethod,
      cardDetails: updatedDetails
    })
  }

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Visa, MasterCard, American Express'
    },
    {
      id: 'paypal' as const,
      name: 'PayPal',
      icon: '🔵',
      description: 'Pay with your PayPal account'
    },
    {
      id: 'apple-pay' as const,
      name: 'Apple Pay',
      icon: '🍎',
      description: 'Quick and secure payment'
    },
    {
      id: 'google-pay' as const,
      name: 'Google Pay',
      icon: '🌐',
      description: 'Fast checkout with Google'
    }
  ]

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-cyber text-white mb-2">Secure Payment</h2>
        <p className="text-gray-400">Choose your preferred payment method</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="space-y-6">
          <div className="cyber-card p-6 bg-dark-900/50 border border-white/10">
            <h3 className="text-lg font-cyber text-white mb-4 uppercase tracking-[0.3em]">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => handleMethodChange(method.id)}
                  className={cn(
                    'p-4 rounded-lg border-2 cursor-pointer transition-all duration-300',
                    selectedMethod === method.id
                      ? 'border-cyber-pink bg-cyber-pink/10'
                      : 'border-white/20 hover:border-white/40'
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div>
                      <h4 className="text-white font-cyber">{method.name}</h4>
                      <p className="text-xs text-gray-400">{method.description}</p>
                    </div>
                    <div className="ml-auto">
                      <div className={cn(
                        'w-4 h-4 rounded-full border-2',
                        selectedMethod === method.id
                          ? 'border-cyber-pink bg-cyber-pink'
                          : 'border-gray-600'
                      )} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Details Form */}
          {selectedMethod === 'card' && (
            <div className="cyber-card p-6 bg-dark-900/50 border border-white/10">
              <h3 className="text-lg font-cyber text-white mb-4 uppercase tracking-[0.3em]">Card Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-cyber text-gray-300 mb-2 uppercase tracking-[0.3em]">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => handleCardDetailChange('number', formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 bg-dark-800 border-2 border-white/20 rounded-lg text-white placeholder-gray-500 font-cyber focus:border-cyber-pink focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-cyber text-gray-300 mb-2 uppercase tracking-[0.3em]">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardDetailChange('expiry', formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-3 bg-dark-800 border-2 border-white/20 rounded-lg text-white placeholder-gray-500 font-cyber focus:border-cyber-pink focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-cyber text-gray-300 mb-2 uppercase tracking-[0.3em]">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardDetailChange('cvv', e.target.value.replace(/[^0-9]/g, '').substring(0, 4))}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3 bg-dark-800 border-2 border-white/20 rounded-lg text-white placeholder-gray-500 font-cyber focus:border-cyber-pink focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-cyber text-gray-300 mb-2 uppercase tracking-[0.3em]">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => handleCardDetailChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-dark-800 border-2 border-white/20 rounded-lg text-white placeholder-gray-500 font-cyber focus:border-cyber-pink focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mock Payment Processing */}
          {selectedMethod !== 'card' && (
            <div className="cyber-card p-6 bg-cyber-blue/5 border border-cyber-blue/20">
              <h3 className="text-sm font-cyber text-cyber-blue mb-2 uppercase tracking-[0.3em]">Mock Payment</h3>
              <p className="text-xs text-gray-300">
                This is a demo. In production, you would be redirected to {paymentMethods.find(m => m.id === selectedMethod)?.name} to complete your payment securely.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="cyber-card p-6 bg-dark-900/50 border border-white/10">
            <h3 className="text-lg font-cyber text-white mb-4 uppercase tracking-[0.3em]">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-300">
                <span>{selection?.tierName} x {quantity?.selectedTickets}</span>
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

          {/* Security Info */}
          <div className="cyber-card p-6 bg-cyber-green/5 border border-cyber-green/20">
            <h3 className="text-sm font-cyber text-cyber-green mb-2 uppercase tracking-[0.3em]">Secure Checkout</h3>
            <div className="space-y-2 text-xs text-gray-300">
              <p>• 256-bit SSL encryption</p>
              <p>• PCI DSS compliant</p>
              <p>• Your payment information is protected</p>
              <p>• No data is stored on our servers</p>
            </div>
          </div>

          {/* Payment Action */}
          <div className="cyber-card p-6 bg-cyber-pink/5 border border-cyber-pink/20 text-center">
            <div className="text-sm text-gray-300 mb-4">
              Ready to complete your purchase
            </div>
            <div className="text-2xl font-cyber text-cyber-pink mb-4">
              {formatCurrency(total)}
            </div>
            <button
              type="button"
              className="w-full py-4 bg-gradient-to-r from-cyber-pink to-cyber-blue rounded-lg font-cyber text-white text-sm tracking-[0.3em] uppercase hover:scale-105 transition-transform duration-300 shadow-lg"
              onClick={() => {
                // Mock payment processing
                alert('Payment processed successfully! (This is a mock implementation)')
              }}
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}