'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  LoginFields,
  loginValidationSchema,
  LoginValidationSchema,
} from '@loja-santo-antonio-contact-manager/models';
import GlobalButton from '../(global)/GlobalButton';
import { IconName } from '../(global)/GlobalIcon';
import GlobalInputField from '../(global)/GlobalInputField';
import { supabaseLogin } from './actions';

export default function AuthFormLogin({
  changeForm,
}: {
  changeForm: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(loginValidationSchema),
  });

  const [isLogging, setLogging] = useState(false);
  const [supabaseError, setSupabaseError] = useState<Error>();

  async function onSubmit(data: LoginValidationSchema) {
    try {
      if (isLogging) {
        return;
      }
      setLogging(true);
      await supabaseLogin(data);
    } catch (error) {
      setSupabaseError(error as Error);
    } finally {
      setLogging(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col flex-1 ${
        isLogging ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <p className="text-xs text-end">
        Não tem uma conta?{' '}
        <button className="font-bold text-accent-brand" onClick={changeForm}>
          Criar conta
        </button>
      </p>
      <div className="flex flex-col justify-center flex-1 gap-[36px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Acessar conta</h1>
          <GlobalInputField
            type="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            error={errors[LoginFields.EMAIL]?.message}
            {...register(LoginFields.EMAIL)}
          />
          <GlobalInputField
            type="password"
            label="Senha"
            placeholder="Insira sua senha"
            error={errors[LoginFields.PASSWORD]?.message}
            {...register(LoginFields.PASSWORD)}
          />
        </div>
        <div className="flex flex-col items-end gap-5">
          <GlobalButton
            name={'login'}
            label={'Acessar conta'}
            type="submit"
            icon={isLogging ? IconName.LOADING : undefined}
          />
          {supabaseError && (
            <p className="text-sm text-accent-red">{supabaseError.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
