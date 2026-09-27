import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, scaleUp, staggerContainer } from '../../utils/animationVariants';

export const MotionWrapper = ({
  children,
  variant = 'slideUp',
  delay = 0,
  className = '',
  viewportOnce = true,
  ...props
}) => {
  const variantsMap = {
    fadeIn,
    slideUp,
    scaleUp,
    staggerContainer,
  };

  const selectedVariant = variantsMap[variant] || slideUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: '-50px' }}
      variants={selectedVariant}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
