export interface IMarketTableRowProps {
  currency: string;
  currencyName: string;
  buyPrice: number;
  sellPrice: number;
  changePercent: number;
  time: string;
  isExpanded: boolean;
  onToggle: () => void;
  labels?: {
    buy?: string;
    sell?: string;
    time?: string;
  };
}

