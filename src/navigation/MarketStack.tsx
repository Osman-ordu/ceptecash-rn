import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketsScreen from '@/screens/market/MarketsScreen';
import MarketDetailScreen from '@/screens/marketDetail/MarketDetailScreen';
import { MarketStackParamList } from '@/types';

const Stack = createNativeStackNavigator<MarketStackParamList>();

export default function MarketStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Markets"
        component={MarketsScreen}
        options={{ title: 'Markets' }}
      />
      <Stack.Screen
        name="MarketDetail"
        component={MarketDetailScreen}
        options={{ title: 'Market Detail' }}
      />
    </Stack.Navigator>
  );
}

