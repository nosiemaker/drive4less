'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X, Upload } from 'lucide-react'
import { createClient } from '@/lib/client'

interface Vehicle {
  brand: string
  model: string
  year: number
  price: number | null
  mileage: number | null
  condition: string
  status: 'Available' | 'Sold' | 'Reserved'
  imageUrls: string[]
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdd: (vehicle: Omit<Vehicle, 'id'>) => void
}

export default function AddVehicleModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: null as number | null,
    mileage: null as number | null,
    condition: 'Good',
    status: 'Available' as const,
    imageUrls: [] as string[],
  })
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === 'year' ? (value === '' ? new Date().getFullYear() : parseInt(value)) : value,
    })
  }

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value === '' ? null : parseInt(value),
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (!files) return

    setIsUploading(true)
    setUploadError(null)

    try {
      const supabase = createClient()
      const newUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const timestamp = Date.now()
        const randomId = Math.random().toString(36).substring(7)
        const fileName = `${timestamp}-${randomId}-${file.name}`

        console.debug(`Uploading image: ${fileName}`)

        const { data, error } = await supabase.storage
          .from('vehicle-images')
          .upload(`public/${fileName}`, file)

        if (error) {
          console.error('Upload error:', error)
          throw new Error(`Failed to upload ${file.name}: ${error.message}`)
        }

        // Get the public URL
        const { data: publicUrl } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(`public/${fileName}`)

        console.debug(`Image uploaded successfully: ${publicUrl.publicUrl}`)
        newUrls.push(publicUrl.publicUrl)
      }

      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...newUrls],
      }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error uploading images'
      console.error('Error uploading images:', err)
      setUploadError(message)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    const updatedUrls = formData.imageUrls.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      imageUrls: updatedUrls,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.brand && formData.model) {
      const imageUrls = formData.imageUrls.length > 0 ? formData.imageUrls : ['/drive4less.jpg']
      onAdd({
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        mileage: formData.mileage,
        condition: formData.condition,
        status: formData.status,
        imageUrls: imageUrls,
      })
      setFormData({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: null,
        mileage: null,
        condition: 'Good',
        status: 'Available',
        imageUrls: [],
      })
      setUploadError(null)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>Add a new car to your inventory</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>
              <Input
                name="brand"
                placeholder="e.g., Toyota"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Model</label>
              <Input
                name="model"
                placeholder="e.g., Corolla"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <Input
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price (ZMW) - Optional</label>
              <Input
                name="price"
                type="number"
                placeholder="Leave blank if not available"
                value={formData.price ?? ''}
                onChange={handleNumericChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mileage (km) - Optional</label>
              <Input
                name="mileage"
                type="number"
                placeholder="Leave blank if not available"
                value={formData.mileage ?? ''}
                onChange={handleNumericChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Condition</label>
              <Select value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value as 'Available' | 'Sold' | 'Reserved')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Images *</label>
            {uploadError && (
              <div className="p-2 bg-destructive/10 border border-destructive text-destructive rounded text-sm">
                {uploadError}
              </div>
            )}
            <div className="flex gap-2 mb-2">
              <label className="flex-1 flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">
                  {isUploading ? 'Uploading...' : 'Choose images from your device'}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>

            {formData.imageUrls.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Total images: {formData.imageUrls.length}</p>
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-muted rounded border border-border"
                  >
                    <img src={url} alt={`Preview ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Image {index + 1}</p>
                      {index === 0 && <p className="text-xs font-semibold text-primary">Cover Image</p>}
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveImage(index)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Add Vehicle
            </Button>
            <Button type="button" variant="outline" onClick={() => {
              onClose()
              setFormData({
                brand: '',
                model: '',
                year: new Date().getFullYear(),
                price: null,
                mileage: null,
                condition: 'Good',
                status: 'Available',
                imageUrls: [],
              })
              setUploadError(null)
            }} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
