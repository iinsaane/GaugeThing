import React, { useState, useEffect } from 'react';
import { Settings, Gauge, Thermometer, Activity, Power, Menu, AlertTriangle } from 'lucide-react';
import GaugeDisplay from './components/GaugeDisplay';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);

  const [metrics, setMetrics] = useState({
    intakeTemp: 25,
    afr: 14.7,
    map: 1.0,
    boostPressure: 2,
    absLoad: 45,
    oilTemp: 90
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSettings) {
          setShowSettings(false);  // Close the menu if it's open
        } else {
          setSelectedPreset(0);    // Set preset to "All" if menu is not open
        }
      } else if (e.key === 'm') {
        setShowSettings(true);     // Open menu with "m" key
      } else if (e.key >= '1' && e.key <= '4' && !showSettings) {
        setSelectedPreset(parseInt(e.key));  // Map keys 1-4 to presets 1-4
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showSettings]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        intakeTemp: Math.max(0, Math.min(100, prev.intakeTemp + (Math.random() - 0.5) * 2)),
        afr: Math.max(10, Math.min(20, prev.afr + (Math.random() - 0.5) * 0.2)),
        map: Math.max(0, Math.min(2, prev.map + (Math.random() - 0.5) * 0.1)),
        boostPressure: Math.max(0, Math.min(2, prev.boostPressure + (Math.random() - 0.5) * 0.1)),
        absLoad: Math.max(0, Math.min(100, prev.absLoad + (Math.random() - 0.5) * 3)),
        oilTemp: Math.max(0, Math.min(150, prev.oilTemp + (Math.random() - 0.5)))
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[800px] h-[480px] bg-gray-900 text-white overflow-hidden flex flex-col">
      {showSettings ? (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      ) : (
        <>
          {/* Top Bar */}
          <div className="flex justify-between items-center p-2 border-b border-gray-800">
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  className={`px-3 py-1 rounded ${selectedPreset === num ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  onClick={() => setSelectedPreset(num)}
                >
                  {num === 0 ? 'All' : `P${num}`}
                </button>
              ))}
            </div>

            {/* Faults and Menu Buttons */}
            <div className="flex gap-2">
              <button
                className="p-2 rounded bg-gray-700 hover:bg-gray-600 flex items-center"
                onClick={() => {
                  // Add functionality for the "Faults" button here
                  console.log('Faults button clicked');
                }}
              >
                <AlertTriangle className="w-5 h-5" />
              </button>
              <button
                className="p-2 rounded bg-gray-700 hover:bg-gray-600"
                onClick={() => setShowSettings(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Display */}
          <div className="flex-1 grid grid-cols-12 gap-2 p-2">
            {/* Left side - Progress bars */}
            <div className="col-span-7 space-y-2">
              <div className="col-span-9 space-y-2 h-full flex flex-col">
                <GaugeDisplay
                  icon={<Activity className="w-5 h-5" />}
                  label="Air / Fuel Ratio"
                  value={metrics.afr.toFixed(1)}
                  unit="λ"
                  min={10}
                  max={20}
                  current={metrics.afr}
                  type="progressBar"
                  warning={metrics.afr < 14 || metrics.afr > 15}
                />

                {/* 3x2 block-style gauge grid */}
                <div className="grid grid-cols-3 gap-2 flex-1">
                  {[['Boost', 'bar'], ['Manifold pressure', 'bar'], ['Batt', 'V'], ['N/A', 'bar'], ['N/A', 'bar'], ['Max speed', 'km/h']].map((gauge, index) => (
                    <GaugeDisplay
                      key={index}
                      icon={<Gauge className="w-5 h-5" />}
                      label={`${gauge[0]}`}
                      value={(metrics.boostPressure * (index + 1)).toFixed(2)} // Example values
                      unit={gauge[1] || ''}
                      min={0}
                      max={2}
                      current={metrics.boostPressure * (index + 1)}
                      type="block"
                      className="h-full" // Ensures the block gauges fill up available space
                    />
                  ))}
                </div>
              </div>
            </div>


            {/* Right side - Thermometers */}
            <div className="col-span-4 flex gap-2 justify-end">
              <GaugeDisplay
                icon={<Thermometer className="w-5 h-5" />}
                label="Intake"
                value={metrics.intakeTemp.toFixed(1)}
                unit="°C"
                min={0}
                max={100}
                current={metrics.intakeTemp}
                type="thermometer"
                warning={metrics.intakeTemp > 80}
              />
              <GaugeDisplay
                icon={<Thermometer className="w-5 h-5" />}
                label="Oil"
                value={metrics.oilTemp.toFixed(1)}
                unit="°C"
                min={0}
                max={150}
                current={metrics.oilTemp}
                type="thermometer"
                warning={metrics.oilTemp > 110}
              />
              <GaugeDisplay
                icon={<Thermometer className="w-5 h-5" />}
                label="Oil"
                value={metrics.oilTemp.toFixed(1)}
                unit="°C"
                min={0}
                max={150}
                current={metrics.oilTemp}
                type="thermometer"
                warning={metrics.oilTemp > 110}
              />
            </div>

            {/* Bottom - absolute load */}
            <div className="col-span-12">
              <GaugeDisplay
                icon={<Power className="w-5 h-5" />}
                label="Load"
                value={metrics.absLoad.toFixed(1)}
                unit="%"
                min={0}
                max={100}
                current={metrics.absLoad}
                type="pixelBar"
                showValue={false}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
