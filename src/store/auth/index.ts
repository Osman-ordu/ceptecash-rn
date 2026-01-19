import { type AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { CallApi } from '@/services/api/callApi';
import { tokenService } from '@/services/api/tokenService';
import { AuthResponse, AuthState, RegisterProfileRequest, RegisterProfileResponse } from '@/store/auth/types';
import { createSliceModule } from '@/store/createSliceModule';

export const getAuth = createAsyncThunk<AuthResponse, string, { rejectValue: string }>(
  'auth/firebase',
  async (firebaseToken: string, { rejectWithValue }) => {
    try {
      const response = await CallApi<AuthResponse>({
        url: `/auth/firebase`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${firebaseToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.success && response.data) {
        await tokenService.setToken(firebaseToken);
        return response;
      } else {
        return rejectWithValue(response.message || response.error || 'Authentication failed');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Authentication failed';
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerProfile = createAsyncThunk<
  RegisterProfileResponse,
  { data: RegisterProfileRequest; idToken: string },
  { rejectValue: string }
>(
  'auth/registerProfile',
  async ({ data, idToken }, { rejectWithValue }) => {
    try {
      const response = await CallApi<RegisterProfileResponse>({
        url: `/api/register-profile`,
        method: 'POST',
        data,
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.success) {
        await tokenService.setToken(idToken);
        return response;
      } else {
        return rejectWithValue(response.message || response.error || 'Profile registration failed');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Profile registration failed';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSliceModule<AuthResponse>(
  'auth',
  getAuth as AsyncThunk<AuthResponse, any, any>,
  {
    clearAuth: (state: AuthState) => {
      state.data = null;
      state.error = null;
      state.isLoading = false;
      tokenService.clear();
    },
    clearError: (state: AuthState) => {
      state.error = null;
    },
  }
);

export const { clearAuth, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
