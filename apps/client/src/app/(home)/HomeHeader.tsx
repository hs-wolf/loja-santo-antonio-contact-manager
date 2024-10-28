import GlobalButton from '../(global)/GlobalButton';
import GlobalButtonIcon from '../(global)/GlobalButtonIcon';
import { IconName } from '../(global)/GlobalIcon';
import GlobalInputField from '../(global)/GlobalInputField';

export default function HomeHeader({
  unlockAll,
  addContact,
}: {
  unlockAll: () => void;
  addContact: () => void;
}) {
  return (
    <div className="flex items-center gap-[10px]">
      <h1 className="text-2xl font-bold whitespace-nowrap">
        Lista de contatos
      </h1>
      <div className="flex justify-end items-center gap-[10px] w-full">
        <GlobalInputField
          name={'search'}
          placeholder="Pesquisar"
          icon={IconName.SEARCH}
          className="w-full max-w-[321px]"
        />
        <GlobalButton
          name={'add-contact'}
          label={'+ Adicionar contato'}
          theme="secondary"
          action={addContact}
        />
        <GlobalButtonIcon
          name={'account'}
          icon={IconName.LOCK}
          active={false}
          theme="tertiary"
          size="small"
          action={unlockAll}
        />
      </div>
    </div>
  );
}
