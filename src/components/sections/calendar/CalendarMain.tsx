'use client';

import { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentsIcon from '@mui/icons-material/Payments';
import {
  Box,
  Button,
  Chip,
  Dialog,
  Stack,
  TextField,
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  Avatar,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { users } from 'data/users';
import dayjs, { Dayjs } from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import NumberTextField from 'components/base/NumberTextField';

// Patients data
const patients = [
  {
    id: 'PAT001',
    personalInfo: {
      firstName: 'Amit',
      lastName: 'Sharma',
      personalEmail: 'patient@gmail.com',
      phoneNumber: '6360318731',
      profileImage: users[0].avatar,
    },
    age: '22',
  },
  {
    id: 'PAT002',
    personalInfo: {
      firstName: 'Priya',
      lastName: 'Verma',
      personalEmail: 'priya.verma@gmail.com',
      phoneNumber: '8523465972',
      profileImage: users[1].avatar,
    },
    age: '24',
  },
  {
    id: 'PAT003',
    personalInfo: {
      firstName: 'Rahul',
      lastName: 'Mehta',
      personalEmail: 'rahul.mehta@gmail.com',
      phoneNumber: '9163263691',
      profileImage: users[2].avatar,
    },
    age: '20',
  },
  {
    id: 'PAT004',
    personalInfo: {
      firstName: 'Sneha',
      lastName: 'Iyer',
      personalEmail: 'sneha.iyer@gmail.com',
      phoneNumber: '7894561235',
      profileImage: users[3].avatar,
    },
    age: '40',
  },
  {
    id: 'PAT005',
    personalInfo: {
      firstName: 'Rohit',
      lastName: 'Singh',
      personalEmail: 'rohit.singh@gmail.com',
      phoneNumber: '9145789236',
      profileImage: users[4].avatar,
    },
    age: '35',
  },
];

type Booking = {
  id: string;
  date: string; // YYYY-MM-DD
  start: string;
  end: string;
  name: string;
  email?: string;
  phone: string;
  age?: number;
  title: string;
  paid: boolean;
  mode?: 'Online' | 'Offline';
  location?: string;
  sessionType?: 'New' | 'Follow';
};

const STORAGE_KEY = 'bookings';

const generateTimeSlots = (start = '09:00', end = '17:00', interval = 30) => {
  const slots: { start: string; end: string }[] = [];
  let current = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);

  while (current < endTime) {
    const next = new Date(current.getTime() + interval * 60000);
    slots.push({ start: current.toTimeString().slice(0, 5), end: next.toTimeString().slice(0, 5) });
    current = next;
  }

  return slots;
};

const getRandomBlockedSlots = (slots: { start: string; end: string }[]) => {
  const blocked: string[] = [];
  slots.forEach((s) => {
    if (Math.random() < 0.15) blocked.push(s.start);
  });
  return blocked;
};

const CalendarMain = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [step, setStep] = useState(1);

  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [title, setTitle] = useState('');
  const [slot, setSlot] = useState<{ start: string; end: string } | null>(null);

  const [mode, setMode] = useState<'Online' | 'Offline'>('Online');
  const [location, setLocation] = useState('');
  const [sessionType, setSessionType] = useState<'New' | 'Follow'>('New');
  const [agree, setAgree] = useState(true);

  const slots = generateTimeSlots();
  const [blockedSlots, setBlockedSlots] = useState<string[]>([]);

  const dateKey = selectedDate?.format('YYYY-MM-DD') ?? '';

  const isDateDisabled = (date: Dayjs) => {
    const today = dayjs().startOf('day');
    if (date.isBefore(today)) return true;
    if (date.day() === 0 || date.day() === 6) return true;

    const wednesdays: string[] = [];
    let d = today;
    let count = 0;
    while (count < 4) {
      if (d.day() === 3) {
        wednesdays.push(d.format('YYYY-MM-DD'));
        count++;
      }
      d = d.add(1, 'day');
    }
    if (wednesdays.includes(date.format('YYYY-MM-DD'))) return true;

    return false;
  };

  const getNextAvailableDate = () => {
    let d = dayjs().startOf('day');
    while (isDateDisabled(d)) {
      d = d.add(1, 'day');
    }
    return d;
  };

  useEffect(() => {
    setSelectedDate(getNextAvailableDate());
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      const demo: Booking[] = [];
      setBookings(demo);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const isSlotBooked = (start: string) =>
    bookings.some((b) => b.date === dateKey && b.start === start) || blockedSlots.includes(start);

  const resetForm = () => {
    setStep(1);
    setSelectedPatientId('');
    setName('');
    setEmail('');
    setPhone('');
    setAge('');
    setTitle('');
    setSlot(null);
    setMode('Online');
    setLocation('');
    setSessionType('New');
    setAgree(false);
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
        email,
        phone,
        age: age === '' ? undefined : age,
        title,
        paid: true,
        mode,
        location,
        sessionType,
      },
    ]);

    setDialogOpen(false);
    resetForm();
  };

  useEffect(() => {
    if (!selectedPatientId) {
      setName('');
      setPhone('');
      setEmail('');
      setAge('');
      return;
    }

    const patient = patients.find((p) => p.id === selectedPatientId);
    if (patient) {
      setName(`${patient.personalInfo.firstName} ${patient.personalInfo.lastName}`);
      setPhone(patient.personalInfo.phoneNumber);
      setEmail(patient.personalInfo.personalEmail);
      setAge(Number(patient.age));
    }
  }, [selectedPatientId]);

  useEffect(() => {
    if (!selectedDate) return;
    setSlot(null);
    setBlockedSlots(getRandomBlockedSlots(slots));
  }, [selectedDate]);

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
            onChange={(d) => setSelectedDate(d)}
            shouldDisableDate={isDateDisabled}
            slots={{ day: PickersDay }}
          />

          {/* Patient Dropdown */}
          {selectedDate && (
            <>
              <Typography variant="h6">Patient</Typography>
              <Box mt={3}>
                <FormControl fullWidth>
                  <InputLabel>Select Patient</InputLabel>
                  <Select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    renderValue={(selected) => {
                      if (!selected) return 'New Patient';
                      const patient = patients.find((p) => p.id === selected);
                      return patient ? (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Avatar
                            src={patient.personalInfo.profileImage}
                            sx={{ width: 24, height: 24 }}
                          />
                          <Typography>
                            {patient.personalInfo.firstName} {patient.personalInfo.lastName}
                          </Typography>
                        </Stack>
                      ) : (
                        'New Patient'
                      );
                    }}
                  >
                    <MenuItem value="">
                      <em>New Patient</em>
                    </MenuItem>
                    {patients.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Avatar
                            src={p.personalInfo.profileImage}
                            sx={{ width: 24, height: 24 }}
                          />
                          <Typography>
                            {p.personalInfo.firstName} {p.personalInfo.lastName}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </>
          )}
        </Grid>

        {/* Booking Form */}
        {selectedDate && (
          <Grid>
            <Stack flexDirection={'column'} spacing={2}>
              <Typography variant="h6">Book an Appointment</Typography>
              <Typography variant="body2" color="text.secondary">
                {dateKey}
              </Typography>

              <TextField
                label={
                  <Typography variant="body2">
                    Your Name{' '}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </Typography>
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label={
                  <Typography variant="body2">
                    Email{' '}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </Typography>
                }
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <NumberTextField
                label={
                  <Typography variant="body2">
                    Phone Number{' '}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </Typography>
                }
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
              <NumberTextField
                label={
                  <Typography variant="body2">
                    Age{' '}
                    <Typography component="span" color="error">
                      *
                    </Typography>
                  </Typography>
                }
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                fullWidth
              />
              <TextField
                label="Appointment Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />

              {/* Mode of Visit */}
              {/* <FormControl component="fieldset">
                <Typography fontWeight={500} mb={1}>
                  Mode of Visit
                </Typography>
                <RadioGroup
                  row
                  value={mode}
                  onChange={(e) => setMode(e.target.value as 'Online' | 'Offline')}
                >
                  <FormControlLabel value="Online" control={<Radio />} label="Online" />
                  <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                </RadioGroup>
              </FormControl> */}

              {mode === 'Offline' && (
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select value={location} onChange={(e) => setLocation(e.target.value)}>
                    <MenuItem value="HSR">HSR</MenuItem>
                    <MenuItem value="Kormangala">Kormangala</MenuItem>
                    <MenuItem value="Banashankari">Banashankari</MenuItem>
                  </Select>
                </FormControl>
              )}

              {/* Session Type */}
              <FormControl component="fieldset">
                <Typography fontWeight={500} mb={1}>
                  Session Type
                </Typography>
                <RadioGroup
                  row
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value as 'New' | 'Follow')}
                >
                  <FormControlLabel value="New" control={<Radio />} label="New" />
                  <FormControlLabel value="Follow" control={<Radio />} label="Follow" />
                </RadioGroup>
              </FormControl>

              {/* Terms */}
              <FormControlLabel
                control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
                label="Walk-In patient"
              />

              {/* Time Slots */}
              <Box>
                <Typography fontWeight={500} mb={1}>
                  Select Time Slot
                </Typography>

                <Grid container spacing={1}>
                  <AnimatePresence>
                    {slots.map((s, idx) => {
                      const booked = isSlotBooked(s.start);
                      const selected = slot?.start === s.start;

                      return (
                        <Grid key={s.start}>
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: idx * 0.03 }}
                          >
                            <Button
                              fullWidth
                              size="small"
                              disabled={booked}
                              variant={selected ? 'contained' : 'outlined'}
                              onClick={() => setSlot(s)}
                            >
                              {s.start}
                            </Button>
                          </motion.div>
                        </Grid>
                      );
                    })}
                  </AnimatePresence>
                </Grid>
              </Box>

              <Button
                size="large"
                variant="contained"
                disabled={!name || !email || !age || !phone || !slot}
                onClick={() => {
                  setStep(2);
                  setDialogOpen(true);
                }}
              >
                Continue
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>

      {/* Booking Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          resetForm();
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
      >
        {/* Header */}
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

              <Stack direction="row" spacing={2}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<PaymentsIcon />}
                  sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
                  onClick={() => setStep(3)}
                >
                  Paid Online – ₹2500
                </Button>

                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  startIcon={<PaymentsIcon />}
                  sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
                  onClick={() => setStep(3)}
                >
                  Collected Cash – ₹2500
                </Button>
              </Stack>

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
                sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
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

export default CalendarMain;
