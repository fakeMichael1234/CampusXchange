import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const Card = ({
  children,
  variant = 'default',
  isHoverable = false,
  className = '',
  onClick,
  ...props
}) => {
  const variantStyles = {
    default: "bg-cx-900/90 border border-cx-700/80 text-cx-0 shadow-cx-card-dark backdrop-blur-md",
    surface: "bg-cx-850 border border-cx-700 text-cx-0",
    outline: "bg-transparent border border-cx-700 text-cx-0 hover:border-cx-500",
    technical: "bg-cx-950 border border-cx-700/90 text-cx-0 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:border-t-2 before:border-l-2 before:border-cx-0",
    glass: "bg-cx-900/60 backdrop-blur-xl border border-cx-700/60 text-cx-0",
  };

  const hoverAnimation = isHoverable
    ? {
        whileHover: { y: -3, borderColor: 'rgba(255, 255, 255, 0.3)' },
        transition: { duration: 0.2, ease: 'easeOut' },
      }
    : {};

  return (
    <motion.div
      onClick={onClick}
      className={clsx(
        "rounded-cx-xl p-6 transition-all duration-200",
        variantStyles[variant],
        isHoverable && "cursor-pointer hover:shadow-cx-glow",
        className
      )}
      {...hoverAnimation}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={clsx("flex flex-col space-y-1.5 mb-4", className)}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', as: Component = 'h3' }) => (
  <Component className={clsx("text-lg font-semibold text-cx-0 tracking-tight", className)}>
    {children}
  </Component>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={clsx("text-sm text-cx-400 font-normal leading-relaxed", className)}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={clsx("space-y-4", className)}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={clsx("mt-6 pt-4 border-t border-cx-800 flex items-center justify-between gap-3", className)}>
    {children}
  </div>
);
