/**
 * Standardized Framer Motion variants for CampusXchange
 * Clean, subtle, high-performance animations
 */

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] } 
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: 12, 
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] } 
  }
};

export const slideDown = {
  hidden: { opacity: 0, y: -16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -12, 
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] } 
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    x: 24, 
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] } 
  }
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    }
  }
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 350, damping: 25 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.97, 
    y: 8, 
    transition: { duration: 0.18, ease: 'easeIn' } 
  }
};

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const hoverSubtle = {
  scale: 1.015,
  transition: { duration: 0.2, ease: 'easeOut' }
};

export const tapSubtle = {
  scale: 0.98,
  transition: { duration: 0.1, ease: 'easeIn' }
};
