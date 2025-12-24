import { ReactNode } from 'react';
import { Avatar, Chip, Link, Typography } from '@mui/material';
import { users } from 'data/users';
import { generateUniqueId } from 'lib/utils';
import CopyableText from 'components/sections/crm/common/CopyableText';

export interface Deal {
  id: string;
  name: string;
  budget: number;
  closingDate: string | 'closed';
  phases: {
    name: string;
    status: 'done' | 'ongoing' | 'closed';
  }[];
}

export const contactInfoData: { attribute: string; value: ReactNode }[] = [
  { attribute: 'Title', value: <Typography variant="body2">Patient</Typography> },
  // {
  //   attribute: 'Account',
  //   value: (
  //     <Typography component={Link} href="#!" underline="hover" variant="body2">
  //       Waka Waka PLC
  //     </Typography>
  //   ),
  // },
  { attribute: 'Location', value: <Typography variant="body2">Bangalore</Typography> },
  {
    attribute: 'Email',
    value: <CopyableText text="patient@gmail.com" link href="mailto:patient@gmail.com" />,
  },
  {
    attribute: 'Phone No.',
    value: <CopyableText text="+91 80703 18312" link href="tel:+91 80703 18312" />,
  },
  {
    attribute: 'Secondary Contact',
    value: <Chip label="Gerard P." avatar={<Avatar src={users[7].avatar} />} variant="soft" />,
  },
];

export const ongoingDealsData: Deal[] = [
  {
    id: generateUniqueId(),
    name: 'Replica Badidas Futbol',
    budget: 465000,
    closingDate: '2025-09-21',
    phases: [
      { name: 'Booking request', status: 'done' },
      { name: 'Confirmed', status: 'ongoing' },
      { name: 'Completed', status: 'closed' },
    ],
  },
  {
    id: generateUniqueId(),
    name: 'Pumba Jersey Project',
    budget: 105000,
    closingDate: '2025-09-19',
    phases: [
      { name: 'Booking request', status: 'done' },
      { name: 'Confirmed', status: 'done' },
      { name: 'Completed', status: 'ongoing' },
    ],
  },
  {
    id: generateUniqueId(),
    name: 'Almost Original Mike Boots',
    budget: 250000,
    closingDate: 'closed',
    phases: [
      { name: 'Booking request', status: 'done' },
      { name: 'Confirmed', status: 'done' },
      { name: 'Completed', status: 'done' },
    ],
  },
];

