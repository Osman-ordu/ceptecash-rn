import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { currencies } from '@/db';
import { Currency, RootStackParamList, TabType } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EasyBuySell'>;

export default function EasyBuySellScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('buy');
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[7]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const handleFromCurrencyChange = (currency: Currency) => {
    setFromCurrency(currency);
    setShowFromPicker(false);
    if (currency.symbol === toCurrency.symbol) {
      const otherCurrency = activeTab === 'buy' ? currencies[7] : currencies[0];
      setToCurrency(otherCurrency);
    }
  };

  const handleToCurrencyChange = (currency: Currency) => {
    setToCurrency(currency);
    setShowToPicker(false);
    if (currency.symbol === fromCurrency.symbol) {
      const otherCurrency = activeTab === 'buy' ? currencies[0] : currencies[7];
      setFromCurrency(otherCurrency);
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'Giriş Yap / Kayıt Ol',
      `İşlem Tipi: ${activeTab === 'buy' ? 'Al' : 'Sat'}\n` +
        `From: ${fromAmount} ${fromCurrency.symbol}\n` +
        `To: ${toAmount} ${toCurrency.symbol}`,
      [
        {
          text: 'Tamam',
          onPress: () => {
            // TODO: Navigate to login/register screen
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Kolay Al Sat</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.card}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'buy' && styles.activeTab, styles.leftTab]}
              onPress={() => {
                if (activeTab !== 'buy') {
                  setActiveTab('buy');
                  setFromCurrency(currencies[0]);
                  setToCurrency(currencies[7]);
                  setFromAmount('');
                  setToAmount('');
                }
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ThemedText
                style={[styles.tabText, activeTab === 'buy' && styles.activeTabText]}
              >
                Al
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'sell' && styles.activeTab, styles.rightTab]}
              onPress={() => {
                if (activeTab !== 'sell') {
                  setActiveTab('sell');
                  setFromCurrency(currencies[7]);
                  setToCurrency(currencies[0]);
                  setFromAmount('');
                  setToAmount('');
                }
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ThemedText
                style={[styles.tabText, activeTab === 'sell' && styles.activeTabText]}
              >
                Sat
              </ThemedText>
            </Pressable>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  value={fromAmount}
                  onChangeText={setFromAmount}
                  keyboardType="decimal-pad"
                />
                <Pressable
                  style={styles.currencySelector}
                  onPress={() => setShowFromPicker(true)}
                >
                  <ThemedText style={styles.currencyText}>{fromCurrency.symbol}</ThemedText>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </Pressable>
              </View>
              <ThemedText style={styles.inputLabel}>{fromCurrency.name}</ThemedText>
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="#999"
                  value={toAmount}
                  onChangeText={setToAmount}
                  keyboardType="decimal-pad"
                />
                <Pressable
                  style={styles.currencySelector}
                  onPress={() => setShowToPicker(true)}
                >
                  <ThemedText style={styles.currencyText}>{toCurrency.symbol}</ThemedText>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </Pressable>
              </View>
              <ThemedText style={styles.inputLabel}>{toCurrency.name}</ThemedText>
            </View>
          </View>

          <Button
            title="Giriş Yap / Kayıt Ol"
            onPress={handleSubmit}
            variant="primary"
            size="large"
            style={styles.submitButton}
          />
        </ThemedView>
      </ScrollView>

      {showFromPicker && (
        <Modal
          visible={showFromPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowFromPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Para Birimi Seç</ThemedText>
                <Pressable onPress={() => setShowFromPicker(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </Pressable>
              </View>
              <ScrollView>
                {currencies.map((currency) => (
                  <Pressable
                    key={currency.symbol}
                    style={[
                      styles.currencyOption,
                      fromCurrency.symbol === currency.symbol && styles.selectedCurrencyOption,
                    ]}
                    onPress={() => handleFromCurrencyChange(currency)}
                  >
                    <ThemedText
                      style={[
                        styles.currencyOptionText,
                        fromCurrency.symbol === currency.symbol && styles.selectedCurrencyOptionText,
                      ]}
                    >
                      {currency.symbol} - {currency.name}
                    </ThemedText>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {showToPicker && (
        <Modal
          visible={showToPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowToPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <ThemedText style={styles.modalTitle}>Para Birimi Seç</ThemedText>
                <Pressable onPress={() => setShowToPicker(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </Pressable>
              </View>
              <ScrollView>
                {currencies.map((currency) => (
                  <Pressable
                    key={currency.symbol}
                    style={[
                      styles.currencyOption,
                      toCurrency.symbol === currency.symbol && styles.selectedCurrencyOption,
                    ]}
                    onPress={() => handleToCurrencyChange(currency)}
                  >
                    <ThemedText
                      style={[
                        styles.currencyOptionText,
                        toCurrency.symbol === currency.symbol && styles.selectedCurrencyOptionText,
                      ]}
                    >
                      {currency.symbol} - {currency.name}
                    </ThemedText>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftTab: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightTab: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  activeTab: {
    backgroundColor: '#22C55E',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },
  activeTabText: {
    color: '#FFFFFF',
    opacity: 1,
    fontWeight: '600',
  },
  inputsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputWrapper: {
    gap: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0, 0, 0, 0.1)',
    gap: 8,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  inputLabel: {
    fontSize: 12,
    opacity: 0.6,
    paddingHorizontal: 4,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  submitButton: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  currencyOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  selectedCurrencyOption: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  currencyOptionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedCurrencyOptionText: {
    color: '#22C55E',
    fontWeight: '600',
  },
});

