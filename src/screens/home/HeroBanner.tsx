import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';

export function HeroBanner() {
  return (
    <ThemedView style={styles.heroContainer}>
      <Image
        source={require('../../assets/images/herobanner.jpg')}
        style={styles.heroImage}
        contentFit="cover"
        transition={200}
      />
      <ThemedView style={styles.heroOverlay}>
        <ThemedText type="title" style={styles.heroTitle}>
          Crypto Tracker
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Kripto paralarınızı takip edin
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroTitle: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.9,
  },
});

