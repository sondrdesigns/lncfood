import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <p className="text-primary mb-4" style={{ fontWeight: 600 }}>
          404
        </p>
        <h1
          className="text-4xl md:text-5xl text-foreground mb-4"
          style={{ fontWeight: 700 }}
        >
          Page not found
        </h1>
        <p className="text-lg text-foreground/70 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
          style={{ fontWeight: 600 }}
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
