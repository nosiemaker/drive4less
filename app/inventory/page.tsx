'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/client'
import { CardSkeleton } from '@/components/skeleton-loader'

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number | null
  mileage: number | null
  condition: string
  status: 'Available' | 'Sold' | 'Reserved'
  image_url?: string
  image_urls?: string[]
  images: Array<{ url: string }>
}

export default function InventoryPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [sortBy, setSortBy] = useState('name')
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    try {
      const supabase = createClient()
      const { data: vehiclesData, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'Available')
        .order('created_at', { ascending: false })

      if (error) throw error

      // Map Supabase data to our interface
      const vehiclesWithImages = (vehiclesData || []).map((vehicle) => ({
        ...vehicle,
        images: vehicle.image_urls?.map((url: string) => ({ url })) || [],
      }))

      console.debug(`Loaded ${vehiclesWithImages.length} vehicles`)

      setVehicles(vehiclesWithImages)
    } catch (error) {
      console.error('Error loading vehicles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getVehicleTypes = () => {
    const types = new Set(vehicles.map((v) => v.brand))
    return Array.from(types).sort()
  }

  const getPrimaryImage = (images?: Array<{ url: string }>) => {
    if (!images || images.length === 0) {
      return '/drive-4-less-logo.jpg'
    }
    return images[0]?.url || '/drive-4-less-logo.jpg'
  }

  const formatPrice = (price: number | null) => {
    return price ? `K${price.toLocaleString()}` : 'Call for price'
  }

  const formatMileage = (mileage: number | null) => {
    return mileage !== null ? `${mileage.toLocaleString()} km` : 'Call for details'
  }

  const filtered =
    filterType === 'all'
      ? vehicles
      : vehicles.filter((v) => v.brand === filterType)

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price') {
      return (a.price || 0) - (b.price || 0)
    } else if (sortBy === 'year') {
      return b.year - a.year
    }
    return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`)
  })

  if (isLoading) {
    return (
      <main>
        <Navigation />
        <div className="bg-background min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Our Inventory</h1>
            <p className="text-muted-foreground mb-8">Loading inventory...</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navigation />
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Our Inventory</h1>
          <p className="text-muted-foreground mb-8">
            Browse our collection of {sorted.length} quality-checked vehicles
          </p>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Filter by Brand
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-card border border-border rounded px-4 py-2 text-foreground"
              >
                <option value="all">All Brands</option>
                {getVehicleTypes().map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-card border border-border rounded px-4 py-2 text-foreground"
              >
                <option value="name">Name</option>
                <option value="price">Price (Low to High)</option>
                <option value="year">Year (Newest)</option>
              </select>
            </div>
          </div>

          {/* Vehicle Grid */}
          {sorted.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No vehicles available at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  <img
                    src={getPrimaryImage(vehicle.images) || '/drive-4-less-logo.jpg'}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {vehicle.year} {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {formatPrice(vehicle.price)}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6 text-sm text-muted-foreground">
                      <div>
                        <p className="font-semibold">Year</p>
                        <p>{vehicle.year}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Mileage</p>
                        <p>{formatMileage(vehicle.mileage)}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Condition</p>
                        <p>{vehicle.condition}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Status</p>
                        <p className="text-green-600 font-semibold">{vehicle.status}</p>
                      </div>
                    </div>

                    <Link
                      href={`/vehicle/${vehicle.id}`}
                      className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-accent transition text-center block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
