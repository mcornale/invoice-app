import { useMediaQuery } from './use-media-query';

export interface UseResponsiveTextParams {
  defaultText: string;
  smScreenText: string;
}

export function useResponsiveText({
  defaultText,
  smScreenText,
}: UseResponsiveTextParams) {
  const matches = useMediaQuery('(max-width: 40em)');

  return matches ? smScreenText : defaultText;
}
