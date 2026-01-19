import { axiosInstance } from './axiosInstance';
import { tokenService } from './tokenService';

interface CallApiProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  silent?: boolean;
}

export const CallApi = async <T = any>({
  method,
  url,
  data,
  params,
  headers,
  silent = false,
}: CallApiProps): Promise<T> => {
  try {
    const token = await tokenService.getToken();
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers: {
        ...authHeaders,
        ...(headers ?? {}),
      },
    });

    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 401) {
      await refreshToken();
    }

    throw error;
  }
};

const refreshToken = async () => {
  const token = await tokenService.getToken();
  const refreshToken = await tokenService.getRefreshToken();

  const response = await axiosInstance.post('/api/auth/refreshToken', {
    token,
    refreshToken,
  });

  await tokenService.setToken(response.data.token);
  await tokenService.setRefreshToken(response.data.refreshToken);
};
