'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/client'
import { CardSkeleton } from '@/components/skeleton-loader'

interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number | null
  mileage: number | null
  // images will be an array of urls; first element is primary
  images: Array<{ url: string }>
}

export default function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadFeatured() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('vehicles')
          .select('id, brand, model, year, price, mileage, image_url, image_urls')
          .eq('status', 'Available')
          .order('created_at', { ascending: false })
          .limit(4)

        if (error) throw error

        const mapped = (data || []).map((v: any) => ({
          id: v.id,
          brand: v.brand,
          model: v.model,
          year: v.year,
          price: v.price,
          mileage: v.mileage,
          images: (v.image_urls && v.image_urls.length > 0)
            ? v.image_urls.map((u: string) => ({ url: u }))
            : v.image_url ? [{ url: v.image_url }] : [],
        }))

        console.debug('Featured vehicles loaded', mapped.map(m => ({ id: m.id, images: m.images.length })))
        if (mounted) setVehicles(mapped)
      } catch (err) {
        console.error('Error loading featured vehicles:', err)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadFeatured()
    return () => { mounted = false }
  }, [])

  const getPrimaryImage = (images?: Array<{ url: string }>) => {
    if (!images || images.length === 0) {
      return '/drive4less.jpg'
    }
    return images[0]?.url || '/drive4less.jpg'
  }

  const formatPrice = (price: number | null) => {
    if (!price) return 'Call for price'
    return `K${price.toLocaleString()}`
  }

  const formatMileage = (mileage: number | null) => {
    if (mileage === null) return 'Call for details'
    return `${mileage.toLocaleString()} km`
  }

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Vehicles
          </h2>
          <p className="text-lg text-muted-foreground">
            Check out our latest quality-checked additions
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <p className="text-center text-muted-foreground">No vehicles added yet</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  <img
                    src={getPrimaryImage(vehicle.images) || '/drive4less.jpg'}
                    alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {vehicle.year} {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {formatPrice(vehicle.price)}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mb-6 text-sm text-muted-foreground">
                      <div>
                        <p className="font-semibold">Year</p>
                        <p>{vehicle.year}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Mileage</p>
                        <p>{formatMileage(vehicle.mileage)}</p>
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

            <div className="text-center mt-12">
              <Link
                href="/inventory"
                className="bg-secondary text-white px-8 py-3 rounded font-semibold hover:bg-black transition inline-block"
              >
                View All Vehicles
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
