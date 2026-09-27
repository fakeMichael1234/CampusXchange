import React from 'react';
import { clsx } from 'clsx';
import { Loader2, Cpu } from 'lucide-react';

export const Skeleton = ({ className = '', ...props }) => (
  <div
    className={clsx(
      "animate-pulse rounded-cx-md bg-cx-800/80 border border-cx-700/40",
      className
    )}
    {...props}
  />
);

export const LoadingState = ({
  message = "Loading campus network...",
  type = "spinner",
  className = "",
}) => {
  if (type === "card-skeleton") {
    return (
      <div className={clsx("space-y-4 p-6 border border-cx-800 rounded-cx-xl bg-cx-900/50", className)}>
        <div className="flex items-center space-x-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    );
  }

  if (type === "technical") {
    return (
      <div className={clsx("flex flex-col items-center justify-center p-8 space-y-3 font-mono text-xs text-cx-400", className)}>
        <div className="relative">
          <div className="w-10 h-10 border border-cx-700 rounded-cx-md animate-spin flex items-center justify-center">
            <Cpu className="w-5 h-5 text-cx-0 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center space-x-2 tracking-wider uppercase">
          <span className="inline-block w-1.5 h-1.5 bg-cx-0 rounded-full animate-ping" />
          <span>{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("flex items-center justify-center p-8 space-x-3 text-cx-300 text-sm font-medium", className)}>
      <Loader2 className="w-5 h-5 animate-spin text-cx-0" />
      <span>{message}</span>
    </div>
  );
};
