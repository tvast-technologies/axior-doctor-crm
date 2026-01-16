import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import useNumberFormat from 'hooks/useNumberFormat';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';
import InvoiceImageDropzone from './InvoiceImageDropzone';
import Recipients from './invoice-details/Recipients';
import InvoiceDetailsForm from './invoice-details/InvoiceDetailsForm';
import ItemDetailsTableForm from './items-details/ItemDetailsForm';
import InvoiceFooter from './items-details/InvoiceFooter';

const CreateInvoiceContainer = () => {
  const { currencyFormat } = useNumberFormat();
  const { setValue } = useFormContext();

  useEffect(() => {
    // Hardcoded Doctor / Clinic
    setValue('invoiceFrom', {
      name: 'Dr. Rajiv Clinic',
      phone: '+91 98765 43210',
      email: 'clinic@healthcare.com',
      address: 'Bangalore, India',
    });
  }, [setValue]);

  return (
    <div>
      <Stack
        sx={{
          gap: 2,
          flexGrow: 1,
          justifyContent: { sm: 'space-between' },
          alignItems: { sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          mb: 4,
        }}
      >
        {/* <Box sx={{ textAlign: { sm: 'end' }, order: { sm: 1 } }}>
          <Typography variant="subtitle2">Amount</Typography>
          <Typography variant="h4">{currencyFormat(1827.9)}</Typography>
        </Box> */}
        <InvoiceImageDropzone />
      </Stack>

      <Recipients />
      <InvoiceDetailsForm />
      <ItemDetailsTableForm />
      <InvoiceFooter />
    </div>
  );
};

export default CreateInvoiceContainer;
