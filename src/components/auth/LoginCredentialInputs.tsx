import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { CredentialInputType } from './AuthForm';
import Input from '../ui/inputs/Input';
import Button from '../ui/Button';
import { pocketbase } from '../../lib/pocketbase';

interface Props {
  loadingState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const LoginCredentialInputs = ({ loadingState }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialInputType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const [isLoading, setIsLoading] = loadingState;

  const onSubmit: SubmitHandler<CredentialInputType> = data => {
    setIsLoading(true);

    handleCredentialLogin(data).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6" noValidate>
        <Input
          disabled={isLoading}
          required
          id="email"
          label="Email address"
          type="email"
          errors={errors}
          register={register}
        />
        <Input
          disabled={isLoading}
          required
          id="password"
          label="Password"
          type="password"
          errors={errors}
          register={register}
        />
        <Button type="submit" fullWidth disabled={isLoading}>
          Sign in
        </Button>
      </form>
    </div>
  );
};

const handleCredentialLogin = async (data: CredentialInputType) => {
  try {
    await pocketbase
      .collection('users')
      .authWithPassword(data.email, data.password);
    toast.success('Logged in.');
  } catch (_) {
    toast.error('Username or password is incorrect.');
  }
};

export default LoginCredentialInputs;
