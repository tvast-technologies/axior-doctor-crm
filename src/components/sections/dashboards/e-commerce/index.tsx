'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Box, Stack, Typography, Button } from '@mui/material';
import { appointments, stats } from 'data/e-commerce/greetings';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import Greeting from 'components/sections/dashboards/e-commerce/Greeting';
import GeneratedRevenue from 'components/sections/dashboards/e-commerce/generated-revenue/GeneratedRevenue';
import MonthlyProfit from 'components/sections/dashboards/e-commerce/monthly-profit/MonthlyProfit';
import VisitorRevenue from 'components/sections/dashboards/e-commerce/visitor-revenue/VisitorRevenue';

const ECommerce = () => {
  const { up } = useBreakpoints();
  const upLg = up('lg');

  const data = useSession();
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('create-invoice-form');
    if (!data.data?.user) {
      router.push('/authentication/default/jwt/login');
    }
  }, []);

  const user = data.data?.user;

  const isPatient = user?.designation?.toLowerCase() === 'patient';

  if (isPatient) {
    return (
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at top, rgba(255,255,255,0.08), rgba(0,0,0,0.9))',
          backdropFilter: 'blur(18px)',
        }}
      >
        <Stack
          spacing={2.5}
          alignItems="center"
          sx={{
            p: 4,
            minWidth: 320,
            borderRadius: 3,
            backgroundColor: 'rgba(20, 20, 20, 0.75)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }}
        >
          <IconifyIcon
            icon="material-symbols:lock-outline"
            width={52}
            height={52}
            color="rgba(255,255,255,0.75)"
          />

          <Typography variant="h6" fontWeight={600} color="common.white">
            Dashboard Locked
          </Typography>

          <Typography variant="body2" color="rgba(255,255,255,0.6)" textAlign="center">
            This area is restricted to doctors only.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 1,
              px: 3,
              background: 'linear-gradient(135deg, #6d5dfc, #4a90e2)',
              boxShadow: '0 8px 24px rgba(109,93,252,0.4)',
              '&:hover': {
                boxShadow: '0 10px 28px rgba(109,93,252,0.6)',
              },
            }}
            href="/apps/patient/booking-status"
          >
            Go to Patient Portal
          </Button>
        </Stack>
      </Box>
    );
  }

  if (user) {
    return (
      <div suppressHydrationWarning>
        <Grid container>
          <Grid size={{ xs: 12, md: 5, lg: 4, xl: 3 }} sx={{ height: 1 }}>
            <Greeting appointments={appointments} stats={stats} />
          </Grid>

          <Grid container size={{ xs: 12, md: 7, lg: 8, xl: 9 }}>
            <Grid container size={{ xs: 12 }}>
              <Grid size={{ xs: 12, sm: 6, md: 12, lg: 6, xl: 12 }}>
                <MonthlyProfit />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 12, lg: 6, xl: 12 }}>
                <VisitorRevenue />
              </Grid>
            </Grid>

            {upLg && (
              <Grid size={{ xs: 12 }} order={{ lg: 2 }}>
                <GeneratedRevenue />
              </Grid>
            )}
          </Grid>

          {!upLg && (
            <Grid size={{ xs: 12 }}>
              <GeneratedRevenue />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
};

export default ECommerce;
