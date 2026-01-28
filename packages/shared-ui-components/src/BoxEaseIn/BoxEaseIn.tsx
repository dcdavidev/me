import React, { useRef } from 'react';

import { motion, useInView } from 'motion/react';

export interface BoxEaseInProps extends React.PropsWithChildren {
  style?: React.CSSProperties;
  className?: string;
}

export const BoxEaseIn: React.FC<BoxEaseInProps> = ({
  children,
  style,
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeIn' }}
      style={{
        position: 'relative',
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};
