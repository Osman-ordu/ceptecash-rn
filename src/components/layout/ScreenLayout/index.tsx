import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ui/themed-view';
import { AppLogo, useAppLogoHeight } from '../AppLogo';
import { IScreenLayoutProps } from './types';

const DEFAULT_LOGO_HEIGHT = 60;

export function ScreenLayout({
  children,
  logoHeight = DEFAULT_LOGO_HEIGHT,
  contentStyle,
  scrollContentStyle,
  showsVerticalScrollIndicator = false,
  keyboardShouldPersistTaps = 'handled',
}: IScreenLayoutProps) {
  const totalHeaderHeight = useAppLogoHeight(logoHeight);

  return (
    <ThemedView style={[styles.container, contentStyle]}>
      <AppLogo logoHeight={logoHeight} />
      <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: totalHeaderHeight },
          scrollContentStyle,
        ]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      >
        {children}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});

