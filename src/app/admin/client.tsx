'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import { photographyCategories, cinematographyCategories } from '@/lib/portfolio';

type PortfolioType = 'video' | 'photo';

interface PortfolioItem {
  slug: string;
  title: string;
  type: PortfolioType;
  category: string;
  year: number;
  client?: string;
  description: string;
  videoUrl?: string;
  image?: string;
  featured?: boolean;
}

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'video' | 'photo'>('all');

  // Load portfolio on auth
  useEffect(() => {
    if (isAuthenticated && items.length === 0) {
      loadPortfolio();
    }
  }, [isAuthenticated]);

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
        showMessage('error', '❌ Incorrect password');
      }
    } catch (error) {
      showMessage('error', '❌ Error verifying password');
    }
  };

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      // Try database first (for Vercel/production)
      let response = await fetch('/api/db/portfolio');
      let data = await response.json();

      // Fallback to file-based endpoint if database not available
      if (!data.success) {
        response = await fetch('/api/admin/portfolio/get');
        data = await response.json();
      }

      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
      } else {
        showMessage('error', '❌ Failed to load portfolio');
      }
    } catch (error) {
      showMessage('error', '❌ Error loading portfolio');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const savePortfolio = async () => {
    setSaving(true);
    try {
      // Try database first (for Vercel/production)
      let response = await fetch('/api/db/portfolio/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      let data = await response.json();

      // Fallback to file-based endpoint if database not available
      if (!data.success) {
        response = await fetch('/api/admin/portfolio/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });
        data = await response.json();
      }

      if (data.success) {
        showMessage('success', `✅ Saved ${data.count} items`);
      } else {
        showMessage('error', `❌ ${data.error}`);
      }
    } catch (error) {
      showMessage('error', '❌ Error saving portfolio');
    } finally {
      setSaving(false);
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      // Use Vercel Blob client SDK for direct upload (bypasses 4.5MB serverless limit)
      const blob = await upload(`portfolio/${Date.now()}-${file.name}`, file, {
        access: 'public',
      });

      // Add new photo item
      const newItem: PortfolioItem = {
        slug: file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: 'Untitled Photo',
        type: 'photo',
        category: 'Events',
        year: new Date().getFullYear(),
        description: '',
        image: blob.url,
      };
      setItems([...items, newItem]);
      showMessage('success', '✅ Photo uploaded and added to editor');
      setShowNewForm(false);
    } catch (error) {
      showMessage('error', `❌ Error uploading photo: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploadingFile(false);
    }
  };

  const addNewItem = (type: PortfolioType) => {
    const newItem: PortfolioItem = {
      slug: `new-${type}-${Date.now()}`,
      title: `New ${type === 'video' ? 'Video' : 'Photo'}`,
      type,
      category: 'Events',
      year: new Date().getFullYear(),
      description: '',
      ...(type === 'video' ? { videoUrl: '' } : { image: '' }),
    } as PortfolioItem;
    setItems([...items, newItem]);
    setShowNewForm(false);
  };

  const updateItem = (index: number, field: keyof PortfolioItem, value: any) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const duplicateItem = (index: number) => {
    const item = items[index];
    if (!item) return;
    const duplicate: PortfolioItem = {
      slug: `${item.slug}-copy-${Date.now()}`,
      title: `${item.title} (Copy)`,
      type: item.type,
      category: item.category,
      year: item.year,
      description: item.description,
      client: item.client,
      videoUrl: item.videoUrl,
      image: item.image,
      featured: item.featured,
    };
    setItems([...items, duplicate]);
  };

  const filteredItems = items.filter((item) =>
    filterType === 'all' ? true : item.type === filterType
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-wave-black">
        <div className="bg-wave-charcoal rounded-lg shadow-xl p-8 w-full max-w-md border border-wave-dark">
          <h1 className="text-3xl font-bold text-wave-gold mb-6 text-center">Admin Portal</h1>
          <p className="text-wave-gray text-center mb-6">WAVE Media Portfolio Manager</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-wave-gray mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2 bg-wave-dark text-white rounded-lg border border-wave-dark focus:border-wave-gold focus:outline-none"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-wave-gold hover:bg-yellow-500 text-wave-black font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-wave-dark">
            <a href="/" className="text-wave-gold hover:text-yellow-400 text-sm">
              ← Back to Site
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wave-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-wave-gold">📸 Portfolio Manager</h1>
            <p className="text-wave-gray mt-2">Manage videos and photos</p>
          </div>
          <div className="space-y-2 text-right">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-wave-gold hover:text-yellow-400 text-sm transition block"
            >
              Sign Out
            </button>
            <a href="/" className="text-wave-gold hover:text-yellow-400 text-sm transition block">
              ← Back to Site
            </a>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-900 border-green-700 text-green-200'
                : 'bg-red-900 border-red-700 text-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Action Bar */}
        <div className="bg-wave-charcoal rounded-lg p-6 mb-6 border border-wave-dark space-y-4">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowNewForm(!showNewForm)}
              className="bg-wave-gold hover:bg-yellow-500 text-wave-black font-bold py-2 px-6 rounded-lg transition"
            >
              + Add Item
            </button>
            <button
              onClick={savePortfolio}
              disabled={saving || loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              {saving ? '💾 Saving...' : '💾 Save to portfolio.ts'}
            </button>
            <button
              onClick={loadPortfolio}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              {loading ? '🔄 Loading...' : '🔄 Reload'}
            </button>
          </div>

          {/* New Item Form */}
          {showNewForm && (
            <div className="border-t border-wave-dark pt-4 space-y-3">
              <p className="text-wave-gray text-sm">Add new item:</p>
              <div className="flex gap-3">
                <button
                  onClick={() => addNewItem('video')}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  ▶ New Video
                </button>
                <button
                  onClick={() => addNewItem('photo')}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  📸 New Photo
                </button>
              </div>
              <div className="border-t border-wave-dark pt-3">
                <label className="block text-wave-gray text-sm mb-2">Or upload photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadPhoto}
                  disabled={uploadingFile}
                  className="block w-full text-sm text-wave-gray file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-wave-gold file:text-wave-black hover:file:bg-yellow-500"
                />
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="text-sm text-wave-gray pt-2 border-t border-wave-dark">
            <p>Total items: {items.length} • Videos: {items.filter((i) => i.type === 'video').length} • Photos: {items.filter((i) => i.type === 'photo').length} • Featured: {items.filter((i) => i.featured).length}</p>
          </div>
        </div>

        {/* Filter */}
        {items.length > 0 && (
          <div className="mb-6 flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-wave-charcoal text-white rounded px-4 py-2 border border-wave-dark focus:border-wave-gold outline-none"
            >
              <option value="all">All Items</option>
              <option value="video">Videos Only</option>
              <option value="photo">Photos Only</option>
            </select>
            <span className="text-wave-gray py-2">{filteredItems.length} items</span>
          </div>
        )}

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-wave-charcoal rounded-lg p-12 text-center border border-wave-dark">
            <p className="text-wave-gray text-lg">
              {items.length === 0 ? '👉 Click "+ Add Item" to get started' : 'No items in selected filter'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredItems.map((item) => {
              const actualIndex = items.indexOf(item);

              return (
                <div
                  key={actualIndex}
                  className="bg-wave-charcoal rounded-lg p-6 border border-wave-dark hover:border-wave-gold transition"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Thumbnail */}
                    <div className="lg:col-span-1">
                      {item.type === 'photo' && item.image ? (
                        <div className="relative aspect-square bg-wave-dark rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="aspect-square bg-wave-dark rounded-lg flex items-center justify-center text-wave-gold text-4xl">
                          {item.type === 'video' ? '▶' : '📸'}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-3 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-wave-gold font-semibold mb-1">TYPE</label>
                          <select
                            value={item.type}
                            onChange={(e) => updateItem(actualIndex, 'type', e.target.value as PortfolioType)}
                            className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                          >
                            <option value="video">Video</option>
                            <option value="photo">Photo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-wave-gold font-semibold mb-1">SLUG</label>
                          <input
                            type="text"
                            value={item.slug}
                            onChange={(e) => updateItem(actualIndex, 'slug', e.target.value)}
                            className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                            placeholder="unique-slug"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-wave-gold font-semibold mb-1">TITLE</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateItem(actualIndex, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                          placeholder="Project title"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-wave-gold font-semibold mb-1">DESCRIPTION</label>
                        <textarea
                          value={item.description}
                          onChange={(e) => updateItem(actualIndex, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                          rows={2}
                          placeholder="Describe the project"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-wave-gold font-semibold mb-1">YEAR</label>
                          <input
                            type="number"
                            value={item.year}
                            onChange={(e) => updateItem(actualIndex, 'year', parseInt(e.target.value))}
                            className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-wave-gold font-semibold mb-1">CATEGORY</label>
                          <select
                            value={item.category}
                            onChange={(e) => updateItem(actualIndex, 'category', e.target.value)}
                            className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                          >
                            {(item.type === 'video' ? cinematographyCategories : photographyCategories).map(
                              (cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-wave-gold font-semibold mb-1">CLIENT</label>
                          <input
                            type="text"
                            value={item.client || ''}
                            onChange={(e) => updateItem(actualIndex, 'client', e.target.value || undefined)}
                            className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                            placeholder="Optional"
                          />
                        </div>
                      </div>

                      {item.type === 'video' ? (
                        <div>
                          <label className="block text-xs text-wave-gold font-semibold mb-1">VIDEO URL</label>
                          <input
                            type="text"
                            value={item.videoUrl || ''}
                            onChange={(e) => updateItem(actualIndex, 'videoUrl', e.target.value)}
                            className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                            placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="block text-xs text-wave-gold font-semibold mb-1">IMAGE PATH</label>
                          <input
                            type="text"
                            value={item.image || ''}
                            onChange={(e) => updateItem(actualIndex, 'image', e.target.value)}
                            className="w-full px-3 py-2 bg-wave-dark text-white rounded border border-wave-dark focus:border-wave-gold outline-none text-sm"
                            placeholder="/portfolio/image.jpg"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-4 pt-2 border-t border-wave-dark">
                        <label className="flex items-center gap-2 text-wave-gray cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.featured || false}
                            onChange={(e) => updateItem(actualIndex, 'featured', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Featured</span>
                        </label>

                        <div className="ml-auto space-x-2">
                          <button
                            onClick={() => duplicateItem(actualIndex)}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => deleteItem(actualIndex)}
                            className="text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Final Save Button */}
        {items.length > 0 && (
          <div className="mt-8 sticky bottom-6 flex justify-center">
            <button
              onClick={savePortfolio}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition text-lg shadow-lg"
            >
              {saving ? '💾 Saving...' : '💾 Save All Changes to portfolio.ts'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
