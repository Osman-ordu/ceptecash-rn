import React from 'react';
import { LayoutAnimation, Platform,Pressable, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { formatCurrencyPair,formatPercent, formatPrice } from '@/utils/general';
import { MARKET_TABLE_ROW_LABELS } from './constants';
import { useChangeIndicator,useMarketTableRowStyles } from './hooks';
import { styles } from './styles';
import { IMarketTableRowProps } from './types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function MarketTableRow({
  currency,
  currencyName,
  buyPrice,
  sellPrice,
  changePercent,
  time,
  isExpanded,
  onToggle,
  labels,
}: IMarketTableRowProps) {
  const dynamicStyles = useMarketTableRowStyles();
  const changeIndicator = useChangeIndicator(changePercent);

  const currencyPair = formatCurrencyPair(currency);
  const formattedPrice = formatPrice(buyPrice);
  const formattedPercent = formatPercent(changePercent);
  const formattedBuyPrice = formatPrice(buyPrice);
  const formattedSellPrice = formatPrice(sellPrice);

  const buyLabel = labels?.buy ?? MARKET_TABLE_ROW_LABELS.BUY;
  const sellLabel = labels?.sell ?? MARKET_TABLE_ROW_LABELS.SELL;
  const timeLabel = labels?.time ?? MARKET_TABLE_ROW_LABELS.TIME;

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle();
  };

  return (
    <ThemedView style={[styles.rowContainer, { borderBottomColor: dynamicStyles.borderBottomColor }]}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
      >
        <ThemedView style={styles.rowContent}>
          <ThemedView style={styles.mainRow}>
            <ThemedView style={styles.currencyInfo}>
              <ThemedText style={styles.currencyName}>{currencyName}</ThemedText>
              <ThemedText style={[styles.currencyPair, { color: dynamicStyles.currencyPairColor }]}>
                {currencyPair}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.priceInfo}>
              <ThemedText style={styles.price}>{formattedPrice}</ThemedText>
              <ThemedView style={styles.percentContainer}>
                <ThemedText style={[styles.percent, { color: changeIndicator.color }]}>
                  {formattedPercent}
                </ThemedText>
                <Ionicons
                  name={changeIndicator.icon}
                  size={16}
                  color={changeIndicator.color}
                  style={styles.changeIcon}
                />
              </ThemedView>
            </ThemedView>

            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={dynamicStyles.expandIconColor}
              style={styles.expandIcon}
            />
          </ThemedView>

          {isExpanded && (
            <ThemedView
              style={[
                styles.expandedContent,
                {
                  backgroundColor: dynamicStyles.expandedBackgroundColor,
                  borderTopColor: dynamicStyles.expandedBorderTopColor,
                },
              ]}
            >
              <ThemedView style={styles.detailRow}>
                <ThemedView style={styles.detailItem}>
                  <ThemedText style={[styles.detailLabel, { color: dynamicStyles.detailLabelColor }]}>
                    {buyLabel}
                  </ThemedText>
                  <ThemedText style={styles.detailValue}>{formattedBuyPrice}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.detailItem}>
                  <ThemedText style={[styles.detailLabel, { color: dynamicStyles.detailLabelColor }]}>
                    {sellLabel}
                  </ThemedText>
                  <ThemedText style={styles.detailValue}>{formattedSellPrice}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.detailItem}>
                  <ThemedText style={[styles.detailLabel, { color: dynamicStyles.detailLabelColor }]}>
                    {timeLabel}
                  </ThemedText>
                  <ThemedText style={styles.detailValue}>{time}</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

