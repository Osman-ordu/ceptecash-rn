import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { popularCoins } from '@/db';
import { PopularCoin } from '@/types';

const coins: PopularCoin[] = popularCoins;

const COIN_WIDTH = 120;
const SCROLL_SPEED = 50; // pixels per second

export function PopularCoins() {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollViewRef.current) return;

      scrollX.current += SCROLL_SPEED / 60; // 60 FPS
      const maxScroll = coins.length * COIN_WIDTH;

      if (scrollX.current >= maxScroll) {
        scrollX.current = 0;
      }

      scrollViewRef.current.scrollTo({
        x: scrollX.current,
        animated: false,
      });
    }, 16); // ~60 FPS

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {coins.map((coin) => {
          const isPositive = coin.change > 0;
          const changeColor = isPositive ? '#22C55E' : '#EF4444';
          const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

          const IconComponent = coin.iconComponent;

          return (
            <View key={coin.id} style={styles.coinItem}>
              <View style={styles.coinIconContainer}>
                <IconComponent width={40} height={40} />
              </View>
              <ThemedText style={styles.coinPair}>{coin.pair}</ThemedText>
              <View style={styles.changeContainer}>
                <Ionicons name={changeIcon} size={16} color={changeColor} />
                <ThemedText style={[styles.changeText, { color: changeColor }]}>
                  {Math.abs(coin.change).toFixed(2)}%
                </ThemedText>
              </View>
            </View>
          );
        })}
        {/* Duplicate coins for seamless loop */}
        {coins.map((coin) => {
          const isPositive = coin.change > 0;
          const changeColor = isPositive ? '#22C55E' : '#EF4444';
          const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';
          const IconComponent = coin.iconComponent;

          return (
            <View key={`${coin.id}-duplicate`} style={styles.coinItem}>
              <View style={styles.coinIconContainer}>
                <IconComponent width={40} height={40} />
              </View>
              <ThemedText style={styles.coinPair}>{coin.pair}</ThemedText>
              <View style={styles.changeContainer}>
                <Ionicons name={changeIcon} size={16} color={changeColor} />
                <ThemedText style={[styles.changeText, { color: changeColor }]}>
                  {Math.abs(coin.change).toFixed(2)}%
                </ThemedText>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    overflow: 'hidden',
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  coinItem: {
    width: COIN_WIDTH,
    height: COIN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderRadius: COIN_WIDTH / 2,
  },
  coinIconContainer: {
    marginBottom: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinPair: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

