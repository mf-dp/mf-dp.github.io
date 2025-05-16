import { useState, useEffect, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useInView(
  elementRef: RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { root = null, rootMargin = '0px', threshold = 0, once = false } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If entry is intersecting, set state to true
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          
          // If once is true, disconnect the observer after first intersection
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else {
          // Only set to false if once is false
          if (!once) {
            setIsIntersecting(false);
          }
        }
      },
      { root, rootMargin, threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, root, rootMargin, threshold, once]);

  return isIntersecting;
}

export default useInView;
