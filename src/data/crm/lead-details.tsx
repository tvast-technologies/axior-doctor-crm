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
  { attribute: 'First Name', value: <Typography variant="body2">Amit</Typography> },
  { attribute: 'Last Name', value: <Typography variant="body2">Sharma</Typography> },
  // {
  //   attribute: 'Account',
  //   value: (
  //     <Typography component={Link} href="#!" underline="hover" variant="body2">
  //       Waka Waka PLC
  //     </Typography>
  //   ),
  // },
  { attribute: 'Age', value: <Typography variant="body2">22</Typography> },
  {
    attribute: 'Email',
    value: <CopyableText text="patient@gmail.com" link href="mailto:patient@gmail.com" />,
  },
  {
    attribute: 'Phone No.',
    value: <CopyableText text="+91 6360318731" link href="tel:+91 63603 18731" />,
  },
  { attribute: 'Last Visit on', value: <Typography variant="body2">05-01-2026</Typography> },
  { attribute: 'Last Invoice amount', value: <Typography variant="body2">₹ 4,500</Typography> },
  // {
  //   attribute: 'Secondary Contact',
  //   value: <Chip label="Gerard P." avatar={<Avatar src={users[7].avatar} />} variant="soft" />,
  // },
];
export const ongoingDealsData: Deal[] = [
  {
    id: generateUniqueId(),
    name: 'General Checkup',
    budget: 4650,
    closingDate: '2025-09-21',
    phases: [
      { name: 'Appointment Requested', status: 'done' },
      { name: 'Confirmed', status: 'ongoing' },
      { name: 'Completed', status: 'closed' },
    ],
  },
  {
    id: generateUniqueId(),
    name: 'Blood Test',
    budget: 1050,
    closingDate: '2025-09-19',
    phases: [
      { name: 'Appointment Requested', status: 'done' },
      { name: 'Confirmed', status: 'done' },
      { name: 'Completed', status: 'ongoing' },
    ],
  },
  {
    id: generateUniqueId(),
    name: 'Dental Cleaning',
    budget: 2500,
    closingDate: 'closed',
    phases: [
      { name: 'Appointment Requested', status: 'done' },
      { name: 'Confirmed', status: 'done' },
      { name: 'Completed', status: 'done' },
    ],
  },
];

