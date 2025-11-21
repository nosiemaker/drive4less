import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <main>
      <Navigation />
      <div className="bg-background">
        {/* Hero */}
        <div className="bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Drive 4 Less Zambia</h1>
            <p className="text-xl text-gray-300">
              Your trusted partner in finding quality vehicles at affordable prices
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Drive 4 Less Zambia was founded with a simple mission: to provide Zambians with access to quality vehicles at prices they can afford. We understand that buying a car is a significant investment, and we're committed to making the process transparent, trustworthy, and hassle-free.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>Owner & CEO:</strong> Namangolwa Sitali
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                With years of experience in the automotive industry, our team has built strong relationships with suppliers and financial institutions to bring you the best deals on the market.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we serve hundreds of satisfied customers across Zambia, from first-time buyers to business owners seeking reliable commercial vehicles.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-bold text-card-foreground mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  'Every vehicle undergoes rigorous quality inspection',
                  'Transparent pricing with no hidden costs',
                  'Flexible payment: bank transfer or down payment + balance on delivery',
                  'Delivery in less than 10 days across Zambia',
                  'Professional after-sales support and warranty',
                  'Expert team ready to assist',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold text-xl">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              We're committed to customer satisfaction. Every vehicle comes with our quality assurance guarantee, comprehensive warranty options, and dedicated after-sales support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p>Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">200+</p>
                <p>Vehicles Sold</p>
              </div>
              <div>
                <p className="text-3xl font-bold">10+</p>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
