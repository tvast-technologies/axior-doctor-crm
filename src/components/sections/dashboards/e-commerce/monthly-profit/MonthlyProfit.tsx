'use client';

import { Paper, Stack } from '@mui/material';
import { monthlyProfitChartData } from 'data/e-commerce/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import EcomStatSection from 'components/sections/common/EcomStatSection';
import MonthlyProfitChart from './MonthlyProfitChart';

const MonthlyProfit = () => {
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, flex: 1, height: 1 }}>
      <Stack
        direction="column"
        sx={{
          rowGap: 2,
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <SectionHeader
          title="Monthly Profit"
          subTitle="Monthly profit gained"
          actionComponent={<DashboardMenu />}
          sx={{ mb: 0 }}
        />
        <EcomStatSection
          amount={10000}
          increment={5.55}
          chart={
            <MonthlyProfitChart
              data={monthlyProfitChartData}
              sx={{ height: '100% !important', width: 1, maxWidth: '45%', overflow: 'visible' }}
            />
          }
        />
      </Stack>
    </Paper>
  );
};

export default MonthlyProfit;
