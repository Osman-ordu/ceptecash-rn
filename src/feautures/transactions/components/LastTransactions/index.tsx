import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button,CustomGrid,TextTitle } from '@/components/ui';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import { quickTransactionColumns } from '@/db/columns/quickTransactionColumns';
import { RootStackParamList } from '@/navigation/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getQuickTransaction } from '@/store/quickTransactions';
import { RootState } from '@/store/store';
import { styles } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function QuickTransactions() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const quickTransactions = useAppSelector((state: RootState) => state.quickTransaction?.data?.data);
  const hasFetchedRef = useRef(false);
  const isLoading = useAppSelector((state: RootState) => state.quickTransaction?.isLoading);

  useEffect(() => {
    if (user && !hasFetchedRef.current) {
      hasFetchedRef.current = true;
      dispatch(getQuickTransaction());
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <ThemedView card style={styles.card}>
        <TextTitle>Son yapılan İşlemler</TextTitle>
        <View style={styles.authPrompt}>
          <ThemedText style={styles.authMessage}>
            İşlemlerinizi görmek için giriş yapın veya üye olun
          </ThemedText>
          <View style={styles.authButtons}>
            <Button
              title="Giriş Yap"
              onPress={() => navigation.navigate('Login')}
              variant="primary"
              size="small"
              style={styles.authButton}
            />
            <Button
              title="Üye Ol"
              onPress={() => navigation.navigate('Register')}
              variant="outline"
              size="small"
              style={styles.authButton}
            />
          </View>
        </View>
      </ThemedView>
    );
  }

  const shouldRender = !isLoading && quickTransactions && quickTransactions.length > 0;

  if (!shouldRender) {
    return null;
  }

  return (
    <ThemedView card style={styles.card}>
      <TextTitle>Son yapılan İşlemler</TextTitle>
      <CustomGrid
        gridKey="quick-transactions"
        data={quickTransactions}
        columns={quickTransactionColumns}
        renderRowActions={undefined}
        tab={true}
        tabConfig={{
          type: 'side',
          tabs: [
            { value: 'buy', label: 'Alınan' },
            { value: 'sell', label: 'Satılan' },
          ],
          defaultTab: 'buy',
        }}
        emptyMessage="Henüz işlem bulunmamaktadır"
        loading={isLoading}
      />
    </ThemedView>
  );
}

