import { type AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { CallApi } from '@/services/api/callApi';
import { createSliceModule } from '@/store/createSliceModule';
import { IPortfolioResponse } from './types';

export const getPortfolio = createAsyncThunk<IPortfolioResponse, void, { rejectValue: string }>(
  'portfolio/get',
  async () => {
    return CallApi({
      url: `/api/portfolio`,
      method: 'GET',
    });
  }
);

export const portfolioReducer = createSliceModule<IPortfolioResponse>(
  'portfolio',
  getPortfolio as AsyncThunk<IPortfolioResponse, any, any>
).reducer;
