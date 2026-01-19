import React from 'react';
import { View } from 'react-native';
import { TextInput } from '@/components/ui';
import { IRegisterStepProps } from '@/types';
import { styles } from './styles';

export function Step1({ control, errors, dynamicStyles }: IRegisterStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          control={control}
          errors={errors}
          dynamicStyles={dynamicStyles}
          name="name"
          label="Ad"
          placeholder="Adınızı giriniz"
          autoCapitalize="words"
          maxLength={15}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          control={control}
          errors={errors}
          dynamicStyles={dynamicStyles}
          name="surname"
          label="Soyad"
          placeholder="Soyadınızı giriniz"
          autoCapitalize="words"
          maxLength={15}
        />
      </View>
    </View>
  );
}

