'use client';

import Image from 'next/image';
import { useState } from 'react';
import GlobalButton from '../(global)/GlobalButton';
import { IconName } from '../(global)/GlobalIcon';
import GlobalInputField from '../(global)/GlobalInputField';
import GlobalModal from '../(global)/GlobalModal';
import { updateContact } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateContactFields,
  createContactValidaitonSchema,
  CreateContactValidationSchema,
} from '@loja-santo-antonio-contact-manager/models';

export default function HomeModalEditContact({
  id,
  close,
  cancel,
}: {
  id: string;
  close: () => void;
  cancel: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactValidationSchema>({
    resolver: zodResolver(createContactValidaitonSchema),
  });

  const [iSaving, setSaving] = useState<boolean>(false);
  const [apiError, setApiError] = useState<Error>();

  async function onSubmit(data: CreateContactValidationSchema) {
    try {
      if (iSaving) {
        return;
      }
      setSaving(true);
      await updateContact(id, data);
      location.reload();
    } catch (error) {
      setApiError(error as any);
    } finally {
      setSaving(false);
    }
  }

  return (
    <GlobalModal close={close} label="Editar contato">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-[16px] ${
          iSaving ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        <div className="flex flex-col py-5 px-[16px] gap-[16px]">
          <div className="flex flex-col items-center gap-3">
            <Image
              src={'/images/profile-placeholder.jpg'}
              alt={'Profile'}
              width={64}
              height={64}
              className="rounded-xl"
            />
            <GlobalButton
              name={'change-image'}
              label={'Substituir'}
              icon={IconName.UPLOAD}
              theme="tertiary"
              size="small"
            />
          </div>
          <GlobalInputField
            label="Nome"
            placeholder="Nome do contato"
            error={errors[CreateContactFields.NAME]?.message}
            {...register(CreateContactFields.NAME)}
          />
          <GlobalInputField
            label="Telefone"
            type="tel"
            placeholder="Número de telefone"
            error={errors[CreateContactFields.PHONE]?.message}
            {...register(CreateContactFields.PHONE)}
          />
          <GlobalInputField
            label="E-mail"
            type="email"
            placeholder="Email do contato"
            error={errors[CreateContactFields.EMAIL]?.message}
            {...register(CreateContactFields.EMAIL)}
          />
        </div>
        <hr className="border-border-primary/20" />
        <div className="flex flex-col items-end gap-5">
          <div className="flex justify-end gap-[13px] p-3">
            <GlobalButton
              name={'cancel'}
              label={'Cancelar'}
              theme="secondary"
              action={cancel}
            />
            <GlobalButton
              name={'save'}
              label={'Salvar'}
              type="submit"
              icon={iSaving ? IconName.LOADING : undefined}
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
