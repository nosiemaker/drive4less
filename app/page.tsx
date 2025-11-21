import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import FeaturedVehicles from '@/components/featured-vehicles'
import USP from '@/components/usp'
import Testimonials from '@/components/testimonials'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <FeaturedVehicles />
      <USP />
      <Testimonials />
      <Footer />
    </main>
  )
}
