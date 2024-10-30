'use client';

import { contacts as Contact } from '@prisma/client';
import { useState } from 'react';
import GlobalButton from '../(global)/GlobalButton';
import { IconName } from '../(global)/GlobalIcon';
import GlobalInputField from '../(global)/GlobalInputField';
import GlobalModal from '../(global)/GlobalModal';
import { unlockContact } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UlockFields,
  unlockValidationSchema,
  UnlockValidationSchema,
} from '@loja-santo-antonio-contact-manager/models';
import { createClient } from '../../utils/supabase/client';

export default function HomeModalUnlock({
  id,
  close,
  back,
  save,
}: {
  id: string;
  close: () => void;
  back: () => void;
  save: (data: Contact) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UnlockValidationSchema>({
    resolver: zodResolver(unlockValidationSchema),
  });

  const [isUnlocking, setUnlocking] = useState<boolean>(false);
  const [apiError, setApiError] = useState<Error>();

  async function onSubmit(data: UnlockValidationSchema) {
    try {
      if (isUnlocking) {
        return;
      }
      setUnlocking(true);
      const supabase = await createClient();
      const { data: userData } = await supabase.auth.getUser();
      const { error } = await supabase.auth.signInWithPassword({
        email: userData.user?.email ?? '',
        password: data[UlockFields.PASSWORD],
      });
      if (error) {
        throw error;
      }
      const contact = await unlockContact(id);
      save(contact);
    } catch (error) {
      setApiError(error as any);
    } finally {
      setUnlocking(false);
    }
  }

  return (
    <GlobalModal close={close} label="Visualizar informações">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-[16px] ${
          isUnlocking ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <div className="flex flex-col py-5 px-[16px]">
          <GlobalInputField
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            error={errors[UlockFields.PASSWORD]?.message}
            {...register(UlockFields.PASSWORD)}
          />
        </div>
        <hr className="border-border-primary/20" />
        <div className="flex flex-col items-end gap-5">
          <div className="flex justify-end gap-[13px] p-3">
            <GlobalButton
              name={'back'}
              label={'Voltar'}
              theme="secondary"
              action={back}
            />
            <GlobalButton
              name={'confirm'}
              label={'Confirmar'}
              type="submit"
              icon={isUnlocking ? IconName.LOADING : undefined}
            />
          </div>
          {apiError && (
            <p className="text-sm text-end text-accent-red">
              {apiError.message}
            </p>
          )}
        </div>
      </form>
    </GlobalModal>
  );
}
