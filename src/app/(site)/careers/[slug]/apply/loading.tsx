export default function Loading() {
  return (
    <div className="pt-20" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading application form…</span>

      <section className="bg-primary text-white pt-12 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="h-4 w-32 bg-white/20 rounded mb-6 animate-pulse" />
          <div className="h-3 w-20 bg-white/20 rounded mb-3 animate-pulse" />
          <div className="h-10 sm:h-12 w-3/4 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="flex flex-wrap gap-4">
            <div className="h-4 w-28 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
            <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-border p-6 md:p-10 space-y-6">
            <div className="h-7 w-56 bg-foreground/10 rounded animate-pulse" />
            <div className="h-4 w-80 max-w-full bg-foreground/10 rounded animate-pulse" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
            <FieldSkeleton />
            <FieldSkeleton />

            <div>
              <div className="h-4 w-48 bg-foreground/10 rounded mb-2 animate-pulse" />
              <div className="h-3 w-64 max-w-full bg-foreground/10 rounded mb-2 animate-pulse" />
              <div className="h-40 w-full bg-foreground/5 border border-border rounded-xl animate-pulse" />
            </div>

            <div className="h-12 w-full sm:w-56 bg-primary/30 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FieldSkeleton() {
  return (
    <div>
      <div className="h-4 w-24 bg-foreground/10 rounded mb-2 animate-pulse" />
      <div className="h-12 w-full bg-foreground/5 border border-border rounded-xl animate-pulse" />
    </div>
  );
}
