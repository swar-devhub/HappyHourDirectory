export function VenueDetailsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="relative rounded-lg overflow-hidden">
        <div className="aspect-video bg-muted" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-muted rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center">
        <div className="h-5 w-32 bg-muted rounded mr-4" />
        <div className="h-5 w-16 bg-muted rounded" />
      </div>
      
      <div className="space-y-4">
        <div className="h-10 w-full bg-muted rounded" />
        <div className="h-60 w-full bg-muted rounded" />
      </div>
    </div>
  );
}