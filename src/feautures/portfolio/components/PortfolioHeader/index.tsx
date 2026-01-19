import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { IPortfolioStatistics } from '@/store/portfolio/types';
import { SemanticColors } from '@/theme';
import { styles } from './styles';

type PortfolioHeaderProps = {
  statistics?: IPortfolioStatistics | null;
};

export function PortfolioHeader({ statistics }: PortfolioHeaderProps) {
  const totalValue = statistics?.totalPortfolioValue ?? 0;
  const dailyChange = statistics?.dailyChange ?? 0;
  const totalProfitLoss = statistics?.totalProfitLoss ?? 0;

  const isPositive = dailyChange > 0;
  const changeColor = isPositive ? SemanticColors.success : SemanticColors.error;
  const profitLossColor = totalProfitLoss > 0 ? SemanticColors.success : SemanticColors.error;
  const changeIcon = isPositive ? 'arrow-up' : 'arrow-down';

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <ThemedText style={styles.label}>Toplam Portföy Değeri</ThemedText>
        <ThemedText style={styles.totalValue}>
          {totalValue.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          ₺
        </ThemedText>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View style={styles.changeRow}>
              <Ionicons name={changeIcon} size={18} color={changeColor} />
              <ThemedText style={[styles.changeText, { color: changeColor }]}>
                {Math.abs(dailyChange).toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={styles.statLabel}>Günlük Değişim</ThemedText>
          </View>

          <View style={styles.statItem}>
            <ThemedText style={[styles.profitLossText, { color: profitLossColor }]}>
              {totalProfitLoss > 0 ? '+' : ''}
              {totalProfitLoss.toLocaleString('tr-TR', {
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

