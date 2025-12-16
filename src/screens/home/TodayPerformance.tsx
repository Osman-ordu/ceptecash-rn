import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { todayPerformance } from '@/db';

export function TodayPerformance() {
  const TopGainerIcon = todayPerformance.topGainer.icon;
  const TopLoserIcon = todayPerformance.topLoser.icon;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText style={styles.title}>Bugünkü Performans</ThemedText>

        <View style={styles.performanceRow}>
          {/* En çok kazandıran */}
          <View style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <TopGainerIcon width={24} height={24} />
              <ThemedText style={styles.coinName}>{todayPerformance.topGainer.coin}</ThemedText>
            </View>
            <View style={styles.changeRow}>
              <Ionicons name="arrow-up" size={16} color="#22C55E" />
              <ThemedText style={[styles.changeValue, { color: '#22C55E' }]}>
                +{todayPerformance.topGainer.change.toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={styles.profitValue}>
              +{todayPerformance.topGainer.value.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              ₺
            </ThemedText>
            <ThemedText style={styles.label}>En Çok Kazandıran</ThemedText>
          </View>

          {/* En çok kaybettiren */}
          <View style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
              <TopLoserIcon width={24} height={24} />
              <ThemedText style={styles.coinName}>{todayPerformance.topLoser.coin}</ThemedText>
            </View>
            <View style={styles.changeRow}>
              <Ionicons name="arrow-down" size={16} color="#EF4444" />
              <ThemedText style={[styles.changeValue, { color: '#EF4444' }]}>
                {todayPerformance.topLoser.change.toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={[styles.lossValue, { color: '#EF4444' }]}>
              {todayPerformance.topLoser.value.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              ₺
            </ThemedText>
            <ThemedText style={styles.label}>En Çok Kaybettiren</ThemedText>
          </View>
        </View>

        {/* Son yapılan işlem */}
        <View style={styles.transactionContainer}>
          <ThemedText style={styles.transactionTitle}>Son Yapılan İşlem</ThemedText>
          <View style={styles.transactionRow}>
            <View style={styles.transactionInfo}>
              <ThemedText style={styles.transactionType}>
                {todayPerformance.lastTransaction.type}
              </ThemedText>
              <ThemedText style={styles.transactionDetails}>
                {todayPerformance.lastTransaction.amount} {todayPerformance.lastTransaction.coin}
              </ThemedText>
            </View>
            <View style={styles.transactionRight}>
              <ThemedText style={styles.transactionPrice}>
                {todayPerformance.lastTransaction.price.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                ₺
              </ThemedText>
              <ThemedText style={styles.transactionTime}>
                {todayPerformance.lastTransaction.time}
              </ThemedText>
            </View>
          </View>
        </View>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  performanceRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  performanceItem: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  coinName: {
    fontSize: 16,
    fontWeight: '600',
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  changeValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  profitValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
    marginBottom: 4,
  },
  lossValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    opacity: 0.6,
  },
  transactionContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.7,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 14,
    opacity: 0.7,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 12,
    opacity: 0.6,
  },
});

