import React from 'react';
import { ScreenLayout } from '@/components/layout';
import { PortfolioActions } from '@/feautures/portfolio/components/PortfolioActions';
import { PortfolioDistribution } from '@/feautures/portfolio/components/PortfolioDistribution';
import { PortfolioHeader } from '@/feautures/portfolio/components/PortfolioHeader';
import { PortfolioHoldings } from '@/feautures/portfolio/components/PortfolioHoldings';
import { PortfolioStats } from '@/feautures/portfolio/components/PortfolioStats';
import { TodayPerformance } from '@/feautures/portfolio/components/TodayPerformance';
import { styles } from './PortfolioScreen.styles';

export default function PortfolioScreen() {
  return (
    <ScreenLayout scrollContentStyle={styles.scrollContent}>
      <PortfolioHeader />
      <PortfolioDistribution />
      <PortfolioStats />
      <PortfolioHoldings />
      <TodayPerformance />
      <PortfolioActions />
    </ScreenLayout>
  );
}

