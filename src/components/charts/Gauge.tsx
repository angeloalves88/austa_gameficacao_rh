interface GaugeProps {
  value: number;
  max?: number;
  title: string;
  status: string;
  meta?: string;
}

export function Gauge({ value, max = 100, title, status, meta }: GaugeProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const rotation = -90 + (percentage / 100) * 180;
  const arcLength = Math.PI * 80;

  const getZoneColor = () => {
    if (value <= 40) return '#ef4444';
    if (value <= 70) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
      <h3 className="text-center text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">{title}</h3>
      <div className="relative mx-auto w-48 h-28 sm:w-64 sm:h-36 max-w-full">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Colored zone indicators - subtle background */}
          <path d="M 20 95 A 80 80 0 0 1 100 15" fill="none" stroke="#fecaca" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          <path d="M 100 15 A 80 80 0 0 1 180 95" fill="none" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          <path d="M 100 15 A 80 80 0 0 1 20 95" fill="none" stroke="#bbf7d0" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
          {/* Value arc */}
          <path
            d="M 20 95 A 80 80 0 0 1 180 95"
            fill="none"
            stroke={getZoneColor()}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * arcLength} ${arcLength}`}
          />
          {/* Needle */}
          <g transform={`rotate(${rotation} 100 95)`}>
            <line x1="100" y1="95" x2="100" y2="20" stroke={getZoneColor()} strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="95" r="8" fill={getZoneColor()} />
          </g>
        </svg>
      </div>
      <div className="text-center mt-1">
        <span className="text-2xl sm:text-3xl font-bold" style={{ color: getZoneColor() }}>{value}</span>
        <span className="text-slate-500 text-base sm:text-lg">/ {max}</span>
      </div>
      <p className="text-center text-slate-600 mt-1 text-xs sm:text-sm">
        Status: <span style={{ color: getZoneColor(), fontWeight: 600 }}>{status}</span>
        {meta && <> — {meta}</>}
      </p>
    </div>
  );
}
