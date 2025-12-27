import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { styles } from './styles';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'Veri bulunamadı' }: EmptyStateProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.message, { color: textColor, opacity: 0.6 }]}>
        {message}
      </ThemedText>
    </View>
  );
}

