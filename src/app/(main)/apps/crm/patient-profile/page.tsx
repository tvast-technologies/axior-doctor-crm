'use client';

import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { users } from 'data/users';
import paths from 'routes/paths';
import AddContactStepper from 'components/sections/crm/add-contact/AddContactStepper';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';

const AddContact = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title="Patient Details"
          breadcrumb={[
            // { label: 'Patient', active: true },
          ]}
          // actionComponent={
          //   <Stack gap={1}>
          //     <Button
          //       variant="soft"
          //       size="large"
          //       color="neutral"
          //       startIcon={
          //         <IconifyIcon icon="material-symbols:upload-rounded" height={24} width={24} />
          //       }
          //     >
          //       Import From
          //     </Button>
          //   </Stack>
          // }
        />
      </Grid>
      <Grid size={12}>
        <Paper sx={{ p: { xs: 3, md: 5 } }}>
          <AddContactStepper removeSave={true} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddContact;
