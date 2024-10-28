import GlobalButton from '../(global)/GlobalButton';
import GlobalInputField from '../(global)/GlobalInputField';
import GlobalModal from '../(global)/GlobalModal';

export default function HomeModalUnlock({
  data,
  close,
  back,
  save,
}: {
  data: string[];
  close: () => void;
  back: () => void;
  save: (data: unknown[]) => void;
}) {
  function unlockData() {
    const data: unknown[] = [];
    save(data);
  }

  return (
    <GlobalModal close={close} label="Visualizar informações">
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col py-5 px-[16px]">
          <GlobalInputField
            name={'password'}
            label="Senha"
            placeholder="Digite sua senha"
          />
        </div>
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
            action={unlockData}
          />
        </div>
      </div>
    </GlobalModal>
  );
}
