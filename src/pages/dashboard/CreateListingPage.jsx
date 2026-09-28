import React, { useState } from 'react';
import { Upload, Plus, ShieldCheck, ArrowRight, Image as ImageIcon, Check } from 'lucide-react';
import { useStore, formatINR } from '../../context/StoreContext';
import { CATEGORIES, INDIAN_CAMPUSES } from '../../data/mockData';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/marketplace/ProductCard';

export const CreateListingPage = ({ onNavigate }) => {
  const { addProduct, selectedCampus: defaultCampus } = useStore();

  const SAMPLE_PHOTOS = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48b?auto=format&fit=crop&w=800&q=80'
  ];

  const [formData, setFormData] = useState({
    title: 'Dell Latitude 14" Laptop (16GB RAM / 512GB SSD)',
    category: 'electronics',
    price: '28000',
    condition: 'Like New',
    description: 'Lightly used Dell Intel i7 laptop. Clean body, 6 hour battery backup, original charger included.',
    campus: defaultCampus || INDIAN_CAMPUSES[0],
    pickupLocation: defaultCampus || INDIAN_CAMPUSES[0],
    images: [SAMPLE_PHOTOS[0]]
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  const handleSelectSamplePhoto = (url) => {
    if (!formData.images.includes(url)) {
      setFormData(prev => ({ ...prev, images: [url, ...prev.images] }));
    }
  };

  const handleAddCustomImageUrl = () => {
    if (imageUrlInput.trim()) {
      setFormData(prev => ({ ...prev, images: [imageUrlInput.trim(), ...prev.images] }));
      setImageUrlInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;
    
    addProduct({
      ...formData,
      price: Number(formData.price)
    });

    onNavigate('/dashboard/listings');
  };

  const previewProduct = {
    id: 'preview',
    title: formData.title || 'Product Title Spec',
    price: formData.price || '0',
    campus: formData.campus,
    pickupLocation: formData.pickupLocation,
    condition: formData.condition,
    images: formData.images.length > 0 ? formData.images : [SAMPLE_PHOTOS[0]],
    postedDate: 'Just now',
    sellerName: 'You'
  };

  return (
    <div className="space-y-6 font-sans">
      
      <div className="pb-4 border-b border-cx-800">
        <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
          POST AN ITEM (SELL)
        </h1>
        <p className="text-xs text-cx-400 font-mono mt-1">
          Publish a classified listing to verified college peers across your campus network.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Inputs */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="LISTING TITLE"
              placeholder="e.g. Higher Engineering Math B.S. Grewal 44th Ed"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-cx-400 font-medium block mb-1.5">
                  CATEGORY
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-cx-900 border border-cx-700 text-cx-0 rounded-cx-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-cx-0"
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <Input
                label="PRICE (₹ INR)"
                type="number"
                placeholder="850"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-cx-400 font-medium block mb-1.5">
                  CONDITION
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-cx-900 border border-cx-700 text-cx-0 rounded-cx-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-cx-0"
                >
                  <option value="Like New">Like New</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-cx-400 font-medium block mb-1.5">
                  CAMPUS NETWORK
                </label>
                <select
                  value={formData.campus}
                  onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                  className="w-full bg-cx-900 border border-cx-700 text-cx-0 rounded-cx-md px-3.5 py-2.5 text-sm focus:outline-none focus:border-cx-0"
                >
                  {INDIAN_CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <Input
              label="HANDOVER PICKUP SPOT"
              placeholder="e.g. SRM IST Ramapuram, Chennai"
              value={formData.pickupLocation}
              onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
              required
            />

            <Textarea
              label="DESCRIPTION & SPECIFICATIONS"
              placeholder="Include specs, condition details, accessories included..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            {/* Photo Selection / Upload */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-mono uppercase tracking-wider text-cx-400 font-medium block">
                SELECT / UPLOAD LISTING PHOTOS
              </label>

              {/* Sample Photo Selectors */}
              <div className="grid grid-cols-6 gap-2">
                {SAMPLE_PHOTOS.map((url, idx) => {
                  const isSelected = formData.images.includes(url);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectSamplePhoto(url)}
                      className={`relative aspect-square rounded-cx-md overflow-hidden cursor-pointer border-2 transition-all ${
                        isSelected ? 'border-cx-0 scale-95' : 'border-cx-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt="sample photo" className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute inset-0 bg-cx-0/40 flex items-center justify-center">
                          <Check className="w-4 h-4 text-cx-950 font-bold" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Custom Image URL */}
              <div className="flex space-x-2 pt-1">
                <Input
                  placeholder="Or paste image URL (https://...)"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                />
                <Button type="button" variant="secondary" size="md" onClick={handleAddCustomImageUrl}>
                  Add Photo
                </Button>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-3">
              <Button type="submit" variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                Publish Campus Listing
              </Button>
            </div>
          </form>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono text-xs text-cx-400 uppercase tracking-wider font-semibold">
            LIVE CLASSIFIED CARD PREVIEW
          </div>
          <ProductCard product={previewProduct} onNavigate={() => {}} onContact={() => {}} />
        </div>

      </div>

    </div>
  );
};
