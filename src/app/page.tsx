'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface Request {
  id: string
  service: string
  amount: number
  location: string
  description: string
  user: {
    fullName: string
    county: string
    constituency: string
  }
}

export default function Home() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests')
      const data = await response.json()
      if (response.ok) {
        setRequests(data.requests.slice(0, 6)) // Show only first 6 requests
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative hero-bg text-white overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/50 to-indigo-900/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
              Connect with Reliable Nannies
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-cyan-100 drop-shadow-lg max-w-3xl mx-auto leading-relaxed">
              Find trusted home care professionals or offer your services as a professional nanny
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register?role=client">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-emerald-500/25">
                  <span className="relative z-10">Find a Nunny</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              <Link href="/register?role=nunny">
                <button className="group relative px-8 py-4 bg-transparent border-2 border-white/80 hover:border-white text-white hover:text-cyan-100 font-bold text-lg rounded-xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                  <span className="relative z-10">Become a Nunny</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Why Choose MyNunny?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We connect clients with verified, reliable nannies across Kenya
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Verified Professionals</h3>
              <p className="text-slate-600 leading-relaxed">All nannies are verified and approved by our admin team</p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Local Service</h3>
              <p className="text-slate-600 leading-relaxed">Find nannies in your county and constituency</p>
            </div>
            
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Fair Pricing</h3>
              <p className="text-slate-600 leading-relaxed">Transparent pricing with no hidden fees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Service Requests
            </h2>
            <p className="text-lg text-gray-600">
              See what services clients are looking for
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading requests...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{request.service}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      KES {request.amount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{request.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {request.location}
                  </div>
                  <div className="text-sm text-gray-500">
                    Posted by {request.user.fullName} • {request.user.county}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/login">
              <Button>View All Requests</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 text-cyan-100 max-w-2xl mx-auto">
            Join thousands of satisfied clients and professional nannies
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register?role=client">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-emerald-500/30">
                <span className="relative z-10">Find a Nunny Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            <Link href="/register?role=nunny">
              <button className="group relative px-10 py-5 bg-transparent border-2 border-cyan-400/80 hover:border-cyan-300 text-cyan-100 hover:text-white font-bold text-lg rounded-2xl backdrop-blur-md hover:bg-cyan-500/10 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                <span className="relative z-10">Start Earning as a Nunny</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
