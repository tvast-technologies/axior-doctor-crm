import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormHelperText, Grid, Paper } from '@mui/material';
import clsx from 'clsx';
import { RecipientItem } from 'types/invoice';
import { CreateInvoiceFormSchemaValues } from '../useCreateInvoiceForm';
import RecipientCard from './RecipientCard';
import RecipientsFormDialogue from './RecipientsFormDialogue';

const Recipients = () => {
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateInvoiceFormSchemaValues>();

  const [invoiceToOpen, setInvoiceToOpen] = useState(false);

  const invoiceFrom = watch('invoiceFrom'); // hardcoded
  const invoiceTo = watch('invoiceTo');

  const invoiceToSubmitHandler = (data: RecipientItem) => {
    setValue('invoiceTo.name', data.name);
    setValue('invoiceTo.email', data.email);
    setValue('invoiceTo.phone', data.phone);
    setValue('invoiceTo.address', data.location);
    clearErrors('invoiceTo');
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
        }}
      >
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Doctor (Hardcoded) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <RecipientCard title="Doctor" data={invoiceFrom} editButton={false} />
          </Grid>

          {/* Patient */}
          <Grid size={{ xs: 12, md: 6 }}>
            <RecipientCard title="Patient" data={invoiceTo} setOpen={setInvoiceToOpen} />
          </Grid>
        </Grid>
      </Paper>

      {errors.invoiceTo && (
        <FormHelperText error sx={{ mx: '14px' }}>
          Patient information is required.
        </FormHelperText>
      )}

      <RecipientsFormDialogue
        open={invoiceToOpen}
        title="Select Patient"
        subtitle="Select a patient to create invoice"
        handleDialogClose={() => setInvoiceToOpen(false)}
        onSubmit={invoiceToSubmitHandler}
        mode="patient"
      />
    </>
  );
};

export default Recipients;

