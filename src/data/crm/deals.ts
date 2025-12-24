import { UniqueIdentifier } from '@dnd-kit/core';
import { initialConfig } from 'config';
import { users } from 'data/users';
import { User } from 'types/users';

const logo = (index: number) => `${initialConfig.assetsDir}/images/brands/${index}.webp`;

export interface Company {
  id: number | string;
  name: string;
  logo: string;
  link: string;
}

export interface Deal {
  id: UniqueIdentifier;
  name: string;
  description?: string;
  pipeline?: string;
  stage: string;
  amount: number;
  lastUpdate: string;
  createDate: string;
  closeDate: string;
  owner: User;
  client: {
    name: string;
    phone: string;
    email: string;
    videoChat: string;
    address: string;
    link: string;
  };
  priority: string;
  company: Company;
  collaborators?: User[];
  progress: number;
  expanded: boolean;
}

export interface DealList {
  id: UniqueIdentifier;
  title: string;
  totalBudget?: number;
  compactMode: boolean;
  deals: Deal[];
}

export const companies: Company[] = [
  {
    id: 1,
    name: 'Victory Outfitters Ltd.',
    logo: logo(1),
    link: '#!',
  },

  {
    id: 2,
    name: 'Bean Brew Ltd.',
    logo: logo(2),
    link: '#!',
  },
  {
    id: 3,
    name: 'BrightWave Media',
    logo: logo(3),
    link: '#!',
  },
  {
    id: 4,
    name: 'CloudSync Systems',
    logo: logo(4),
    link: '#!',
  },
  {
    id: 5,
    name: 'Waka Waka PLC',
    logo: logo(5),
    link: '#!',
  },
  {
    id: 6,
    name: 'SwiftPay Systems',
    logo: logo(6),
    link: '#!',
  },
  {
    id: 7,
    name: 'UrbanNest Holdings',
    logo: logo(7),
    link: '#!',
  },
  {
    id: 8,
    name: 'O-Ecopower Innovations',
    logo: logo(8),
    link: '#!',
  },
  {
    id: 9,
    name: 'ShieldNet Security',
    logo: logo(9),
    link: '#!',
  },
];

