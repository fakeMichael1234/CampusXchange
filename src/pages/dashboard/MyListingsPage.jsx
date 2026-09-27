import React from 'react';
import { ShoppingBag, PlusCircle, Edit, Trash2, Eye, Heart, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';

export const MyListingsPage = ({ onNavigate }) => {
  const { currentUser, products, deleteProduct, updateProduct, showToast } = useStore();
  const userListings = products.filter(p => p.sellerId === currentUser?.id || p.sellerName === currentUser?.name);

  return (
    <div className="space-y-6 font-sans">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cx-800">
        <div>
          <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
            MY CAMPUS LISTINGS
          </h1>
          <p className="text-xs text-cx-400 font-mono mt-1">
            Manage your active items, edit prices, or mark items as sold.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => onNavigate('/dashboard/listings/create')}
        >
          List New Item
        </Button>
      </div>

      {userListings.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No Active Listings"
          description="You haven't listed any items on CampusXchange yet."
          actionLabel="Create Your First Listing"
          onAction={() => onNavigate('/dashboard/listings/create')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userListings.map(prod => (
            <Card key={prod.id} variant="default" className="space-y-4">
              <div className="flex space-x-4">
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-24 h-24 rounded-cx-lg object-cover bg-cx-950 border border-cx-700 shrink-0"
                />
                <div className="flex-1 overflow-hidden space-y-1">
                  <div className="flex justify-between items-center">
                    <StatusBadge text={prod.status || 'Active'} status="active" />
                    <span className="text-[10px] font-mono text-cx-500">{prod.postedDate}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-cx-0 truncate">{prod.title}</h3>
                  <div className="text-base font-bold font-mono text-cx-0">₹{prod.price}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-cx-800 flex items-center justify-between font-mono text-xs text-cx-400">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1"><Eye className="w-3.5 h-3.5 text-cx-500" /> <span>{prod.views || 0}</span></span>
                  <span className="flex items-center space-x-1"><Heart className="w-3.5 h-3.5 text-cx-500" /> <span>{prod.likes || 0}</span></span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(`/dashboard/listings/${prod.id}/edit`)}
                    aria-label="Edit Listing"
                  >
                    <Edit className="w-3.5 h-3.5 text-cx-0" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProduct(prod.id)}
                    aria-label="Delete Listing"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-cx-300 hover:text-cx-0" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
