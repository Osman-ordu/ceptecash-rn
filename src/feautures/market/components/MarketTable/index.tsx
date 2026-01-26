import React, { useState } from 'react';
import { MarketTableRow } from '@/components/ui/MarketTableRow';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { formatTimeString } from '@/utils/general';
import { CURRENCIES_NAMES } from '../../constants';
import { useMarketTableStyles } from './hooks';
import { styles } from './styles';
import { IMarketTableProps } from './types';

export function MarketTable({
  currencies,
  isConnected,
  symbols,
  currencyLabels,
}: IMarketTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const dynamicStyles = useMarketTableStyles();

  const toggleRow = (currency: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currency)) {
        newSet.delete(currency);
      } else {
        newSet.add(currency);
      }
      return newSet;
    });
  };

  const currencyData = React.useMemo(() => {
    if (!isConnected) return [];

    const listSymbols =
      symbols && symbols.length > 0 ? symbols : Object.keys(currencies);
    const labelMap = currencyLabels ?? {};

    const dataFromList = listSymbols?.map((currency) => {
      const data = currencies[currency];
      if (!data || !data.buyPrice || !data.sellPrice) return null;

      const timestamp = data.timestamp || Date.now();
      const time = formatTimeString(timestamp);

      return {
        currency,
        currencyName:
          labelMap[currency] ||
          CURRENCIES_NAMES[currency as keyof typeof CURRENCIES_NAMES] ||
          currency,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        changePercent: data.changePercent || 0,
        time,
      };
    })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => a.currencyName.localeCompare(b.currencyName));

    if (dataFromList.length > 0) {
      return dataFromList;
    }

    return Object.values(currencies)
      .filter((data) => data && data.buyPrice && data.sellPrice)
      .map((data) => {
        const timestamp = data.timestamp || Date.now();
        const time = formatTimeString(timestamp);
        return {
          currency: data.symbol,
          currencyName:
            labelMap[data.symbol] ||
            CURRENCIES_NAMES[data.symbol as keyof typeof CURRENCIES_NAMES] ||
            data.symbol,
          buyPrice: data.buyPrice,
          sellPrice: data.sellPrice,
          changePercent: data.changePercent || 0,
          time,
        };
      })
      .sort((a, b) => a.currencyName.localeCompare(b.currencyName));
  }, [currencies, currencyLabels, isConnected, symbols]);

  if (!isConnected) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.loadingText, { color: dynamicStyles.loadingTextColor }]}>
          Bağlanılıyor...
        </ThemedText>
      </ThemedView>
    );
  }

  if (currencyData.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={[styles.loadingText, { color: dynamicStyles.loadingTextColor }]}>
          Veri yükleniyor...
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {currencyData.map((item) => (
        <MarketTableRow
          key={item.currency}
          currency={item.currency}
          currencyName={item.currencyName}
          buyPrice={item.buyPrice}
          sellPrice={item.sellPrice}
          changePercent={item.changePercent}
          time={item.time}
          isExpanded={expandedRows.has(item.currency)}
          onToggle={() => toggleRow(item.currency)}
        />
      ))}
    </ThemedView>
  );
}
