import { type AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { CallApi } from '@/services/api/callApi';
import { createSliceModule } from '@/store/createSliceModule';
import { IDeleteUserResponse, IUserResponse } from './types';

export const getUser = createAsyncThunk<IUserResponse, void, { rejectValue: string }>(
  'user/get',
  async () => {
    return CallApi({
      url: `/api/user`,
      method: 'GET',
    });
  }
);

export const deleteUser = createAsyncThunk<IDeleteUserResponse, void, { rejectValue: string }>(
  'user/delete',
  async () => {
    return CallApi({
      url: `/api/user`,
      method: 'DELETE',
    });
  }
);

export const userReducer = createSliceModule<IUserResponse>(
  'portfolio',
  getUser as AsyncThunk<IUserResponse, any, any>
).reducer;

export const deleteUserReducer = createSliceModule<IDeleteUserResponse>(
  'userDelete',
  deleteUser as AsyncThunk<IDeleteUserResponse, any, any>
).reducer;
