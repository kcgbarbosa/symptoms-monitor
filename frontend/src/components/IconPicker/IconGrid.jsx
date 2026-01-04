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
            className={`
              flex flex-col 
              p-4
              items-center 
              justify-center
              border-2 rounded-2xl
              transition-all duration-150
              hover:scale-105 active:scale-95
              ${isSelected
                ? 'bg-primary/10 border-primary shadow-sm'
                : 'bg-base-100 border-transparent hover:border-base-300'
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