export function CardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-muted" />
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
        
        {/* Price skeleton */}
        <div className="h-8 bg-muted rounded w-2/5" />
        
        {/* Details grid skeleton */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="h-4 bg-muted rounded mb-1 w-12" />
            <div className="h-4 bg-muted rounded w-16" />
          </div>
          <div>
            <div className="h-4 bg-muted rounded mb-1 w-12" />
            <div className="h-4 bg-muted rounded w-16" />
          </div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-10 bg-muted rounded" />
      </div>
    </div>
  )
}

export function GalleryImageSkeleton() {
  return (
    <div className="w-full h-96 bg-muted rounded-lg animate-pulse" />
  )
}

export function ThumbnailSkeleton() {
  return (
    <div className="w-full h-20 bg-muted rounded-lg animate-pulse" />
  )
}
