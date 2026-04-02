'use client'

import React, { useEffect, useState } from 'react'
import { HeroSectionV2 } from '@/components/landing/HeroSectionV2'
import { FeaturesSectionV2 } from '@/components/landing/FeaturesSectionV2'
import { ServicesSectionV2 } from '@/components/landing/ServicesSectionV2'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { CTASectionV2 } from '@/components/landing/CTASectionV2'
import { FooterV2 } from '@/components/landing/FooterV2'

export default function Home() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch('/api/requests')
        const data = await response.json()
        if (response.ok) {
          // Map dynamic data to the format expected by ServicesSectionV2
          // and show only the first 6 active opportunities
          setRequests(data.requests.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching requests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20">
      {/* HeaderV2 is now in the root layout to avoid duplication and conflicts */}
      
      <main>
        {/* Modern Hero Section - with search state */}
        <HeroSectionV2 onSearch={setSearchQuery} />

        {/* Features & Benefits */}
        <FeaturesSectionV2 />

        {/* Dynamic Active Service Opportunities - with search filtering */}
        <ServicesSectionV2 requests={requests} loading={loading} searchQuery={searchQuery} />

        {/* Community Testimonials */}
        <TestimonialsSection />

        {/* Final Conversion CTA */}
        <CTASectionV2 />
      </main>

      {/* Modern Improved Footer */}
      <FooterV2 />
    </div>
  )
}
