import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, ShieldCheck, MessageSquare } from 'lucide-react';
import { useStore, formatINR } from '../../context/StoreContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const ProductCard = ({ product, onNavigate, onContact }) => {
  const { isInWishlist, toggleWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-cx-900 border border-cx-800 rounded-cx-xl overflow-hidden flex flex-col justify-between shadow-cx-card-dark hover:border-cx-600 transition-all duration-200 group"
    >
      {/* Image Header Container */}
      <div 
        className="relative aspect-[4/3] w-full bg-cx-950 overflow-hidden cursor-pointer" 
        onClick={() => onNavigate(`/product/${product.id}`)}
      >
        <img
          src={product.images ? product.images[0] : 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cx-950 via-transparent to-transparent opacity-60" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="pointer-events-auto bg-cx-950/80 backdrop-blur-md text-cx-200 px-2 py-0.5 rounded text-[10px] font-mono border border-cx-700 font-medium">
            {product.condition}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label="Toggle Wishlist"
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md border transition-all ${
              isWishlisted
                ? 'bg-cx-0 text-cx-950 border-cx-0'
                : 'bg-cx-950/80 text-cx-0 border-cx-750 hover:bg-cx-950 hover:border-cx-400'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-cx-950 text-cx-950' : ''}`} />
          </button>
        </div>

        {/* Campus Badge */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
          <span className="bg-cx-900/90 text-cx-300 px-2 py-0.5 rounded text-[9px] font-mono border border-cx-750 flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-cx-0 shrink-0" />
            <span className="truncate max-w-[150px]">{product.campus.split(',')[0]}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold font-mono text-cx-0 tracking-tight">
              {formatINR(product.price)}
            </span>
            <span className="text-[10px] font-mono text-cx-500">
              {product.postedDate}
            </span>
          </div>

          <h3 
            onClick={() => onNavigate(`/product/${product.id}`)}
            className="text-xs font-semibold text-cx-100 tracking-tight line-clamp-2 cursor-pointer hover:text-cx-300 transition-colors"
          >
            {product.title}
          </h3>
        </div>

        {/* Location & Seller */}
        <div className="pt-2 border-t border-cx-800/80 space-y-1 text-[11px] font-mono text-cx-400">
          <div className="flex items-center space-x-1 truncate">
            <MapPin className="w-3 h-3 text-cx-500 shrink-0" />
            <span className="truncate">{product.pickupLocation || product.campus}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-cx-500">
            <span>Seller: {product.sellerName}</span>
            <span className="text-cx-300">Verified</span>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="pt-1 flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            fullWidth
            onClick={() => onNavigate(`/product/${product.id}`)}
            className="text-xs py-1.5 font-mono"
          >
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onContact(product)}
            className="px-2.5 py-1.5 border border-cx-750 hover:bg-cx-800"
            title="Chat Seller"
          >
            <MessageSquare className="w-3.5 h-3.5 text-cx-0" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
