import Constants from 'expo-constants';
import { allowedEndpoints } from '@/db';

export const apiEnvUrl =
  process.env.EXPO_PUBLIC_FOREIGN_API_URL ||
  Constants.expoConfig?.extra?.apiUrl ||
  '';

export const apiEnvKey =
  process.env.EXPO_PUBLIC_FOREIGN_API_KEY ||
  Constants.expoConfig?.extra?.apiKey ||
  '';

export const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

export const isProduction = !__DEV__ && process.env.NODE_ENV === 'production';

export const getEnvironment = (): 'development' | 'production' | 'test' => {
  if (isDevelopment) return 'development';
  if (process.env.NODE_ENV === 'test') return 'test';
  return 'production';
};

export const validateApiConfig = (): boolean => {
  if (!apiEnvUrl) {
    console.warn(
      '⚠️ API URL is not configured. Please set EXPO_PUBLIC_FOREIGN_API_URL in your .env file or app.json'
    );
    return false;
  }
  return true;
};

export const isAllowedRequest = (method: any, url: any): boolean => {
  if (method === 'GET') return true;
  return [...allowedEndpoints].some((endpoint) => url.includes(endpoint));
};

export const cleanNumericInput = (text: string): string => {
  let cleanedText = text.replace(/[^0-9.,]/g, '');
  cleanedText = cleanedText.replace(',', '.');
  const parts = cleanedText.split('.');
  if (parts.length > 2) {
    cleanedText = parts[0] + '.' + parts.slice(1).join('');
  }
  return cleanedText;
};

export const formatTransactionDate = (date: Date | string | number): string => {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}/${hours}:${minutes}`;
};

export const formatTimeString = (timestamp: number): string => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return '';
  }
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatCurrencyAmount = (
  value: number | string,
  currency: 'TRY' | 'USD' | 'EUR' = 'TRY'
): string => {
  const numericValue = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(numericValue)) {
    return '';
  }

  const localeMap: Record<'TRY' | 'USD' | 'EUR', string> = {
    TRY: 'tr-TR',
    USD: 'en-US',
    EUR: 'de-DE',
  };

  return new Intl.NumberFormat(localeMap[currency], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

export const formatPrice = (price: number, decimals: number = 4): string => {
  return price.toFixed(decimals);
};

export const formatPercent = (changePercent: number): string => {
  const sign = changePercent >= 0 ? '+' : '';
  return `${sign}${changePercent.toFixed(2)}%`;
};

export const formatCurrencyPair = (currency: string): string => {
  return currency === 'GUMUSTRY' ? 'GUMUSTRY/TRY' : `${currency}/TRY`;
};

export const safeJsonParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};