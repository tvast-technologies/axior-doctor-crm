import { topProducts } from 'data/e-commerce/dashboard';
import { users } from 'data/users';
import { User } from 'types/users';

export interface Stat {
  icon: string;
  value: string;
  subtitle: string;
}

export interface MeetingSchedule {
  title: string;
  time: string;
  attendants: User[];
}

export interface Order {
  id: number;
  productImage: string;
  productName: string;
  price: string;
  statusIcon: string;
  status: 'primary' | 'warning' | 'success';
}

export const stats: Stat[] = [
  {
    icon: 'material-symbols-light:ads-click-rounded',
    value: '55',
    subtitle: 'Completed bookings',
  },
  {
    icon: 'material-symbols-light:request-quote-outline-rounded',
    value: '₹100M',
    subtitle: 'Earnings',
  },
  {
    icon: 'material-symbols-light:shopping-cart-checkout-rounded',
    value: '100',
    subtitle: 'Totak bookings',
  },
];

export const meetingSchedules: MeetingSchedule[] = [
  {
    title: 'Collab with Tintin',
    time: '1:30pm - 2:30pm',
    attendants: [users[9], users[0]],
  },
  {
    title: 'Meeting about shipping',
    time: '2:40pm - 4:30pm',
    attendants: [users[3], users[4], users[6], users[10]],
  },
  {
    title: 'Greetings for marketing',
    time: '9:45am - 11:30am',
    attendants: [users[5], users[7], users[12]],
  },
  {
    title: 'Sales pipeline review',
    time: '5:40pm - 6:30pm',
    attendants: [users[1], users[2], users[7], users[12], users[13]],
  },
];


