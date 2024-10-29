import GlobalIcon, { IconName } from './GlobalIcon';

export default function GlobalButtonIcon({
  name,
  icon,
  theme,
  size,
  active,
  action,
  className,
}: {
  name: string;
  icon: IconName;
  theme?: 'secondary' | 'tertiary';
  size?: 'medium' | 'small';
  active?: boolean;
  action?: () => void;
  className?: string;
}) {
  function buttonTheme() {
    switch (theme) {
      case 'secondary':
        return active
          ? 'bg-background-tertiary text-accent-brand'
          : 'bg-background-secondary text-content-muted hover:text-content-primary';
      case 'tertiary':
        return active
          ? 'border border-border-primary text-accent-brand'
          : 'border border-border-primary text-content-primary';
      default:
        return active
          ? 'bg-background-tertiary text-accent-brand'
          : 'bg-background-secondary text-content-muted hover:text-content-primary';
    }
  }

  function buttonSize() {
    switch (size) {
      case 'medium':
        return 'p-3 rounded-2xl text-2xl';
      case 'small':
        return 'p-2 rounded-lg text-xs';
      default:
        return 'p-3 rounded-2xl text-2xl';
    }
  }

  return (
    <button
      type="button"
      name={name}
      className={`flex items-center justify-center ${buttonSize()} ${buttonTheme()} ${className}`}
      onClick={action}
    >
      <GlobalIcon name={icon} />
    </button>
  );
}
