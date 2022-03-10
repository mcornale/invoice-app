import { useEffect, useState } from 'react';

const useScrollPosition = (elementRef) => {
  const [scrollPosition, setScrollPosition] = useState();

  useEffect(() => {
    const element = elementRef.current;

    const updateScrollPosition = () => {
      setScrollPosition(element.scrollTop);
    };

    element.addEventListener('scroll', updateScrollPosition);

    return () => {
      element.removeEventListener('scroll', updateScrollPosition);
    };
  }, [elementRef]);

  return Math.trunc(scrollPosition);
};

export default useScrollPosition;
