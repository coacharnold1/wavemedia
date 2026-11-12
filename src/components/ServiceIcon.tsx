'use client';

interface ServiceIconProps {
  type: 'cinematography' | 'photography' | 'documentary' | 'content' | 'storytelling';
  className?: string;
}

const iconMap = {
  cinematography: {
    title: 'Film Production',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="gold-grad-cinematography" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF099"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#996B00"/>
        </linearGradient>
      </defs>
      <circle cx="21" cy="21" r="8" stroke="url(#gold-grad-cinematography)"/>
      <circle cx="21" cy="21" r="2.5" fill="url(#gold-grad-cinematography)"/>
      <circle cx="39" cy="21" r="8" stroke="url(#gold-grad-cinematography)"/>
      <circle cx="39" cy="21" r="2.5" fill="url(#gold-grad-cinematography)"/>
      <rect x="10" y="32" width="34" height="22" rx="4" stroke="url(#gold-grad-cinematography)"/>
      <path d="M44 39L56 33V53L44 47V39Z" stroke="url(#gold-grad-cinematography)"/>
    </svg>`,
  },
  photography: {
    title: 'Photography',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="gold-grad-photography" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF099"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#996B00"/>
        </linearGradient>
      </defs>
      <path d="M12 24C12 21.7909 13.7909 20 16 20H22L25 14H39L42 20H48C50.2091 20 52 21.7909 52 24V48C52 50.2091 50.2091 52 48 52H16C13.7909 52 12 50.2091 12 48V24Z" stroke="url(#gold-grad-photography)"/>
      <circle cx="32" cy="36" r="11" stroke="url(#gold-grad-photography)"/>
      <circle cx="32" cy="36" r="5" stroke="url(#gold-grad-photography)"/>
      <circle cx="44" cy="26" r="1" fill="url(#gold-grad-photography)"/>
    </svg>`,
  },
  documentary: {
    title: 'Documentary Filmmaking',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="gold-grad-documentary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF099"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#996B00"/>
        </linearGradient>
      </defs>
      <rect x="10" y="28" width="44" height="26" rx="3" stroke="url(#gold-grad-documentary)"/>
      <path d="M29 36L37 41L29 46V36Z" fill="url(#gold-grad-documentary)" stroke="url(#gold-grad-documentary)"/>
      <path d="M10 24L48 13" stroke="url(#gold-grad-documentary)"/>
      <path d="M10 18L52 18" stroke="url(#gold-grad-documentary)"/>
      <path d="M20 21L24 16" stroke="url(#gold-grad-documentary)"/>
      <path d="M30 18L34 13" stroke="url(#gold-grad-documentary)"/>
      <path d="M40 15L44 10" stroke="url(#gold-grad-documentary)"/>
    </svg>`,
  },
  content: {
    title: 'Content Creation',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="gold-grad-content" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF099"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#996B00"/>
        </linearGradient>
      </defs>
      <rect x="10" y="16" width="44" height="32" rx="7" stroke="url(#gold-grad-content)"/>
      <path d="M28 24L40 32L28 40V24Z" fill="url(#gold-grad-content)" stroke="url(#gold-grad-content)"/>
      <line x1="44" y1="20" x2="48" y2="20" stroke="url(#gold-grad-content)"/>
    </svg>`,
  },
  storytelling: {
    title: 'Brand Storytelling',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="gold-grad-storytelling" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF099"/>
          <stop offset="50%" stop-color="#D4AF37"/>
          <stop offset="100%" stop-color="#996B00"/>
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="5" fill="url(#gold-grad-storytelling)" stroke="url(#gold-grad-storytelling)"/>
      <path d="M23 23C20.5 25.5 20.5 38.5 23 41" stroke="url(#gold-grad-storytelling)"/>
      <path d="M41 23C43.5 25.5 43.5 38.5 41 41" stroke="url(#gold-grad-storytelling)"/>
      <path d="M16 16C11.5 20.5 11.5 43.5 16 48" stroke="url(#gold-grad-storytelling)"/>
      <path d="M48 16C52.5 20.5 52.5 43.5 48 48" stroke="url(#gold-grad-storytelling)"/>
    </svg>`,
  },
};

export default function ServiceIcon({ type, className = 'w-12 h-12' }: ServiceIconProps) {
  const icon = iconMap[type];

  return (
    <div
      className={`text-wave-gold ${className}`}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      title={icon.title}
    />
  );
}
