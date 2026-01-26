import { StyleSheet, ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.95,
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  infoText: {
    opacity: 0.7,
  },
  modalBody: {
    maxHeight: 400,
  },
  currencyOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  currencyOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  currencyOptionCode: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 60,
  },
  currencyOptionName: {
    fontSize: 14,
    opacity: 0.7,
  },
});

export const getModalStyles = (textColor: string) => ({
  modalCloseIcon: (): string => textColor,
  infoIcon: (): string => textColor,
  currencyOption: (isSelected: boolean): ViewStyle => ({
    backgroundColor: isSelected ? textColor + '20' : 'transparent',
  }),
});
