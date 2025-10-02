'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from './ui/Button'

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">MyNunny</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Contact Us
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.fullName}</span>
                {user.role === 'ADMIN' && (
                  <Link href="/admin/dashboard">
                    <Button variant="outline" size="sm">Admin Dashboard</Button>
                  </Link>
                )}
                {user.role === 'NUNNY' && (
                  <Link href="/nunny/dashboard">
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                )}
                {user.role === 'CLIENT' && (
                  <Link href="/client/dashboard">
                    <Button variant="outline" size="sm">Dashboard</Button>
                  </Link>
                )}
                <Button variant="secondary" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsSignUpMenuOpen(!isSignUpMenuOpen)}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </button>
                  {isSignUpMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        href="/register?role=nunny"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsSignUpMenuOpen(false)}
                      >
                        Sign Up as a Nunny
                      </Link>
                      <Link
                        href="/register?role=client"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsSignUpMenuOpen(false)}
                      >
                        Sign Up as a Client
                      </Link>
                    </div>
                  )}
                </div>
                <Link href="/login">
                  <Button size="sm">Login</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {user ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="px-3">
                    <div className="text-base font-medium text-gray-800">{user.fullName}</div>
                    <div className="text-sm font-medium text-gray-500">{user.role}</div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin/dashboard"
                        className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    {user.role === 'NUNNY' && (
                      <Link
                        href="/nunny/dashboard"
                        className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.role === 'CLIENT' && (
                      <Link
                        href="/client/dashboard"
                        className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="px-2 space-y-1">
                    <Link
                      href="/register?role=nunny"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up as a Nunny
                    </Link>
                    <Link
                      href="/register?role=client"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up as a Client
                    </Link>
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
