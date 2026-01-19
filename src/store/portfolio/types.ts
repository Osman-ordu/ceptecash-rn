export interface IPortfolioDistributionItem {
  baseAsset: string;
  total: number;
  percentage: number;
  transactionCount: number;
}

export interface IPortfolioStatistics {
  totalPortfolioValue: number;
  dailyChange: number | null;
  totalProfitLoss: number | null;
  topAsset: string | null;
  assetNumber: number;
  distribution: IPortfolioDistributionItem[];
}

export interface IPortfolioResponse {
  success: boolean;
  message: string;
  data?: {
    statistics: IPortfolioStatistics;
  };
}
