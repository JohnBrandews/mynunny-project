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
        body: JSON.stringify(data),
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
    <div className="min-h-screen contact-wrap">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-14 contact-hero text-charcoal shadow-[0_10px_30px_rgba(51,65,85,0.12)]">
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">Have questions or need help? We'd love to hear from you.</p>
          </div>
          <div aria-hidden className="shape-blob blob-a" />
          <div aria-hidden className="shape-blob blob-b" />
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="card">
            <h2 className="section-title">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-charcoal">Email</p>
                  <p className="text-sm muted">johnbrandews@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-charcoal">Phone</p>
                  <p className="text-sm muted">+254 111666710</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-charcoal">Address</p>
                  <p className="text-sm muted">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="sub-title mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm muted">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h2 className="section-title">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
              />

              <Input
                label="Email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
              />

              <Textarea
                label="Message"
                rows={6}
                {...register('message', { 
                  required: 'Message is required',
                  minLength: {
                    value: 10,
                    message: 'Message must be at least 10 characters'
                  }
                })}
                error={errors.message?.message}
                placeholder="Tell us how we can help you..."
              />

              <Button type="submit" loading={loading} className="w-full bg-aqua text-charcoal hover:bg-aqua-dark">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="card mt-10">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="divide-y divide-[rgba(51,65,85,0.12)]">
            {faqs.map((item, idx) => {
              const open = openFaqs.includes(idx)
              return (
                <div key={idx}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-3 text-left"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${idx}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span className="sub-title">{item.q}</span>
                    <span
                      className={`ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(51,65,85,0.25)] text-[12px] transition-transform ${
                        open ? 'rotate-45' : ''
                      }`}
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
                    <p className="muted pb-4">{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <style jsx>{`
        :global(:root) {
          --aqua: var(--blue-600);
          --charcoal: var(--blue-900);
          --cream: var(--blue-50);
        }
        .text-charcoal { color: var(--charcoal); }
        .text-aqua { color: var(--aqua); }
        .bg-aqua { background-color: var(--aqua); }
        .bg-aqua-dark { background-color: var(--blue-800); }
        .muted { color: rgba(51,65,85,0.8); }

        .contact-wrap {
          background:
            radial-gradient(1000px 600px at -10% -10%, rgba(74,127,167,0.20), rgba(74,127,167,0) 60%),
            radial-gradient(800px 500px at 110% 10%, rgba(26,61,99,0.10), rgba(26,61,99,0) 65%),
            var(--cream);
        }
        .contact-hero {
          background:
            radial-gradient(650px 380px at 20% -10%, rgba(74,127,167,0.30), rgba(74,127,167,0) 60%),
            radial-gradient(500px 320px at 85% 10%, rgba(26, 61, 99, 0.18), rgba(26, 61, 99, 0) 60%),
            linear-gradient(180deg, rgba(250, 248, 243, 0.9), rgba(250, 248, 243, 0.75));
        }
        .card {
          background: rgba(246, 250, 253, 0.85);
          border: 1px solid rgba(26, 61, 99, 0.12);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(10, 25, 49, 0.08);
          backdrop-filter: saturate(120%) blur(2px);
        }
        .section-title { font-size: 1.5rem; font-weight: 800; color: var(--charcoal); margin-bottom: 12px; }
        .sub-title { font-weight: 700; color: var(--charcoal); }

        .shape-blob {
          position: absolute; inset: auto; pointer-events: none; filter: blur(30px); opacity: 0.5;
        }
        .blob-a { width: 380px; height: 380px; right: -120px; top: -80px; background: rgba(74, 127, 167, 0.35); border-radius: 50%; }
        .blob-b { width: 280px; height: 280px; left: -90px; bottom: -100px; background: rgba(26, 61, 99, 0.25); border-radius: 50%; }
      `}</style>
    </div>
  )
}
