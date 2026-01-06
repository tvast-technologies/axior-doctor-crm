'use client';

import { JSX, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import {
  CompanyInfo,
  companyInfoSchema,
} from 'components/sections/crm/add-contact/steps/CompanyInfoForm';
import { LeadInfo, leadInfoSchema } from 'components/sections/crm/add-contact/steps/LeadInfoForm';
import PersonalInfoForm, {
  PersonalInfo,
  personalInfoSchema,
} from 'components/sections/crm/add-contact/steps/PersonalInfoForm';

interface Step {
  id: number;
  label: JSX.Element;
  content: JSX.Element;
}

const steps: Step[] = [
  {
    id: 1,
    label: <Typography fontWeight={700}>Personal Information</Typography>,
    content: <PersonalInfoForm label="Personal Information" />,
  },
];

const validationSchemas = [personalInfoSchema, companyInfoSchema, leadInfoSchema];

export interface ContactForm extends CompanyInfo, PersonalInfo, LeadInfo {}

const AddContactStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<ContactForm>({
    resolver: yupResolver(validationSchemas[activeStep] as yup.ObjectSchema<ContactForm>),
    defaultValues: {
      personalInfo: {},
      companyInfo: {},
      leadInfo: {},
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    const storedData = localStorage.getItem('editContact');

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      reset({
        personalInfo: parsedData.personalInfo || {},
        companyInfo: parsedData.companyInfo || {},
        leadInfo: parsedData.leadInfo || {},
      });
    }
  }, [reset]);

  const onSubmit = (data: ContactForm) => {
    enqueueSnackbar('Contact saved successfully', { variant: 'success' });

    localStorage.removeItem('editContact');
    reset();
    setActiveStep(0);
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 7 }}>{steps[activeStep].content}</Box>

          <Stack gap={2}>
            <Button type="submit" variant="soft">
              Save
            </Button>
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  );
};

export default AddContactStepper;