export interface AppointmentSummary {
  id: number;
  patient: {
    name: string;
    avatar: string;
  };
  doctors: User[];
  fee: number;
  appointmentsCount: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export const appointmentSummaries: AppointmentSummary[] = [
  {
    id: 1,
    patient: { name: 'Ravi M', avatar: users[1].avatar },
    doctors: [users[2], users[7], users[15]],
    fee: 980,
    appointmentsCount: 12,
    status: 'Confirmed',
  },
  {
    id: 2,
    patient: { name: 'Esha', avatar: users[2].avatar },
    doctors: [users[6], users[11], users[7], users[13]],
    fee: 200,
    appointmentsCount: 9,
    status: 'Confirmed',
  },
  {
    id: 3,
    patient: { name: 'Madhuri', avatar: users[3].avatar },
    doctors: [users[4], users[3], users[5]],
    fee: 600,
    appointmentsCount: 4,
    status: 'Pending',
  },
  {
    id: 4,
    patient: { name: 'Shwetha', avatar: users[4].avatar },
    doctors: [users[6], users[5], users[11]],
    fee: 920,
    appointmentsCount: 7,
    status: 'Confirmed',
  },
  {
    id: 5,
    patient: { name: 'Darshan', avatar: users[5].avatar },
    doctors: [users[12], users[1]],
    fee: 120,
    appointmentsCount: 2,
    status: 'Confirmed',
  },
  {
    id: 6,
    patient: { name: 'Madhu', avatar: users[6].avatar },
    doctors: [users[1], users[2], users[3]],
    fee: 590,
    appointmentsCount: 3,
    status: 'Pending',
  },
  {
    id: 7,
    patient: { name: 'Arthik', avatar: users[7].avatar },
    doctors: [users[2], users[3], users[13]],
    fee: 470,
    appointmentsCount: 1,
    status: 'Cancelled',
  },
  {
    id: 8,
    patient: { name: 'Ruthvic', avatar: users[8].avatar },
    doctors: [users[2], users[7], users[15]],
    fee: 100,
    appointmentsCount: 15,
    status: 'Confirmed',
  },
  {
    id: 9,
    patient: { name: 'Charith', avatar: users[9].avatar },
    doctors: [users[10], users[13], users[5]],
    fee: 930,
    appointmentsCount: 2,
    status: 'Confirmed',
  },
  {
    id: 10,
    patient: { name: 'Vinay', avatar: users[10].avatar },
    doctors: [users[10], users[2]],
    fee: 530,
    appointmentsCount: 18,
    status: 'Pending',
  },
];


export const orders: Order[] = [
  {
    id: 1,
    productImage: topProducts[11].product.image,
    productName: topProducts[11].product.name,
    price: `$${topProducts[11].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:autorenew',
    status: 'warning',
  },
  {
    id: 2,
    productImage: topProducts[6].product.image,
    productName: topProducts[6].product.name,
    price: `$${topProducts[6].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:local-shipping-outline',
    status: 'primary',
  },
  {
    id: 3,
    productImage: topProducts[2].product.image,
    productName: topProducts[2].product.name,
    price: `$${topProducts[2].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:autorenew',
    status: 'warning',
  },
  {
    id: 4,
    productImage: topProducts[10].product.image,
    productName: topProducts[10].product.name,
    price: `$${topProducts[10].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:inventory-2-outline',
    status: 'success',
  },

  {
    id: 5,
    productImage: topProducts[4].product.image,
    productName: topProducts[4].product.name,
    price: `$${topProducts[4].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:inventory-2-outline',
    status: 'success',
  },
  {
    id: 6,
    productImage: topProducts[5].product.image,
    productName: topProducts[5].product.name,
    price: `$${topProducts[5].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:autorenew',
    status: 'warning',
  },
  {
    id: 7,
    productImage: topProducts[1].product.image,
    productName: topProducts[1].product.name,
    price: `$${topProducts[1].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:inventory-2-outline',
    status: 'success',
  },
  {
    id: 8,
    productImage: topProducts[7].product.image,
    productName: topProducts[7].product.name,
    price: `$${topProducts[7].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:inventory-2-outline',
    status: 'success',
  },
  {
    id: 9,
    productImage: topProducts[8].product.image,
    productName: topProducts[8].product.name,
    price: `$${topProducts[8].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:autorenew',
    status: 'warning',
  },
  {
    id: 10,
    productImage: topProducts[9].product.image,
    productName: topProducts[9].product.name,
    price: `$${topProducts[9].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:local-shipping-outline',
    status: 'primary',
  },
  {
    id: 11,
    productImage: topProducts[3].product.image,
    productName: topProducts[3].product.name,
    price: `$${topProducts[3].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:local-shipping-outline',
    status: 'primary',
  },

  {
    id: 12,
    productImage: topProducts[0].product.image,
    productName: topProducts[0].product.name,
    price: `$${topProducts[0].margin.toFixed(0)}`,
    statusIcon: 'material-symbols:local-shipping-outline',
    status: 'primary',
  },
];


export interface Appointment {
  id: number;
  patientImage: string;
  patientName: string;
  fee: string;
  statusIcon: string;
  status: 'primary' | 'success' | 'warning' | 'error';
}

export const appointments: Appointment[] = [
  {
    id: 1,
    patientImage: appointmentSummaries[9].patient.avatar,
    patientName: appointmentSummaries[9].patient.name,
    fee: `INR${appointmentSummaries[9].fee}`,
    statusIcon: 'material-symbols:event-available',
    status: 'success',
  },
  {
    id: 2,
    patientImage: appointmentSummaries[6].patient.avatar,
    patientName: appointmentSummaries[6].patient.name,
    fee: `INR${appointmentSummaries[6].fee}`,
    statusIcon: 'material-symbols:pending-actions',
    status: 'warning',
  },
  {
    id: 3,
    patientImage: appointmentSummaries[2].patient.avatar,
    patientName: appointmentSummaries[2].patient.name,
    fee: `INR${appointmentSummaries[2].fee}`,
    statusIcon: 'material-symbols:pending-actions',
    status: 'warning',
  },
  {
    id: 4,
    patientImage: appointmentSummaries[3].patient.avatar,
    patientName: appointmentSummaries[3].patient.name,
    fee: `INR${appointmentSummaries[3].fee}`,
    statusIcon: 'material-symbols:check-circle-outline',
    status: 'success',
  },
  {
    id: 5,
    patientImage: appointmentSummaries[4].patient.avatar,
    patientName: appointmentSummaries[4].patient.name,
    fee: `INR${appointmentSummaries[4].fee}`,
    statusIcon: 'material-symbols:check-circle-outline',
    status: 'success',
  },
  {
    id: 6,
    patientImage: appointmentSummaries[5].patient.avatar,
    patientName: appointmentSummaries[5].patient.name,
    fee: `INR${appointmentSummaries[5].fee}`,
    statusIcon: 'material-symbols:event-busy',
    status: 'warning',
  },
  {
    id: 7,
    patientImage: appointmentSummaries[1].patient.avatar,
    patientName: appointmentSummaries[1].patient.name,
    fee: `INR${appointmentSummaries[1].fee}`,
    statusIcon: 'material-symbols:check-circle-outline',
    status: 'success',
  },
  {
    id: 8,
    patientImage: appointmentSummaries[7].patient.avatar,
    patientName: appointmentSummaries[7].patient.name,
    fee: `INR${appointmentSummaries[7].fee}`,
    statusIcon: 'material-symbols:check-circle-outline',
    status: 'success',
  },
  {
    id: 9,
    patientImage: appointmentSummaries[8].patient.avatar,
    patientName: appointmentSummaries[8].patient.name,
    fee: `INR${appointmentSummaries[8].fee}`,
    statusIcon: 'material-symbols:pending-actions',
    status: 'warning',
  },
  {
    id: 10,
    patientImage: appointmentSummaries[0].patient.avatar,
    patientName: appointmentSummaries[0].patient.name,
    fee: `INR${appointmentSummaries[0].fee}`,
    statusIcon: 'material-symbols:event-available',
    status: 'primary',
  },
];
