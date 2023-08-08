import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, UseFormSetError, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { CredentialInputType } from './AuthForm';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { pocketbase } from '../../lib/pocketbase';

interface Props {
  loadingState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const RegisterCredentialInputs = ({ loadingState }: Props) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialInputType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const [isLoading, setIsLoading] = loadingState;

  const onSubmit: SubmitHandler<CredentialInputType> = data => {
    setIsLoading(true);

    handleCredentialRegister(data, setError).finally(() => setIsLoading(false));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6" noValidate>
        <Input
          disabled={isLoading}
          required
          id="name"
          label="Name"
          type="text"
          errors={errors}
          register={register}
        />
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
          Register
        </Button>
      </form>
    </div>
  );
};

const handleCredentialRegister = async (
  data: CredentialInputType,
  setError: UseFormSetError<CredentialInputType>
) => {
  const userData = {
    email: data.email,
    password: data.password,
    passwordConfirm: data.password,
    name: data.name,
    emailVisibility: true,
  };
  try {
    await pocketbase.collection('users').create(userData);
    toast.success('Logged in.');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    const errorData = error?.data?.data;

    if (errorData.email) {
      setError('email', errorData.email);
    }
    if (errorData.password) {
      setError('password', errorData.password);
    }

    toast.error('Something went wrong. please try again later.');
  }
};

export default RegisterCredentialInputs;
