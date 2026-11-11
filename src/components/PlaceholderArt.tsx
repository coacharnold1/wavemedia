interface PlaceholderArtProps {
  label?: string;
  className?: string;
}

// Decorative stand-in shown until a real image exists
export default function PlaceholderArt({ label, className = "" }: PlaceholderArtProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br from-wave-charcoal via-wave-dark to-wave-black ${className}`}
    >
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-40">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M0 ${110 + i * 12} C 80 ${60 + i * 8}, 140 ${160 - i * 6}, 220 ${100 + i * 10} S 340 ${50 + i * 12}, 400 ${95 + i * 8}`}
            fill="none"
            stroke="#d4af37"
            strokeOpacity={0.55 - i * 0.09}
            strokeWidth="1.2"
          />
        ))}
      </svg>
      {label && (
        <span className="absolute bottom-3 left-4 text-xs uppercase tracking-widest text-wave-gold/70">
          {label}
        </span>
      )}
    </div>
  );
}
