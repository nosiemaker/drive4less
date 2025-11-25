'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import Link from 'next/link'
import { ChevronLeft, Phone, MessageSquare, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/client'
import { GalleryImageSkeleton, ThumbnailSkeleton } from '@/components/skeleton-loader'

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

export default function VehicleDetailPage() {
  const params = useParams()
  const id = params?.id as string | undefined
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (id) loadVehicle()
  }, [id])

  const loadVehicle = async () => {
    if (!id) return
    try {
      setLoadError(null)
      const supabase = createClient()
      const { data: vehicleData, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      // Load images from database
      const { data: imagesData } = await supabase
        .from('vehicles')
        .select('image_urls')
        .eq('id', id)
        .single()

      const images = (imagesData?.image_urls || []).map((url: string) => ({
        url,
      }))

      console.debug(`Loaded vehicle ${vehicleData.id} with ${images.length} images`)

      setVehicle({
        ...vehicleData,
        images,
      })
    } catch (error) {
      console.error('Error loading vehicle:', error)
      const message = error instanceof Error ? error.message : String(error)
      setLoadError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number | null) => {
    return price ? `K${price.toLocaleString()}` : 'Call for price'
  }

  const formatMileage = (mileage: number | null) => {
    return mileage !== null ? `${mileage.toLocaleString()} km` : 'Call for more information'
  }

  if (isLoading) {
    return (
      <main>
        <Navigation />
        <div className="bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link href="/inventory" className="flex items-center gap-2 text-primary hover:underline mb-6">
              <ChevronLeft className="w-4 h-4" />
              Back to Inventory
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg overflow-hidden mb-4">
                  <GalleryImageSkeleton />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <ThumbnailSkeleton key={i} />
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-card rounded-lg p-6 sticky top-24 space-y-4">
                  <div className="h-10 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-10 bg-muted animate-pulse rounded w-1/2" />

                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-border">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <div className="h-3 bg-muted animate-pulse rounded w-2/3 mb-2" />
                        <div className="h-6 bg-muted animate-pulse rounded" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-muted animate-pulse rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!vehicle) {
    return (
      <main>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Vehicle not found</h1>
          {id && <p className="text-sm text-muted-foreground mt-2">Requested id: {id}</p>}
          {loadError && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive text-destructive rounded">
              <strong>Error:</strong> {loadError}
            </div>
          )}
          <Link href="/inventory" className="text-primary hover:underline mt-4 inline-block">
            Back to Inventory
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const currentImage = vehicle.images[selectedImageIndex]?.url || '/drive4less.jpg'

  return (
    <main>
      <Navigation />
      <div className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/inventory" className="flex items-center gap-2 text-primary hover:underline mb-6">
            <ChevronLeft className="w-4 h-4" />
            Back to Inventory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg overflow-hidden mb-4">
                <img
                  src={currentImage || '/drive4less.jpg'}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-96 object-cover"
                />
              </div>

              {vehicle.images && vehicle.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {vehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`rounded-lg overflow-hidden border-2 transition ${selectedImageIndex === index ? 'border-primary' : 'border-border'
                        }`}
                    >
                      <img
                        src={image.url || '/drive4less.jpg'}
                        alt={`Vehicle view ${index + 1}`}
                        className="w-full h-20 object-cover hover:opacity-75 transition"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Section */}
            <div>
              <div className="bg-card rounded-lg p-6 sticky top-24">
                <h1 className="text-3xl font-bold text-card-foreground mb-2">
                  {vehicle.year} {vehicle.brand} {vehicle.model}
                </h1>
                <p className="text-3xl font-bold text-primary mb-6">
                  {formatPrice(vehicle.price)}
                </p>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Year</p>
                    <p className="text-lg font-bold text-card-foreground">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Mileage</p>
                    <p className="text-lg font-bold text-card-foreground">{formatMileage(vehicle.mileage)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Condition</p>
                    <p className="text-lg font-bold text-card-foreground">{vehicle.condition}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Status</p>
                    <p className="text-lg font-bold text-green-600">{vehicle.status}</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-6">
                  <a
                    href="tel:+260972946078"
                    className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-accent transition flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/260972946078"
                    className="w-full bg-secondary text-white py-3 rounded font-semibold hover:bg-black transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="w-full border-2 border-primary text-primary py-3 rounded font-semibold hover:bg-primary/10 transition flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Test Drive
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-6">
                <h2 className="text-2xl font-bold text-card-foreground mb-6">
                  Vehicle Details
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-card-foreground mb-3">Year</h3>
                    <p className="text-muted-foreground">{vehicle.year}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-card-foreground mb-3">Mileage</h3>
                    <p className="text-muted-foreground">{formatMileage(vehicle.mileage)}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-card-foreground mb-3">Brand</h3>
                    <p className="text-muted-foreground">{vehicle.brand}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-card-foreground mb-3">Model</h3>
                    <p className="text-muted-foreground">{vehicle.model}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-card-foreground mb-3">Condition</h3>
                    <p className="text-muted-foreground">{vehicle.condition}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-card-foreground mb-3">Status</h3>
                    <p className="text-green-600 font-semibold">{vehicle.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-primary/10 border border-primary rounded-lg p-6">
                <h3 className="font-bold text-card-foreground mb-4">Financing Available</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Flexible payment options available for qualified buyers. Talk to our finance team today!
                </p>
                <Link
                  href="/services"
                  className="text-primary font-semibold hover:underline"
                >
                  Learn more about financing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
