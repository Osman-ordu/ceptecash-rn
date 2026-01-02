import React from 'react';
import { ScreenLayout } from '@/components/layout';
import { ThemedView } from '@/components/ui/themed-view';
import CreateTransaction from '../components/CreateTransaction';
import QuickTransactions from '../components/LastTransactions';
import { styles } from './TransactionsScreen.styles';

export default function TransactionsScreen() {
  return (
    <ScreenLayout scrollContentStyle={styles.scrollContent}>
      <ThemedView style={styles.content}>
        <CreateTransaction />
        <QuickTransactions />
      </ThemedView>
    </ScreenLayout>
  );
}

