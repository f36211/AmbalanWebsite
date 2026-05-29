import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Shared hook for window size with debouncing.
 * Prevents multiple resize listeners across components.
 * @param {number} debounceMs - Debounce delay in ms (default 150)
 */
export const useWindowSize = (debounceMs = 150) => {
  const [size, setSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  const timeoutRef = useRef(null);

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, debounceMs);
  }, [debounceMs]);

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);

  // Derived helpers
  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;
  const isDesktop = size.width >= 1024;

  const screenSize = 
    size.width < 480 ? 'xs' :
    size.width < 640 ? 'sm' :
    size.width < 768 ? 'md' :
    size.width < 1024 ? 'lg' :
    size.width < 1280 ? 'xl' : '2xl';

  const particleCount = 
    size.width < 480 ? 8 :
    size.width < 768 ? 12 :
    size.width < 1024 ? 16 : 20;

  return { 
    width: size.width, 
    height: size.height, 
    isMobile, 
    isTablet, 
    isDesktop, 
    screenSize, 
    particleCount 
  };
};
