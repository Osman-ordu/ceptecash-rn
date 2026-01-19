import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/store/auth';
import { currencyReducer } from '@/store/currency';
import { portfolioReducer } from '@/store/portfolio';
import { quickTransactionReducer } from '@/store/quickTransactions';

export const store = configureStore({
  reducer: {
    currencyValue: currencyReducer,
    quickTransaction: quickTransactionReducer,
    portfolio: portfolioReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
