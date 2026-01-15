import React from 'react';
import { View } from 'react-native';
import { IPriceDisplayProps } from '@/types';
import { ThemedText } from '../ThemedText';
import { styles } from './styles';

export function PriceDisplay({
  baseAsset,
  quoteAsset,
  price,
  amount,
  calculatedTotal,
  compact = false,
}: IPriceDisplayProps) {
  if (!baseAsset || price <= 0) return null;

  const containerStyle = compact
    ? [styles.priceContainer, { padding: 8, gap: 4 }]
    : styles.priceContainer;
  const labelStyle = compact
    ? [styles.priceLabel, { fontSize: 11 }]
    : styles.priceLabel;
  const valueStyle = compact
    ? [styles.priceValue, { fontSize: 12 }]
    : styles.priceValue;
  const totalStyle = compact
    ? [styles.totalValue, { fontSize: 14 }]
    : styles.totalValue;

  return (
    <View style={containerStyle}>
      <View style={styles.priceRow}>
        <ThemedText style={labelStyle}>Fiyat:</ThemedText>
        <ThemedText style={valueStyle}>
          1 {baseAsset} = {price.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {quoteAsset}
        </ThemedText>
      </View>
      {amount && calculatedTotal > 0 && (
        <View style={styles.priceRow}>
          <ThemedText style={labelStyle}>Toplam:</ThemedText>
          <ThemedText style={totalStyle}>
            {calculatedTotal.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            {quoteAsset}
          </ThemedText>
        </View>
      )}
    </View>
  );
}

