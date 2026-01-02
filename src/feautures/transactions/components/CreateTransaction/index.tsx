import React, { useState } from 'react';
import { View } from 'react-native';
import { AmountInput, CurrencyPairSelector, PriceDisplay } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { useCurrencySocket } from '@/hooks/use-currency-socket';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAppDispatch } from '@/store/hooks';
import { getQuickTransaction, postQuickTransaction } from '@/store/quickTransactions';
import { CreateQuickTransaction } from '@/store/quickTransactions/types';
import { ConnectionStatus,CurrencyPickerModal } from './components';
import { useTransactionForm } from './hooks/use-transaction-form';
import { getDynamicStyles,styles } from './styles';

export default function CreateTransaction() {
  const dispatch = useAppDispatch();
  const textColor = useThemeColor({}, 'text');
  const dynamicStyles = getDynamicStyles(textColor);
  const { currencies: socketCurrencies, isConnected } = useCurrencySocket();
  const [showBaseAssetPicker, setShowBaseAssetPicker] = useState(false);

  const {
    form,
    baseAsset,
    quoteAsset,
    amount,
    availableBaseAssets,
    price,
    calculatedTotal,
  } = useTransactionForm({ socketCurrencies });

  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = form;

  const onSubmit = async (data: any) => {
    try {
      const amountNum = parseFloat(data.amount);
      const total = amountNum * price;

      const postData: CreateQuickTransaction = {
        baseAsset: data.baseAsset,
        quoteAsset: data.quoteAsset,
        amount: amountNum,
        total: total,
        side: 'buy',
        transactionDate: new Date(),
      };

      await dispatch(postQuickTransaction(postData));
      await dispatch(getQuickTransaction());

      setValue('amount', '');
      setValue('baseAsset', '');
      setValue('quoteAsset', 'TRY');
    } catch (error) {
      console.error('Transaction creation error:', error);
    }
  };

  return (
    <ThemedView card style={styles.card}>
      <ThemedText style={styles.title}>İşlem Oluştur</ThemedText>
      <ThemedText style={styles.subtitle}>
        Miktar ve döviz çifti seçerek yeni işlem ekleyin
      </ThemedText>

      <ConnectionStatus isConnected={isConnected} />

      <View style={styles.formContainer}>
        <CurrencyPairSelector
          control={control}
          errors={errors}
          onBaseAssetPress={() => setShowBaseAssetPicker(true)}
          quoteAsset={quoteAsset}
          dynamicStyles={dynamicStyles}
        />

        <AmountInput control={control} errors={errors} dynamicStyles={dynamicStyles} />

        <PriceDisplay
          baseAsset={baseAsset}
          quoteAsset={quoteAsset}
          price={price}
          amount={amount}
          calculatedTotal={calculatedTotal}
        />

        <Button
          title="Portföy'e Ekle"
          onPress={handleSubmit(onSubmit)}
          variant="primary"
          size="large"
          loading={isSubmitting}
          disabled={!baseAsset || !amount || !isConnected || isSubmitting}
          style={styles.submitButton}
        />
      </View>

      <CurrencyPickerModal
        visible={showBaseAssetPicker}
        onClose={() => setShowBaseAssetPicker(false)}
        availableCurrencies={availableBaseAssets}
        selectedCurrency={baseAsset}
        onSelectCurrency={(currency) => setValue('baseAsset', currency)}
        currencies={socketCurrencies}
      />
    </ThemedView>
  );
}
