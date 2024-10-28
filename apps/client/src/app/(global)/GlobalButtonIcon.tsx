import GlobalIcon from './GlobalIcon';

export default function GlobalButton({
  name,
  icon,
  active,
  action,
  className,
}: {
  name: string;
  icon: string;
  active?: boolean;
  action?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      name={name}
      className={`flex items-center justify-center p-3 rounded-2xl text-xl ${
        active ? 'bg-background-tertiary' : 'bg-background-secondary'
      } ${className}`}
      onClick={action}
    >
      <GlobalIcon
        name={icon}
        className={active ? 'text-accent-brand' : 'text-content-muted'}
      />
    </button>
  );
}
