import React from 'react';
import { Sparkles } from 'lucide-react';

interface FeatureHighlightProps {
  title: string;
  description: string;
  className?: string;
}

export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  title,
  description,
  className = '',
}) => {
  return (
    <div className={`bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-lg ${className}`}>
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <span className="text-blue-400 font-medium">{title}</span>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};