import { StyleSheet, TextStyle,ViewStyle } from 'react-native';
import { NAVBAR_COLORS, NAVBAR_CONSTANTS } from '@/constants/navbar';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0.5,
  },
  navContainer: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8, // Indicator için yer - artırıldı
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  activeBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  icon: {
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 1.5,
    borderRadius: 0.75,
  },
});

// Dinamik stiller için helper fonksiyonlar
export const getDynamicStyles = () => ({
  container: (
    backgroundColor: string,
    paddingBottom: number,
    colorScheme: 'light' | 'dark' | null
  ): ViewStyle => ({
    backgroundColor,
    paddingBottom: Math.max(paddingBottom, NAVBAR_CONSTANTS.minPaddingBottom),
    borderTopColor:
      colorScheme === 'dark'
        ? NAVBAR_COLORS.borderTop.dark
        : NAVBAR_COLORS.borderTop.light,
  }),
  indicator: (backgroundColor: string, width: number): ViewStyle => ({
    backgroundColor,
    width,
  }),
  activeBorder: (backgroundColor: string): ViewStyle => ({
    backgroundColor,
  }),
  navText: (color: string): TextStyle => ({
    color,
  }),
});