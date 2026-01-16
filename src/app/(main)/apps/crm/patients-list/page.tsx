'use client';

import { ChangeEvent, MouseEvent, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
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
  Link,
  ChipOwnProps,
  Chip,
  Tab,
  InputAdornment,
} from '@mui/material';
import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColDef,
  GridFilterModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { users } from 'data/users';
import dayjs from 'dayjs';
import { useBreakpoints } from 'providers/BreakpointsProvider';
// import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
// import StyledTextField from 'components/styled/StyledTextField';

type ActionType = 'whatsapp' | 'email' | 'prescription';

const patients = [
  {
    id: 'pat001',
    personalInfo: {
      firstName: 'Amit',
      lastName: 'Sharma',
      personalEmail: 'patient@gmail.com',
      phoneNumber: 'XXX-XXX-XX55',
      profileImage: users[0].avatar,
    },
    lastVisit: '05 Jan 2026',
    paymentDate: '2026-01-15',
    age: '22',
    lastInvoiceAmount: '₹ 4,500',
    status: 'paid',
  },
  {
    id: 'pat002',
    personalInfo: {
      firstName: 'Priya',
      lastName: 'Verma',
      personalEmail: 'priya.verma@gmail.com',
      phoneNumber: 'XXX-XXX-XX89',
      profileImage: users[1].avatar,
    },
    lastVisit: '30 Dec 2025',
    paymentDate: '2026-02-01',
    age: '24',
    lastInvoiceAmount: '₹ 5,500',
    status: 'pending',
  },
  {
    id: 'pat003',
    personalInfo: {
      firstName: 'Rahul',
      lastName: 'Mehta',
      personalEmail: 'rahul.mehta@gmail.com',
      phoneNumber: 'XXX-XXX-XX10',
      profileImage: users[2].avatar,
    },
    lastVisit: '25 Oct 2025',
    paymentDate: '2025-12-01',
    age: '20',
    lastInvoiceAmount: '₹ 2,000',
    status: 'late',
  },
  {
    id: 'pat004',
    personalInfo: {
      firstName: 'Sneha',
      lastName: 'Iyer',
      personalEmail: 'sneha.iyer@gmail.com',
      phoneNumber: 'XXX-XXX-XX90',
      profileImage: users[3].avatar,
    },
    lastVisit: '18 Aug 2025',
    paymentDate: '2025-08-19',
    age: '40',
    lastInvoiceAmount: '₹ 9,500',
    status: 'paid',
  },
  {
    id: 'pat005',
    personalInfo: {
      firstName: 'Rohit',
      lastName: 'Singh',
      personalEmail: 'rohit.singh@gmail.com',
      phoneNumber: 'XXX-XXX-XX98',
      profileImage: users[4].avatar,
    },
    lastVisit: '31 Dec 2025',
    paymentDate: '2026-01-15',
    age: '35',
    lastInvoiceAmount: '₹ 6,000',
    status: 'paid',
  },
];

type TabValue = 'all' | 'paid' | 'late' | 'sent' | 'draft';

