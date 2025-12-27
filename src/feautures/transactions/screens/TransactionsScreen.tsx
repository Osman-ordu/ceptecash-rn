import React from 'react';
import { ScrollView } from 'react-native';
import { ThemedView } from '@/components/ui/themed-view';
import { AppLogo, useAppLogoHeight } from '@/components/layout';
import QuickTransactions from '../components/LastTransactions';
import CreateTransaction from '../components/CreateTransaction';
import { styles } from './TransactionsScreen.styles';

export default function TransactionsScreen() {
  const logoHeight = 60;
  const totalHeaderHeight = useAppLogoHeight(logoHeight);

  return (
    <ThemedView style={styles.container}>
      <AppLogo logoHeight={logoHeight} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: totalHeaderHeight }]}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          <CreateTransaction />
          <QuickTransactions />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

