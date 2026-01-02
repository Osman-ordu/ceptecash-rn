import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenLayout } from '@/components/layout';
import { MarketList } from '@/feautures/market/components/MarketList';
import { MarketStackParamList } from '@/navigation/types';
import { styles } from './MarketScreen.styles';

type Props = NativeStackScreenProps<MarketStackParamList, 'Markets'>;

export default function MarketScreen({ navigation }: Props) {
  return (
    <ScreenLayout scrollContentStyle={styles.scrollContent}>
      <MarketList />
    </ScreenLayout>
  );
}

