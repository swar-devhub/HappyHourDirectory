import { Card, CardContent } from "@/components/ui/card";


export function VenueCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full animate-none">
      <div className="relative aspect-video bg-gray-200 skeleton">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <CardContent className="p-4">
      
        <div className="mb-3">
          <div className="h-4 w-1/3 rounded bg-gray-200 skeleton" />
        </div>
      
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-4 rounded bg-gray-200 skeleton" />
            <div className="h-5 w-1/2 rounded bg-gray-200 skeleton" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-4 rounded bg-gray-200 skeleton" />
            <div className="h-5 w-3/4 rounded bg-gray-200 skeleton" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-4 rounded bg-gray-200 skeleton" />
            <div className="h-5 w-1/2 rounded bg-gray-200 skeleton" />
          </div>
        </div>
      </CardContent>
      <div className="px-[16px] pb-5">
        <div className="flex items-start gap-5">
            <div className="h-4 w-20 rounded bg-gray-200 skeleton" />
            <div className="h-4 w-8 rounded bg-gray-200 skeleton" />
        </div>
      
      </div>
    </Card>
  );
}