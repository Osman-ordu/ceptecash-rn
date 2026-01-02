import React from 'react';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { MarketTable } from '../MarketTable';
import { styles } from './styles';

export function MarketList() {
  const { currencies: socketCurrencies, isConnected } = useCurrencySocket();

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.title}>Anlık Döviz Kurları</ThemedText>
        <ThemedText style={styles.subtitle}>24 Saatlik güncel fiyatlardan anında haberdar olun!</ThemedText>
      </ThemedView>
        <MarketTable currencies={socketCurrencies} isConnected={isConnected} />
    </ThemedView>
  );
}

