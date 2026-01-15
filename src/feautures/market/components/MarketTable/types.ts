import { ICurrencyData } from '@/types';

export interface IMarketTableProps {
  currencies: Record<string, ICurrencyData>;
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

