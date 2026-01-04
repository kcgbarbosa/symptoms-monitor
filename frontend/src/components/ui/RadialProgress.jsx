
function RadialProgress({
  value,
  max = 10,
  sizeClass = 'size-40 sm:size-48',
  thickness = '0.75rem',
  colorClass = 'text-primary',
  hideInnerAfter = true,
}) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div
      className={`radial-progress ${colorClass} ${sizeClass} ${hideInnerAfter ? '[&::after]:hidden' : ''}`}
      style={{
        '--value': percentage,
        '--thickness': thickness,
      }}
      role="progressbar"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-7xl font-bold text-gray-900 tracking-tighter">{value}</div>
        <div className="text-xs sm:text-sm text-gray-600">out of {max}</div>
      </div>
    </div>
  );
}

export default RadialProgress;