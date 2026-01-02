import { CurrencyData } from '@/hooks/use-currency-socket';

export interface IMarketTableProps {
  currencies: Record<string, CurrencyData>;
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

