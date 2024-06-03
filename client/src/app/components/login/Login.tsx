'use client';

import { signIn } from 'next-auth/react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { signUp } from '@/app/api/auth/route';

export default function Login({
  isSignUp,
  callbackUrl,
}: {
  isSignUp: boolean;
  callbackUrl: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ reValidateMode: 'onSubmit' });

  async function onSubmit(formData: FieldValues) {
    if (isSignUp) {
      const fullname = formData.fullname as string;
      const email = formData.email as string;
      const password = formData.password as string;
      if (fullname && email && password) signUp(fullname, email, password);
    }

    signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl,
    });
  }

  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-screen max-w-sm mx-auto  flex-1 flex flex-col items-center justify-center px-2 py-20"
    >
      {/* {"errors:" + JSON.stringify(errors)} */}
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full ">
        <h1 className="mb-8 text-3xl text-center">
          {isSignUp ? 'Sign up' : 'Log in'}{' '}
        </h1>
        {isSignUp && (
          <>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mt-4"
              placeholder="Full Name"
              {...register('fullname', {
                required: 'You must specify full name',
              })}
            />
            {errors && errors.fullname && (
              <p className="text-red-500 text-xs italic">
                {errors?.fullname?.message?.toString()}
              </p>
            )}
          </>
        )}

        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mt-4"
          placeholder="Email"
          aria-invalid={!!errors?.email}
          {...register('email', {
            required: 'You must specify email',
            pattern: {
              value: emailRegEx,
              message:
                'Password must have at least 8 characters, at least one letter, one number and one special character ',
            },
          })}
        />
        {errors && errors.email && (
          <p className="text-red-500 text-xs italic">
            {errors?.email?.message?.toString()}
          </p>
        )}

        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mt-4"
          placeholder="Password"
          {...register('password', {
            required: 'You must specify a password',
            pattern: isSignUp
              ? {
                  value: passwordRegEx,
                  message:
                    'Password must have at least 8 characters, at least one letter, one number and one special character ',
                }
              : {},
          })}
        />
        {errors && errors.password && (
          <p className="text-red-500 text-xs italic">
            {errors?.password?.message?.toString()}
          </p>
        )}

        {isSignUp && (
          <>
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mt-4"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'You must confirm password',
                validate: {
                  confirmPassword: (value) =>
                    value === getValues('password') || 'Password did not match',
                },
              })}
            />
            {errors && errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors?.confirmPassword?.message?.toString()}
              </p>
            )}
          </>
        )}

        <button
          type="submit"
          className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1 mt-4"
        >
          {isSignUp ? 'Create Account' : 'Log in'}
        </button>
      </div>

      <div className="text-grey-dark mt-6">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <a
          className="no-underline border-b border-blue text-blue"
          href={`/signIn${!isSignUp ? '?isSignUp=true' : ''}`}
        >
          {' '}
          {isSignUp ? 'Log in' : 'Sign up'}
        </a>
        .
      </div>
    </form>
  );
}
