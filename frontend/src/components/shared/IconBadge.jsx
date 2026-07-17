import { ICON_OPTIONS, getIconColor } from '../IconGrid/IconOptions';
import { cn } from '@/lib/utils';

function IconBadge({ entry, size = 18, className }) {
  const iconName = entry?.icon_name || 'DefaultIcon';
  const Icon = ICON_OPTIONS[iconName]?.icon || ICON_OPTIONS.DefaultIcon.icon;
  const hex = getIconColor(iconName, 'hex');

  return (
    <span
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-lg',
        className
      )}
      style={{ backgroundColor: `${hex}1a`, color: hex }}
    >
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}

export default IconBadge;
