import React from 'react';
import { View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IEmptyStateProps } from '@/types';
import { ThemedText } from '../ThemedText';
import { styles } from './styles';

export function EmptyState({ message = 'Veri bulunamadı' }: IEmptyStateProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.message, { color: textColor, opacity: 0.6 }]}>
        {message}
      </ThemedText>
    </View>
  );
}

