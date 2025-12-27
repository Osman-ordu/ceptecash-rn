import React from 'react';
import { Column } from '@/components/ui/custom-grid';
import { AnimatedPrice } from '@/feautures/market/components/AnimatedPrice';
import { ThemedText } from '@/components/ui/themed-text';
import { styles } from '@/feautures/market/components/MarketList/styles';

export const currencyColumns: Column[] = [
  {
    dataField: 'currencyName',
    caption: 'Döviz',
    addition: {
      align: 'left',
    },
  },
  {
    dataField: 'tryRate',
    caption: 'Türk Lirası',
    addition: {
      align: 'center',
      renderCell: (value: number) => <AnimatedPrice value={value} style={styles.resultAmount} />,
    },
  },
  {
    dataField: 'time',
    caption: 'Zaman',
    addition: {
      align: 'center',
    },
  },
];

export const quickTransactionColumns: Column[] = [
  {
    dataField: 'currencyName',
    caption: 'Döviz',
    addition: {
      align: 'left',
    },
  },
  {
    dataField: 'amountDisplay',
    caption: 'Miktar',
    addition: {
      align: 'center',
    },
  },
  {
    dataField: 'tryAmount',
    caption: 'Türk Lirası',
    addition: {
      align: 'center',
      renderCell: (value: number) => (
        <ThemedText style={styles.resultAmount}>
          {value.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </ThemedText>
      ),
    },
  },
];

