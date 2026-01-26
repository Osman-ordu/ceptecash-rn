import { ICurrencyData } from '@/types';

export interface IMarketTableProps {
  currencies: Record<string, ICurrencyData>;
  symbols?: string[];
  currencyLabels?: Record<string, string>;
  isConnected: boolean;
}

export interface ICurrencyDisplayData {
  currency: string;
  currencyName: string;
  buyPrice: number;
  sellPrice: number;
  changePercent: number;
  time: string;
}

