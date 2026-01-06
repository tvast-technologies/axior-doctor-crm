'use client';

import { SignInResponse } from 'next-auth/react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, Grid, Link, Stack, TextField, Typography } from '@mui/material';
import { rootPaths } from 'routes/paths';
import * as yup from 'yup';
import PasswordTextField from 'components/common/PasswordTextField';

export interface LoginFormValues {
  email: string;
  password?: string;
  otp?: string;
}

const schema: yup.ObjectSchema<LoginFormValues> = yup.object({
  email: yup.string().required('Phone or Email is required'),
  password: yup.string().optional(),
  otp: yup.string().optional(),
});

interface LoginFormProps {
  handleLogin: (data: LoginFormValues) => Promise<SignInResponse | undefined>;
  signUpLink: string;
  forgotPasswordLink?: string;
  defaultCredential?: { email: string; password: string };
}

const LoginForm = ({ handleLogin, signUpLink, forgotPasswordLink, defaultCredential }: LoginFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [otpSent, setOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const emailOrPhone = watch('email');
  // const isPhoneNumber = /^[0-9]{8,15}$/.test(emailOrPhone || '');
  const isPhoneNumber = true;

  const handleLoginSumbit = async (data: LoginFormValues) => {
    const res = await handleLogin(data);

    if (res?.ok) {
      router.refresh();
      router.push(
        data.email == 'patient@gmail.com'
          ? '/apps/book-event'
          : callbackUrl
            ? callbackUrl
            : rootPaths.root,
      );
    }
    if (res?.error) {
      setError('root.credential', { type: 'manual', message: res.error });
    }
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    if (isPhoneNumber) {
      if (!otpSent) {
        setOtpSent(true);
        return;
      }

      if (data.otp !== '123456') {
        setError('otp', { message: 'Invalid OTP' });
        return;
      }

      if(!data.email.includes("@"))
      {
        data.email = 'patient@gmail.com';
        data.password = defaultCredential?.password
      }

      handleLoginSumbit(data);
      return;
    }
    handleLoginSumbit(data);
  }

  return (
    <Stack
      direction="column"
      sx={{
        height: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: { md: 10 },
        pb: 10,
      }}
    >
      <div />

      <Grid
        container
        sx={{
          maxWidth: '35rem',
          rowGap: 4,
          p: { xs: 3, sm: 5 },
          mb: 5,
        }}
      >
        {/* {provider === 'firebase' && process.env.NEXT_PUBLIC_BUILD_MODE === 'production' && (
              <Grid size={12} sx={{ mb: 1 }}>
                <ViewOnlyAlert docLink="https://aurora.themewagon.com/documentation/authentication#firebase" />
              </Grid>
            )} */}

        <Grid size={12}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
            }}
          >
            <Typography variant="h4">Welcome Back!</Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
              }}
            >
              Not a patient?
              <Link href={signUpLink} sx={{ ml: 1 }}>
                Doctor Login
              </Link>
            </Typography>
          </Stack>
        </Grid>
        {/* {socialAuth && (
              <>
                <Grid size={12}>
                  <SocialAuth />
                </Grid>
                <Grid size={12}>
                  <Divider sx={{ color: 'text.secondary' }}>or use email</Divider>
                </Grid>
              </>
            )} */}

        <Grid size={12}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {errors.email?.message && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.email.message}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Phone"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              defaultValue={""}
              sx={{ mb: 3 }}
            />

              {/* {!isPhoneNumber&&
              (<PasswordTextField
                fullWidth
                label="Password"
                {...register('password')}
                defaultValue={defaultCredential?.password}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 3 }}
              />)} */}

            {isPhoneNumber && otpSent && (
              <TextField
                fullWidth
                label="OTP"
                {...register('otp')}
                error={!!errors.otp}
                helperText={errors.otp?.message}
                sx={{ mb: 3 }}
              />
            )}

            {!isPhoneNumber && forgotPasswordLink && (
              <Link href={forgotPasswordLink} variant="subtitle2">
                Forgot Password?
              </Link>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
              sx={{ mt: 3 }}
            >
              {isPhoneNumber ? (otpSent ? 'Verify OTP' : 'Send OTP') : 'Log in'}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Link href="#!" variant="subtitle2">
        Trouble signing in?
      </Link>
    </Stack>
  );
};

export default LoginForm;
