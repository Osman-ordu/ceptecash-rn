import React, { createContext, ReactNode,useContext, useEffect, useState } from 'react';
import { Platform,useColorScheme as useRNColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  themeMode: ThemeMode;
  colorScheme: 'light' | 'dark';
  setThemeMode: (mode: ThemeMode) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@ceptecash_theme_mode';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useRNColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    const loadTheme = async () => {
      try {
        let savedTheme: string | null = null;

        if (Platform.OS === 'web') {
          savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        } else {
          savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        }

        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
          setThemeModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTheme();
  }, []);

  // Calculate actual color scheme
  const colorScheme: 'light' | 'dark' =
    themeMode === 'system' ? (systemColorScheme ?? 'dark') : themeMode;

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
      } else {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      }
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  // Don't render until theme is loaded to prevent flash
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeMode, colorScheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

