import React from 'react';
import { StyleSheet,TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { useThemeColor } from '@/hooks/use-theme-color';
import { SemanticColors } from '@/theme';
import { INumericKeypadProps } from '@/types';

export function NumericKeypad({
  onNumberPress,
  onDeletePress,
  onDecimalPress,
  disabled = false,
}: INumericKeypadProps) {
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'text');

  const KeypadButton = ({
    label,
    onPress,
    flex = 1,
    isDelete = false,
  }: {
    label: string;
    onPress: () => void;
    flex?: number;
    isDelete?: boolean;
  }) => {
    const buttonOpacity = disabled ? 0.4 : 1;
    const textOpacity = disabled ? 0.5 : 1;

    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: backgroundColor,
            borderColor: borderColor + '20',
            opacity: buttonOpacity,
          },
          flex > 1 && { flex },
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <ThemedText
          style={[
            styles.buttonText,
            {
              color: isDelete ? SemanticColors.error : textColor,
              fontSize: isDelete ? 12 : 16,
              fontWeight: isDelete ? '600' : '500',
              opacity: textOpacity,
            },
          ]}
        >
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <KeypadButton label="1" onPress={() => onNumberPress('1')} />
        <KeypadButton label="2" onPress={() => onNumberPress('2')} />
        <KeypadButton label="3" onPress={() => onNumberPress('3')} />
      </View>

      <View style={styles.row}>
        <KeypadButton label="4" onPress={() => onNumberPress('4')} />
        <KeypadButton label="5" onPress={() => onNumberPress('5')} />
        <KeypadButton label="6" onPress={() => onNumberPress('6')} />
      </View>

      <View style={styles.row}>
        <KeypadButton label="7" onPress={() => onNumberPress('7')} />
        <KeypadButton label="8" onPress={() => onNumberPress('8')} />
        <KeypadButton label="9" onPress={() => onNumberPress('9')} />
      </View>

      <View style={styles.row}>
        <KeypadButton label="." onPress={onDecimalPress} />
        <KeypadButton label="0" onPress={() => onNumberPress('0')} />
        <KeypadButton label="⌫" onPress={onDeletePress} isDelete />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 3,
    paddingVertical: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 3,
  },
  button: {
    flex: 1,
    aspectRatio: 1.5,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