const PatientsBoard = () => {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [value, setValue] = useState<TabValue>('all');
  const { up } = useBreakpoints();
  // const upMd = up('md');

  // const apiRef = useGridApiRef();

  const [filterModel, setFilterMode] = useState<GridFilterModel>({
    items: [],
  });

  // const [filterButtonEl, setFilterButtonEl] = useState<HTMLButtonElement | null>(null);

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

  const getPaymentStatusBadgeColor = (val: string): ChipOwnProps['color'] => {
    switch (val) {
      case 'sent':
        return 'success';
      case 'paid':
        return 'info';
      case 'late':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const handleChange = (e: SyntheticEvent, newValue: TabValue) => {
    setValue(newValue);
    if (newValue === 'all') {
      setFilterMode({ items: [] });
    } else {
      setFilterMode({
        items: [{ field: 'status', operator: 'equals', value: newValue }],
      });
    }
  };

  // const handleSearch = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     apiRef.current?.setQuickFilterValues([e.target.value]);
  //   },
  //   [apiRef],
  // );

  // const handleToggleFilterPanel = (e: MouseEvent<HTMLButtonElement>) => {
  //   const clickedEl = e.currentTarget;

  //   if (filterButtonEl && filterButtonEl === clickedEl) {
  //     setFilterButtonEl(null);
  //     apiRef.current?.hideFilterPanel();

  //     return;
  //   }

  //   setFilterButtonEl(clickedEl);
  //   apiRef.current?.showFilterPanel();
  // };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
      {
        field: 'id',
        headerName: 'Invoice',
        sortable: false,
        filterable: true,
        minWidth: 80,
        renderCell: (params: { row: { id: any } }) => {
          const { id } = params.row;

          return (
            <Link
              variant="body2"
              sx={{ fontWeight: 400 }}
              href=""
              // href={paths.invoicePreviewWithId(id.toString())}
            >
              #{id}
            </Link>
          );
        },
      },
      {
        field: 'name',
        headerName: 'Patient',
        flex: 1,
        minWidth: 260,
        renderCell: (params: { row: { personalInfo: any } }) => {
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
        field: 'age',
        headerName: 'Age',
        minWidth: 100,
      },
      {
        field: 'phone',
        headerName: 'Phone',
        minWidth: 160,
        valueGetter: (_: any, row: { personalInfo: { phoneNumber: any } }) =>
          row.personalInfo.phoneNumber,
      },
      {
        field: 'lastVisit',
        headerName: 'Last Visit',
        minWidth: 150,
      },
      {
        field: 'status',
        headerName: 'Payment Status',
        filterable: true,
        // valueGetter: ({ status }) => status,
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
          return (
            <Stack sx={{ alignItems: 'center', gap: 1 }}>
              <Chip
                label={params.row.status}
                variant="soft"
                color={getPaymentStatusBadgeColor(params.row.status)}
                sx={{ textTransform: 'capitalize' }}
              />
              <Typography
                variant="body2"
                color={params.row.status === 'late' ? 'error' : undefined}
                sx={{ fontWeight: 400 }}
              >
                {params.row.status === 'paid' ? 'Paid' : 'Due'} on{' '}
                {dayjs(params.row.paymentDate).format('MMM DD, YYYY')}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: 'lastInvoiceAmount',
        headerName: 'Last Invoice Amount',
        minWidth: 200,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        flex: 1,
        filterable: false,
        minWidth: 260,
        renderCell: (params: { row: any }) => (
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
    <Stack direction="column" height={1}>
      <PageHeader
        title="Patients"
        breadcrumb={[
          { label: 'Home', url: '/' },
          { label: 'Patients', active: true },
        ]}
        actionComponent={
          <Stack gap={1}>
            <Button variant="soft" color="neutral">
              Export
            </Button>
            <Button variant="soft" color="neutral">
              Import
            </Button>
          </Stack>
        }
      />
      <Paper sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
        <TabContext value={value}>
          <Stack
            sx={{
              gap: 2,
              mb: 4,
              alignItems: { md: 'center' },
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Box sx={{ order: { xs: 1, sm: 0 } }}>
              <Stack
                sx={{
                  justifyContent: 'space-between',
                }}
              >
                <TabList onChange={handleChange} aria-label="invoice list tab">
                  <Tab label="All" value="all" />
                  <Tab label="Paid" value="paid" />
                  <Tab label="Late" value="late" />
                  {/* <Tab label="Sent" value="sent" />
                <Tab label="Draft" value="draft" /> */}
                </TabList>
              </Stack>
            </Box>
            {/* <Stack sx={{ gap: 1 }}>
            <Button
              shape={upMd ? undefined : 'square'}
              variant="soft"
              color="neutral"
              onClick={handleToggleFilterPanel}
              sx={{ flexShrink: 0 }}
            >
              <IconifyIcon
                icon="mdi:filter-variant"
                sx={{
                  fontSize: 20,
                  marginRight: { xs: 0, md: '4px' },
                }}
              />
              {upMd && <Box component="span">Filter</Box>}
            </Button>
            <StyledTextField
              id="search-box"
              type="search"
              fullWidth
              onChange={handleSearch}
              placeholder="Search invoice"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconifyIcon icon="material-symbols:search-rounded" fontSize={20} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                maxWidth: { sm: 200, md: 240 },
                flexGrow: { xs: 1, sm: 0 },
              }}
            />
          </Stack> */}
          </Stack>
          {['all', 'paid', 'late', 'sent', 'draft'].map((item) => (
            <TabPanel
              key={item}
              value={item}
              sx={{
                p: 0,
              }}
            >
              {/* <Paper sx={{ p: { xs: 3, md: 5 } }}> */}
              <Box sx={{ height: 520 }}>
                <DataGrid
                  rows={patients}
                  columns={columns}
                  rowHeight={72}
                  checkboxSelection
                  pageSizeOptions={[8]}
                  filterModel={filterModel}
                  onFilterModelChange={setFilterMode}
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
                  {actionType === 'prescription'
                    ? 'Send Prescription (PDF only)'
                    : `Send ${actionType}`}
                </DialogTitle>

                <DialogContent>
                  {selectedPatient && (
                    <Stack spacing={2} flexDirection={'column'}>
                      <Typography variant="body2" color="text.secondary">
                        To: {selectedPatient.personalInfo.firstName}{' '}
                        {selectedPatient.personalInfo.lastName}
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
                                <Typography variant="caption">
                                  Selected: {attachment.name}
                                </Typography>
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
                                <Typography variant="caption">
                                  Selected: {attachment.name}
                                </Typography>
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
              {/* </Paper> */}
            </TabPanel>
          ))}
        </TabContext>
      </Paper>
    </Stack>
  );
};

export default PatientsBoard;
