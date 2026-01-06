"use client";

import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import paths from 'routes/paths';
import AddContactStepper from 'components/sections/crm/add-contact/AddContactStepper';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';

const AddContact = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const storedData = localStorage.getItem('editContact');
    setData(storedData ? JSON.parse(storedData) : null);
  }, []);
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title="Add New Patient"
          breadcrumb={[
            { label: data ? 'Patient Details' : 'Home', url: data ? paths.leadDetails : paths.crm },
            { label: data ? 'Edit Patient' : 'New Patient', active: true },
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
          <AddContactStepper />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddContact;
