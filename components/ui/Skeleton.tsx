interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-surface-raised ${className}`}
      aria-hidden="true"
    />
  );
}

export function ArticleCardSkeleton() {
  return (
    <article className="border-b border-border py-8">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="mt-2 h-10 w-32" />
      </div>
    </article>
  );
}

export function ConceptCardSkeleton() {
  return (
    <article className="border-t border-border py-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/2" />
        </div>
        <div>
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="mt-3 h-4 w-full" />
        </div>
        <div className="hidden md:block">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
      </div>
    </article>
  );
}

export function SeriesCardSkeleton() {
  return (
    <article className="border-t border-border py-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex gap-3">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="mt-5 h-8 w-3/4" />
          <Skeleton className="mt-2 h-5 w-full" />
          <Skeleton className="mt-5 h-4 w-2/3" />
        </div>
        <Skeleton className="h-40 rounded-lg" />
      </div>
    </article>
  );
}
