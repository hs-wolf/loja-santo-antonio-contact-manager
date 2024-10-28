import GlobalButton from '../(global)/GlobalButton';
import GlobalIcon, { IconName } from '../(global)/GlobalIcon';
import GlobalInputField from '../(global)/GlobalInputField';
import GlobalModal from '../(global)/GlobalModal';

export default function HomeModalAddContact({
  close,
  cancel,
  save,
}: {
  close: () => void;
  cancel: () => void;
  save: (data: unknown) => void;
}) {
  function addContact() {
    const data = undefined;
    save(data);
  }

  return (
    <GlobalModal close={close} label="Adicionar contato">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col py-5 px-[16px] gap-[16px]">
          <div className="flex flex-col items-center gap-3">
            <div className="flex justify-center items-center w-[64px] h-[64px] bg-background-secondary rounded-xl">
              <GlobalIcon
                name={IconName.ACCOUNT_CIRCLE}
                className="text-[40px] text-content-muted"
              />
            </div>
            <GlobalButton
              name={'add-image'}
              label={'Adicionar foto'}
              icon={IconName.ADD}
              theme="tertiary"
              size="small"
            />
          </div>
          <GlobalInputField
            name={'name'}
            label="Nome"
            placeholder="Nome do contato"
          />
          <GlobalInputField
            name={'phone'}
            label="Telefone"
            type="tel"
            placeholder="Número de telefone"
          />
          <GlobalInputField
            name={'email'}
            label="E-mail"
            type="email"
            placeholder="Email do contato"
          />
        </div>
        <hr className="border-border-primary/20" />
        <div className="flex justify-end gap-[13px] p-3">
          <GlobalButton
            name={'cancel'}
            label={'Cancelar'}
            theme="secondary"
            action={cancel}
          />
          <GlobalButton name={'save'} label={'Salvar'} action={addContact} />
        </div>
      </div>
    </GlobalModal>
  );
}
