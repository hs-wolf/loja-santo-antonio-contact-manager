import Image from 'next/image';
import GlobalButton from './(global)/GlobalButton';
import GlobalButtonIcon from './(global)/GlobalButtonIcon';
import { IconName } from './(global)/GlobalIcon';

export default function HomeListItem() {
  return (
    <div className="grid grid-cols-6 items-center p-3 border-b border-border-primary rounded">
      <div className="col-span-2 flex items-start gap-3">
        <Image
          src={'/images/profile-placeholder.jpg'}
          alt={'Profile'}
          width={44}
          height={44}
          className="rounded-xl"
        />
        <div className="flex flex-col text-sm">
          <p className="p-1">Primeiro nome</p>
          <p className="p-1">Colega</p>
        </div>
      </div>
      <p className="text-sm text-content-heading">(11) 1234-5678</p>
      <p className="col-span-2 text-sm text-content-heading">email@email.com</p>
      <div className="flex justify-end items-center gap-2">
        <GlobalButton
          name={'edit'}
          label={'Editar'}
          theme="tertiary"
          size="small"
          icon={IconName.EDIT}
        />
        <GlobalButtonIcon
          name={'lock'}
          icon={IconName.LOCK}
          theme="tertiary"
          size="small"
        />
        <GlobalButtonIcon
          name={'delete'}
          icon={IconName.DELETE}
          theme="tertiary"
          size="small"
        />
      </div>
    </div>
  );
}
