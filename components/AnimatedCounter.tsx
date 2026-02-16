
import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, prefix = '', decimals = 0 }) => {
  const springValue = useSpring(0, { stiffness: 60, damping: 20 });
  const displayValue = useTransform(springValue, (latest) => {
    // Cast latest to number to access toFixed property which is unknown by default in transform
    return prefix + (latest as number).toFixed(decimals);
  });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return <motion.span className="tabular-nums">{displayValue}</motion.span>;
};

export default AnimatedCounter;
