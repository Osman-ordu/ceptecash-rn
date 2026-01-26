import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

export type CurrencyCode = 'TRY' | 'USD' | 'EUR';

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => Promise<void>;
};

const STORAGE_KEY = 'currency_preference';

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('TRY');

  useEffect(() => {
    const loadCurrency = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'TRY' || stored === 'USD' || stored === 'EUR') {
          setCurrencyState(stored);
        }
      } catch {
        void 0;
      }
    };

    loadCurrency();
  }, []);

  const setCurrency = async (nextCurrency: CurrencyCode) => {
    setCurrencyState(nextCurrency);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, nextCurrency);
    } catch {
      void 0;
    }
  };

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
