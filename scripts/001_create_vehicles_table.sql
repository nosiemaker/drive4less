-- Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price BIGINT,
  mileage INTEGER,
  condition TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create vehicle_images table
CREATE TABLE IF NOT EXISTS public.vehicle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  image_data BYTEA,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view vehicles)
CREATE POLICY "Allow public read on vehicles"
  ON public.vehicles FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on vehicle_images"
  ON public.vehicle_images FOR SELECT
  USING (true);

-- Indexes for performance
CREATE INDEX idx_vehicles_status ON public.vehicles(status);
CREATE INDEX idx_vehicle_images_vehicle_id ON public.vehicle_images(vehicle_id);
