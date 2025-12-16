import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EasyBuySellScreen from '@/screens/easyBuySell/EasyBuySellScreen';
import MarketDetailScreen from '@/screens/marketDetail/MarketDetailScreen';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import { RootStackParamList } from '@/types';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="MarketDetail"
        component={MarketDetailScreen}
        options={{ headerShown: true, title: 'Market Detail' }}
      />
      <Stack.Screen
        name="EasyBuySell"
        component={EasyBuySellScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
