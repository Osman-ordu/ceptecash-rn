import React from 'react';
import { View } from 'react-native';
import { TextInput } from '@/components/ui';
import { IRegisterStepProps } from '@/types';
import { styles } from './styles';

export function Step2({ control, errors, dynamicStyles }: IRegisterStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          control={control}
          errors={errors}
          dynamicStyles={dynamicStyles}
          name="phone"
          label="Telefon"
          placeholder="05XX XXX XX XX"
          keyboardType="phone-pad"
          maxLength={11}
        />
      </View>
    </View>
  );
}

