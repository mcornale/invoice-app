import { useMediaQuery } from 'react-responsive';

export function useIsScreenSmall() {
  const isScreenSmall = useMediaQuery({ query: '(max-width: 758px)' });

  return isScreenSmall;
}
