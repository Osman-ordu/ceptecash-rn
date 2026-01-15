import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors, SemanticColors } from '@/theme';
import { IPasswordInputProps } from '@/types';
import { ThemedText } from '../ThemedText';
import { styles } from './styles';

export function PasswordInput({
  control,
  errors,
  dynamicStyles,
  label = 'Şifre',
  name = 'password',
}: IPasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const borderColor = useThemeColor(
    { light: Colors.light.card, dark: Colors.dark.card },
    'card'
  );
  const iconColor = useThemeColor(
    { light: Colors.light.icon, dark: Colors.dark.icon },
    'icon'
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <>
          <ThemedText style={styles.label}>{label}</ThemedText>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                dynamicStyles.input(!!errors[name]),
                { color: textColor, borderColor: errors[name] ? SemanticColors.error : borderColor },
              ]}
              value={value}
              onChangeText={onChange}
              placeholder="••••••••"
              placeholderTextColor={dynamicStyles.inputPlaceholder()}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={iconColor}
              />
            </TouchableOpacity>
          </View>
          {errors[name] && (
            <ThemedText style={styles.errorText}>
              {errors[name]?.message as string}
            </ThemedText>
          )}
        </>
      )}
    />
  );
}

