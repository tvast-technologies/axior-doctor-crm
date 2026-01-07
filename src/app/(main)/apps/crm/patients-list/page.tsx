'use client';

import { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Patient',
        flex: 1,
        minWidth: 260,
        sortable: false,
        renderCell: (params) => {
          const { personalInfo } = params.row;

          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                src={personalInfo.profileImage}
                sx={{ width: 32, height: 32 }}
              />
              <Box>
                <Typography variant="subtitle2" fontWeight={400}>
                  {personalInfo.firstName} {personalInfo.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {personalInfo.personalEmail}
                </Typography>
              </Box>
            </Stack>
          );
        },
      },
      {
        field: 'phone',
        headerName: 'Phone',
        minWidth: 160,
        valueGetter: (_, row) => row.personalInfo.phoneNumber,
      },
      {
        field: 'lastVisit',
        headerName: 'Last Visit',
        minWidth: 150,
      },
      {
        field: 'dob',
        headerName: 'DOB',
        minWidth: 140,
      },
      {
        field: 'location',
        headerName: 'Location',
        flex: 1,
        minWidth: 200,
      },
    ],
    [],
  );

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h4" mb={4}>
        Patients
      </Typography>

      {/* Patients Table */}
      <Box sx={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={patients}
          columns={columns}
          rowHeight={72}
          // checkboxSelection
          pageSizeOptions={[8]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 8 },
            },
          }}
          onRowClick={(params) => {
            setSelectedPatient(params.row);
            setDialogOpen(true);
          }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'background.paper',
              fontWeight: 600,
            },
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
            },
          }}
        />
      </Box>

      {/* Patient Details Dialog (UNCHANGED) */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Patient Details</DialogTitle>

        <DialogContent>
          {selectedPatient && (
            <Stack spacing={2} flexDirection={'column'}>
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

              <Typography>
                <strong>Email:</strong>{' '}
                {selectedPatient.personalInfo.personalEmail}
              </Typography>
              <Typography>
                <strong>DOB:</strong> {selectedPatient.dob}
              </Typography>
              <Typography>
                <strong>Location:</strong> {selectedPatient.location}
              </Typography>
              <Typography>
                <strong>Last Visit:</strong> {selectedPatient.lastVisit}
              </Typography>

              {!showPrescriptionBox && !successMsg && (
                <Button
                  variant="soft"
                  sx={{ alignSelf: 'flex-start' }}
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
                    onChange={(e) => setPrescription(e.target.value)}
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

              {successMsg && (
                <Typography color="success.main">{successMsg}</Typography>
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