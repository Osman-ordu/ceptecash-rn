import React from 'react';
import { StyleSheet,View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '../themed-text';

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

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
  },
});