export const dealsData: DealList[] = [
  {
    id: 'column1',
    title: 'Booking Request',
    compactMode: false,
    deals: [
      {
        id: 'deal1',
        name: 'General Consultation',
        stage: 'Booking Request',
        amount: 100,
        company: companies[0],
        client: {
          name: users[0].name,
          email: users[0].email,
          phone: '+14845211024',
          videoChat: 'Zoom',
          address: 'Room 101',
          link: '#!',
        },
        priority: 'high',
        owner: users[3],
        collaborators: [users[1]],
        createDate: '10 Mar, 2025',
        lastUpdate: '10 Mar, 2025',
        closeDate: '—',
        progress: 10,
        expanded: false,
      },
      // {
      //   id: 'deal2',
      //   name: 'Dental Checkup',
      //   stage: 'Booking Request',
      //   amount: 80,
      //   company: companies[1],
      //   client: {
      //     name: users[2].name,
      //     email: users[2].email,
      //     phone: '+14845211025',
      //     videoChat: 'Google Meet',
      //     address: 'Clinic A',
      //     link: '#!',
      //   },
      //   priority: 'medium',
      //   owner: users[3],
      //   collaborators: [users[4]],
      //   createDate: '11 Mar, 2025',
      //   lastUpdate: '11 Mar, 2025',
      //   closeDate: '—',
      //   progress: 15,
      //   expanded: false,
      // },
      // {
      //   id: 'deal3',
      //   name: 'Physiotherapy Session',
      //   stage: 'Booking Request',
      //   amount: 60,
      //   company: companies[2],
      //   client: {
      //     name: users[5].name,
      //     email: users[5].email,
      //     phone: '+14845211026',
      //     videoChat: 'In-person',
      //     address: 'Rehab Wing',
      //     link: '#!',
      //   },
      //   priority: 'low',
      //   owner: users[3],
      //   collaborators: [users[6]],
      //   createDate: '12 Mar, 2025',
      //   lastUpdate: '12 Mar, 2025',
      //   closeDate: '—',
      //   progress: 20,
      //   expanded: false,
      // },
    ],
  },

  {
    id: 'column2',
    title: 'Confirmed',
    compactMode: false,
    deals: [
      {
        id: 'deal4',
        name: 'Cardiology Follow-up',
        stage: 'Confirmed',
        amount: 150,
        company: companies[3],
        client: {
          name: users[7].name,
          email: users[7].email,
          phone: '+14845211027',
          videoChat: 'Zoom',
          address: 'Room 203',
          link: '#!',
        },
        priority: 'high',
        owner: users[3],
        collaborators: [users[8]],
        createDate: '05 Mar, 2025',
        lastUpdate: '08 Mar, 2025',
        closeDate: '14 Mar, 2025',
        progress: 60,
        expanded: false,
      },
      // {
      //   id: 'deal5',
      //   name: 'Orthopedic Consultation',
      //   stage: 'Confirmed',
      //   amount: 120,
      //   company: companies[4],
      //   client: {
      //     name: users[9].name,
      //     email: users[9].email,
      //     phone: '+14845211028',
      //     videoChat: 'In-person',
      //     address: 'Room 305',
      //     link: '#!',
      //   },
      //   priority: 'medium',
      //   owner: users[3],
      //   collaborators: [users[10]],
      //   createDate: '06 Mar, 2025',
      //   lastUpdate: '09 Mar, 2025',
      //   closeDate: '15 Mar, 2025',
      //   progress: 65,
      //   expanded: false,
      // },
      // {
      //   id: 'deal6',
      //   name: 'ENT Checkup',
      //   stage: 'Confirmed',
      //   amount: 90,
      //   company: companies[5],
      //   client: {
      //     name: users[11].name,
      //     email: users[11].email,
      //     phone: '+14845211029',
      //     videoChat: 'In-person',
      //     address: 'ENT Wing',
      //     link: '#!',
      //   },
      //   priority: 'low',
      //   owner: users[3],
      //   collaborators: [users[12]],
      //   createDate: '07 Mar, 2025',
      //   lastUpdate: '10 Mar, 2025',
      //   closeDate: '16 Mar, 2025',
      //   progress: 55,
      //   expanded: false,
      // },
      // {
      //   id: 'deal7',
      //   name: 'Neurology Review',
      //   stage: 'Confirmed',
      //   amount: 180,
      //   company: companies[6],
      //   client: {
      //     name: users[13].name,
      //     email: users[13].email,
      //     phone: '+14845211030',
      //     videoChat: 'Zoom',
      //     address: 'Room 410',
      //     link: '#!',
      //   },
      //   priority: 'high',
      //   owner: users[3],
      //   collaborators: [users[14]],
      //   createDate: '08 Mar, 2025',
      //   lastUpdate: '10 Mar, 2025',
      //   closeDate: '18 Mar, 2025',
      //   progress: 70,
      //   expanded: false,
      // },
      // {
      //   id: 'deal8',
      //   name: 'Psychiatry Session',
      //   stage: 'Confirmed',
      //   amount: 200,
      //   company: companies[7],
      //   client: {
      //     name: users[1].name,
      //     email: users[1].email,
      //     phone: '+14845211031',
      //     videoChat: 'In-person',
      //     address: 'Mental Health Wing',
      //     link: '#!',
      //   },
      //   priority: 'medium',
      //   owner: users[3],
      //   collaborators: [users[2]],
      //   createDate: '09 Mar, 2025',
      //   lastUpdate: '11 Mar, 2025',
      //   closeDate: '19 Mar, 2025',
      //   progress: 75,
      //   expanded: false,
      // },
      // {
      //   id: 'deal9',
      //   name: 'Nutrition Consultation',
      //   stage: 'Confirmed',
      //   amount: 70,
      //   company: companies[8],
      //   client: {
      //     name: users[4].name,
      //     email: users[4].email,
      //     phone: '+14845211032',
      //     videoChat: 'Zoom',
      //     address: 'Room 118',
      //     link: '#!',
      //   },
      //   priority: 'low',
      //   owner: users[3],
      //   collaborators: [users[5]],
      //   createDate: '10 Mar, 2025',
      //   lastUpdate: '12 Mar, 2025',
      //   closeDate: '20 Mar, 2025',
      //   progress: 50,
      //   expanded: false,
      // },
      // {
      //   id: 'deal10',
      //   name: 'Pediatric Checkup',
      //   stage: 'Confirmed',
      //   amount: 85,
      //   company: companies[0],
      //   client: {
      //     name: users[6].name,
      //     email: users[6].email,
      //     phone: '+14845211033',
      //     videoChat: 'In-person',
      //     address: 'Pediatric Wing',
      //     link: '#!',
      //   },
      //   priority: 'medium',
      //   owner: users[3],
      //   collaborators: [users[7]],
      //   createDate: '11 Mar, 2025',
      //   lastUpdate: '12 Mar, 2025',
      //   closeDate: '21 Mar, 2025',
      //   progress: 65,
      //   expanded: false,
      // },
    ],
  },

  {
    id: 'column3',
    title: 'Completed',
    compactMode: false,
    deals: [
      {
        id: 'deal11',
        name: 'Dermatology Session',
        stage: 'Completed',
        amount: 90,
        company: companies[1],
        client: {
          name: users[8].name,
          email: users[8].email,
          phone: '+14845211034',
          videoChat: 'In-person',
          address: 'Room 110',
          link: '#!',
        },
        priority: 'low',
        owner: users[3],
        collaborators: [users[9]],
        createDate: '01 Mar, 2025',
        lastUpdate: '03 Mar, 2025',
        closeDate: '03 Mar, 2025',
        progress: 100,
        expanded: false,
      },
      {
        id: 'deal12',
        name: 'Eye Examination',
        stage: 'Completed',
        amount: 70,
        company: companies[2],
        client: {
          name: users[10].name,
          email: users[10].email,
          phone: '+14845211035',
          videoChat: 'In-person',
          address: 'Optical Wing',
          link: '#!',
        },
        priority: 'low',
        owner: users[3],
        collaborators: [users[11]],
        createDate: '28 Feb, 2025',
        lastUpdate: '01 Mar, 2025',
        closeDate: '01 Mar, 2025',
        progress: 100,
        expanded: false,
      },
      // {
      //   id: 'deal13',
      //   name: 'Blood Test Review',
      //   stage: 'Completed',
      //   amount: 50,
      //   company: companies[3],
      //   client: {
      //     name: users[12].name,
      //     email: users[12].email,
      //     phone: '+14845211036',
      //     videoChat: 'In-person',
      //     address: 'Lab Unit',
      //     link: '#!',
      //   },
      //   priority: 'low',
      //   owner: users[3],
      //   collaborators: [users[13]],
      //   createDate: '26 Feb, 2025',
      //   lastUpdate: '27 Feb, 2025',
      //   closeDate: '27 Feb, 2025',
      //   progress: 100,
      //   expanded: false,
      // },
      // {
      //   id: 'deal14',
      //   name: 'Vaccination Appointment',
      //   stage: 'Completed',
      //   amount: 40,
      //   company: companies[4],
      //   client: {
      //     name: users[14].name,
      //     email: users[14].email,
      //     phone: '+14845211037',
      //     videoChat: 'In-person',
      //     address: 'Immunization Unit',
      //     link: '#!',
      //   },
      //   priority: 'low',
      //   owner: users[3],
      //   collaborators: [users[0]],
      //   createDate: '25 Feb, 2025',
      //   lastUpdate: '26 Feb, 2025',
      //   closeDate: '26 Feb, 2025',
      //   progress: 100,
      //   expanded: false,
      // },
      // {
      //   id: 'deal15',
      //   name: 'Post-Surgery Follow-up',
      //   stage: 'Completed',
      //   amount: 160,
      //   company: companies[5],
      //   client: {
      //     name: users[1].name,
      //     email: users[1].email,
      //     phone: '+14845211038',
      //     videoChat: 'Zoom',
      //     address: 'Room 512',
      //     link: '#!',
      //   },
      //   priority: 'medium',
      //   owner: users[3],
      //   collaborators: [users[2]],
      //   createDate: '24 Feb, 2025',
      //   lastUpdate: '25 Feb, 2025',
      //   closeDate: '25 Feb, 2025',
      //   progress: 100,
      //   expanded: false,
      // },
    ],
  },
];
