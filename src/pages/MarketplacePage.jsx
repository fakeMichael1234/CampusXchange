import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Container } from '../components/ui/Container';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { FilterBar } from '../components/marketplace/FilterBar';
import { ProductGrid } from '../components/marketplace/ProductGrid';
import { Button } from '../components/ui/Button';
import { PlusCircle } from 'lucide-react';

export const MarketplacePage = ({ onNavigate }) => {
  const { products, searchQuery, setSearchQuery, selectedCampus: storeCampus } = useStore();
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCampus, setSelectedCampus] = useState('All Campuses');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [postedTime, setPostedTime] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Check URL params for category on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('category=')) {
      const cat = hash.split('category=')[1].split('&')[0];
      if (cat) setSelectedCategory(cat);
    }
  }, []);

  // Dynamic Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search term match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        const matchesSeller = prod.sellerName.toLowerCase().includes(q);
        const matchesCategory = prod.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSeller && !matchesCategory) return false;
      }

      // Category match
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }

      // Campus match
      if (selectedCampus !== 'All Campuses' && !prod.campus.includes(selectedCampus.split(',')[0].trim())) {
        return false;
      }

      // Condition match
      if (selectedCondition !== 'All Conditions' && prod.condition !== selectedCondition) {
        return false;
      }

      // Price Range match
      if (minPrice !== '' && Number(prod.price) < Number(minPrice)) return false;
      if (maxPrice !== '' && Number(prod.price) > Number(maxPrice)) return false;

      // Posted time match
      if (postedTime === 'today' && !prod.postedDate.includes('hour') && !prod.postedDate.includes('Just now')) {
        return false;
      }
      if (postedTime === '3days' && prod.postedDate.includes('day') && parseInt(prod.postedDate) > 3) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
      return new Date(b.createdAt) - new Date(a.createdAt); // newest
    });
  }, [products, searchQuery, selectedCategory, selectedCampus, selectedCondition, minPrice, maxPrice, postedTime, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCampus('All Campuses');
    setSelectedCondition('All Conditions');
    setMinPrice('');
    setMaxPrice('');
    setPostedTime('all');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 font-sans flex flex-col justify-between selection:bg-cx-0 selection:text-cx-950">
      
      {/* Top Navbar */}
      <Navbar currentPath="/marketplace" onNavigate={onNavigate} />

      {/* Main Marketplace Content */}
      <main className="py-8 flex-1">
        <Container size="xl" className="space-y-6">
          
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cx-800">
            <div>
              <h1 className="text-3xl font-extrabold text-cx-0 tracking-tight uppercase">
                CAMPUS MARKETPLACE
              </h1>
              <p className="text-xs text-cx-400 font-mono mt-1">
                Showing {filteredProducts.length} verified listings across university networks
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              leftIcon={<PlusCircle className="w-4 h-4" />}
              onClick={() => onNavigate('/dashboard/listings/create')}
              className="font-mono text-xs uppercase"
            >
              Post an Item (Sell)
            </Button>
          </div>

          {/* Filters Bar */}
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedCampus={selectedCampus}
            onCampusChange={setSelectedCampus}
            selectedCondition={selectedCondition}
            onConditionChange={setSelectedCondition}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            postedTime={postedTime}
            onPostedTimeChange={setPostedTime}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
          />

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            onNavigate={onNavigate}
            onContact={(prod) => onNavigate(`/product/${prod.id}`)}
            onResetFilters={handleResetFilters}
          />

        </Container>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Mobile Navigation */}
      <MobileBottomNav currentPath="/marketplace" onNavigate={onNavigate} />

    </div>
  );
};
