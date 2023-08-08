import { Dispatch, SetStateAction, useCallback } from 'react';
import { AuthFormVariant } from './AuthForm';

const AuthFormVariantSwitch = ({
  authFormVariantState,
}: {
  authFormVariantState: [
    AuthFormVariant,
    Dispatch<SetStateAction<AuthFormVariant>>
  ];
}) => {
  const [authFromVariant, setAuthFormVariant] = authFormVariantState;

  const toggleAuthFormVariant = useCallback(() => {
    if (authFromVariant === 'LOGIN') {
      setAuthFormVariant('REGISTER');
    } else {
      setAuthFormVariant('LOGIN');
    }
  }, [authFromVariant, setAuthFormVariant]);

  return (
    <div className="flex text-sm font-medium text-gray-700">
      <div className="pr-1">
        {authFromVariant === 'LOGIN' ? 'New to Messenger?' : 'Have an account?'}
      </div>
      <div
        onClick={toggleAuthFormVariant}
        className="underline cursor-pointer text-sky-500"
      >
        {authFromVariant === 'LOGIN' ? 'Create an account' : 'Login'}
      </div>
    </div>
  );
};

export default AuthFormVariantSwitch;
