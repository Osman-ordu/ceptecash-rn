import React from 'react';
import { TextInput } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { cleanNumericInput } from '@/utils';
import { ThemedText } from '../themed-text';
import { styles } from './styles';

interface AmountInputProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  dynamicStyles: {
    input: (hasError: boolean) => any;
    inputPlaceholder: () => string;
  };
  editable?: boolean;
  showKeyboard?: boolean;
  compact?: boolean;
}

export function AmountInput({
  control,
  errors,
  dynamicStyles,
  editable = true,
  showKeyboard = true,
  compact = false,
}: AmountInputProps) {
  const labelStyle = compact ? [styles.label, { fontSize: 10, marginBottom: 2 }] : styles.label;
  const inputStyle = compact 
    ? [styles.input, dynamicStyles.input(!!errors.amount), { paddingVertical: 6, minHeight: 36, fontSize: 14, borderRadius: 8 }]
    : [styles.input, dynamicStyles.input(!!errors.amount)];

  return (
    <Controller
      control={control}
      name="amount"
      render={({ field: { onChange, value } }) => (
        <>
          <ThemedText style={labelStyle}>Miktar</ThemedText>
          <TextInput
            style={inputStyle}
            value={value}
            onChangeText={(text) => {
              const cleaned = cleanNumericInput(text);
              onChange(cleaned);
            }}
            placeholder="0.00"
            placeholderTextColor={dynamicStyles.inputPlaceholder()}
            keyboardType={showKeyboard ? 'decimal-pad' : 'default'}
            editable={editable}
            showSoftInputOnFocus={showKeyboard}
          />
          {errors.amount && (
            <ThemedText style={styles.errorText}>
              {errors.amount.message as string}
            </ThemedText>
          )}
        </>
      )}
    />
  );
}

