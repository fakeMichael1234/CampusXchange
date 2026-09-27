import React from 'react';
import { clsx } from 'clsx';

export const Container = ({
  children,
  size = 'xl',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={clsx(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
