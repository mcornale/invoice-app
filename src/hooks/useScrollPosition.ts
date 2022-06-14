import { RefObject, useEffect, useState } from 'react';

const useScrollPosition = (elementRef: RefObject<HTMLElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      const updateScrollPosition = () => {
        setScrollPosition(element.scrollTop);
      };

      element.addEventListener('scroll', updateScrollPosition);

      return () => {
        element.removeEventListener('scroll', updateScrollPosition);
      };
    }
  }, [elementRef]);

  return Math.trunc(scrollPosition);
};

export default useScrollPosition;
