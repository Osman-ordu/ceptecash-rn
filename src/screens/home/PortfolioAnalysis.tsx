import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { portfolioAnalysis } from '@/db';

export function PortfolioAnalysis() {
  const handleAction = () => {
    console.log('Action clicked:', portfolioAnalysis.action);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${portfolioAnalysis.color}15` }]}>
            <Ionicons
              name={portfolioAnalysis.icon as keyof typeof Ionicons.glyphMap || 'warning-outline'}
              size={24}
              color={portfolioAnalysis.color}
            />
          </View>
          <View style={styles.headerText}>
            <ThemedText style={styles.title}>{portfolioAnalysis.title}</ThemedText>
            <ThemedText style={styles.subtitle}>Smart Insight</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.message}>{portfolioAnalysis.message}</ThemedText>

        <Button
          title={portfolioAnalysis.action}
          onPress={handleAction}
          variant="primary"
          size="medium"
          style={styles.button}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});

