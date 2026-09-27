import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

/**
 * CampusXchange Standard Button System
 * 
 * Variants:
 * - primary: Black background / White text (Dark mode: White bg / Black text)
 * - secondary: White background / Black text / Subtle border (Dark mode: Dark bg / White text)
 * - ghost: Transparent background / Subtle hover state
 * - outline: Bordered button with subtle background hover
 * - danger: Technical dark high-contrast action state
 */

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  className = '',
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cx-0 dark:focus-visible:ring-cx-0 focus-visible:ring-offset-2 focus-visible:ring-offset-cx-950 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none select-none tracking-tight";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-cx-sm gap-1.5 min-h-[32px]",
    md: "text-sm px-4 py-2.5 rounded-cx-md gap-2 min-h-[40px]",
    lg: "text-base px-6 py-3 rounded-cx-lg gap-2.5 min-h-[48px]",
  };

  const variantStyles = {
    // Primary: Invert contrast based on theme for maximum crispness
    primary: "bg-cx-0 text-cx-950 hover:bg-cx-200 active:bg-cx-300 dark:bg-cx-0 dark:text-cx-950 dark:hover:bg-cx-200 shadow-cx-subtle font-semibold border border-transparent",
    
    // Secondary: Dark background with light border in dark mode, light with dark border in light mode
    secondary: "bg-cx-850 text-cx-0 border border-cx-700 hover:bg-cx-800 hover:border-cx-600 active:bg-cx-700 dark:bg-cx-900 dark:text-cx-0 dark:border-cx-700 dark:hover:bg-cx-800",
    
    // Ghost: Subtle minimalist hover
    ghost: "bg-transparent text-cx-300 hover:text-cx-0 hover:bg-cx-800/60 active:bg-cx-800 dark:text-cx-300 dark:hover:text-cx-0 dark:hover:bg-cx-800/60",
    
    // Outline: Transparent with explicit border
    outline: "bg-transparent text-cx-0 border border-cx-700 hover:border-cx-400 hover:bg-cx-900/50 active:bg-cx-850",

    // Technical Mono Sharp Action
    technical: "bg-cx-900 text-cx-0 border border-cx-600 font-mono uppercase text-xs tracking-wider hover:bg-cx-800 hover:border-cx-0 transition-colors",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      whileHover={isDisabled || isLoading ? {} : { scale: 1.01 }}
      whileTap={isDisabled || isLoading ? {} : { scale: 0.98 }}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        widthStyle,
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}

      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
