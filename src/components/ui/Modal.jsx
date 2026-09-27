import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { backdropVariants, modalVariants } from '../../utils/animationVariants';
import { IconButton } from './IconButton';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-lg',
  showCloseButton = true,
  className = '',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-cx-950/80 backdrop-blur-md"
          />

          {/* Modal Content Dialog */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            className={clsx(
              "relative w-full bg-cx-900 border border-cx-700/90 rounded-cx-2xl shadow-cx-card-dark text-cx-0 z-10 overflow-hidden my-8",
              maxWidth,
              className
            )}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between p-6 pb-4 border-b border-cx-800">
                <div>
                  {title && (
                    <h3 className="text-xl font-semibold text-cx-0 tracking-tight">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-xs text-cx-400 mt-1 font-normal">
                      {subtitle}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <IconButton
                    icon={<X className="w-4 h-4" />}
                    ariaLabel="Close modal"
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                  />
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="p-6 pt-4 border-t border-cx-800 bg-cx-950/40 flex items-center justify-end space-x-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
