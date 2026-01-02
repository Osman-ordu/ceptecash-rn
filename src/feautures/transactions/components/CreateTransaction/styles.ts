import { StyleSheet, TextStyle,ViewStyle } from 'react-native';
import { SemanticColors } from '@/theme';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 20,
    fontWeight: '400',
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: SemanticColors.warningBackground,
    marginBottom: 16,
  },
  connectionStatusText: {
    fontSize: 12,
    color: SemanticColors.warning,
    fontWeight: '500',
  },
  formContainer: {
    gap: 16,
  },
  submitButton: {
    marginTop: 8,
  },
});

// Dinamik stiller için helper fonksiyonlar
export const getDynamicStyles = (textColor: string) => ({
  currencySelector: (hasError: boolean): ViewStyle => ({
    borderColor: hasError ? SemanticColors.error : textColor + '30',
    backgroundColor: textColor + '10',
  }),
  currencySelectorText: (hasValue: boolean): TextStyle => ({
    color: hasValue ? textColor : textColor + '60',
  }),
  currencySelectorIcon: (): string => textColor + '80',
  quoteAssetSelector: (): ViewStyle => ({
    borderColor: textColor + '30',
    backgroundColor: textColor + '10',
    opacity: 0.6,
  }),
  quoteAssetText: (): TextStyle => ({
    color: textColor,
  }),
  input: (hasError: boolean): ViewStyle & TextStyle => ({
    color: textColor,
    borderColor: hasError ? SemanticColors.error : textColor + '30',
    backgroundColor: textColor + '10',
  }),
  inputPlaceholder: (): string => textColor + '60',
});

