import { useState } from 'react';

import SocialAuthBtnGroup from './SocialAuthBtnGroup';
import LoginCredentialInputs from './LoginCredentialInputs';
import RegisterCredentialInputs from './RegisterCredentialInputs';
import AuthFormVariantSwitch from './AuthFormVariantSwitch';

export type AuthFormVariant = 'LOGIN' | 'REGISTER';

export type CredentialInputType = {
  email: string;
  password: string;
  name?: string;
};

const AuthForm = () => {
  const loadingState = useState(false);
  const authFormVariantState = useState<AuthFormVariant>('LOGIN');
  const [authFormVariant] = authFormVariantState;

  return (
    <div className="rounded-xl shadow-lg mt-8 w-full sm:max-w-lg py-8 px-6 sm:py-12 sm:px-8 bg-white">
      <SocialAuthBtnGroup loadingState={loadingState} />

      <Divider />

      {authFormVariant === 'LOGIN' && (
        <LoginCredentialInputs loadingState={loadingState} />
      )}
      {authFormVariant === 'REGISTER' && (
        <RegisterCredentialInputs loadingState={loadingState} />
      )}

      <AuthFormVariantSwitch authFormVariantState={authFormVariantState} />
    </div>
  );
};

const Divider = () => {
  return (
    <div className="relative py-8 sm:py-12">
      <div className="border-b-2 border-gray-300 w-full"></div>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-700 text-sm font-medium">
        Or
      </span>
    </div>
  );
};

export default AuthForm;
