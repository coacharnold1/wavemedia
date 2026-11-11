import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center pt-24">
      <div className="text-center px-4">
        <p className="text-wave-gold text-sm tracking-widest mb-2">404</p>
        <h1 className="text-4xl font-bold text-wave-white mb-4">Page not found</h1>
        <p className="text-wave-gray mb-8">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </main>
  );
}
