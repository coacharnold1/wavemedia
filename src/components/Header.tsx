'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/cinematography', label: 'Cinematography' },
    { href: '/photography', label: 'Photography' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-wave-black/95 backdrop-blur-md border-b border-wave-gold/10">
      <nav className="container-wave py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold" aria-label="WAVE Media home">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={398}
            height={256}
            className="h-8 w-auto mix-blend-lighten"
            priority
          />
          <span>
            <span className="text-wave-white">WAVE</span>
            <span className="text-wave-gold ml-2">MEDIA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-wave-gray hover:text-wave-gold transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-wave-gold"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-wave-charcoal border-b border-wave-gold/10 md:hidden">
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-wave-gray hover:text-wave-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
