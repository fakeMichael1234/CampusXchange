import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductGrid } from '../../components/marketplace/ProductGrid';
import { EmptyState } from '../../components/ui/EmptyState';

export const WishlistPage = ({ onNavigate }) => {
  const { products, wishlist } = useStore();
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="space-y-6 font-sans">
      
      <div className="pb-4 border-b border-cx-800">
        <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
          SAVED WISHLIST ITEMS
        </h1>
        <p className="text-xs text-cx-400 font-mono mt-1">
          Track saved textbooks, laptops, and campus gear for price updates.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Click the heart icon on any product in the marketplace to save it to your wishlist."
          actionLabel="Explore Marketplace"
          onAction={() => onNavigate('/marketplace')}
        />
      ) : (
        <ProductGrid
          products={wishlistedProducts}
          onNavigate={onNavigate}
          onContact={(prod) => onNavigate(`/product/${prod.id}`)}
        />
      )}

    </div>
  );
};
