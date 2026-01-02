import { useMemo } from 'react';
import { useThemeColor } from '@/hooks/use-theme-color';
import { SemanticColors } from '@/theme';

export const useMarketTableRowStyles = () => {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  return useMemo(
    () => ({
      borderBottomColor: textColor + '15',
      currencyPairColor: textColor + '80',
      expandIconColor: textColor + '60',
      detailLabelColor: textColor + '70',
      expandedBackgroundColor: backgroundColor + '50',
      expandedBorderTopColor: textColor + '10',
    }),
    [textColor, backgroundColor]
  );
};

export const useChangeIndicator = (changePercent: number) => {
  return useMemo(
    () => ({
      isPositive: changePercent >= 0,
      color: changePercent >= 0 ? SemanticColors.success : SemanticColors.error,
      icon: (changePercent >= 0 ? 'arrow-up' : 'arrow-down') as 'arrow-up' | 'arrow-down',
    }),
    [changePercent]
  );
};

