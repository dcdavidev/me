import React, { useRef } from 'react';

import { motion, useInView } from 'motion/react';

export const BoxFadeIn: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeIn' }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      {children}
    </motion.div>
  );
};
