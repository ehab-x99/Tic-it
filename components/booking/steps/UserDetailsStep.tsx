import React, { useState, useEffect } from 'react'
import { useBooking } from '@/lib/bookingContext'
import { cn } from '@/lib/utils'

export const UserDetailsStep: React.FC = () => {
  const { userInfo, setUserInfo, setError, clearError } = useBooking()
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    phone: userInfo?.phone || '',
    marketingConsent: userInfo?.marketingConsent || false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Update context when form data changes
    setUserInfo(formData)
  }, [formData, setUserInfo])

  const validateField = (name: string, value: string | boolean) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'firstName':
        if (!value || (value as string).trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters'
        } else {
          delete newErrors.firstName
        }
        break

      case 'lastName':
        if (!value || (value as string).trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters'
        } else {
          delete newErrors.lastName
        }
        break

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value || !emailRegex.test(value as string)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break

      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        const cleanPhone = (value as string).replace(/[\s\-\(\)]/g, '')
        if (!value || !phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
          newErrors.phone = 'Please enter a valid phone number'
        } else {
          delete newErrors.phone
        }
        break
    }

    setErrors(newErrors)
    
    // Update context with error state
    if (Object.keys(newErrors).length > 0) {
      Object.entries(newErrors).forEach(([field, message]) => {
        setError(field, message)
      })
    } else {
      clearError('form')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => ({ ...prev, [name]: newValue }))
    
    // Validate the field
    setTimeout(() => validateField(name, newValue), 0)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const isFormValid = formData.firstName.trim() && 
                     formData.lastName.trim() && 
                     formData.email.trim() && 
                     formData.phone.trim() &&
                     Object.keys(errors).length === 0

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-cyber text-white mb-2">Your Information</h2>
        <p className="text-gray-400">Please provide your details for ticket delivery and contact</p>
      </div>

      <form className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-cyber text-gray-300 uppercase tracking-[0.3em]">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={cn(
                'w-full px-4 py-3 bg-dark-800 border-2 rounded-lg text-white placeholder-gray-500 font-cyber transition-all duration-300',
                errors.firstName 
                  ? 'border-cyber-pink focus:border-cyber-pink focus:outline-none' 
                  : 'border-white/20 focus:border-cyber-blue focus:outline-none hover:border-white/30'
              )}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-cyber-pink text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-cyber text-gray-300 uppercase tracking-[0.3em]">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={cn(
                'w-full px-4 py-3 bg-dark-800 border-2 rounded-lg text-white placeholder-gray-500 font-cyber transition-all duration-300',
                errors.lastName 
                  ? 'border-cyber-pink focus:border-cyber-pink focus:outline-none' 
                  : 'border-white/20 focus:border-cyber-blue focus:outline-none hover:border-white/30'
              )}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-cyber-pink text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-cyber text-gray-300 uppercase tracking-[0.3em]">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={cn(
              'w-full px-4 py-3 bg-dark-800 border-2 rounded-lg text-white placeholder-gray-500 font-cyber transition-all duration-300',
              errors.email 
                ? 'border-cyber-pink focus:border-cyber-pink focus:outline-none' 
                : 'border-white/20 focus:border-cyber-blue focus:outline-none hover:border-white/30'
            )}
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="text-cyber-pink text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="block text-sm font-cyber text-gray-300 uppercase tracking-[0.3em]">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={cn(
              'w-full px-4 py-3 bg-dark-800 border-2 rounded-lg text-white placeholder-gray-500 font-cyber transition-all duration-300',
              errors.phone 
                ? 'border-cyber-pink focus:border-cyber-pink focus:outline-none' 
                : 'border-white/20 focus:border-cyber-blue focus:outline-none hover:border-white/30'
            )}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="text-cyber-pink text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Marketing Consent */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="marketingConsent"
              id="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleInputChange}
              className="mt-1 w-4 h-4 text-cyber-pink bg-dark-800 border-2 border-white/20 rounded focus:ring-cyber-pink focus:ring-2"
            />
            <label htmlFor="marketingConsent" className="text-sm text-gray-300 leading-relaxed">
              I would like to receive updates about future events, exclusive offers, and personalized recommendations. 
              You can unsubscribe at any time.
            </label>
          </div>
        </div>

        {/* Form Summary */}
        <div className="cyber-card p-6 bg-dark-900/50 border border-white/10">
          <h3 className="text-lg font-cyber text-white mb-4 uppercase tracking-[0.3em]">Contact Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="text-white">
                {formData.firstName && formData.lastName 
                  ? `${formData.firstName} ${formData.lastName}` 
                  : 'Not provided'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-white">{formData.email || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Phone:</span>
              <span className="text-white">{formData.phone || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Updates:</span>
              <span className={formData.marketingConsent ? 'text-cyber-green' : 'text-gray-500'}>
                {formData.marketingConsent ? 'Subscribed' : 'No thanks'}
              </span>
            </div>
          </div>
        </div>

        {/* Form Status */}
        <div className="text-center">
          {isFormValid ? (
            <div className="flex items-center justify-center space-x-2 text-cyber-green">
              <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
              <span className="text-sm font-cyber">All required fields completed</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-cyber-pink">
              <div className="w-2 h-2 bg-cyber-pink rounded-full"></div>
              <span className="text-sm font-cyber">Please complete all required fields</span>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}