import React from 'react';
import { TouchableOpacity,View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/theme';
import { styles } from './styles';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  onLogin: () => void;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  loading,
  onNext,
  onBack,
  onSubmit,
  onLogin,
}: NavigationButtonsProps) {
  const tintColor = useThemeColor(
    { light: Colors.light.tint, dark: Colors.dark.tint },
    'tint'
  );
  const borderColor = useThemeColor(
    { light: Colors.light.borderColor, dark: Colors.dark.borderColor },
    'borderColor'
  );

  const isLastStep = currentStep === totalSteps;
  const canGoBack = currentStep > 1;

  return (
    <View style={styles.container}>
      <View style={styles.navigationRow}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.backButton,
            { borderColor: canGoBack ? tintColor : borderColor },
            !canGoBack && styles.backButtonDisabled,
          ]}
          onPress={onBack}
          activeOpacity={0.7}
          disabled={!canGoBack}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={canGoBack ? tintColor : borderColor}
          />
        </TouchableOpacity>

        {!isLastStep ? (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton, { backgroundColor: tintColor }]}
            onPress={onNext}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.submitButtonContainer}>
            <Button
              title="Üye Ol"
              onPress={onSubmit}
              variant="primary"
              size="large"
              loading={loading}
              style={styles.submitButton}
            />
          </View>
        )}
      </View>

      <View style={styles.loginButtonContainer}>
        <Button
          title="Giriş Yap"
          onPress={onLogin}
          variant="outline"
          size="large"
          style={styles.loginButton}
        />
      </View>
    </View>
  );
}

