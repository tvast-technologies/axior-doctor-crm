'use client';

import { useState } from 'react';
import {
  Button,
  Chip,
  Dialog,
  Stack,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import dayjs from 'dayjs';
import { type Deal as DealType } from 'data/crm/lead-details';
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
        bgcolor:
          deal.closingDate === 'closed'
            ? 'background.elevation2'
            : 'background.elevation1',
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
            <Typography
              component={Stack}
              variant="body2"
              gap={0.5}
              sx={{ alignItems: 'center' }}
            >
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
                  <span
                    style={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    ✓
                  </span>
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
      <Dialog open={open} onClose={handleClose}>
        <Box p={3} minWidth={320}>
          {step === 1 && (
            <>
              <Typography variant="h6" mb={2}>
                Confirm Reschedule
              </Typography>

              <Typography mb={3}>
                Are you sure you want to reschedule for{' '}
                <strong>
                  {currencyFormat(deal.budget, {
                    style: 'currency',
                    maximumFractionDigits: 0,
                  })}
                </strong>
                ?
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button variant="outlined" fullWidth onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" fullWidth onClick={handlePayNow}>
                  Pay Now
                </Button>
              </Stack>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h6" mb={3} color="success.main">
                Payment Successful 🎉
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button variant="outlined" fullWidth onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleConfirmReschedule}
                >
                  Confirm Reschedule
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Deal;
