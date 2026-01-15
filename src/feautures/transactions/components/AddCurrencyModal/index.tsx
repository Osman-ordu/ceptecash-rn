import React from 'react';
import { Modal, Pressable, ScrollView,TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { CURRENCIES_NAMES } from '@/feautures/market/constants';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IAddCurrencyModalProps } from '@/types';
import { cleanNumericInput } from '@/utils';
import { styles } from './styles';

export function AddCurrencyModal({
  visible,
  selectedCurrency,
  modalAmount,
  calculatedTry,
  onClose,
  onSubmit,
  onAmountChange,
}: IAddCurrencyModalProps) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <ThemedView style={[styles.modalOverlay, { backgroundColor }]}>
        <ThemedView card style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Döviz Ekle</ThemedText>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={24} color={textColor} />
            </Pressable>
          </View>

          <ScrollView style={styles.modalBody}>
            {selectedCurrency && (
              <>
                <View style={styles.modalSection}>
                  <ThemedText style={styles.modalLabel}>Döviz</ThemedText>
                  <View style={styles.currencyDisplay}>
                    <View style={[styles.currencyBadge, { backgroundColor: textColor + '20' }]}>
                      <ThemedText style={[styles.currencyCode, { color: textColor }]}>
                        {selectedCurrency}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.modalCurrencyName}>
                      {CURRENCIES_NAMES[selectedCurrency as keyof typeof CURRENCIES_NAMES]}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <ThemedText style={styles.modalLabel}>Miktar</ThemedText>
                  <TextInput
                    style={[
                      styles.modalInput,
                      {
                        color: textColor,
                        borderColor: textColor + '30',
                        backgroundColor: textColor + '10',
                      },
                    ]}
                    value={modalAmount}
                    onChangeText={(text) => {
                      const cleanedText = cleanNumericInput(text);
                      onAmountChange(cleanedText);
                    }}
                    keyboardType="decimal-pad"
                    placeholder="1"
                    placeholderTextColor={textColor + '60'}
                    selectTextOnFocus
                  />
                </View>

                <View style={styles.modalSection}>
                  <ThemedText style={styles.modalLabel}>TRY Karşılığı</ThemedText>
                  <ThemedText style={styles.modalResult}>
                    {calculatedTry.toLocaleString('tr-TR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{' '}
                    {CURRENCIES_NAMES.default}
                  </ThemedText>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button
              title="İptal"
              onPress={onClose}
              variant="secondary"
              size="medium"
              style={styles.modalButton}
            />
            <Button
              title="Ekle"
              onPress={onSubmit}
              variant="secondary"
              size="medium"
              style={styles.modalButton}
            />
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

