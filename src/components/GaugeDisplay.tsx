import React from 'react';

interface GaugeDisplayProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  min: number;
  max: number;
  current: number;
  type: 'thermometer' | 'pixelBar' | 'progressBar' | 'block';
  warning?: boolean;
  showValue?: boolean;
  className?: string;
}

const GaugeDisplay: React.FC<GaugeDisplayProps> = ({
  icon,
  label,
  value,
  unit,
  min,
  max,
  current,
  type,
  warning = false,
  showValue = true,
  className = '',
}) => {
  const percentage = ((current - min) / (max - min)) * 100;

  const renderThermometer = () => (
    <div className={`bg-gray-800 rounded-lg p-3 flex flex-col items-center ${warning ? 'ring-1 ring-red-500' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={warning ? 'text-red-500' : 'text-blue-400'}>{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="h-48 w-12 relative bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute bottom-0 w-full transition-all duration-300 rounded-t-full
            ${warning ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ height: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="text-xl font-bold mt-2">
          {value}
          <span className="text-sm text-gray-400 ml-1">{unit}</span>
        </div>
      )}
    </div>
  );

  const renderPixelBar = () => {
    const segments = 70;
    const activeSegments = Math.floor((percentage / 100) * segments);
    return (
      <div className={`bg-gray-800 rounded-lg p-3 flex flex-col ${className}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={warning ? 'text-red-500' : 'text-blue-400'}>{icon}</span>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="w-full flex gap-1">
          {Array.from({ length: segments }).map((_, i) => {
            let color = 'bg-gray-700';
            if (i < activeSegments) {
              if (i < segments * 0.5) color = 'bg-green-500';
              else if (i < segments * 0.8) color = 'bg-yellow-500';
              else color = 'bg-red-500';
            }
            return (
              <div
                key={i}
                className={`flex-1 h-6 ${color} transition-colors duration-150`}
              />
            );
          })}
        </div>
        {showValue && (
          <div className="text-xl font-bold mt-2">
            {value}
            <span className="text-sm text-gray-400 ml-1">{unit}</span>
          </div>
        )}
      </div>
    );
  };

  const renderProgressBar = () => (
    <div className={`bg-gray-800 rounded-lg p-3 flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className={warning ? 'text-red-500' : 'text-blue-400'}>{icon}</span>
          <span className="text-sm font-medium">{label}</span>
        </div>
        {showValue && (
          <div className="text-xl font-bold">
            {value}
            <span className="text-sm text-gray-400 ml-1">{unit}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${warning ? 'bg-red-500' : 'bg-blue-500'} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
  

  const renderBlockDisplay = () => (
    <div className={`bg-gray-800 rounded-lg p-3 flex flex-col justify-center items-center ${warning ? 'ring-1 ring-red-500' : ''}`} style={{ height: '100%' }}>
      <div className="flex items-center gap-2 mb-2">
      <span className={warning ? 'text-red-500' : 'text-blue-400'}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold">
      {value}
      <span className="text-base text-gray-400 ml-1">{unit}</span>
      </div>
    </div>
  );

  switch (type) {
    case 'thermometer':
      return renderThermometer();
    case 'pixelBar':
      return renderPixelBar();
    case 'progressBar':
      return renderProgressBar();
    case 'block':
      return renderBlockDisplay();
    default:
      return null;
  }
};

export default GaugeDisplay;
