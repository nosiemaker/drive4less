import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-60"></div>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/luxury-car-showroom.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
              Find Your Perfect Ride in Zambia
            </h1>
            <p className="text-lg text-gray-300 mb-8 text-pretty">
              Quality checked vehicles at prices you can afford. Browse our collection of reliable cars for first-time buyers, families, and professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/inventory"
                className="bg-primary hover:bg-accent text-white px-8 py-3 rounded font-semibold transition text-center"
              >
                Browse Inventory
              </Link>
              <Link
                href="/contact"
                className="border-2 border-primary hover:bg-primary/10 text-white px-8 py-3 rounded font-semibold transition text-center"
              >
                Schedule Test Drive
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block flex justify-center items-center">
            <img
              src="/drive4less.jpg"
              alt="Drive 4 Less Logo"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
