import React from 'react';

interface CareerReadinessGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  subtext?: string;
  career?: string;
  showDetails?: boolean;
}

export const CareerReadinessGauge: React.FC<CareerReadinessGaugeProps> = ({
  score,
  size = 130,
  strokeWidth = 10,
  subtext = 'Data Scientist',
  career,
  showDetails = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#0284C7"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight leading-none">
            {score}%
          </span>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-1">
            Readiness
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold w-fit border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            {career || subtext}
          </div>
          <h4 className="font-bold text-slate-800 text-base mt-1.5">
            Career Readiness
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            <span className="text-emerald-600 font-semibold">+8% this month</span> • On Track
          </p>
        </div>
      )}
    </div>
  );
};
