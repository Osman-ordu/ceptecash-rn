import React from 'react';
import { StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { MarketStackParamList } from '@/types';

type RouteProps = RouteProp<MarketStackParamList, 'MarketDetail'>;

export default function MarketDetailScreen() {
  const route = useRoute<RouteProps>();
  const { id } = route.params;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Market Detail</ThemedText>
      <ThemedText style={styles.description}>Seçilen market: {id}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  description: {
    marginTop: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});

