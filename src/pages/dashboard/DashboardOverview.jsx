import React from 'react';
import { 
  ShoppingBag, 
  Package, 
  Clock, 
  Heart, 
  MessageSquare, 
  PlusCircle,
  ShieldCheck,
  Tag,
  Search
} from 'lucide-react';
import { useStore, formatINR } from '../../context/StoreContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { ProductCard } from '../../components/marketplace/ProductCard';

export const DashboardOverview = ({ onNavigate }) => {
  const { currentUser, products, wishlist, orders, offers, messages } = useStore();

  const userListings = products.filter(p => p.sellerId === currentUser?.id || p.sellerName === currentUser?.name);
  const pendingOffers = offers.filter(o => o.status === 'Pending');
  const recentOrders = orders.slice(0, 3);
  const recentMessages = messages.slice(0, 2);
  const recommendations = products.filter(p => p.sellerId !== currentUser?.id).slice(0, 3);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-cx-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-cx-0 tracking-tight uppercase">
            WELCOME BACK, {currentUser?.name?.split(' ')[0] || 'STUDENT'}
          </h1>
          <p className="text-xs text-cx-400 font-mono mt-1">
            Verified Student at {currentUser?.college || 'SRM IST Ramapuram, Chennai'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
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
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <button
          onClick={() => onNavigate('/dashboard/listings/create')}
          className="p-3 bg-cx-900 border border-cx-750 hover:border-cx-500 rounded-cx-lg text-left space-y-1 transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-cx-0" />
          <div className="font-bold text-cx-0">Sell an Item</div>
          <div className="text-[10px] text-cx-500">Create new listing</div>
        </button>

        <button
          onClick={() => onNavigate('/marketplace')}
          className="p-3 bg-cx-900 border border-cx-750 hover:border-cx-500 rounded-cx-lg text-left space-y-1 transition-colors"
        >
          <Search className="w-4 h-4 text-cx-0" />
          <div className="font-bold text-cx-0">Browse Marketplace</div>
          <div className="text-[10px] text-cx-500">Explore listings</div>
        </button>

        <button
          onClick={() => onNavigate('/dashboard/messages')}
          className="p-3 bg-cx-900 border border-cx-750 hover:border-cx-500 rounded-cx-lg text-left space-y-1 transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-cx-0" />
          <div className="font-bold text-cx-0">View Messages</div>
          <div className="text-[10px] text-cx-500">{messages.length} active chats</div>
        </button>

        <button
          onClick={() => onNavigate('/dashboard/wishlist')}
          className="p-3 bg-cx-900 border border-cx-750 hover:border-cx-500 rounded-cx-lg text-left space-y-1 transition-colors"
        >
          <Heart className="w-4 h-4 text-cx-0" />
          <div className="font-bold text-cx-0">Saved Wishlist</div>
          <div className="text-[10px] text-cx-500">{wishlist.length} saved items</div>
        </button>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card variant="technical">
          <CardContent className="p-4 space-y-1">
            <div className="flex justify-between items-center text-cx-500 font-mono text-[10px] uppercase">
              <span>MY LISTINGS</span>
              <ShoppingBag className="w-4 h-4 text-cx-0" />
            </div>
            <div className="text-2xl font-bold font-mono text-cx-0">{userListings.length}</div>
            <div className="text-[10px] text-cx-400">Active campus items</div>
          </CardContent>
        </Card>

        <Card variant="technical">
          <CardContent className="p-4 space-y-1">
            <div className="flex justify-between items-center text-cx-500 font-mono text-[10px] uppercase">
              <span>PENDING OFFERS</span>
              <Tag className="w-4 h-4 text-cx-0" />
            </div>
            <div className="text-2xl font-bold font-mono text-cx-0">{pendingOffers.length}</div>
            <div className="text-[10px] text-cx-400">Offers submitted</div>
          </CardContent>
        </Card>

        <Card variant="technical">
          <CardContent className="p-4 space-y-1">
            <div className="flex justify-between items-center text-cx-500 font-mono text-[10px] uppercase">
              <span>ORDERS / HANDOVERS</span>
              <Package className="w-4 h-4 text-cx-0" />
            </div>
            <div className="text-2xl font-bold font-mono text-cx-0">{orders.length}</div>
            <div className="text-[10px] text-cx-400">Purchases & sales</div>
          </CardContent>
        </Card>

        <Card variant="technical">
          <CardContent className="p-4 space-y-1">
            <div className="flex justify-between items-center text-cx-500 font-mono text-[10px] uppercase">
              <span>SAVED ITEMS</span>
              <Heart className="w-4 h-4 text-cx-0" />
            </div>
            <div className="text-2xl font-bold font-mono text-cx-0">{wishlist.length}</div>
            <div className="text-[10px] text-cx-400">Wishlist items</div>
          </CardContent>
        </Card>
      </div>

      {/* Orders & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-mono text-cx-0 uppercase">
              RECENT ORDERS & HANDOVERS
            </h3>
            <button onClick={() => onNavigate('/dashboard/orders')} className="text-xs font-mono text-cx-400 hover:text-cx-0">
              View All Orders
            </button>
          </div>

          <Card variant="default" className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-cx-950 border-b border-cx-800 text-cx-500 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cx-800/80">
                  {recentOrders.map(ord => (
                    <tr key={ord.id} className="hover:bg-cx-850/50 transition-colors">
                      <td className="p-3 font-semibold text-cx-0">{ord.id}</td>
                      <td className="p-3 truncate max-w-[160px] font-sans text-cx-300">{ord.productTitle}</td>
                      <td className="p-3 font-bold text-cx-0">{formatINR(ord.price)}</td>
                      <td className="p-3">
                        <StatusBadge text={ord.status} status={ord.status === 'Completed' ? 'inactive' : 'active'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-mono text-cx-0 uppercase">
              DIRECT MESSAGES
            </h3>
            <button onClick={() => onNavigate('/dashboard/messages')} className="text-xs font-mono text-cx-400 hover:text-cx-0">
              Open Chat
            </button>
          </div>

          <div className="space-y-3">
            {recentMessages.map(msg => (
              <div 
                key={msg.id} 
                onClick={() => onNavigate('/dashboard/messages')}
                className="p-4 bg-cx-900 border border-cx-800 hover:border-cx-600 rounded-cx-xl cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={msg.participant.avatar} alt={msg.participant.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-bold text-cx-0">{msg.participant.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-cx-500">{msg.timestamp}</span>
                </div>
                <p className="text-xs text-cx-400 line-clamp-1 font-sans">{msg.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recommended Campus Findings */}
      <div className="space-y-4 pt-4 border-t border-cx-800">
        <h3 className="text-base font-bold font-mono text-cx-0 uppercase">
          RECOMMENDED NEAR YOUR CAMPUS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recommendations.map(prod => (
            <ProductCard key={prod.id} product={prod} onNavigate={onNavigate} onContact={() => onNavigate(`/product/${prod.id}`)} />
          ))}
        </div>
      </div>

    </div>
  );
};
