import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, gradient = false, ...props }) {
  return (
    <motion.div
      className={`glass ${gradient ? 'gradient-border' : ''} ${className}`}
      whileHover={hover ? { y: -2, scale: 1.005 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
