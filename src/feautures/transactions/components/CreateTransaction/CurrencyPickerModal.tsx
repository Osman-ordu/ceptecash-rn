import React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { CURRENCIES_NAMES } from '@/feautures/market/constants';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ICurrencyPickerModalProps } from '@/types';
import { getModalStyles, styles } from './CurrencyPickerModal.styles';

export function CurrencyPickerModal({
  visible,
  onClose,
  availableCurrencies,
  selectedCurrency,
  onSelectCurrency,
  currencies,
}: ICurrencyPickerModalProps) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const modalStyles = getModalStyles(textColor);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <ThemedView style={[styles.blurOverlay, { backgroundColor }]} />
        <View style={styles.modalContentWrapper}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <ThemedView card style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Varlık Seçin</ThemedText>
                <Pressable onPress={onClose}>
                  <Ionicons name="close" size={24} color={modalStyles.modalCloseIcon()} />
                </Pressable>
              </View>
              <ScrollView style={styles.modalBody}>
                {availableCurrencies?.map((currency) => {
                  const currencyData = currencies?.[currency];
                  return (
                    <Pressable
                      key={currency}
                      style={[
                        styles.currencyOption,
                        modalStyles.currencyOption(selectedCurrency === currency),
                      ]}
                      onPress={(e) => {
                        e.stopPropagation();
                        onSelectCurrency(currency);
                        onClose();
                      }}
                    >
                      <View style={styles.currencyOptionContent}>
                        <ThemedText style={styles.currencyOptionCode}>{currency}</ThemedText>
                        <ThemedText style={styles.currencyOptionName}>
                          {CURRENCIES_NAMES[currency as keyof typeof CURRENCIES_NAMES] ||
                            currency}
                        </ThemedText>
                      </View>
                      {currencyData && (
                        <ThemedText style={styles.currencyOptionPrice}>
                          {currencyData.buyPrice.toLocaleString('tr-TR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                          TRY
                        </ThemedText>
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>
            </ThemedView>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

