import { SxProps } from '@mui/material';
import docSitemap from 'docs/routes/docSitemap';
import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  key?: string;
  selectionPrefix?: string;
  path?: string;
  active?: boolean;
  icon?: string;
  iconSx?: SxProps;
  items?: SubMenuItem[];
  new?: boolean;
  hasNew?: boolean;
}

export interface MenuItem {
  id: string;
  key?: string; // used for the locale
  subheader: string;
  icon: string;
  access: "doctor" | "patient" | "both";
  iconSx?: SxProps;
  items: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'homepage',
    subheader: 'Homepage',
    access: "doctor",
    key: 'homepage',
    icon: 'material-symbols:data-exploration-outline-rounded',
    items: [
      {
        name: 'Dashboard',
        key: 'Dashboard',
        path: "/",
        pathName: 'crm',
        icon: 'material-symbols:phone-in-talk-outline-rounded',
        active: true,
      },
    ],
  },
  {
    id: 'apps',
    subheader: 'Apps',
    key: 'apps',
    access: "patient",
    icon: 'material-symbols:widgets-outline-rounded',
    items: [
      {
        name: 'Patient',
        pathName: 'patient',
        key: 'Patient',
        icon: 'material-symbols:phone-in-talk-outline-rounded',
        active: true,
        items: [
          // {
          //   name: 'Booking status',
          //   key: 'Booking status',
          //   path: paths.booking_status,
          //   pathName: 'deals',
          //   active: true,
          // },
          {
            name: 'Patient details',
            key: 'Patient details',
            path: paths.leadDetails,
            pathName: 'lead-details',
            active: true,
          }
        ],
      },
      {
        name: 'Appointments',
        key: 'Appointments',
        pathName: 'events',
        icon: 'material-symbols:calendar-clock-outline-rounded',
        active: true,
        items: [
          {
            name: 'Calendar',
            key: 'calendar',
            path: paths.book_event,
            pathName: 'calendar',
            icon: 'material-symbols:calendar-month-outline',
            active: true,
          },
        ],
      },
    ],
  },
  {
    id: 'apps',
    subheader: 'Apps',
    key: 'apps',
    access: "doctor",
    icon: 'material-symbols:widgets-outline-rounded',
    items: [
      {
        name: 'Patient',
        pathName: 'patient',
        key: 'Patient',
        icon: 'material-symbols:phone-in-talk-outline-rounded',
        active: true,
        items: [
          // {
          //   name: 'Booking status',
          //   key: 'Booking status',
          //   path: paths.booking_status,
          //   pathName: 'deals',
          //   active: true,
          // },
          {
            name: 'Patients List',
            key: 'Patients List',
            path: paths.patients_list,
            pathName: 'patients-list',
            active: true,
          },
          {
            name: 'Add Patient',
            key: 'Add Patient',
            path: paths.addContact,
            pathName: 'add-contact',
            active: true,
          },
        ],
      },
      {
        name: 'Appointments',
        key: 'Appointments',
        pathName: 'events',
        icon: 'material-symbols:calendar-clock-outline-rounded',
        active: true,
        items: [
          // {
          //   name: 'Book an appointment',
          //   key: 'Book an appointment',
          //   path: paths.createEvent,
          //   pathName: 'create-event',
          //   active: true,
          // },
          {
            name: 'Calendar',
            key: 'calendar',
            path: paths.calendar,
            pathName: 'calendar',
            icon: 'material-symbols:calendar-month-outline',
            active: true,
          },
        ],
      },
    ],
  },
  // {
  //   id: 'pages',
  //   subheader: 'Pages',
  //   key: 'pages',
  //   icon: 'material-symbols:view-quilt-outline',
  //   items: [
  //     {
  //       name: 'Landing',
  //       key: 'landing',
  //       pathName: 'landing',
  //       active: true,
  //       icon: 'material-symbols:flight-land-rounded',
  //       items: [
  //         {
  //           name: 'Homepage',
  //           key: 'landing_homepage',
  //           path: paths.landingHomepage,
  //           pathName: 'homepage',
  //           active: true,
  //         },
  //         {
  //           name: 'About Us',
  //           key: 'landing_about',
  //           path: paths.landingAbout,
  //           pathName: 'about-us',
  //           active: true,
  //         },
  //         {
  //           name: 'FAQ',
  //           key: 'landing_faq',
  //           path: paths.landingFaq,
  //           pathName: 'landing-faq',
  //           active: true,
  //         },
  //         {
  //           name: 'Contact',
  //           key: 'landing_contact',
  //           path: paths.landingContact,
  //           pathName: 'contact',
  //           active: true,
  //         },
  //         {
  //           name: '404',
  //           key: 'landing_404',
  //           path: paths.landing404,
  //           pathName: 'landing-404',
  //           active: true,
  //         },
  //         {
  //           name: 'Coming Soon',
  //           key: 'landing_comingSoon',
  //           path: paths.landingComingSoon,
  //           pathName: 'landing-comingSoon',
  //           active: true,
  //         },
  //         {
  //           name: 'Maintenance',
  //           key: 'landing_maintenance',
  //           path: paths.landingMaintenance,
  //           pathName: 'landing-maintenance',
  //           active: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Starter',
  //       key: 'starter',
  //       path: paths.starter,
  //       pathName: 'starter',
  //       icon: 'material-symbols:play-circle-outline-rounded',
  //       active: true,
  //     },
  //     {
  //       name: 'Account',
  //       key: 'account',
  //       path: paths.account,
  //       pathName: 'account',
  //       active: true,
  //       icon: 'material-symbols:admin-panel-settings-outline-rounded',
  //     },
  //     {
  //       name: 'Notifications',
  //       key: 'notifications',
  //       path: paths.notifications,
  //       pathName: 'notifications',
  //       icon: 'material-symbols:notifications-outline-rounded',
  //       active: true,
  //     },

  //     {
  //       name: 'Authentication',
  //       key: 'authentication',
  //       pathName: 'authentication',
  //       icon: 'material-symbols:security-rounded',
  //       active: true,
  //       items: [
  //         {
  //           name: 'Login',
  //           key: 'login',
  //           path: paths.defaultJwtLogin,
  //           pathName: 'login',
  //           active: true,
  //         },
  //         {
  //           name: 'Sign up',
  //           key: 'sign_up',
  //           path: paths.defaultJwtSignup,
  //           pathName: 'sign-up',
  //           active: true,
  //         },
  //         {
  //           name: 'Forgot password',
  //           key: 'forgot_password',
  //           path: paths.defaultJwtForgotPassword,
  //           pathName: 'forgot-password',
  //           active: true,
  //         },
  //         {
  //           name: '2FA',
  //           key: '2FA',
  //           path: paths.defaultJwt2FA,
  //           pathName: '2FA',
  //           active: true,
  //         },
  //         {
  //           name: 'Set password',
  //           key: 'set_password',
  //           path: paths.defaultJwtSetPassword,
  //           pathName: 'default-set-password',
  //           active: true,
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Error 404',
  //       key: 'error_404',
  //       pathName: 'error',
  //       active: true,
  //       icon: 'material-symbols:warning-outline-rounded',
  //       path: paths[404],
  //     },
  //   ],
  // },
  {
    id: 'misc',
    subheader: 'Misc',
    access: 'both',
    key: 'misc',
    icon: 'material-symbols:dashboard-customize-outline-rounded',
    items: [
      {
        name: 'Pricing',
        key: 'pricing',
        pathName: 'pricing',
        active: true,
        icon: 'material-symbols:sell-outline',
        items: [
          {
            name: 'Pricing',
            key: 'Pricing Details',
            path: paths.pricingColumn,
            pathName: 'pricing-column',
            active: true,
          },
          // {
          //   name: 'Pricing table',
          //   key: 'pricing_table',
          //   path: paths.pricingTable,
          //   pathName: 'pricing-table',
          //   active: true,
          // },
        ],
      },
      {
        name: 'FAQ',
        key: 'faq',
        path: paths.faq,
        pathName: 'faq',
        selectionPrefix: 'faq',
        icon: 'material-symbols:question-mark-rounded',
        active: true,
      },
      // {
      //   name: 'Multi level',
      //   key: 'multi_level',
      //   pathName: 'multi-level',
      //   icon: 'material-symbols:layers-outline-rounded',
      //   active: true,
      //   items: [
      //     {
      //       name: 'Level two (1)',
      //       key: 'level_two_1',
      //       path: '#!',
      //       pathName: 'multi-level-2',
      //       active: true,
      //     },
      //     {
      //       name: 'Level two (2)',
      //       key: 'level_two_2',
      //       pathName: 'multi-level-3',
      //       active: true,
      //       items: [
      //         {
      //           name: 'Level three (1)',
      //           key: 'level_three_1',
      //           path: '#!',
      //           pathName: 'multi-level-item-3',
      //           active: true,
      //         },
      //         {
      //           name: 'Level three (2)',
      //           key: 'level_three_2',
      //           path: '#!',
      //           pathName: 'multi-level-item-4',
      //           active: true,
      //         },
      //       ],
      //     },
      //     {
      //       name: 'Level two (3)',
      //       key: 'level_two_3',
      //       pathName: 'multi-level-4',
      //       active: true,
      //       items: [
      //         {
      //           name: 'Level three (3)',
      //           key: 'level_three_3',
      //           path: '#!',
      //           pathName: 'multi-level-item-6',
      //           active: true,
      //         },
      //         {
      //           name: 'Level three (4)',
      //           key: 'level_three_4',
      //           pathName: 'multi-level-item-7',
      //           active: true,
      //           items: [
      //             {
      //               name: 'Level four (1)',
      //               key: 'level_four_1',
      //               path: '#!',
      //               pathName: 'multi-level-item-8',
      //               active: true,
      //             },
      //             {
      //               name: 'Level four (2)',
      //               key: 'level_four_2',
      //               pathName: 'multi-level-item-9',
      //               active: true,
      //               items: [
      //                 {
      //                   name: 'Level five (1)',
      //                   key: 'level_five_1',
      //                   path: '#!',
      //                   pathName: 'multi-level-item-10',
      //                   active: true,
      //                 },
      //                 {
      //                   name: 'Level five (2)',
      //                   key: 'level_five_2',
      //                   path: '#!',
      //                   pathName: 'multi-level-item-11',
      //                   active: true,
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   name: 'Showcase',
      //   path: paths.showcase,
      //   pathName: 'showcase',
      //   icon: 'material-symbols:monitor-outline-rounded',
      //   active: true,
      // },
    ],
  },
  // ...docSitemap,
];

export default sitemap;
