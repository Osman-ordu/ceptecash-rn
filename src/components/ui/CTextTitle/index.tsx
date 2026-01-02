import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { ThemedText } from '../themed-text';
import { styles } from './styles';

interface CTextTitleProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function CTextTitle({ children, style }: CTextTitleProps) {
  return (
    <ThemedText style={[styles.title, style]}>
      {children}
    </ThemedText>
  );
}

