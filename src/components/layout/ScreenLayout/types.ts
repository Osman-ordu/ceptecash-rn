import { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface IScreenLayoutProps {
  children: ReactNode;
  logoHeight?: number;
  contentStyle?: StyleProp<ViewStyle>;
  scrollContentStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  keyboardAvoiding?: boolean;
  keyboardVerticalOffset?: number;
  keyboardBehavior?: 'height' | 'position' | 'padding';
}

