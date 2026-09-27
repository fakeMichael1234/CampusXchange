import React from 'react';
import { Package, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';

export const OrdersPage = ({ onNavigate }) => {
  const { orders, updateOrderStatus } = useStore();

  return (
    <div className="space-y-6 font-sans">
      
      <div className="pb-4 border-b border-cx-800">
        <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
          ORDERS & CAMPUS HANDOVERS
        </h1>
        <p className="text-xs text-cx-400 font-mono mt-1">
          Track active purchases, handover confirmations, and order status updates.
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No Active Orders"
          description="You currently have no active pending or confirmed campus orders."
          actionLabel="Browse Marketplace"
          onAction={() => onNavigate('/marketplace')}
        />
      ) : (
        <Card variant="default" className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-cx-950 border-b border-cx-800 text-cx-500 uppercase text-[10px]">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Product Title</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Campus</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cx-800">
                {orders.map(ord => (
                  <tr key={ord.id} className="hover:bg-cx-850/50 transition-colors">
                    <td className="p-4 font-bold text-cx-0">{ord.id}</td>
                    <td className="p-4 font-sans font-medium text-cx-0 truncate max-w-[200px]">{ord.productTitle}</td>
                    <td className="p-4 font-bold text-cx-0">₹{ord.price}</td>
                    <td className="p-4 text-cx-400">{ord.campus}</td>
                    <td className="p-4 text-cx-500">{ord.date}</td>
                    <td className="p-4">
                      <StatusBadge text={ord.status} status={ord.status === 'Completed' ? 'inactive' : 'active'} />
                    </td>
                    <td className="p-4 text-right">
                      {ord.status !== 'Completed' ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => updateOrderStatus(ord.id, 'Completed')}
                        >
                          Confirm Handover
                        </Button>
                      ) : (
                        <span className="text-[10px] text-cx-500 uppercase">Fulfilled</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
};
