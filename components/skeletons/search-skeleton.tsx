export function SearchSkeleton() {
  return (
    <div className="w-full bg-gradient-to-b from-primary/10 to-background">
      <div className="container max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="h-12 w-3/4 bg-muted rounded-lg animate-pulse mb-6" />
          <div className="h-6 w-full bg-muted rounded animate-pulse mb-4" />
          <div className="h-6 w-2/3 bg-muted rounded animate-pulse mb-8" />
          
          <div className="w-full max-w-xl">
            <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
            <div className="mt-4 flex justify-center gap-2">
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
          
          <div className="mt-12 flex gap-4">
            <div className="h-12 w-40 bg-muted rounded-lg animate-pulse" />
            <div className="h-12 w-40 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}