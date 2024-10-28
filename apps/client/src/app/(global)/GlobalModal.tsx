import GlobalIcon, { IconName } from './GlobalIcon';

export default function GlobalModal({
  label,
  close,
  children,
}: {
  label?: string;
  close: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex bg-content-primary/[.06] p-3 backdrop-blur overflow-hidden">
      <div className="flex flex-col gap-[16px] m-auto bg-background-primary w-[347px] max-h-full p-3 rounded-[16px] overflow-auto hide-scrollbar">
        <div
          className={`flex gap-1 items-center p-3 text-xl ${
            label ? 'justify-between' : 'justify-end'
          } `}
        >
          {label && <h1 className="text-content-primary font-bold">{label}</h1>}
          <button name="close" onClick={close}>
            <GlobalIcon name={IconName.CLOSE} className="text-content-muted" />
          </button>
        </div>
        <hr className="border-border-primary/20" />
        {children}
      </div>
    </div>
  );
}
