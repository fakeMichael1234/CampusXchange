import React from 'react';
import { Bell, CheckCircle2, MessageSquare, Tag, ShieldCheck, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';

export const NotificationsPage = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useStore();

  const getIcon = (type) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-4 h-4 text-cx-0" />;
      case 'offer': return <Tag className="w-4 h-4 text-cx-0" />;
      case 'wishlist': return <Heart className="w-4 h-4 text-cx-0" />;
      default: return <ShieldCheck className="w-4 h-4 text-cx-0" />;
    }
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cx-800">
        <div>
          <h1 className="text-2xl font-extrabold text-cx-0 tracking-tight uppercase">
            NOTIFICATION CENTER
          </h1>
          <p className="text-xs text-cx-400 font-mono mt-1">
            Real-time updates regarding message inquiries, offers, and campus handovers.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={markAllNotificationsRead}
          leftIcon={<CheckCircle2 className="w-4 h-4" />}
        >
          Mark All Read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No Notifications" description="You have read all recent alerts." />
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <Card
              key={n.id}
              variant="default"
              onClick={() => markNotificationRead(n.id)}
              className={`flex items-start space-x-4 cursor-pointer transition-colors ${
                !n.read ? 'bg-cx-900 border-cx-600' : 'opacity-70'
              }`}
            >
              <div className="p-2.5 rounded-cx-md bg-cx-950 border border-cx-700 shrink-0">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold font-mono text-cx-0">{n.title}</h4>
                  <span className="text-[10px] font-mono text-cx-500">{n.timestamp}</span>
                </div>
                <p className="text-xs text-cx-300 font-sans">{n.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};
