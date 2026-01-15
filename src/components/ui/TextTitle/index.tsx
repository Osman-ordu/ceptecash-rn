import React from 'react';
import { ITextTitleProps } from '@/types';
import { ThemedText } from '../ThemedText';
import { styles } from './styles';

export function TextTitle({ children, style }: ITextTitleProps) {
  return (
    <ThemedText style={[styles.title, style]}>
      {children}
    </ThemedText>
  );
}

