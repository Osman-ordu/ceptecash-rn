import React from 'react';
import { TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors, SemanticColors } from '@/theme';
import { IEmailInputProps } from '@/types';
import { ThemedText } from '../ThemedText';
import { styles } from './styles';

export function EmailInput({ control, errors, dynamicStyles }: IEmailInputProps) {
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const borderColor = useThemeColor(
    { light: Colors.light.card, dark: Colors.dark.card },
    'card'
  );

  return (
    <Controller
      control={control}
      name="email"
      render={({ field: { onChange, value } }) => (
        <>
          <ThemedText style={styles.label}>E-posta</ThemedText>
          <TextInput
            style={[
              styles.input,
              dynamicStyles.input(!!errors.email),
              { color: textColor, borderColor: errors.email ? SemanticColors.error : borderColor },
            ]}
            value={value}
            onChangeText={onChange}
            placeholder="ornek@email.com"
            placeholderTextColor={dynamicStyles.inputPlaceholder()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
          />
          {errors.email && (
            <ThemedText style={styles.errorText}>
              {errors.email.message as string}
            </ThemedText>
          )}
        </>
      )}
    />
  );
}

