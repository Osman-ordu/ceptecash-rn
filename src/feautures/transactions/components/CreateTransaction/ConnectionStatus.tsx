import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { SemanticColors } from '@/theme';
import { IConnectionStatusProps } from '@/types';
import { styles } from './styles';

export function ConnectionStatus({ isConnected }: IConnectionStatusProps) {
  if (isConnected) return null;

  return (
    <ThemedView style={styles.connectionStatus}>
      <Ionicons name="warning-outline" size={16} color={SemanticColors.warning} />
      <ThemedText style={styles.connectionStatusText}>
        Fiyat verileri yükleniyor...
      </ThemedText>
    </ThemedView>
  );
}

