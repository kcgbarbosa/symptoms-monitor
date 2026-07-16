import { ICON_OPTIONS, getIconColor } from './IconOptions';

function IconGrid({ selectedIcon, onSelectIcon }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {Object.keys(ICON_OPTIONS).map((iconName) => {
        const Icon = ICON_OPTIONS[iconName].icon;
        const iconColor = getIconColor(iconName, 'tailwind');
        const isSelected = selectedIcon === iconName;

        return (
          <button
            key={iconName}
            type="button"
            aria-pressed={isSelected}
            aria-label={iconName}
            className={`
              flex flex-col
              p-4
              items-center
              justify-center
              border rounded-xl
              transition-all duration-150
              hover:scale-105 active:scale-95
              ${
                isSelected
                  ? 'bg-primary/10 border-primary'
                  : 'bg-background border-border hover:border-muted-foreground/40'
              }
            `}
            onClick={() => onSelectIcon(iconName)}
          >
            <Icon className={`${iconColor}`} size={32} strokeWidth={2.5} />
          </button>
        );
      })}
    </div>
  );
}

export default IconGrid;
