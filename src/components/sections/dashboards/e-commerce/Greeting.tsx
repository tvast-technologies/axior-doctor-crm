'use client';

import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
  chipClasses,
} from '@mui/material';
import { Order, Stat, statsToday } from 'data/e-commerce/greetings';
import dayjs from 'dayjs';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';

interface GreetingProps {
  stats: Stat[];
  appointments: {
    id: number;
    patientImage: string;
    patientName: string;
    fee: string;
    statusIcon: string;
    status: 'primary' | 'success' | 'warning' | 'error';
    type: 'walkin' | 'online';
  }[];
}

const AppointmentsList = ({
  title,
  data,
}: {
  title: string;
  data: GreetingProps['appointments'];
}) => {
  return (
    <Stack direction="column" gap={2} sx={{ flex: 1 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          fontWeight: 400,
        }}
      >
        {data.length} {title} appointments
      </Typography>

      <SimpleBar sx={{ maxHeight: { xs: 300, md: 368, lg: 596, xl: 376 }, height: 'min-content' }}>
        <List
          disablePadding
          component={Stack}
          gap={1}
          direction={{ xs: 'column', sm: 'row', md: 'column' }}
        >
          {data.map(({ id, patientName, patientImage, fee, statusIcon, status }) => (
            <ListItemButton
              key={id}
              sx={{
                minWidth: { xs: 0, sm: 254, md: 0 },
                py: 1.75,
                px: 1.5,
                bgcolor: 'background.elevation2',
                borderRadius: 2,
                gap: 1,
                '&:hover': {
                  backgroundColor: 'background.elevation3',
                },
              }}
            >
              <ListItemIcon>
                <Avatar
                  sx={{ width: 48, height: 48, bgcolor: 'transparent' }}
                  src={patientImage}
                  alt={patientName}
                  variant="rounded"
                />
              </ListItemIcon>

              <ListItemText
                primary={patientName}
                secondary={`${fee}`}
                slotProps={{
                  primary: {
                    sx: {
                      typography: 'body2',
                      fontWeight: 600,
                      color: 'text.primary',
                      lineClamp: 1,
                    },
                  },
                  secondary: {
                    sx: {
                      typography: 'caption',
                      fontWeight: 600,
                      lineClamp: 1,
                    },
                  },
                }}
              />

              <Tooltip
                // title={
                //   status === 'warning'
                //     ? 'Processing'
                //     : status === 'primary'
                //       ? 'Shipped'
                //       : 'Delivered'
                // }
                title="Booked"
              >
                <Chip
                  variant="soft"
                  icon={<IconifyIcon icon={statusIcon} fontSize={16} />}
                  color={status}
                  size="small"
                  sx={{
                    height: 24,
                    width: 24,
                    [`& .${chipClasses.label}`]: {
                      display: 'none',
                    },
                  }}
                />
              </Tooltip>
            </ListItemButton>
          ))}
        </List>
      </SimpleBar>

      {/* <Button
        variant="text"
        color="primary"
        size="small"
        endIcon={
          <IconifyIcon
            icon="material-symbols:keyboard-arrow-right"
            height={18}
            width={18}
            sx={{ mt: 0.5 }}
          />
        }
        sx={{ alignSelf: 'flex-end' }}
      >
        All appointments
      </Button> */}
    </Stack>
  );
};

const UpdateList = ({ title, data }: { title: string; data: Stat[] }) => {
  return (
    <div>
      <Typography variant="subtitle2" color="text.secondary" fontWeight={400} mb={2}>
        {title}
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row', md: 'column' }}
        sx={{
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        {data.map(({ icon, subtitle, value }) => (
          <Stack
            key={subtitle}
            direction={{ xs: 'row', sm: 'column', md: 'row' }}
            sx={{
              gap: 1,
              flexWrap: 'wrap',
              alignItems: { xs: 'center', sm: 'start', md: 'center' },
              flex: 1,
              px: { sm: 3, md: 0 },
              borderLeft: { sm: 1, md: 'none' },
              borderColor: { sm: 'divider' },
            }}
          >
            <Avatar sx={{ color: 'primary.main', bgcolor: 'primary.lighter' }}>
              <IconifyIcon icon={icon} sx={{ fontSize: 24 }} />
            </Avatar>
            <Stack
              direction={{ xs: 'row', sm: 'column' }}
              sx={{
                gap: 0.5,
                flexWrap: 'wrap',
                alignItems: 'baseline',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: 'text.secondary',
                }}
              >
                {subtitle}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

const Greeting = ({ stats, appointments }: GreetingProps) => {
  const walkIns = appointments.filter((a) => a.type === 'walkin');
  const online = appointments.filter((a) => a.type === 'online');

  return (
    <Paper
      background={1}
      component={Stack}
      direction="column"
      divider={<Divider flexItem />}
      sx={{
        gap: 3,
        p: { xs: 3, md: 5 },
        height: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="column" spacing={1}>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {dayjs(new Date()).format('dddd, MMM DD, YYYY')}
        </Typography>

        <Typography variant="h6" display="flex" columnGap={1} flexWrap="wrap">
          Good morning,
          <span>Doc</span>
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: 1 }}>
          <AppointmentsList title="Walk-in" data={walkIns} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: 1 }}>
          <AppointmentsList title="Online" data={online} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: 1 }}>
          <UpdateList title="Estimation for Today" data={statsToday} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: 1 }}>
          <UpdateList title="Updates from Yesterday" data={stats} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Greeting;
