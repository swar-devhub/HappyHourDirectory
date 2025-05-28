export function VenueListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 bg-muted rounded animate-pulse" />
        <div className="h-9 w-32 bg-muted rounded animate-pulse" />
      </div>
      
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden border shadow-sm animate-pulse">
            <div className="aspect-video bg-muted" />
            <div className="p-4">
              <div className="flex gap-2 mb-3">
                <div className="h-6 w-16 bg-muted rounded-full" />
                <div className="h-6 w-16 bg-muted rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-muted rounded mb-2" />
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
                <div className="h-4 w-4/6 bg-muted rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}