'use client';

import { CredentialInputType } from '@/app/(site)/components/AuthForm';
import clsx from 'clsx';
import React from 'react';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  id: 'email' | 'password' | 'name';
  label: string;
  type: string;
  required: boolean;
  disabled: boolean;
  register: UseFormRegister<CredentialInputType>;
  errors: FieldErrors;
}

const Input = ({
  id,
  label,
  type,
  required,
  disabled,
  register,
  errors,
}: Props) => {
  return (
    <div className="mb-6">
      <div className="mb-3">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 ">
          {label}
        </label>
      </div>
      <input
        className={clsx(
          `form-input block w-full rounded-xl border-0 py-2 text-gray-700 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 disabled:opacity-30 disabled:bg-gray-200 transition enabled:hover:ring-gray-500 mb-1`,
          !errors[id] && 'focus:ring-sky-600',
          errors[id] && 'ring-rose-500',
          errors[id] && 'focus:ring-rose-500'
        )}
        type={type}
        required={required}
        disabled={disabled}
        autoComplete={id}
        {...register(id, { required })}
      />
      <div className="text-sm text-rose-500 font-medium">
        {errors[id]?.type === 'required' && `${id} is required`}
        {errors[id] && errors[id]?.message?.toString()}
      </div>
    </div>
  );
};

export default Input;
