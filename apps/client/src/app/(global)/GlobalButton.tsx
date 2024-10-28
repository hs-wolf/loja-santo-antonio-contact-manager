import GlobalIcon, { IconName } from './GlobalIcon';

export default function GlobalButton({
  name,
  label,
  type,
  theme,
  size,
  icon,
  action,
  className,
}: {
  name: string;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'primary' | 'secondary' | 'tertiary';
  size?: 'medium' | 'small';
  icon?: IconName;
  action?: () => void;
  className?: string;
}) {
  function buttonTheme() {
    switch (theme) {
      case 'primary':
        return 'bg-accent-brand hover:bg-accent-hover text-content-inverse';
      case 'secondary':
        return 'bg-background-tertiary hover:bg-background-primary text-content-primary';
      case 'tertiary':
        return 'border border-border-primary hover:bg-background-tertiary text-content-primary';
      default:
        return 'bg-accent-brand hover:bg-accent-hover text-content-inverse';
    }
  }

  function buttonSize() {
    switch (size) {
      case 'medium':
        return 'p-3 rounded-xl text-sm';
      case 'small':
        return 'p-2 rounded-lg text-xs';
      default:
        return 'p-3 rounded-xl text-sm';
    }
  }

  return (
    <button
      type={type ?? 'button'}
      name={name}
      className={`flex items-center justify-center gap-1 font-semibold whitespace-nowrap ${buttonTheme()} ${buttonSize()} ${className}`}
      onClick={action}
    >
      {icon && <GlobalIcon name={icon} />}
      {label}
    </button>
  );
}
