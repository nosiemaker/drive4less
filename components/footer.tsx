import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Drive 4 Less</h3>
            <p className="text-gray-400">
              Your road to quality and affordable cars in Zambia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/inventory" className="hover:text-primary transition">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Car Financing</li>
              <li>Test Drives</li>
              <li>Vehicle Delivery</li>
              <li>After-Sales Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+260764205331" className="hover:text-primary transition">
                    +260 764 205 331
                  </a>
                </div>
                <div className="flex gap-2">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="mailto:drive4less23@gmail.com" className="hover:text-primary transition">
                    drive4less23@gmail.com
                  </a>
                </div>
                <div className="flex gap-2">
                  <a href="https://wa.me/260764205331" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                    Chat on WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex gap-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Lusaka, Zambia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © 2025 Drive 4 Less Zambia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
