'use client';

import { contacts as Contact } from '@prisma/client';
import Image from 'next/image';
import GlobalButton from '../(global)/GlobalButton';
import GlobalButtonIcon from '../(global)/GlobalButtonIcon';
import { IconName } from '../(global)/GlobalIcon';
import { deletecontact } from './actions';
import { useState } from 'react';

export default function HomeListItem({
  contact,
  change,
  unlock,
}: {
  contact: Contact;
  change: (id: string) => void;
  unlock: (id: string) => void;
}) {
  const [iRemoving, setRemoving] = useState<boolean>(false);

  async function remove() {
    try {
      if (iRemoving) {
        return;
      }
      setRemoving(true);
      await deletecontact(contact.id);
      location.reload();
      close();
    } catch (error) {
      console.log(error);
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="grid grid-cols-6 items-center p-3 border-b border-border-primary rounded last:border-none">
      <div className="col-span-2 flex items-start gap-3">
        <Image
          src={'/images/profile-placeholder.jpg'}
          alt={'Profile'}
          width={44}
          height={44}
          className="rounded-xl"
        />
        <div className="flex flex-col text-sm">
          <p className="p-1">{contact.name}</p>
          <p className="p-1">**********************</p>
        </div>
      </div>
      <p className="text-sm text-content-heading">
        {contact.encrypted ? '***********' : contact.phone}
      </p>
      <p className="col-span-2 text-sm text-content-heading">
        {contact.encrypted ? '**********************' : contact.email}
      </p>
      <div className="flex justify-end items-center gap-2">
        <GlobalButton
          name={'edit'}
          label={'Editar'}
          theme="tertiary"
          size="small"
          icon={IconName.EDIT}
          action={() => change(contact.id)}
        />
        <GlobalButtonIcon
          name={'lock'}
          icon={IconName.LOCK}
          theme="tertiary"
          size="small"
          action={() => unlock(contact.id)}
        />
        <GlobalButtonIcon
          name={'delete'}
          icon={IconName.DELETE}
          theme="tertiary"
          size="small"
          action={remove}
        />
      </div>
    </div>
  );
}
