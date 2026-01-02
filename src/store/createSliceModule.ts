import { AsyncThunk,createSlice } from '@reduxjs/toolkit';
import { castDraft } from 'immer';

export interface BaseState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function createSliceModule<T>(
  name: string,
  thunk: AsyncThunk<T, any, any>
) {
  const initialState: BaseState<T> = {
    data: null,
    isLoading: false,
    error: null,
  };

  return createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = castDraft(action.payload);
        })
        .addCase(thunk.rejected, (state, action) => {
          state.isLoading = false;
          state.error = (action.error as { message: string }).message ?? 'Unexpected error';
        });
    },
  });
}
