'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

interface ContactForm {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [openFaqs, setOpenFaqs] = useState<number[]>([])
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setLoading(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      toast.success('Message sent successfully! We\'ll get back to you soon.')
      reset()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const faqs = [
    {
      q: 'How do I register as a nunny?',
      a:
        "Click on \"Sign Up as a Nunny\" from the homepage, fill in your details, and wait for admin approval. Once approved, you'll be able to see and respond to client requests.",
    },
    {
      q: 'How long does nunny approval take?',
      a:
        'Our admin team reviews all nunny applications within 24-48 hours. You\'ll receive an email notification once your application is approved or if we need additional information.',
    },
    {
      q: 'Is there a fee to use MyNunny?',
      a:
        'Registration and basic usage of MyNunny is free for both clients and nunnies. We believe in providing a platform that benefits everyone without unnecessary fees.',
    },
    {
      q: 'How do I contact a nunny or client?',
      a:
        'Once you find a suitable match, you can use the "Contact" button to initiate communication. This will allow you to discuss details, pricing, and schedule directly with the other party.',
    },
  ]

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#E0F2FE' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Contact Card */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden" style={{ minHeight: '600px' }}>
          {/* Decorative Wave Shapes - Top Right */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-30" style={{ transform: 'translate(20%, -20%)', zIndex: 5 }}>
            <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 150 Q75 75 150 150 T300 150" stroke="#3B82F6" strokeWidth="50" fill="none" opacity="0.4"/>
              <path d="M0 180 Q75 105 150 180 T300 180" stroke="#60A5FA" strokeWidth="40" fill="none" opacity="0.5"/>
              <path d="M0 120 Q75 45 150 120 T300 120" stroke="#93C5FD" strokeWidth="35" fill="none" opacity="0.4"/>
            </svg>
          </div>
          {/* Decorative Wave Shapes - Bottom Left */}
          <div className="absolute bottom-0 left-0 w-80 h-80 opacity-30" style={{ transform: 'translate(-20%, 20%)', zIndex: 5 }}>
            <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 150 Q75 225 150 150 T300 150" stroke="#3B82F6" strokeWidth="50" fill="none" opacity="0.4"/>
              <path d="M0 120 Q75 195 150 120 T300 120" stroke="#60A5FA" strokeWidth="40" fill="none" opacity="0.5"/>
              <path d="M0 180 Q75 255 150 180 T300 180" stroke="#93C5FD" strokeWidth="35" fill="none" opacity="0.4"/>
            </svg>
          </div>
          {/* Small Blue Circles - Bottom Right */}
          <div className="absolute bottom-6 right-6 flex gap-2 opacity-40" style={{ zIndex: 5 }}>
            <div className="w-4 h-4 rounded-full" style={{ background: '#3B82F6' }}></div>
            <div className="w-4 h-4 rounded-full" style={{ background: '#60A5FA' }}></div>
            <div className="w-4 h-4 rounded-full" style={{ background: '#93C5FD' }}></div>
          </div>

          <div className="relative flex flex-col lg:flex-row">
            {/* Left Section - Contact Form */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              <h1 className="text-3xl font-bold mb-3" style={{ color: '#1E40AF' }}>Contact Us</h1>
              <p className="text-sm mb-8" style={{ color: '#60A5FA' }}>
                Feel free to contact us if you have any question. We'll answer your request as soon as possible!
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1E40AF' }}>Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full py-2 bg-transparent border-0 border-b-2 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                      style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
                      placeholder="Name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1E40AF' }}>Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full py-2 bg-transparent border-0 border-b-2 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                      style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
                      placeholder="Email Address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#1E40AF' }}>Your Message</label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: {
                          value: 10,
                          message: 'Message must be at least 10 characters'
                        }
                      })}
                      className="w-full py-2 bg-transparent border-0 border-b-2 focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder-gray-400"
                      style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
                      placeholder="Your Message"
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 font-semibold text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    style={{ background: '#3B82F6' }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.background = '#2563EB'
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) e.currentTarget.style.background = '#3B82F6'
                    }}
                  >
                    {loading ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section - Contact Information in Circle */}
            <div className="lg:w-2/5 p-8 lg:p-12 flex items-center justify-center relative">
              {/* White Circular Container */}
              <div className="w-full max-w-sm aspect-square bg-white rounded-full p-10 lg:p-14 shadow-xl flex flex-col justify-center items-center relative z-10" style={{ minHeight: '400px', maxWidth: '400px' }}>
                <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#1E40AF' }}>MyNunny</h2>
                <div className="w-16 h-0.5 mb-8 mx-auto" style={{ background: '#3B82F6' }}></div>

                <div className="space-y-5 w-full">
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#60A5FA' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-center" style={{ color: '#60A5FA' }}>Nairobi, Kenya</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#60A5FA' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-sm text-center" style={{ color: '#60A5FA' }}>+254 111666710</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#60A5FA' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-center" style={{ color: '#60A5FA' }}>johnbrandews@gmail.com</p>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex gap-4 justify-center mt-8 pt-6" style={{ borderTop: '1px solid #E0F2FE' }}>
                    <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow" style={{ border: '1px solid #E0F2FE' }}>
                      <svg className="w-5 h-5" fill="#3B82F6" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow" style={{ border: '1px solid #E0F2FE' }}>
                      <svg className="w-5 h-5" fill="#3B82F6" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-shadow" style={{ border: '1px solid #E0F2FE' }}>
                      <svg className="w-5 h-5" fill="#3B82F6" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 0-.341.009-.515.027-.847-.569-1.944-.933-3.053-.933-1.109 0-2.206.364-3.053.933-.174-.018-.346-.027-.515-.027-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c.169 0 .341-.009.515-.027.847.569 1.944.933 3.053.933 1.109 0 2.206-.364 3.053-.933.174.018.346.027.515.027 2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#333' }}>Frequently Asked Questions</h2>
          <div className="divide-y" style={{ borderColor: '#E5E7EB' }}>
            {faqs.map((item, idx) => {
              const open = openFaqs.includes(idx)
              return (
                <div key={idx}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-4 text-left"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${idx}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="font-semibold" style={{ color: '#333' }}>{item.q}</span>
                    <span
                      className={`ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm transition-transform ${
                        open ? 'rotate-45' : ''
                      }`}
                      style={{ borderColor: '#D1D5DB', color: '#666' }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${idx}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-300 ${
                      open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="pb-4 text-sm leading-relaxed" style={{ color: '#666' }}>{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
