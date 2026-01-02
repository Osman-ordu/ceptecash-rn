import React from 'react';
import { ActivityIndicator, TextStyle,TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/theme';
import { ThemedText } from './themed-text';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  animated?: boolean;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  animated = true,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const backgroundColor = useThemeColor(
    {
      light: variant === 'primary' ? Colors.light.tint : variant === 'secondary' ? '#f0f0f0' : 'transparent',
      dark: variant === 'primary' ? Colors.dark.tint : variant === 'secondary' ? '#2a2a2a' : 'transparent',
    },
    'background'
  );

  const textColor = useThemeColor(
    {
      light: variant === 'primary' ? '#fff' : Colors.light.text,
      dark: variant === 'primary' ? '#000' : Colors.dark.text,
    },
    'text'
  );

  const borderColor = useThemeColor(
    {
      light: variant === 'outline' ? Colors.light.tint : 'transparent',
      dark: variant === 'outline' ? Colors.dark.tint : 'transparent',
    },
    'tint'
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (animated && !disabled && !loading) {
      scale.value = withSpring(0.95);
      opacity.value = withTiming(0.8);
    }
  };

  const handlePressOut = () => {
    if (animated && !disabled && !loading) {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
    }
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      if (animated) {
        scale.value = withSequence(
          withSpring(0.9),
          withSpring(1)
        );
      }
      onPress();
    }
  };

  const sizeStyles = {
    small: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 },
    medium: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 },
    large: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 18 },
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: variant !== 'outline' ? backgroundColor : 'transparent',
    borderWidth: variant === 'outline' ? 2 : 0,
    borderColor,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...sizeStyles[size],
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <AnimatedTouchableOpacity
      style={[buttonStyle, animatedStyle, style]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <ThemedText
          style={[
            {
              color: textColor,
              fontWeight: '600',
              fontSize: sizeStyles[size].fontSize,
            },
            textStyle,
          ]}
        >
          {title}
        </ThemedText>
      )}
    </AnimatedTouchableOpacity>
  );
}

