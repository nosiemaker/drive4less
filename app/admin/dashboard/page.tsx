'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, LogOut } from 'lucide-react'
import AddVehicleModal from '@/components/add-vehicle-modal'
import EditVehicleModal from '@/components/edit-vehicle-modal'
import { createClient } from '@/lib/client'

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
}

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.push('/admin/login')
      return
    }

    loadVehicles()
  }, [router])

  const loadVehicles = async () => {
    try {
      const supabase = createClient()
      const { data: vehiclesData, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setVehicles(vehiclesData || [])
    } catch (error) {
      console.error('Error loading vehicles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddVehicle = async (vehicleData: any) => {
    try {
      setErrorMessage(null)
      setSuccessMessage(null)
      const supabase = createClient()
      
      // Convert imageUrls to image_urls if needed
      const imageUrls = vehicleData.imageUrls || vehicleData.image_urls || []
      
      const { data: newVehicle, error } = await supabase
        .from('vehicles')
        .insert({
          brand: vehicleData.brand,
          model: vehicleData.model,
          year: vehicleData.year,
          price: vehicleData.price,
          mileage: vehicleData.mileage,
          condition: vehicleData.condition,
          status: vehicleData.status,
          image_url: imageUrls?.[0] || null,
          image_urls: imageUrls || [],
        })
        .select()
        .single()

      if (error) throw error

      console.debug(`Vehicle created with ${imageUrls.length} images`)
      await loadVehicles()
      setIsAddModalOpen(false)
      setSuccessMessage(`Vehicle ${vehicleData.brand} ${vehicleData.model} added successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error adding vehicle'
      console.error('Error adding vehicle:', error)
      setErrorMessage(`Failed to add vehicle: ${message}`)
    }
  }

  const handleEditVehicle = async (vehicle: Vehicle) => {
    try {
      setErrorMessage(null)
      setSuccessMessage(null)
      const supabase = createClient()
      const { error } = await supabase
        .from('vehicles')
        .update({
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          price: vehicle.price,
          mileage: vehicle.mileage,
          condition: vehicle.condition,
          status: vehicle.status,
          image_url: vehicle.image_urls?.[0] || null,
          image_urls: vehicle.image_urls || [],
        })
        .eq('id', vehicle.id)

      if (error) throw error

      await loadVehicles()
      setIsEditModalOpen(false)
      setEditingVehicle(null)
      setSuccessMessage(`Vehicle ${vehicle.brand} ${vehicle.model} updated successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error editing vehicle'
      console.error('Error editing vehicle:', error)
      setErrorMessage(`Failed to update vehicle: ${message}`)
    }
  }

  const handleDeleteVehicle = async (id: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        const supabase = createClient()
        const { error } = await supabase.from('vehicles').delete().eq('id', id)

        if (error) throw error

        await loadVehicles()
      } catch (error) {
        console.error('Error deleting vehicle:', error)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-muted-foreground">Manage your vehicle inventory</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Messages */}
        {errorMessage && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive text-destructive rounded-md">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{vehicles.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                {vehicles.filter((v) => v.status === 'Available').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sold</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{vehicles.filter((v) => v.status === 'Sold').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Vehicles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
            <CardDescription>Total vehicles: {vehicles.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Brand & Model</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Mileage</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">
                        {vehicle.brand} {vehicle.model}
                      </TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>
                        {vehicle.price ? `K${vehicle.price.toLocaleString()}` : 'Call for price'}
                      </TableCell>
                      <TableCell>
                        {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'Call for info'}
                      </TableCell>
                      <TableCell>{vehicle.condition}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            vehicle.status === 'Available'
                              ? 'bg-green-100 text-green-800'
                              : vehicle.status === 'Sold'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingVehicle(vehicle)
                              setIsEditModalOpen(true)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <AddVehicleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddVehicle} />
      {isEditModalOpen && editingVehicle && (
        <EditVehicleModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingVehicle(null)
          }}
          vehicle={editingVehicle}
          onEdit={handleEditVehicle}
        />
      )}
    </div>
  )
}
