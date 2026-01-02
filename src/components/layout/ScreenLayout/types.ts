import { ReactNode, StyleProp, ViewStyle } from 'react-native';

export interface IScreenLayoutProps {
  children: ReactNode;
  logoHeight?: number;
  contentStyle?: StyleProp<ViewStyle>;
  scrollContentStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
}

