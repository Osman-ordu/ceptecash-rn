import React from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useThemeColor } from '@/hooks/use-theme-color';
import { getModalStyles,styles } from './CurrencyPickerModal.styles';

type CurrencyCode = 'TRY' | 'USD' | 'EUR';

const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  TRY: 'Turk Lirasi',
  USD: 'Amerikan Dolari',
  EUR: 'Euro',
};

type CurrencyPickerModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
};

export function CurrencyPickerModal({
  visible,
  onClose,
  selectedCurrency,
  onSelectCurrency,
}: CurrencyPickerModalProps) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const modalStyles = getModalStyles(textColor);

  const options: { code: CurrencyCode; enabled: boolean }[] = [
    { code: 'TRY', enabled: true },
    { code: 'USD', enabled: false },
    { code: 'EUR', enabled: false },
  ];

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
                <ThemedText style={styles.modalTitle}>Para Birimi</ThemedText>
                <Pressable onPress={onClose}>
                  <Ionicons name="close" size={24} color={modalStyles.modalCloseIcon()} />
                </Pressable>
              </View>
              <View style={styles.infoRow}>
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color={modalStyles.infoIcon()}
                />
                <ThemedText style={styles.infoText}>Su an sadece TRY destekleniyor.</ThemedText>
              </View>
              <ScrollView style={styles.modalBody}>
                {options.map((option) => {
                  const isSelected = selectedCurrency === option.code;
                  const opacity = option.enabled ? 1 : 0.5;
                  return (
                    <Pressable
                      key={option.code}
                      style={[
                        styles.currencyOption,
                        modalStyles.currencyOption(isSelected),
                        { opacity },
                      ]}
                      disabled={!option.enabled}
                      onPress={(e) => {
                        e.stopPropagation();
                        onSelectCurrency(option.code);
                        onClose();
                      }}
                    >
                      <View style={styles.currencyOptionContent}>
                        <ThemedText style={styles.currencyOptionCode}>{option.code}</ThemedText>
                        <ThemedText style={styles.currencyOptionName}>
                          {CURRENCY_LABELS[option.code]}
                        </ThemedText>
                      </View>
                      {isSelected ? (
                        <Ionicons name="checkmark" size={18} color={modalStyles.infoIcon()} />
                      ) : null}
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
