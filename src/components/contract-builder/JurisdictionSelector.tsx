import React from 'react';
import { Globe } from 'lucide-react';

interface JurisdictionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const JURISDICTIONS = {
  'North America': ['USA', 'Canada'],
  'Europe': ['UK', 'EU', 'Germany', 'France'],
  'Asia Pacific': ['Singapore', 'Hong Kong', 'Japan'],
  'Middle East': ['UAE', 'Saudi Arabia'],
};

export const JurisdictionSelector: React.FC<JurisdictionSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Globe className="w-5 h-5 text-blue-400" />
        <label className="block text-sm font-medium text-gray-300">
          Select Jurisdiction
        </label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(JURISDICTIONS).map(([region, countries]) => (
          <div key={region} className="bg-slate-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-3">{region}</h4>
            <div className="space-y-2">
              {countries.map((country) => (
                <label
                  key={country}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="jurisdiction"
                    value={country}
                    checked={value === country}
                    onChange={(e) => onChange(e.target.value)}
                    className="text-blue-500 bg-slate-600 border-slate-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {country}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};