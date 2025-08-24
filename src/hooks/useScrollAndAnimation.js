import { useState, useEffect, useRef, useCallback } from 'react';

export const useScrollAndAnimation = () => {
  const [isVisible, setIsVisible] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);
  const isInitializedRef = useRef(false);
  const currentElementsRef = useRef(new Set());

  const observeElements = useCallback(() => {
    if (!observerRef.current) return;
    
    // Disconnect existing observations
    observerRef.current.disconnect();
    currentElementsRef.current.clear();
    
    // Find all elements that should be animated
    const elements = document.querySelectorAll('[data-animate]');
    
    if (elements.length === 0) return;
    
    // Set initial visibility for immediate content display
    const newVisibility = {};
    elements.forEach((el) => {
      if (el.id) {
        currentElementsRef.current.add(el.id);
        // Check if element is already in viewport
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight * 1.2 && rect.bottom > -100;
        newVisibility[el.id] = isInViewport;
        observerRef.current.observe(el);
      }
    });
    
    // Update visibility state immediately
    if (Object.keys(newVisibility).length > 0) {
      setIsVisible(prev => {
        // Clear previous visibility and set new one
        const filtered = {};
        Object.keys(newVisibility).forEach(key => {
          filtered[key] = newVisibility[key];
        });
        return filtered;
      });
    }
  }, []);

  // Force refresh function
  const forceRefresh = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Multiple attempts to ensure elements are found
    let attempts = 0;
    const attemptObservation = () => {
      const elements = document.querySelectorAll('[data-animate]');
      if (elements.length > 0 || attempts >= 8) {
        observeElements();
      } else {
        attempts++;
        timeoutRef.current = setTimeout(attemptObservation, 100);
      }
    };
    
    timeoutRef.current = setTimeout(attemptObservation, 50);
  }, [observeElements]);

  useEffect(() => {
    // Initialize scroll state
    setIsScrolled(window.scrollY > 50);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Create intersection observer
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const updates = {};
          entries.forEach((entry) => {
            if (entry.target.id && currentElementsRef.current.has(entry.target.id)) {
              updates[entry.target.id] = entry.isIntersecting;
            }
          });
          
          if (Object.keys(updates).length > 0) {
            setIsVisible(prev => ({ ...prev, ...updates }));
          }
        },
        { 
          threshold: [0, 0.1, 0.2],
          rootMargin: '100px 0px -50px 0px'
        }
      );
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial observation
    forceRefresh();

    // Listen for route changes and DOM updates
    const handleRouteChange = () => {
      forceRefresh();
    };

    const handleResize = () => {
      if (isInitializedRef.current) {
        observeElements();
      }
    };

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    // Mark as initialized
    isInitializedRef.current = true;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      isInitializedRef.current = false;
      currentElementsRef.current.clear();
    };
  }, []); // Empty dependency array

  // Expose refresh function for manual triggering
  return { 
    isVisible, 
    isScrolled, 
    refreshObserver: forceRefresh 
  };
};