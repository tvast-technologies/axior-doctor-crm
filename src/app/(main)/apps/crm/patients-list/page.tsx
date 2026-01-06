'use client';

import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import { users } from 'data/users';

const patients = [
  {
    id: 1,
    personalInfo: {
      firstName: 'Amit',
      lastName: 'Sharma',
      personalEmail: 'amit.sharma@gmail.com',
      phoneNumber: '9876543210',
      profileImage: users[0].avatar,
    },
    lastVisit: '12 Aug 2025',
    dob: '14 Mar 1988',
    location: 'Delhi, India',
  },
  {
    id: 2,
    personalInfo: {
      firstName: 'Priya',
      lastName: 'Verma',
      personalEmail: 'priya.verma@gmail.com',
      phoneNumber: '9123456789',
      profileImage: users[1].avatar,
    },
    lastVisit: '02 Jul 2025',
    dob: '22 Nov 1992',
    location: 'Mumbai, India',
  },
  {
    id: 3,
    personalInfo: {
      firstName: 'Rahul',
      lastName: 'Mehta',
      personalEmail: 'rahul.mehta@gmail.com',
      phoneNumber: '9988776655',
      profileImage: users[2].avatar,
    },
    lastVisit: '25 Jun 2025',
    dob: '09 Jan 1985',
    location: 'Ahmedabad, India',
  },
  {
    id: 4,
    personalInfo: {
      firstName: 'Sneha',
      lastName: 'Iyer',
      personalEmail: 'sneha.iyer@gmail.com',
      phoneNumber: '9090909090',
      profileImage: users[3].avatar,
    },
    lastVisit: '18 Aug 2025',
    dob: '03 Apr 1990',
    location: 'Chennai, India',
  },
  {
    id: 5,
    personalInfo: {
      firstName: 'Rohit',
      lastName: 'Singh',
      personalEmail: 'rohit.singh@gmail.com',
      phoneNumber: '9898989898',
      profileImage: users[4].avatar,
    },
    lastVisit: '30 Jul 2025',
    dob: '11 Sep 1987',
    location: 'Lucknow, India',
  },
];

const PatientsBoard = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPrescriptionBox, setShowPrescriptionBox] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleClose = () => {
    setDialogOpen(false);
    setShowPrescriptionBox(false);
    setPrescription('');
    setSuccessMsg('');
    setSelectedPatient(null);
  };

  const handleSendPrescription = () => {
    setSuccessMsg(
      `Prescription sent to ${selectedPatient.personalInfo.firstName}`,
    );
    setPrescription('');
    setShowPrescriptionBox(false);
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h4" mb={4}>
        Patients
      </Typography>

      {/* Patients Grid */}
      <Grid container spacing={3}>
        {patients.map((patient) => {
          const { personalInfo } = patient;

          return (
            <Grid key={patient.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  background:
                    'linear-gradient(180deg, rgba(28,28,28,1), rgba(18,18,18,1))',
                  cursor: 'pointer',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => {
                  setSelectedPatient(patient);
                  setDialogOpen(true);
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={personalInfo.profileImage}
                        sx={{ width: 48, height: 48 }}
                      />
                      <Box>
                        <Typography fontWeight={600}>
                          {personalInfo.firstName}{' '}
                          {personalInfo.lastName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          📞 {personalInfo.phoneNumber}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography variant="body2" color="text.secondary">
                      Last Visit: {patient.lastVisit}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Patient Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Patient Details
        </DialogTitle>

        <DialogContent>
          {selectedPatient && (
            <Stack spacing={2} flexDirection={'column'}>
              {/* Header */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={selectedPatient.personalInfo.profileImage}
                  sx={{ width: 56, height: 56 }}
                />
                <Box>
                  <Typography variant="h6">
                    {selectedPatient.personalInfo.firstName}{' '}
                    {selectedPatient.personalInfo.lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    {selectedPatient.personalInfo.phoneNumber}
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              {/* Details */}
              <Typography>
                <strong>Email:</strong>{' '}
                {selectedPatient.personalInfo.personalEmail}
              </Typography>
              <Typography>
                <strong>DOB:</strong> {selectedPatient.dob}
              </Typography>
              <Typography>
                <strong>Location:</strong>{' '}
                {selectedPatient.location}
              </Typography>
              <Typography>
                <strong>Last Visit:</strong>{' '}
                {selectedPatient.lastVisit}
              </Typography>

              {/* Prescription Section */}
              {!showPrescriptionBox && !successMsg && (
                <Button
                  variant="soft"
                  sx={{ mt: 1, alignSelf: 'flex-start' }}
                  onClick={() => setShowPrescriptionBox(true)}
                >
                  Send Prescription
                </Button>
              )}

              {showPrescriptionBox && (
                <>
                  <TextField
                    multiline
                    minRows={4}
                    fullWidth
                    placeholder="Write prescription details here..."
                    value={prescription}
                    onChange={(e) =>
                      setPrescription(e.target.value)
                    }
                  />
                  <Button
                    variant="soft"
                    disabled={!prescription.trim()}
                    onClick={handleSendPrescription}
                  >
                    Send
                  </Button>
                </>
              )}

              {/* Success Message */}
              {successMsg && (
                <Typography color="success.main">
                  {successMsg}
                </Typography>
              )}
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button color="neutral" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PatientsBoard;