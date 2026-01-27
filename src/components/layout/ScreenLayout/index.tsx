import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ui/ThemedView';
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
  keyboardAvoiding = false,
  keyboardVerticalOffset = 0,
  keyboardBehavior,
}: IScreenLayoutProps) {
  const totalHeaderHeight = useAppLogoHeight(logoHeight);

  const scrollView = (
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
  );

  return (
    <ThemedView style={[styles.container, contentStyle]}>
      <AppLogo logoHeight={logoHeight} />
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          behavior={keyboardBehavior ?? (Platform.OS === 'ios' ? 'padding' : 'height')}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.keyboardAvoiding}
        >
          {scrollView}
        </KeyboardAvoidingView>
      ) : (
        scrollView
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});

