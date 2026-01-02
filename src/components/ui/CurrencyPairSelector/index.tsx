import React from 'react';
import { Pressable,View } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '../themed-text';
import { styles } from './styles';

interface CurrencyPairSelectorProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  onBaseAssetPress: () => void;
  quoteAsset?: string;
  dynamicStyles: {
    currencySelector: (hasError: boolean) => any;
    currencySelectorText: (hasValue: boolean) => any;
    currencySelectorIcon: () => string;
    quoteAssetSelector: () => any;
    quoteAssetText: () => any;
  };
  compact?: boolean;
}

export function CurrencyPairSelector({
  control,
  errors,
  onBaseAssetPress,
  quoteAsset = 'TRY',
  dynamicStyles,
  compact = false,
}: CurrencyPairSelectorProps) {
  const labelStyle = compact ? [styles.label, { fontSize: 10, marginBottom: 2 }] : styles.label;
  const containerStyle = compact ? [styles.currencyPairContainer, { gap: 4 }] : styles.currencyPairContainer;
  const selectorStyle = compact 
    ? [styles.currencySelector, { paddingVertical: 6, minHeight: 36, paddingHorizontal: 8, borderRadius: 8 }]
    : styles.currencySelector;
  const textStyle = compact 
    ? [styles.currencySelectorText, { fontSize: 12 }]
    : styles.currencySelectorText;
  const dividerStyle = compact ? [styles.divider, { fontSize: 12, marginHorizontal: 2 }] : styles.divider;

  return (
    <View>
      {!compact && <ThemedText style={labelStyle}>Döviz Çifti</ThemedText>}
      <View style={containerStyle}>
        <Controller
          control={control}
          name="baseAsset"
          render={({ field: { value } }) => (
            <Pressable
              style={[selectorStyle, dynamicStyles.currencySelector(!!errors.baseAsset)]}
              onPress={onBaseAssetPress}
            >
              <ThemedText
                style={[textStyle, dynamicStyles.currencySelectorText(!!value)]}
              >
                {value || 'Varlık Seçin'}
              </ThemedText>
              <Ionicons
                name="chevron-down"
                size={compact ? 14 : 16}
                color={dynamicStyles.currencySelectorIcon()}
              />
            </Pressable>
          )}
        />

        <ThemedText style={dividerStyle}>/</ThemedText>

        <View style={[selectorStyle, dynamicStyles.quoteAssetSelector()]}>
          <ThemedText style={[textStyle, dynamicStyles.quoteAssetText()]}>
            {quoteAsset}
          </ThemedText>
        </View>
      </View>
      {errors.baseAsset && (
        <ThemedText style={styles.errorText}>
          {errors.baseAsset.message as string}
        </ThemedText>
      )}
    </View>
  );
}

