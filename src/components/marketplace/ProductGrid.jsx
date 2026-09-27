import React from 'react';
import { ProductCard } from './ProductCard';
import { LoadingState } from '../ui/LoadingState';
import { EmptyState } from '../ui/EmptyState';
import { Search } from 'lucide-react';

export const ProductGrid = ({
  products,
  isLoading,
  onNavigate,
  onContact,
  onResetFilters
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <LoadingState key={idx} type="card-skeleton" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No Campus Listings Found"
        description="We couldn't find any listings matching your search or active filter criteria."
        actionLabel="Reset Search & Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((prod) => (
        <ProductCard
          key={prod.id}
          product={prod}
          onNavigate={onNavigate}
          onContact={onContact}
        />
      ))}
    </div>
  );
};
