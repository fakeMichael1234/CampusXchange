import React from 'react';
import { clsx } from 'clsx';
import { Inbox, Search, ShoppingBag, Heart, Bell, MessageSquare } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: IconComponent = Inbox,
  title = "No Items Found",
  description = "There are currently no items to display in this view.",
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div className={clsx(
      "flex flex-col items-center justify-center p-12 text-center border border-dashed border-cx-800 rounded-cx-2xl bg-cx-950/40 my-4 space-y-4",
      className
    )}>
      <div className="w-14 h-14 rounded-cx-xl bg-cx-900 border border-cx-700 flex items-center justify-center text-cx-400">
        <IconComponent className="w-7 h-7" />
      </div>

      <div className="space-y-1.5 max-w-sm">
        <h3 className="text-base font-semibold text-cx-0 tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-cx-400 font-normal leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
