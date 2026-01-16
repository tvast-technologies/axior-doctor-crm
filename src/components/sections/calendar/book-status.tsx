'use client';

import { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Box, Button, Chip, Dialog, Stack, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';

type Booking = {
  id: string;
  date: string; // YYYY-MM-DD
  start: string;
  end: string;
  name: string;
  title: string;
  paid: boolean;
};

const STORAGE_KEY = 'bookings';

/* ---------- TIME SLOTS ---------- */
const generateTimeSlots = (start = '09:00', end = '17:00', interval = 30) => {
  const slots: { start: string; end: string }[] = [];

  let current = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);

  while (current < endTime) {
    const next = new Date(current.getTime() + interval * 60000);
    slots.push({
      start: current.toTimeString().slice(0, 5),
      end: next.toTimeString().slice(0, 5),
    });
    current = next;
  }

  return slots;
};

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState<{ start: string; end: string } | null>(null);

  const dateKey = selectedDate.format('YYYY-MM-DD');
  const slots = generateTimeSlots();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      const demo: Booking[] = [
        {
          id: '1',
          date: dayjs().format('YYYY-MM-DD'),
          start: '10:00',
          end: '10:30',
          name: 'John Doe',
          title: 'Demo Meeting',
          paid: true,
        },
        {
          id: '2',
          date: dayjs().format('YYYY-MM-DD'),
          start: '14:00',
          end: '14:30',
          name: 'Jane Smith',
          title: 'Consultation',
          paid: true,
        },
      ];
      setBookings(demo);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const isSlotBooked = (start: string) =>
    bookings.some((b) => b.date === dateKey && b.start === start);

  const resetForm = () => {
    setStep(1);
    setName('');
    setTitle('');
    setSlot(null);
  };

  const confirmBooking = () => {
    if (!slot) return;

    setBookings((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        date: dateKey,
        start: slot.start,
        end: slot.end,
        name,
        title,
        paid: true,
      },
    ]);

    setDialogOpen(false);
    resetForm();
  };

  const eventsForDay = bookings.filter((b) => b.date === dateKey);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Booking Calendar
      </Typography>

      <Grid container spacing={2}>
        {/* Calendar */}
        <Grid container spacing={2} size={3}>
          <Typography variant="h6" mb={1}>
            Calendar
          </Typography>

          <DateCalendar
            value={selectedDate}
            onChange={(d) => {
              if (!d) return;
              setSelectedDate(d);
              // setDialogOpen(true);
            }}
          />
        </Grid>

        <Grid container size={8}>
          <Stack flexDirection={'column'}>
            <Typography variant="h6" mb={1}>
              Book an Appointment
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              {dateKey}
            </Typography>
          </Stack>

          <Stack spacing={3} flexDirection={'column'}>
            <TextField
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Appointment Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />

            <Box>
              <Typography fontWeight={500} mb={1}>
                Select Time Slot
              </Typography>

              <Grid container spacing={1}>
                {slots.map((s) => {
                  const booked = isSlotBooked(s.start);
                  const selected = slot?.start === s.start;

                  return (
                    <Grid key={s.start}>
                      <Button
                        fullWidth
                        size="small"
                        disabled={booked}
                        variant={selected ? 'contained' : 'outlined'}
                        onClick={() => setSlot(s)}
                      >
                        {s.start}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <Button
              size="large"
              variant="contained"
              disabled={!name || !title || !slot}
              onClick={() => {
                (setStep(2), setDialogOpen(true));
              }}
            >
              Continue
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* ---------- BOOKING DIALOG ---------- */}
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          resetForm();
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden',
          },
        }}
      >
        {/* ---------- HEADER ---------- */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: '#fff',
            p: 3,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1} alignItems="center">
              <EventAvailableIcon />
              <Typography variant="h6" fontWeight={700}>
                Confirm Booking
              </Typography>
            </Stack>

            {step === 2 && <Chip label="Review" color="warning" sx={{ fontWeight: 600 }} />}

            {step === 3 && (
              <Chip
                icon={<CheckCircleIcon />}
                label="Paid"
                color="success"
                sx={{ fontWeight: 600 }}
              />
            )}
          </Stack>
        </Box>

        {/* ---------- BODY ---------- */}
        <Box p={4}>
          {step === 2 && (
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
                    {title}
                  </Typography>

                  <Typography color="text.secondary">
                    {dayjs(dateKey).format('dddd, MMM D')}
                  </Typography>

                  <Typography fontWeight={500}>
                    {slot?.start} – {slot?.end}
                  </Typography>

                  <Divider />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={600}>Total</Typography>
                    <Typography fontWeight={700} fontSize={18}>
                      ₹2500
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Button
                size="large"
                variant="contained"
                startIcon={<PaymentsIcon />}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  fontWeight: 600,
                }}
                onClick={() => setStep(3)}
              >
                Pay ₹2500
              </Button>

              <Button
                variant="text"
                onClick={() => setDialogOpen(false)}
                sx={{ alignSelf: 'center' }}
              >
                Back
              </Button>
            </Stack>
          )}

          {step === 3 && (
            <Stack spacing={4} alignItems="center" flexDirection={'column'}>
              <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />

              <Typography variant="h6" fontWeight={700}>
                Payment Successful
              </Typography>

              <Typography color="text.secondary" textAlign="center">
                Your appointment has been reserved and confirmed.
              </Typography>

              <Button
                size="large"
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  fontWeight: 600,
                }}
                onClick={confirmBooking}
              >
                Confirm Booking
              </Button>
            </Stack>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default BookingPage;
