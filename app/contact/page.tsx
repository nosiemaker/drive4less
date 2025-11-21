'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' })
    alert('Thank you for reaching out! We\'ll contact you soon.')
  }

  return (
    <main>
      <Navigation />
      <div className="bg-background">
        {/* Hero */}
        <div className="bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Get in touch with our team. We're here to help!
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div>
              <div className="bg-card rounded-lg p-6 border border-border mb-6">
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-card-foreground mb-1">Call / WhatsApp</h3>
                    <div className="flex flex-col">
                      <a href="tel:+260764205331" className="text-primary hover:underline">
                        +260 764 205 331
                      </a>
                      <a href="https://wa.me/260764205331" target="_blank" rel="noreferrer" className="text-primary hover:underline mt-1">
                        Message on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border mb-6">
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-card-foreground mb-1">Email</h3>
                    <a href="mailto:drive4less23@gmail.com" className="text-primary hover:underline">
                      drive4less23@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border mb-6">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-card-foreground mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Great North Road<br />
                      Lusaka, Zambia
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-card-foreground mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Mon - Fri: 9:00 - 17:00<br />
                      Sat: 10:00 - 14:00<br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 border border-border">
                <h2 className="text-2xl font-bold text-card-foreground mb-6">
                  Send Us a Message
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground"
                      placeholder="+260..."
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-input border border-border rounded px-4 py-2 text-foreground placeholder-muted-foreground"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-accent transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="w-full h-96 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Google Map would be embedded here</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
