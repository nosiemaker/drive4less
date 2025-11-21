'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/drive4less.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
          </Link>

          <div className="hidden md:flex gap-8">
            <Link href="/inventory" className="text-white hover:text-primary transition">
              Inventory
            </Link>
            <Link href="/about" className="text-white hover:text-primary transition">
              About
            </Link>
            <Link href="/services" className="text-white hover:text-primary transition">
              Services
            </Link>
            <Link href="/contact" className="text-white hover:text-primary transition">
              Contact
            </Link>
          </div>

          <Link href="/contact" className="hidden sm:inline-block bg-primary text-white px-6 py-2 rounded font-medium hover:bg-accent transition">
            Get Started
          </Link>

          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-primary">
            <Link href="/inventory" className="block py-2 text-white hover:text-primary">
              Inventory
            </Link>
            <Link href="/about" className="block py-2 text-white hover:text-primary">
              About
            </Link>
            <Link href="/services" className="block py-2 text-white hover:text-primary">
              Services
            </Link>
            <Link href="/contact" className="block py-2 text-white hover:text-primary">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
