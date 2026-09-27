import React from 'react';
import { Clock, Download, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';

export const PurchasesPage = ({ onNavigate }) => {
  const { orders, showToast } = useStore();
  const completedPurchases = orders.filter(o => o.status === 'Completed' || o.status === 'Confirmed');

  return (
    <div className="space-y-6 font-sans">
      
      <div className="pb-4 border-b border-cx-800">
        <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
          PURCHASE HISTORY & RECEIPTS
        </h1>
        <p className="text-xs text-cx-400 font-mono mt-1">
          Complete log of past peer-to-peer campus exchanges and verified transaction records.
        </p>
      </div>

      {completedPurchases.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No Purchase History"
          description="You haven't completed any campus purchases yet."
          actionLabel="Explore Marketplace"
          onAction={() => onNavigate('/marketplace')}
        />
      ) : (
        <div className="space-y-4">
          {completedPurchases.map(ord => (
            <Card key={ord.id} variant="default" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-cx-0">{ord.id}</span>
                  <StatusBadge text={ord.status} status="inactive" />
                </div>
                <h3 className="text-base font-semibold text-cx-0">{ord.productTitle}</h3>
                <div className="font-mono text-xs text-cx-400">
                  Seller: {ord.sellerName} // Handover: {ord.campus} // Date: {ord.date}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold font-mono text-cx-0">₹{ord.price}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => showToast(`Receipt for ${ord.id} downloaded.`, "Receipt Issued")}
                >
                  Download Receipt
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
