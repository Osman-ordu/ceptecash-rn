import React from 'react';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { CustomGrid } from '@/components/ui/custom-grid';
import { quickTransactionColumns } from '@/db/columns/quickTransactionColumns';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getQuickTransaction } from '@/store/quickTransactions';
import { useEffect } from 'react';
import { RootState } from '@/store/store';
import { styles } from './styles';

export default function QuickTransactions() {
  const dispatch = useAppDispatch();
  const quickTransactions = useAppSelector((state: RootState) => state.quickTransaction?.data?.data);

  useEffect(() => {
   (async () => {
    await dispatch(getQuickTransaction());
   })();
  }, []);

  return (
    <ThemedView card style={styles.card}>
      <ThemedText style={styles.title}>Son yapılan İşlemler</ThemedText>
      <CustomGrid
        gridKey="quick-transactions"
        data={quickTransactions || []}
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
      />
    </ThemedView>
  );
}


