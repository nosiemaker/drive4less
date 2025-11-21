import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { CreditCard, Wrench, Truck, FileCheck } from 'lucide-react'

const services = [
  {
    icon: FileCheck,
    title: 'Quality Assurance',
    description: 'Every vehicle undergoes a comprehensive 50-point inspection before being added to our inventory.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Financing',
    description: 'Pay via bank transfer, or choose down payment + balance on delivery. Multiple options to suit your needs.',
  },
  {
    icon: Wrench,
    title: 'After-Sales Support',
    description: 'Comprehensive warranty packages and professional maintenance services available.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Delivery in less than 10 days across Zambia. Safe and secure transportation guaranteed.',
  },
]

export default function ServicesPage() {
  return (
    <main>
      <Navigation />
      <div className="bg-background">
        {/* Hero */}
        <div className="bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-gray-300">
              Complete solutions for your car buying journey
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <div key={idx} className="bg-card rounded-lg p-8 border border-border">
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-card-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Financing Details */}
          <div className="bg-card rounded-lg p-8 border border-border mb-16">
            <h2 className="text-3xl font-bold text-card-foreground mb-6">
              Payment & Delivery Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-card-foreground mb-2">Bank Transfer</h3>
                <p className="text-muted-foreground">
                  Pay the full amount via bank transfer. Secure, transparent, and fast processing.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-card-foreground mb-2">Down Payment + Delivery</h3>
                <p className="text-muted-foreground">
                  Pay a down payment now, and settle the balance when the vehicle arrives. Flexible and convenient.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-card-foreground mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Your vehicle delivered in less than 10 days across Zambia. Professional and secure service.
                </p>
              </div>
            </div>
          </div>

          {/* Warranty */}
          <div className="bg-primary text-white rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Warranty & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">Standard Warranty</h3>
                <p>6 months or 10,000 km, whichever comes first</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Extended Warranty</h3>
                <p>Up to 2 years available for comprehensive coverage</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Maintenance Packages</h3>
                <p>Regular service packages at discounted rates</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">24/7 Support</h3>
                <p>Customer support available for assistance anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
