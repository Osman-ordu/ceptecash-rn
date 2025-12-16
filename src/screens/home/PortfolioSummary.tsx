import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { portfolioData } from '@/db';

export function PortfolioSummary() {
  const isPositive = portfolioData.dailyChange > 0;
  const changeColor = isPositive ? '#22C55E' : '#EF4444';
  const profitLossColor = portfolioData.totalProfitLoss > 0 ? '#22C55E' : '#EF4444';
  const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.label}>Toplam Portföy Değeri</ThemedText>
        <ThemedText style={styles.totalValue}>
          {portfolioData.totalValue.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          ₺
        </ThemedText>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.changeRow}>
              <Ionicons name={changeIcon} size={16} color={changeColor} />
              <ThemedText style={[styles.changeText, { color: changeColor }]}>
                {Math.abs(portfolioData.dailyChange).toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={styles.statLabel}>Günlük Değişim</ThemedText>
          </View>

          <View style={styles.statItem}>
            <ThemedText style={[styles.profitLossText, { color: profitLossColor }]}>
              {portfolioData.totalProfitLoss > 0 ? '+' : ''}
              {portfolioData.totalProfitLoss.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              ₺
            </ThemedText>
            <ThemedText style={styles.statLabel}>Toplam Kâr / Zarar</ThemedText>
          </View>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  changeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  profitLossText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
});

