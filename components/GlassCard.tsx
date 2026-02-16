
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', animate = true, onClick }) => {
  // Use explicit conditional rendering to avoid TS narrowing issues with dynamic motion components
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={onClick}
        className={`glass rounded-2xl overflow-hidden ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
