"use client";
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import GlobalLoader from './GlobalLoader';
import { usePathname } from 'next/navigation';

export default function AppLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Reset loading state on mount (refresh)
    setIsLoading(true);
    
    // Simulate initialization time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // Slightly longer than the progress animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && <GlobalLoader />}
    </AnimatePresence>
  );
}
