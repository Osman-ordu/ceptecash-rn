import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rowContainer: {
    width: '100%',
    borderBottomWidth: 1,
  },
  row: {
    width: '100%',
  },
  rowContent: {
    width: '100%',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 64,
  },
  currencyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  currencyPair: {
    fontSize: 12,
    fontWeight: '400',
  },
  priceInfo: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  percentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  percent: {
    fontSize: 12,
    fontWeight: '600',
  },
  changeIcon: {
    marginLeft: 2,
  },
  expandIcon: {
    marginLeft: 12,
  },
  expandedContent: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});

