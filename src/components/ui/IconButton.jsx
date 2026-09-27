import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * CampusXchange Icon Only Button
 */
export const IconButton = React.forwardRef(({
  icon,
  ariaLabel,
  variant = 'ghost',
  size = 'md',
  isDisabled = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  const sizeStyles = {
    sm: "w-8 h-8 rounded-cx-sm text-xs",
    md: "w-10 h-10 rounded-cx-md text-sm",
    lg: "w-12 h-12 rounded-cx-lg text-base",
  };

  const variantStyles = {
    primary: "bg-cx-0 text-cx-950 hover:bg-cx-200 active:bg-cx-300 shadow-cx-subtle",
    secondary: "bg-cx-850 text-cx-0 border border-cx-700 hover:bg-cx-800 hover:border-cx-600",
    ghost: "bg-transparent text-cx-400 hover:text-cx-0 hover:bg-cx-800/80 active:bg-cx-800",
    outline: "bg-transparent text-cx-0 border border-cx-700 hover:border-cx-400 hover:bg-cx-900/50",
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={isDisabled ? {} : { scale: 1.05 }}
      whileTap={isDisabled ? {} : { scale: 0.95 }}
      className={clsx(
        "inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cx-0 disabled:opacity-40 disabled:pointer-events-none shrink-0",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon}
    </motion.button>
  );
});

IconButton.displayName = 'IconButton';
