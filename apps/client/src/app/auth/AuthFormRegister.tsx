'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  RegisterFields,
  registerValidaitonSchema,
  RegisterValidationSchema,
} from '@loja-santo-antonio-contact-manager/models';
import GlobalButton from '../(global)/GlobalButton';
import { IconName } from '../(global)/GlobalIcon';
import GlobalInputField from '../(global)/GlobalInputField';
import { supabaseRegister } from './actions';

export default function AuthFormRegister({
  changeForm,
}: {
  changeForm: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValidationSchema>({
    resolver: zodResolver(registerValidaitonSchema),
  });

  const [isRegistering, setRegistering] = useState(false);
  const [supabaseError, setSupabaseError] = useState<Error>();

  async function onSubmit(data: RegisterValidationSchema) {
    try {
      setRegistering(true);
      await supabaseRegister(data);
    } catch (error) {
      setSupabaseError(error as Error);
    } finally {
      setRegistering(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col gap-[50px] flex-1 ${
        isRegistering ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <p className="text-xs text-end">
        Já tem uma conta?{' '}
        <button className="font-bold text-accent-brand" onClick={changeForm}>
          Acessar conta
        </button>
      </p>
      <h1 className="text-2xl font-bold">Criar conta</h1>
      <div className="flex flex-col flex-1 gap-[88px]">
        <div className="flex flex-col gap-5">
          <GlobalInputField
            label="Nome"
            placeholder="Como você se chama?"
            error={errors[RegisterFields.NAME]?.message}
            {...register(RegisterFields.NAME)}
          />
          <GlobalInputField
            type="email"
            label="E-mail"
            placeholder="Seu e-mail aqui"
            error={errors[RegisterFields.EMAIL]?.message}
            {...register(RegisterFields.EMAIL)}
          />
          <GlobalInputField
            type="password"
            label="Senha"
            placeholder="Escolha uma senha segura"
            error={errors[RegisterFields.PASSWORD]?.message}
            {...register(RegisterFields.PASSWORD)}
          />
          <GlobalInputField
            type="password"
            label="Repetir a senha"
            placeholder="Repita sua senha para confirmar"
            error={errors[RegisterFields.CONFIRM_PASSWORD]?.message}
            {...register(RegisterFields.CONFIRM_PASSWORD)}
          />
        </div>
        <div className="flex flex-col items-end gap-5">
          <GlobalButton
            name={'register'}
            label={'Criar conta'}
            type="submit"
            icon={isRegistering ? IconName.LOADING : undefined}
          />
          {supabaseError && (
            <p className="text-sm text-accent-red">{supabaseError.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
