import React from 'react';
import { Pressable,View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TextTitle } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { RootStackParamList } from '@/navigation/types';
import { SemanticColors } from '@/theme';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function PortfolioActions() {
  const navigation = useNavigation<NavigationProp>();

  const handleBuy = () => {
    navigation.navigate('EasyBuySell');
  };

  const handleSell = () => {
    navigation.navigate('EasyBuySell');
  };

  const handleDeposit = () => {
    console.log('Deposit clicked');
  };

  const handleWithdraw = () => {
    console.log('Withdraw clicked');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView card style={styles.card}>
        <TextTitle>Hızlı İşlemler</TextTitle>

        <View style={styles.actionsGrid}>
          <Button
            title="Al"
            onPress={handleBuy}
            variant="primary"
            size="medium"
            style={styles.actionButton}
            textStyle={styles.actionButtonText}
          />
          <Button
            title="Sat"
            onPress={handleSell}
            variant="outline"
            size="medium"
            style={styles.actionButton}
            textStyle={styles.actionButtonText}
          />
        </View>

        <View style={styles.secondaryActions}>
          <Pressable style={styles.secondaryActionItem} onPress={handleDeposit}>
            <Ionicons name="arrow-down-circle" size={24} color={SemanticColors.success} />
            <ThemedText style={styles.secondaryActionText}>Para Yatır</ThemedText>
          </Pressable>
          <Pressable style={styles.secondaryActionItem} onPress={handleWithdraw}>
            <Ionicons name="arrow-up-circle" size={24} color={SemanticColors.error} />
            <ThemedText style={styles.secondaryActionText}>Para Çek</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

