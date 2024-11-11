import React from 'react';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-800 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Display Units</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <span>Temperature</span>
                <select className="bg-gray-700 rounded px-2 py-1">
                  <option>Celsius</option>
                  <option>Fahrenheit</option>
                </select>
              </label>
              <label className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <span>Pressure</span>
                <select className="bg-gray-700 rounded px-2 py-1">
                  <option>Bar</option>
                  <option>PSI</option>
                </select>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Warning Thresholds</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <span>Oil Temperature</span>
                <input
                  type="number"
                  className="bg-gray-700 rounded px-2 py-1 w-20"
                  defaultValue="110"
                />
              </label>
              <label className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <span>AFR Warning Range</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="bg-gray-700 rounded px-2 py-1 w-20"
                    defaultValue="14.0"
                  />
                  <input
                    type="number"
                    className="bg-gray-700 rounded px-2 py-1 w-20"
                    defaultValue="15.0"
                  />
                </div>
              </label>
              <label className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <span>Intake Temp Warning</span>
                <input
                  type="number"
                  className="bg-gray-700 rounded px-2 py-1 w-20"
                  defaultValue="80"
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Display Configuration</h3>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <span>Brightness</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="80"
                  className="w-32"
                />
              </label>
              <label className="flex items-center justify-between p-2 bg-gray-800 rounded">
                <span>Update Frequency</span>
                <select className="bg-gray-700 rounded px-2 py-1">
                  <option>1 Hz</option>
                  <option>2 Hz</option>
                  <option>5 Hz</option>
                  <option>10 Hz</option>
                </select>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Presets</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((preset) => (
                <div key={preset} className="p-2 bg-gray-800 rounded">
                  <h4 className="font-medium mb-2">Preset {preset}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Name</span>
                      <input
                        type="text"
                        className="bg-gray-700 rounded px-2 py-1 w-32"
                        defaultValue={`Preset ${preset}`}
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Layout</span>
                      <select className="bg-gray-700 rounded px-2 py-1">
                        <option>Default</option>
                        <option>Compact</option>
                        <option>Extended</option>
                      </select>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;