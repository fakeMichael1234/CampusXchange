import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Toast = () => {
  const { toast } = useStore();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-[1080] max-w-sm bg-cx-900 border border-cx-700 text-cx-0 rounded-cx-xl p-4 shadow-cx-card-dark flex items-start space-x-3 backdrop-blur-xl"
        >
          <div className="w-8 h-8 rounded-cx-md bg-cx-0 text-cx-950 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 overflow-hidden space-y-0.5">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-cx-0">
              {toast.title}
            </h4>
            <p className="text-xs text-cx-400 font-sans leading-snug">
              {toast.message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
