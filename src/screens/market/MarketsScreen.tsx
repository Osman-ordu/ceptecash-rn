import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { MarketStackParamList } from '@/types';

type Props = NativeStackScreenProps<MarketStackParamList, 'Markets'>;

export default function MarketsScreen({ navigation }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Markets</ThemedText>
      <ThemedText style={styles.description}>
        Piyasalar sayfası içeriği buraya gelecek.
      </ThemedText>
      <Button
        title="Go to Market Detail"
        onPress={() => navigation.navigate('MarketDetail', { id: 'btc-usdt' })}
      />
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

