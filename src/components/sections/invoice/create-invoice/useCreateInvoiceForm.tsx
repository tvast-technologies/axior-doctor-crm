import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

export interface CreateInvoiceFormSchemaValues {
  organizationImage: { id: string; file: any } | null;

  invoiceFrom: {
    name: string; // Doctor / Clinic
    phone: string;
    email: string;
    address: string;
  };

  invoiceTo: {
    name: string; // Patient
    phone: string;
    email: string;
    address: string;
  };

  invoiceDetails: {
    invoiceNumber: number | null;
    status: 'pending' | 'paid' | 'late';
  };

  deadline: {
    issueDate: Date | null;
    dueDate: Date | null;
  };

  orderCharges: {
    currency: 'inr';
    shippingCost: number | null; // Other clinic charges
  };

  adjustment: {
    discount: number | null; // %
    tax: number | null; // %
  };

  itemDetails: {
    type: 'consultation' | 'test' | 'medicine';
    description: string;
    quantity: number;
    price: number;
  }[];

  note?: string;
}

/* -------------------------------------------------------------------------- */
/*                               VALIDATION                                   */
/* -------------------------------------------------------------------------- */

export const CreateInvoiceFormSchema: yup.ObjectSchema<CreateInvoiceFormSchemaValues> = yup.object({
  organizationImage: yup
    .object({
      id: yup.string().required(),
      file: yup.mixed().required(),
    })
    .nullable()
    .required('Clinic logo is required'),

  invoiceFrom: yup.object({
    name: yup.string().required('Clinic name is required'),
    phone: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
  }),

  invoiceTo: yup.object({
    name: yup.string().required('Patient name is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
  }),

  invoiceDetails: yup.object({
    invoiceNumber: yup
      .number()
      .nullable()
      .typeError('Invoice number must be a number')
      .required('Invoice number is required'),
    status: yup
      .mixed<'pending' | 'paid' | 'late'>()
      .oneOf(['pending', 'paid', 'late'])
      .required('Status is required'),
  }),

  deadline: yup.object({
    issueDate: yup.date().nullable().typeError('Invalid date').required('Issue date is required'),
    dueDate: yup
      .date()
      .nullable()
      .typeError('Invalid date')
      .required('Due date is required')
      .min(yup.ref('issueDate'), 'Due date must be after issue date'),
  }),

  orderCharges: yup.object({
    currency: yup.mixed<'inr'>().oneOf(['inr']).required('Currency is required'),
    shippingCost: yup
      .number()
      .typeError('Charges must be a number')
      .nullable()
      .min(0, 'Charges cannot be negative')
      .required('Charges are required'),
  }),

  adjustment: yup.object({
    discount: yup
      .number()
      .typeError('Discount must be a number')
      .nullable()
      .min(0)
      .max(100, 'Discount cannot exceed 100%')
      .required('Discount is required'),
    tax: yup
      .number()
      .typeError('Tax must be a number')
      .nullable()
      .min(0)
      .max(100, 'Tax cannot exceed 100%')
      .required('Tax is required'),
  }),

  itemDetails: yup
    .array()
    .of(
      yup.object({
        type: yup
          .mixed<'consultation' | 'test' | 'medicine'>()
          .oneOf(['consultation', 'test', 'medicine'])
          .required('Service type is required'),
        description: yup.string().required('Description is required'),
        quantity: yup
          .number()
          .typeError('Quantity must be a number')
          .min(1, 'Quantity must be at least 1')
          .required('Quantity is required'),
        price: yup
          .number()
          .typeError('Price must be a number')
          .min(0, 'Price cannot be negative')
          .required('Price is required'),
      }),
    )
    .min(1, 'At least one service is required')
    .required(),

  note: yup.string(),
});

/* -------------------------------------------------------------------------- */
/*                              FORM HOOK                                     */
/* -------------------------------------------------------------------------- */

export const useCreateInvoiceForm = () => {
  const methods = useForm<CreateInvoiceFormSchemaValues>({
    resolver: yupResolver(CreateInvoiceFormSchema),
    defaultValues: {
      organizationImage: null,

      // Hardcoded Doctor / Clinic
      invoiceFrom: {
        name: 'Dr. Rajiv',
        phone: '+91 98765 43210',
        email: 'doctor@gmail.com',
        address: 'Bangalore, India',
      },

      invoiceTo: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },

      invoiceDetails: {
        invoiceNumber: null,
        status: 'pending',
      },

      deadline: {
        issueDate: new Date(),
        dueDate: null,
      },

      orderCharges: {
        currency: 'inr',
        shippingCost: 0,
      },

      adjustment: {
        discount: 0,
        tax: 0,
      },

      itemDetails: [
        {
          type: 'consultation',
          description: 'Doctor Consultation',
          quantity: 1,
          price: 1500,
        },
        {
          type: 'test',
          description: 'Blood Test',
          quantity: 1,
          price: 2000,
        },
        {
          type: 'medicine',
          description: 'Medication Charges',
          quantity: 1,
          price: 1000,
        },
      ],
      note: 'Thank you for visiting. Please contact for any billing queries.',
    },
  });

  return { methods };
};
