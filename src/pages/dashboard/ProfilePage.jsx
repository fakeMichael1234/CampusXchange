import React, { useState } from 'react';
import { ShieldCheck, GraduationCap, Building, Star, Calendar, ShoppingBag, Edit } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { VerifiedBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/marketplace/ProductCard';

export const ProfilePage = ({ onNavigate }) => {
  const { currentUser, products } = useStore();
  const [activeTab, setActiveTab] = useState('listings');

  const myProducts = products.filter(p => p.sellerId === currentUser?.id || p.sellerName === currentUser?.name);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Profile Header Card */}
      <Card variant="technical" className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center space-x-4">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-cx-0 shadow-cx-card-dark"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-cx-0">{currentUser?.name}</h1>
                <VerifiedBadge text="VERIFIED STUDENT" size="sm" />
              </div>
              <p className="text-xs font-mono text-cx-400">{currentUser?.course} // {currentUser?.year}</p>
              <div className="flex items-center space-x-2 text-xs font-mono text-cx-500">
                <Building className="w-3.5 h-3.5" />
                <span>{currentUser?.college}</span>
              </div>
            </div>
          </div>

          <Button variant="secondary" size="sm" onClick={() => onNavigate('/dashboard/settings')} leftIcon={<Edit className="w-3.5 h-3.5" />}>
            Edit Profile
          </Button>

        </div>

        {/* Stats Row */}
        <div className="pt-6 border-t border-cx-800 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-center">
          <div className="p-3 bg-cx-950 rounded-cx-md border border-cx-800">
            <div className="text-xs text-cx-500 uppercase">REPUTATION RATING</div>
            <div className="text-xl font-bold text-cx-0 mt-0.5">{currentUser?.rating} / 5.0</div>
          </div>
          <div className="p-3 bg-cx-950 rounded-cx-md border border-cx-800">
            <div className="text-xs text-cx-500 uppercase">ITEMS TRADED</div>
            <div className="text-xl font-bold text-cx-0 mt-0.5">{currentUser?.itemsSold || 14}</div>
          </div>
          <div className="p-3 bg-cx-950 rounded-cx-md border border-cx-800">
            <div className="text-xs text-cx-500 uppercase">ACTIVE LISTINGS</div>
            <div className="text-xl font-bold text-cx-0 mt-0.5">{myProducts.length}</div>
          </div>
          <div className="p-3 bg-cx-950 rounded-cx-md border border-cx-800">
            <div className="text-xs text-cx-500 uppercase">MEMBER SINCE</div>
            <div className="text-xl font-bold text-cx-0 mt-0.5">{currentUser?.joinedDate}</div>
          </div>
        </div>
      </Card>

      {/* Profile Tabs */}
      <div className="flex space-x-4 border-b border-cx-800 font-mono text-xs">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 border-b-2 font-semibold transition-colors uppercase ${
            activeTab === 'listings' ? 'border-cx-0 text-cx-0' : 'border-transparent text-cx-500 hover:text-cx-300'
          }`}
        >
          My Active Listings ({myProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 border-b-2 font-semibold transition-colors uppercase ${
            activeTab === 'reviews' ? 'border-cx-0 text-cx-0' : 'border-transparent text-cx-500 hover:text-cx-300'
          }`}
        >
          Peer Reviews ({currentUser?.reviewsCount || 18})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'listings' ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {myProducts.map(p => (
            <ProductCard key={p.id} product={p} onNavigate={onNavigate} onContact={() => onNavigate(`/product/${p.id}`)} />
          ))}
        </div>
      ) : (
        <div className="space-y-4 font-mono text-xs">
          {[
            { name: 'Elena Rostova', rating: 5, date: '2 days ago', comment: 'Fast handover near Stata Center. Textbook was in excellent condition.' },
            { name: 'David Vance', rating: 5, date: '1 week ago', comment: 'Punctual seller, pristine condition monitor. Highly recommend.' }
          ].map((rev, i) => (
            <Card key={i} variant="default" className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-cx-0">{rev.name}</span>
                <span className="text-cx-500">{rev.date}</span>
              </div>
              <p className="text-cx-300 font-sans">{rev.comment}</p>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
