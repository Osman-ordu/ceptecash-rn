import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextTitle } from '@/components/ui';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { portfolioDistribution } from '@/db';
import { CurrencyColors,SemanticColors } from '@/theme';
import { styles } from './styles';

export function PortfolioStats() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <TextTitle>Portföy İstatistikleri</TextTitle>

        <View style={styles.statsGrid}>
          {portfolioDistribution.map((item, index) => (
            <ThemedView key={index} card style={styles.statCard}>
              <View style={styles.statHeader}>
                <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                <ThemedText style={styles.coinSymbol}>{item.coin}</ThemedText>
              </View>
              <ThemedText style={styles.percentage}>{item.percentage}%</ThemedText>
              <ThemedText style={styles.value}>
                {item.value.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                ₺
              </ThemedText>
            </ThemedView>
          ))}
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="trending-up" size={20} color={SemanticColors.success} />
            <View style={styles.summaryText}>
              <ThemedText style={styles.summaryLabel}>En Yüksek</ThemedText>
              <ThemedText style={styles.summaryValue}>BTC</ThemedText>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <Ionicons name="pie-chart" size={20} color={CurrencyColors.ETH} />
            <View style={styles.summaryText}>
              <ThemedText style={styles.summaryLabel}>Dağılım</ThemedText>
              <ThemedText style={styles.summaryValue}>4 Coin</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

