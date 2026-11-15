'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioItems, photographyCategories } from '@/lib/portfolio';

type PhotoCategory = typeof photographyCategories[number];

type PhotoWithCategory = {
  id: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  date: string;
  category: PhotoCategory;
  featured: boolean;
};

const categories = photographyCategories as unknown as PhotoCategory[];
const categoryLabels: Record<string, string> = {
  'Sports': 'Sports',
  'Portraits': 'Portraits',
  'Events': 'Events',
  'Corporate': 'Corporate',
  'Lifestyle': 'Lifestyle',
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [photos, setPhotos] = useState<PhotoWithCategory[]>(portfolioItems.filter(p => !p.type || p.type === 'photo'));
  const [selectedFeatured, setSelectedFeatured] = useState<string[]>(
    portfolioItems.filter((p) => p.featured && (!p.type || p.type === 'photo')).map((p) => p.id)
  );
  const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<PhotoWithCategory[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [showNewPhotos, setShowNewPhotos] = useState(false);
  const [missingPhotos, setMissingPhotos] = useState<any[]>([]);
  const [showMissingPhotos, setShowMissingPhotos] = useState(false);
  const [filterCategory, setFilterCategory] = useState<PhotoCategory | 'all'>('all');

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      
      const data = await response.json();
      
      if (data.valid) {
        setIsAuthenticated(true);
        setPasswordInput('');
      } else {
        alert('❌ Incorrect password');
        setPasswordInput('');
      }
    } catch (error) {
      alert('❌ Error verifying password');
      console.error(error);
    }
  };

  const handleScanNewPhotos = async () => {
    setIsScanning(true);
    try {
      const response = await fetch('/api/admin/sync-portfolio', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      // Show missing photos if any
      if (data.missingCount > 0) {
        setMissingPhotos(data.missing);
        setShowMissingPhotos(true);
      }
      
      // Show new photos if any
      if (data.newCount > 0) {
        setNewPhotos(data.new);
        setShowNewPhotos(true);
      }
      
      if (data.newCount === 0 && data.missingCount === 0) {
        alert('✓ Portfolio is in sync! No changes needed.');
      }
    } catch (error) {
      alert('❌ Error syncing portfolio');
      console.error(error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAddNewPhotos = () => {
    setPhotos((prev) => [...prev, ...newPhotos]);
    setNewPhotos([]);
    setShowNewPhotos(false);
    alert(`✓ Added ${newPhotos.length} new photos!`);
  };

  const handleRemoveMissingPhotos = () => {
    const missingIds = new Set(missingPhotos.map((p) => p.id));
    setPhotos((prev) => prev.filter((p) => !missingIds.has(p.id)));
    setMissingPhotos([]);
    setShowMissingPhotos(false);
    alert(`✓ Removed ${missingPhotos.length} photos with missing files!`);
  };

  const updateCategory = (id: string, category: PhotoCategory) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, category } : p))
    );
  };

  const updateTitle = (id: string, title: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title } : p))
    );
  };

  const updateDescription = (id: string, description: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, description } : p))
    );
  };

  const updateDate = (id: string, date: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, date } : p))
    );
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setDeletedPhotos((prev) => [...prev, id]);
    // Also remove from featured if it was selected
    setSelectedFeatured((prev) => prev.filter((pid) => pid !== id));
  };

  const toggleFeatured = (id: string) => {
    setSelectedFeatured((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const filteredPhotos = useMemo(() => {
    return filterCategory === 'all' ? photos : photos.filter((p) => p.category === filterCategory);
  }, [photos, filterCategory]);

  const generateCode = () => {
    const code = `export type PhotoCategory = 'Sports' | 'Portraits' | 'Events' | 'Corporate' | 'Lifestyle';

export type PhotoItem = {
  id: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  date: string;
  category: PhotoCategory;
  featured: boolean;
  type: 'photo';
};

export const photographyCategories = [
  "Sports",
  "Portraits",
  "Events",
  "Corporate",
  "Lifestyle",
] as const;

export const categoryLabels: Record<string, string> = {
  'Sports': 'Sports',
  'Portraits': 'Portraits',
  'Events': 'Events',
  'Corporate': 'Corporate',
  'Lifestyle': 'Lifestyle',
};

export const portfolioItems: PhotoItem[] = [
${photos
  .map(
    (photo) => `  {
    id: '${photo.id}',
    slug: '${photo.slug}',
    title: '${photo.title.replace(/'/g, "\\'")}',
    image: '${photo.image}',
    description: '${photo.description.replace(/'/g, "\\'")}',
    date: '${photo.date}',
    category: '${photo.category}',
    featured: ${selectedFeatured.includes(photo.id)},
    type: 'photo',
  },`
  )
  .join('\n')}
];

export function getPhotosByCategory(category: PhotoCategory): PhotoItem[] {
  return portfolioItems.filter((p) => p.type === 'photo' && p.category === category);
}

export function getFeaturedPhotos(): PhotoItem[] {
  return portfolioItems.filter((p) => p.type === 'photo' && p.featured).slice(0, 5);
}`;
    return code;
  };

  const handleDownload = () => {
    const code = generateCode();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', 'portfolio-photos.ts');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyCode = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
    alert('✓ Code copied to clipboard!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wave-black to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-wave-gold mb-6 text-center">Admin Portal</h1>
          <p className="text-gray-300 text-center mb-6">Portfolio Management</p>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-wave-gold focus:outline-none"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-wave-gold hover:bg-yellow-500 text-wave-black font-bold py-2 px-4 rounded-lg transition"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <Link href="/" className="text-wave-gold hover:text-yellow-400 text-sm">
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-wave-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-wave-gold">Photo Portfolio Manager</h1>
            <p className="text-gray-400 mt-2">Edit, organize, and manage your photo portfolio</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="block w-full text-right text-gray-400 hover:text-wave-gold text-sm transition"
            >
              Sign Out
            </button>
            <Link href="/" className="block text-gray-400 hover:text-wave-gold text-sm transition">
              ← Back to Site
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleScanNewPhotos}
              disabled={isScanning}
              className="bg-wave-gold hover:bg-yellow-500 disabled:opacity-50 text-wave-black font-bold py-2 px-6 rounded-lg transition"
            >
              {isScanning ? '🔄 Scanning...' : '🔍 Scan for New Photos'}
            </button>
            
            {photos.length > 0 && (
              <>
                <button
                  onClick={handleCopyCode}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  📋 Copy Code
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  ⬇️ Download
                </button>
              </>
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-300">
            <p><strong>Photos in portfolio:</strong> {photos.length}</p>
            <p><strong>Featured:</strong> {selectedFeatured.length}</p>
          </div>
        </div>

        {/* New Photos Alert */}
        {showNewPhotos && (
          <div className="bg-green-900 border border-green-700 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-green-300 font-bold">✓ {newPhotos.length} New Photos Detected</h3>
                <p className="text-green-200 text-sm mt-1">These files were found but not yet in portfolio.ts</p>
              </div>
              <button
                onClick={() => setShowNewPhotos(false)}
                className="text-green-300 hover:text-green-400"
              >
                ✕
              </button>
            </div>
            <button
              onClick={handleAddNewPhotos}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Add {newPhotos.length} Photos to Portfolio
            </button>
          </div>
        )}

        {/* Missing Photos Alert */}
        {showMissingPhotos && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-red-300 font-bold">⚠ {missingPhotos.length} Missing Files</h3>
                <p className="text-red-200 text-sm mt-1">These are in portfolio.ts but files don&apos;t exist</p>
              </div>
              <button
                onClick={() => setShowMissingPhotos(false)}
                className="text-red-300 hover:text-red-400"
              >
                ✕
              </button>
            </div>
            <button
              onClick={handleRemoveMissingPhotos}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Remove {missingPhotos.length} Missing Photos
            </button>
          </div>
        )}

        {/* Filter */}
        {photos.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
            <label className="text-gray-300 font-medium mr-3">Filter by Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as PhotoCategory | 'all')}
              className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:border-wave-gold"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {categoryLabels[cat]}
                </option>
              ))}
            </select>
            <span className="text-gray-400 ml-3">Showing {filteredPhotos.length} photos</span>
          </div>
        )}

        {/* Photos Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center border border-gray-700">
            <p className="text-gray-400 text-lg">No photos yet. Click &quot;Scan for New Photos&quot; to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-wave-gold transition">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Thumbnail */}
                  <div className="md:col-span-1">
                    <div className="relative aspect-square bg-gray-700 rounded-lg overflow-hidden">
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-3 space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={photo.title}
                        onChange={(e) => updateTitle(photo.id, e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-wave-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Description</label>
                      <textarea
                        value={photo.description}
                        onChange={(e) => updateDescription(photo.id, e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-wave-gold focus:outline-none"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Date</label>
                        <input
                          type="date"
                          value={photo.date}
                          onChange={(e) => updateDate(photo.id, e.target.value)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-wave-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Category</label>
                        <select
                          value={photo.category}
                          onChange={(e) => updateCategory(photo.id, e.target.value as PhotoCategory)}
                          className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-wave-gold focus:outline-none"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {categoryLabels[cat]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFeatured.includes(photo.id)}
                          onChange={() => toggleFeatured(photo.id)}
                          className="w-4 h-4 rounded border-gray-600 text-wave-gold focus:ring-wave-gold"
                        />
                        <span className="ml-2 text-sm">Featured</span>
                      </label>

                      <button
                        onClick={() => deletePhoto(photo.id)}
                        className="ml-auto bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded text-sm transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
