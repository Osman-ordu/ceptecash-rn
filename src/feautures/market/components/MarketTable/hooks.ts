import { useMemo } from 'react';
import { useThemeColor } from '@/hooks/use-theme-color';

export const useMarketTableStyles = () => {
  const textColor = useThemeColor({}, 'text');

  return useMemo(
    () => ({
      loadingTextColor: textColor + '60',
    }),
    [textColor]
  );
};

