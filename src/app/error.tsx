"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center pt-24">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-wave-white mb-4">Something went wrong</h1>
        <p className="text-wave-gray mb-8">Please try again. If it keeps happening, contact us.</p>
        <button onClick={reset} className="btn-primary">Try again</button>
      </div>
    </main>
  );
}
