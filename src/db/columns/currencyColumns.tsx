import React from 'react';
import { Column } from '@/components/ui';
import { AnimatedPrice } from '@/feautures/market/components/AnimatedPrice';
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


