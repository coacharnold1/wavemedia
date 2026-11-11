'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wave-charcoal border-t border-wave-gold/10">
      <div className="container-wave py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-wave-white">WAVE</span>
              <span className="text-wave-gold ml-2">MEDIA</span>
            </div>
            <p className="text-wave-gray">Crafting Stories With Intent</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-wave-gold font-bold mb-4">Portfolio</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/cinematography" className="text-wave-gray hover:text-wave-gold transition-colors">
                  Cinematography
                </Link>
              </li>
              <li>
                <Link href="/photography" className="text-wave-gray hover:text-wave-gold transition-colors">
                  Photography
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-wave-gray hover:text-wave-gold transition-colors">
                  WAVE Academy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-wave-gold font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-wave-gray hover:text-wave-gold transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-wave-gray hover:text-wave-gold transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-wave-gray hover:text-wave-gold transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-wave-gold font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@wavemedianj.com" className="text-wave-gray hover:text-wave-gold transition-colors">
                  contact@wavemedianj.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-wave-gray hover:text-wave-gold transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="pt-2 flex gap-4">
                <a href="#" className="text-wave-gold hover:text-wave-gold-light transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-wave-gold hover:text-wave-gold-light transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-wave-gold/10 pt-8 text-center text-wave-gray">
          <p>© {currentYear} WAVE Media LLC. All rights reserved. | Crafting Stories With Intent</p>
        </div>
      </div>
    </footer>
  );
}
