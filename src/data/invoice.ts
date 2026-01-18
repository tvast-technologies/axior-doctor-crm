import { initialConfig } from 'config';
import {
  InvoiceHistoryItem,
  InvoicePreviewItem,
  InvoiceTableRow,
  RecipientItem,
} from 'types/invoice';
import { users } from './users';

const logo = (index: number) => `${initialConfig.assetsDir}/images/logo/${index}.svg`;

export const invoiceListTableRowData: any[] = [
  // {
  //   id: '12243',
  //   client: {
  //     name: 'Amit Sharma',
  //     avatar: users[0].avatar,
  //     email: 'patient@gmail.com',
  //   },
  //   issueDate: {
  //     date: '2026-01-05',
  //     time: '10:30 AM',
  //   },
  //   status: 'paid',
  //   paymentDate: '2026-01-15',
  //   requiredAmount: 4500,
  //   paidAmount: 4500,
  // },
  {
    id: '24361',
    client: {
      name: 'Priya Verma',
      avatar: users[1].avatar,
      email: 'priya.verma@gmail.com',
    },
    issueDate: {
      date: '2026-01-10',
      time: '02:15 PM',
    },
    status: 'paid',
    paymentDate: '2026-01-10',
    requiredAmount: 5500,
    paidAmount: 5500,
  },
  {
    id: '14583',
    client: {
      name: 'Rahul Mehta',
      avatar: users[2].avatar,
      email: 'rahul.mehta@gmail.com',
    },
    issueDate: {
      date: '2026-01-05',
      time: '11:00 AM',
    },
    status: 'paid',
    paymentDate: '2026-01-06',
    requiredAmount: 2000,
    paidAmount: 2000,
  },
  {
    id: '12354',
    client: {
      name: 'Sneha Iyer',
      avatar: users[3].avatar,
      email: 'sneha.iyer@gmail.com',
    },
    issueDate: {
      date: '2025-08-18',
      time: '09:45 AM',
    },
    status: 'paid',
    paymentDate: '2025-08-19',
    requiredAmount: 9500,
    paidAmount: 9500,
  },
  {
    id: '36985',
    client: {
      name: 'Rohit Singh',
      avatar: users[4].avatar,
      email: 'rohit.singh@gmail.com',
    },
    issueDate: {
      date: '2025-12-31',
      time: '05:20 PM',
    },
    status: 'paid',
    paymentDate: '2026-01-02',
    requiredAmount: 6000,
    paidAmount: 6000,
  },
];

export const recipientLists: RecipientItem[] = [
  {
    id: 1,
    name: 'Amit Sharma',
    avatar: users[0].avatar,
    email: 'patient@gmail.com',
    status: 'Active',
    phone: '6360318731',
    location: 'India',
  },
  {
    id: 2,
    name: 'Priya Verma',
    avatar: users[1].avatar,
    email: 'priya.verma@gmail.com',
    status: 'Pending',
    phone: '8523465972',
    location: 'India',
  },
  {
    id: 3,
    name: 'Rahul Mehta',
    avatar: users[2].avatar,
    email: 'rahul.mehta@gmail.com',
    status: 'Inactive',
    phone: '9163263691',
    location: 'India',
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    avatar: users[3].avatar,
    email: 'sneha.iyer@gmail.com',
    status: 'Active',
    phone: '7894561235',
    location: 'India',
  },
  {
    id: 5,
    name: 'Rohit Singh',
    avatar: users[4].avatar,
    email: 'rohit.singh@gmail.com',
    status: 'Active',
    phone: '9145789236',
    location: 'India',
  },
];

export const invoiceData: InvoicePreviewItem = {
  organizationImage: { id: 1, file: logo(21) },
  invoiceFrom: {
    name: 'Dr. Rajiv',
    phone: '+91 98765 43210',
    email: 'doctor@gmail.com',
    address: 'Bangalore, India',
    issueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0]
  },
  invoiceTo: {
    name: 'Amit Sharma',
    phone: '6360318731',
    email: 'patient@gmail.com',
    address: 'India',
    // issueDate: new Date().toISOString().split('T')[0],
  },
  invoiceDetails: {
    invoiceNumber: 45001,
    status: 'Paid',
    amount: 2500,
  },
  shippingCost: 0,
  discount: 0,
  tax: 0,
  itemDetails: [
    {
      id: 1,
      type: 'consultation',
      description: 'Doctor Consultation',
      quantity: 1,
      price: 1500,
    },
    // {
    //   id: 2,
    //   type: 'test',
    //   description: 'Blood Test',
    //   quantity: 1,
    //   price: 2000,
    // },
    {
      id: 3,
      type: 'medicine',
      description: 'Medication Charges',
      quantity: 1,
      price: 1000,
    },
  ],
  note: 'Thank you for visiting. Please contact for any billing queries.',
};

export const invoiceHistories: InvoiceHistoryItem[] = [
  {
    id: 1,
    date: '2026-01-15T10:00:00',
    companyName: 'Dr. Rajiv Clinic',
    message: 'received payment from ',
    image: logo(21),
    email: 'patient@gmail.com',
  },
  {
    id: 2,
    date: '2026-01-05T09:30:00',
    companyName: 'Dr. Rajiv Clinic',
    message: 'generated invoice for patient.',
    image: logo(21),
  },
  {
    id: 3,
    date: '2026-01-05T09:00:00',
    companyName: 'Dr. Rajiv Clinic',
    message: 'created patient record.',
    image: logo(21),
    isLast: true,
  },
];
