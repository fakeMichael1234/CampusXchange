import React from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, ShieldCheck, Zap, Radio } from 'lucide-react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  pulse = false,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: "bg-cx-850 text-cx-300 border border-cx-700",
    verified: "bg-cx-0 text-cx-950 font-semibold shadow-cx-subtle",
    outline: "bg-transparent text-cx-300 border border-cx-700",
    subtle: "bg-cx-900/80 text-cx-400 border border-cx-800",
    technical: "bg-cx-950 text-cx-0 border border-cx-600 font-mono uppercase tracking-wider text-[10px]",
    active: "bg-cx-800 text-cx-0 border border-cx-600",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] rounded-cx-sm gap-1",
    md: "px-2.5 py-1 text-xs rounded-cx-md gap-1.5",
    lg: "px-3 py-1.5 text-sm rounded-cx-lg gap-2",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center font-medium leading-none select-none shrink-0 tracking-tight",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cx-0 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cx-0"></span>
        </span>
      )}

      {icon && <span className="shrink-0">{icon}</span>}
      
      <span>{children}</span>
    </span>
  );
};

export const VerifiedBadge = ({ text = "CAMPUS VERIFIED", size = "sm", className = "" }) => (
  <Badge 
    variant="verified" 
    size={size} 
    icon={<ShieldCheck className="w-3.5 h-3.5 shrink-0" />} 
    className={clsx("font-mono text-[10px] tracking-wider uppercase", className)}
  >
    {text}
  </Badge>
);

export const StatusBadge = ({ text, status = "active", className = "" }) => (
  <Badge 
    variant="technical" 
    size="sm" 
    pulse={status === 'active'}
    className={className}
  >
    {text}
  </Badge>
);
