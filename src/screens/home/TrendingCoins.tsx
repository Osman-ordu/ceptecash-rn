import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { baseTrendingCoins } from '@/db';
import { TrendingCoin } from '@/types';

const generateCoins = (baseCoins: TrendingCoin[], count: number): TrendingCoin[] => {
  const coins: TrendingCoin[] = [];
  for (let i = 0; i < count; i++) {
    const baseCoin = baseCoins[i % baseCoins.length];
    coins.push({
      id: `${i + 1}`,
      symbol: baseCoin.symbol,
      name: baseCoin.name,
      change24h: baseCoin.change24h + (Math.random() * 2 - 1),
      price: baseCoin.price * (0.95 + Math.random() * 0.1),
      isPopular: i < 3,
    });
  }
  return coins;
};

export function TrendingCoins() {
  const scrollViewRef = useRef<ScrollView>(null);
  const coins = generateCoins(baseTrendingCoins, 18);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.title}>Trending Coins</ThemedText>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.headerCell, styles.coinHeaderCell]}>
            <ThemedText style={styles.headerText}>Coin</ThemedText>
          </View>
          <View style={[styles.headerCell, styles.priceHeaderCell]}>
            <ThemedText style={styles.headerText}>Fiyat</ThemedText>
          </View>
          <View style={[styles.headerCell, styles.changeHeaderCell]}>
            <ThemedText style={styles.headerText}>24h</ThemedText>
          </View>
        </View>

        {/* Table Rows with ScrollView */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View style={styles.tableBody}>
            {coins.map((coin) => {
              const isPositive = coin.change24h > 0;
              const changeColor = isPositive ? '#22C55E' : '#EF4444';
              const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

              return (
                <View key={coin.id} style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.coinCell]}>
                    <ThemedText style={styles.coinPair}>{coin.symbol}/TRY</ThemedText>
                  </View>
                  <View style={[styles.tableCell, styles.priceCell]}>
                    <ThemedText style={styles.coinPrice}>
                      {coin.price.toLocaleString('tr-TR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      ₺
                    </ThemedText>
                  </View>
                  <View style={[styles.tableCell, styles.changeCell]}>
                    <View style={styles.changeRow}>
                      <Ionicons name={changeIcon} size={11} color={changeColor} style={styles.changeIcon} />
                      <ThemedText style={[styles.changeText, { color: changeColor }]}>
                        {isPositive ? '+' : ''}
                        {coin.change24h.toFixed(2)}%
                      </ThemedText>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    maxHeight: 600, // Limit height to enable scrolling
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 6,
  },
  headerCell: {
    justifyContent: 'center',
  },
  coinHeaderCell: {
    flex: 1.5,
  },
  priceHeaderCell: {
    flex: 1.5,
  },
  changeHeaderCell: {
    flex: 1.0,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  scrollContainer: {
    maxHeight: 500,
  },
  tableBody: {
    gap: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    marginBottom: 2,
    alignItems: 'center',
  },
  tableCell: {
    justifyContent: 'center',
  },
  coinCell: {
    flex: 1.5,
  },
  priceCell: {
    flex: 1.5,
  },
  changeCell: {
    flex: 1.0,
  },
  coinPair: {
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.9,
  },
  coinPrice: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.9,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 3,
  },
  changeIcon: {
    marginTop: 0,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 13,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

