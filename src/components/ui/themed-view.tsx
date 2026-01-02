import { View } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedViewProps } from '@/types';

export function ThemedView({ style, lightColor, darkColor, card, ...otherProps }: ThemedViewProps) {
  const cardBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'card');
  const defaultBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const backgroundColor = card ? cardBackgroundColor : defaultBackgroundColor;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

