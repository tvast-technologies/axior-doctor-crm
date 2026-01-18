'use client';

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { users } from 'data/users';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';
import CRMDropdownMenu from '../common/CRMDropdownMenu';
import { useRouter } from 'next/navigation';

const LeadDetailsHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [starred, setStarred] = useState(false);
  const { down } = useBreakpoints();
  const router = useRouter();

  const downSm = down('sm');
  const downMd = down('md');

  const patientData = {
    personalInfo: {
      firstName: 'Amit',
      lastName: 'Sharma',
      personalEmail: 'patient1@test.com',
      phoneNumber: '6360318731',
      profileImage: users[0].avatar,
      age: "22"
    },
    companyInfo: {},
    leadInfo: {},
  };

  const handleEdit = () => {
    localStorage.setItem('editContact', JSON.stringify(patientData));
    router.push(paths.addContact);
  };

  return (
    <Paper background={1} sx={{ px: { xs: 3, md: 5 }, py: 3 }}>
      <Stack sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Stack direction="column" gap={2}>
          <PageBreadcrumb
            items={[
              // { label: 'Home', url: paths.crm },
              { label: 'Patient Details', active: true },
            ]}
            sx={{ mb: 2 }}
          />

          <Stack gap={{ xs: 1, md: 2 }} sx={{ alignItems: 'center' }}>
            <Avatar
              src={users[0].avatar}
              sx={{ width: { xs: 40, md: 56 }, height: { xs: 40, md: 56 } }}
            />

            <Stack gap={0.75} sx={{ alignItems: 'center' }}>
              <Typography variant="h4" sx={{ fontSize: { xs: 20, md: 28 } }}>
                Amit Sharma
              </Typography>

              <Button
                shape="square"
                size={downMd ? 'medium' : 'large'}
                color="neutral"
                onClick={() => setStarred(!starred)}
              >
                <IconifyIcon
                  icon="material-symbols:star-rate-rounded"
                  sx={{
                    fontSize: 24,
                    color: starred ? 'warning.main' : 'background.elevation4',
                  }}
                />
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack gap={1}>
          <Button
            variant="soft"
            shape={downSm ? 'square' : undefined}
            color="neutral"
            sx={{ gap: 0.5 }}
            onClick={handleEdit}
          >
            <IconifyIcon icon="material-symbols:edit-outline" />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Edit information
            </Box>
          </Button>

          {/* <Button
            variant="soft"
            shape={downSm ? 'square' : undefined}
            color="neutral"
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{ gap: 0.5 }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
              More Action
            </Box>
            <IconifyIcon icon="material-symbols:expand-more" />
          </Button> */}

          <CRMDropdownMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            handleClose={() => setAnchorEl(null)}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default LeadDetailsHeader;
