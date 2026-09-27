import React from 'react';
import { clsx } from 'clsx';
import { Badge } from '../ui/Badge';

export const Section = ({
  title,
  subtitle,
  tag,
  actions,
  children,
  className = '',
  divider = true,
}) => {
  return (
    <section className={clsx("py-8 sm:py-12", className)}>
      {(title || subtitle || tag || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            {tag && (
              <Badge variant="technical" size="sm">
                {tag}
              </Badge>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-bold text-cx-0 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-cx-400 max-w-2xl font-normal leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex items-center space-x-3 shrink-0">
              {actions}
            </div>
          )}
        </div>
      )}

      <div>{children}</div>

      {divider && (
        <div className="mt-12 pt-0 border-b border-cx-800/80" />
      )}
    </section>
  );
};
