'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Dialog, Stack, TextField, Typography } from '@mui/material';
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

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  /* form state */
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState<{ start: string; end: string } | null>(null);

  const dateKey = selectedDate.format('YYYY-MM-DD');
  const slots = generateTimeSlots();

  /* ---------- LOAD + DEFAULT DEMO DATA ---------- */
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

  /* ---------- PERSIST ---------- */
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

      <Grid container spacing={4}>
        {/* Calendar */}
        <Grid>
          <Typography variant="h6" mb={1}>
            Calendar
          </Typography>

          <DateCalendar
            value={selectedDate}
            onChange={(d) => {
              if (!d) return;
              setSelectedDate(d);
              setDialogOpen(true);
            }}
          />
        </Grid>

        {/* Events for Day */}
        <Grid>
          <Typography variant="h6" mb={2}>
            Events on {dateKey}
          </Typography>

          {eventsForDay.length === 0 ? (
            <Typography color="text.secondary">No events booked</Typography>
          ) : (
            <Stack spacing={1}>
              {eventsForDay.map((e) => (
                <Box key={e.id} p={2} border="1px solid" borderColor="divider" borderRadius={2}>
                  <Typography fontWeight={600}>{e.title}</Typography>
                  <Typography variant="body2">
                    {e.start} – {e.end}
                  </Typography>
                  <Typography variant="body2">{e.name}</Typography>
                </Box>
              ))}
            </Stack>
          )}
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
      >
        <Box p={3}>
          <Typography variant="h6" mb={1}>
            Book Event
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            {dateKey}
          </Typography>

          {/* STEP 1 */}
          {step === 1 && (
            <Stack spacing={3} flexDirection={'column'}>
              <TextField
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />

              <TextField
                label="Event Title"
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
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </Stack>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <Stack spacing={3} flexDirection={'column'}>
              <Box>
                <Typography fontWeight={600}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {dateKey}
                </Typography>
                <Typography variant="body2">
                  {slot?.start} – {slot?.end}
                </Typography>
              </Box>

              <Button size="large" variant="contained" onClick={() => setStep(3)}>
                Pay $50
              </Button>

              <Button size="small" variant="text" onClick={() => setStep(1)}>
                Back
              </Button>
            </Stack>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <Stack spacing={3} alignItems="center" flexDirection={'column'}>
              <Typography fontWeight={600}>Payment Successful 🎉</Typography>

              <Button size="large" variant="contained" fullWidth onClick={confirmBooking}>
                Confirm Booking
              </Button>
            </Stack>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
