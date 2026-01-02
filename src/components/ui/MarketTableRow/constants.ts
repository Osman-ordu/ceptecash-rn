export const MARKET_TABLE_ROW_LABELS = {
  BUY: 'Alış',
  SELL: 'Satış',
  TIME: 'Saat',
} as const;

export type MarketTableRowLabelKeys = keyof typeof MARKET_TABLE_ROW_LABELS;

