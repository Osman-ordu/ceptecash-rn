import React from 'react';
import { TextTitle } from '@/components/ui';
import { Tabs } from '@/components/ui/Tabs';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { MarketTable } from '../MarketTable';
import { styles } from './styles';

export const marketHeader = {
  title: 'Değerin cebinde, kontrol sende!',
  subtitle: '24 Saatlik güncel fiyatlardan anında haberdar olun!',
}

export function MarketList() {
  const {
    isConnected,
    stockMarket,
    preciousMetals,
  } = useCurrencySocket();

  const tabs = [
    {
      value: 'precious-metals',
      label: 'Altın / Gümüş',
      content: (
        <MarketTable
          currencies={preciousMetals.currencies}
          isConnected={isConnected}
          symbols={preciousMetals.symbols}
          currencyLabels={preciousMetals.labels}
        />
      ),
    },
    {
      value: 'stock-market',
      label: 'Borsa',
      content: (
        <MarketTable
          currencies={stockMarket.currencies}
          isConnected={isConnected}
          symbols={stockMarket.symbols}
          currencyLabels={stockMarket.labels}
        />
      ),
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <TextTitle>{marketHeader.title}</TextTitle>
        <ThemedText style={styles.subtitle}>{marketHeader.subtitle}</ThemedText>
      </ThemedView>
      <Tabs tabs={tabs} defaultTab="precious-metals" />
    </ThemedView>
  );
}

