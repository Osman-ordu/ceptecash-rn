import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { RootStackParamList } from '@/types';
import { HeroBanner } from './HeroBanner';
import { PopularCoins } from './PopularCoins';
import { PortfolioAnalysis } from './PortfolioAnalysis';
import { PortfolioDistribution } from './PortfolioDistribution';
import { PortfolioSummary } from './PortfolioSummary';
import { TodayPerformance } from './TodayPerformance';
import { TrendingCoins } from './TrendingCoins';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [showEasyBuySell, setShowEasyBuySell] = useState(true);

  const handleEasyBuySellPress = () => {
    navigation.navigate('EasyBuySell');
  };

  const handleCloseEasyBuySell = () => {
    setShowEasyBuySell(false);
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      {/* 🔹 SCROLL EDİLEN İÇERİK */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <HeroBanner />
        <PopularCoins />
        <PortfolioSummary />
        <PortfolioDistribution />
        <TodayPerformance />
        <PortfolioAnalysis />
        <TrendingCoins />
      </ScrollView>

      {/* 🔹 INTERACTIVE / TRADE ALANI */}
      {showEasyBuySell && (
        <View style={styles.tradeSection}>
          <ThemedView style={styles.easyBuySellCard}>
            <View style={styles.easyBuySellHeader}>
              <ThemedText style={styles.easyBuySellTitle}>Kolay Al Sat</ThemedText>
              <Pressable
                onPress={handleCloseEasyBuySell}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={24} color="#666" />
              </Pressable>
            </View>
            <ThemedText style={styles.easyBuySellDescription}>
              Kripto paralarınızı kolayca alın veya satın. Hızlı ve güvenli işlemler için tek tıkla
              başlayın. En popüler coinlerle anında işlem yapabilirsiniz.
            </ThemedText>
            <Button
              title="Kolay Al Sat'a Başla"
              onPress={handleEasyBuySellPress}
              variant="primary"
              size="large"
              style={styles.easyBuySellButton}
            />
          </ThemedView>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 16,
  },
  tradeSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  easyBuySellCard: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  easyBuySellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  easyBuySellTitle: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  easyBuySellDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
    marginBottom: 20,
  },
  easyBuySellButton: {
    width: '100%',
  },
});
