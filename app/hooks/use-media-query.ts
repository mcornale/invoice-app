import { useState, useEffect, useCallback } from 'react';

const doesWindowMatch = (query: string): boolean => {
  if (typeof document !== 'undefined') {
    return window.matchMedia(query).matches;
  }
  return false;
};

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>();

  const handleResize = useCallback(() => {
    setMatches(doesWindowMatch(query));
  }, [query]);

  useEffect(() => {
    if (matches === undefined) handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [matches, handleResize]);

  return matches;
}
