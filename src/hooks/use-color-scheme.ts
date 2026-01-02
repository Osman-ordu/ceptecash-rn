import { useContext } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';

export function useColorScheme() {
  const themeContext = useContext(ThemeContext) as ThemeContextType | undefined;
  const rnColorScheme = useRNColorScheme();

  if (themeContext) {
    return themeContext.colorScheme;
  }

  return rnColorScheme ?? 'light';
}
