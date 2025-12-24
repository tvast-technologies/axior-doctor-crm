'use client';

import { signIn as nextAuthSignIn } from 'next-auth/react';
import { defaultJwtAuthCredentials } from 'config';
import paths from 'routes/paths';
import DoctorLoginForm, { LoginFormValues }  from '../DoctorLoginForm';

const LoginDoctor = () => {
  const handleLogin = async (data: LoginFormValues) => {
    return await nextAuthSignIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  };

  return (
    <DoctorLoginForm
      handleLogin={handleLogin}
      signUpLink={paths.defaultJwtLogin}
      forgotPasswordLink={paths.defaultJwtForgotPassword}
      defaultCredential={defaultJwtAuthCredentials}
    />
  );
};

export default LoginDoctor;
