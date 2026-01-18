'use client';

import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Button, Chip, Dialog, Divider, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { type Deal as DealType } from 'data/crm/lead-details';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import paths from 'routes/paths';

const Deal = ({ deal }: { deal: DealType }) => {
  const { currencyFormat } = useNumberFormat();

  const [open, setOpen] = useState(false);
  const [rescheduled, setRescheduled] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handlePayNow = () => {
    setStep(2); // Payment successful step
  };

  const handleConfirmReschedule = () => {
    setRescheduled(true);
    setOpen(false);
    setStep(1); // reset for next time dialog opens
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: deal.closingDate === 'closed' ? 'background.elevation2' : 'background.elevation1',
      }}
    >
      <Stack direction="column" gap={3}>
        {/* Deal Info */}
        <div>
          <Typography
            variant="body2"
            component={Link}
            href={paths.dealDetails}
            sx={{ fontWeight: 700 }}
          >
            {deal.name}
          </Typography>

          <Stack
            gap={1}
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              mt: 0.25,
            }}
          >
            <Typography variant="body2">
              <Box component="span" sx={{ fontWeight: 600 }}>
                Budget:
              </Box>{' '}
              {currencyFormat(deal.budget, {
                style: 'currency',
                maximumFractionDigits: 0,
                useGrouping: true,
              })}
            </Typography>
            <Typography component={Stack} variant="body2" gap={0.5} sx={{ alignItems: 'center' }}>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Last booking Date:
              </Box>{' '}
              {deal.closingDate === 'closed' ? (
                <Chip label="Closed" color="neutral" variant="soft" />
              ) : (
                dayjs(deal.closingDate).format('DD MMM, YYYY')
              )}
            </Typography>
          </Stack>
        </div>

        {/* Phase Buttons */}
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={1}
        >
          {deal.phases.map((phase) => (
            <Button
              key={phase.name}
              href={paths.deals}
              size="small"
              variant="soft"
              color={
                phase.status === 'done'
                  ? 'success'
                  : phase.status === 'ongoing'
                    ? 'primary'
                    : 'neutral'
              }
              fullWidth={false}
              endIcon={
                phase.status === 'done' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>✓</span>
                )
              }
              sx={{ height: 46 }}
            >
              {phase.name}
            </Button>
          ))}
        </Stack>

        {/* Reschedule Button */}
        <Button
          variant={rescheduled ? 'outlined' : 'contained'}
          color="primary"
          onClick={() => setOpen(true)}
          disabled={rescheduled}
        >
          {rescheduled ? 'Confirmed Rescheduled' : 'Reschedule'}
        </Button>
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
      >
        <Box p={3}>
          {step === 1 && (
            <>
              {/* Header */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#fff',
                  p: 3,
                  borderRadius: 3,
                  mb: 3,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EventAvailableIcon />
                  <Typography variant="h6" fontWeight={700}>
                    Confirm Reschedule
                  </Typography>
                </Stack>
              </Box>

              {/* Content */}
              <Stack spacing={4} flexDirection={'column'}>
                {/* Summary Card */}
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    p: 3,
                    bgcolor: 'grey.50',
                  }}
                >
                  <Stack spacing={1.5} flexDirection={'column'}>
                    <Typography fontWeight={700} fontSize={18}>
                      Reschedule Appointment
                    </Typography>

                    <Typography color="text.secondary">
                      Please confirm your reschedule payment
                    </Typography>

                    <Divider />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography fontWeight={600}>Amount</Typography>
                      <Typography fontWeight={700} fontSize={18}>
                        {currencyFormat(deal.budget, {
                          style: 'currency',
                          maximumFractionDigits: 0,
                        })}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                {/* Payment Options */}
                <Stack direction="row" spacing={2}>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    startIcon={<PaymentsIcon />}
                    sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
                    onClick={handlePayNow}
                  >
                    Pay Online
                  </Button>

                  <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    startIcon={<PaymentsIcon />}
                    sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
                    onClick={handlePayNow}
                  >
                    Pay at Clinic
                  </Button>
                </Stack>

                {/* Footer */}
                <Button variant="text" onClick={handleClose} sx={{ alignSelf: 'center' }}>
                  Cancel
                </Button>
              </Stack>
            </>
          )}

          {step === 2 && (
            <>
              <Stack spacing={4} alignItems="center" flexDirection={'column'}>
                <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />

                <Typography variant="h6" fontWeight={700}>
                  Payment Successful
                </Typography>

                <Typography color="text.secondary" textAlign="center">
                  Your appointment has been rescheduled.
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" fullWidth onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="contained" fullWidth onClick={handleConfirmReschedule}>
                    Confirm Reschedule
                  </Button>
                </Stack>
              </Stack>
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Deal;
