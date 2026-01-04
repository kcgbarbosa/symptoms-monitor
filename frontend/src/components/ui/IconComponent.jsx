import { ICON_OPTIONS, getIconColor } from '../IconPicker/IconOptions';

function IconComponent({ entry, size = 24, strokeWidth = 3 }) {

  const iconName = entry.icon_name || "DefaultIcon";
  const SelectedIcon = ICON_OPTIONS[iconName]?.icon || ICON_OPTIONS.DefaultIcon.icon;
  const iconColor = getIconColor(iconName, 'tailwind');

  return (
    <SelectedIcon 
      className={iconColor} 
      size={size} 
      strokeWidth={strokeWidth} 
    />
  );
}

export default IconComponent