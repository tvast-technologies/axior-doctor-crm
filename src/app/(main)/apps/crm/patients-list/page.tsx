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
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { users } from 'data/users';

type ActionType = 'whatsapp' | 'email' | 'prescription';

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
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleOpen = (patient: any, action: ActionType) => {
    setSelectedPatient(patient);
    setActionType(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
    setAttachment(null);
    setSuccessMsg('');
    setSelectedPatient(null);
    setActionType(null);
  };

  const handleSend = () => {
    setSuccessMsg('Sent successfully ✅');
    setMessage('');
    setAttachment(null);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Patient',
        flex: 1,
        minWidth: 260,
        renderCell: (params) => {
          const { personalInfo } = params.row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar src={personalInfo.profileImage} sx={{ width: 32, height: 32 }} />
              <Box>
                <Typography variant="subtitle2">
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
        field: 'location',
        headerName: 'Location',
        minWidth: 200,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        flex: 1,
        filterable: false,
        minWidth: 260,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="soft" onClick={() => handleOpen(params.row, 'whatsapp')}>
              WhatsApp
            </Button>
            <Button size="small" variant="soft" onClick={() => handleOpen(params.row, 'email')}>
              Email
            </Button>
            <Button
              size="small"
              variant="soft"
              onClick={() => handleOpen(params.row, 'prescription')}
            >
              Prescription
            </Button>
          </Stack>
        ),
      },
    ],
    [],
  );

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h4" mb={4}>
        Patients
      </Typography>

      <Box sx={{ height: 520 }}>
        <DataGrid
          rows={patients}
          columns={columns}
          rowHeight={72}
          pageSizeOptions={[8]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 8 },
            },
          }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              fontWeight: 600,
            },
          }}
        />
      </Box>

      {/* Action Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textTransform: 'capitalize' }}>
          {actionType === 'prescription' ? 'Send Prescription (PDF only)' : `Send ${actionType}`}
        </DialogTitle>

        <DialogContent>
          {selectedPatient && (
            <Stack spacing={2} flexDirection={'column'}>
              <Typography variant="body2" color="text.secondary">
                To: {selectedPatient.personalInfo.firstName} {selectedPatient.personalInfo.lastName}
              </Typography>

              {!successMsg && (
                <>
                  {/* Prescription: PDF only, no text */}
                  {actionType === 'prescription' ? (
                    <>
                      <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                        {attachment ? 'Change PDF' : 'Add PDF'}
                        <input
                          type="file"
                          accept="application/pdf"
                          hidden
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAttachment(e.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                      {attachment && (
                        <Typography variant="caption">Selected: {attachment.name}</Typography>
                      )}
                    </>
                  ) : (
                    // WhatsApp / Email: text + optional attachment
                    <>
                      <TextField
                        multiline
                        minRows={4}
                        placeholder={`Write ${actionType} content...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                      />
                      <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                        {attachment ? 'Change Attachment' : 'Add Attachment'}
                        <input
                          type="file"
                          hidden
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAttachment(e.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                      {attachment && (
                        <Typography variant="caption">Selected: {attachment.name}</Typography>
                      )}
                    </>
                  )}

                  <Button
                    variant="soft"
                    disabled={
                      actionType === 'prescription'
                        ? !attachment
                        : !message.trim() && !attachment
                    }
                    sx={{ mt: 1 }}
                    onClick={handleSend}
                  >
                    Send
                  </Button>
                </>
              )}

              {successMsg && <Typography color="success.main">{successMsg}</Typography>}
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
