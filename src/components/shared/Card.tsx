import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'text-blue-400',
  children,
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`
        bg-slate-800 rounded-lg p-6
        ${onClick ? 'cursor-pointer hover:bg-slate-700 transition-colors' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(Icon || title || subtitle) && (
        <div className="flex items-center space-x-4 mb-4">
          {Icon && (
            <div className={`p-3 bg-slate-700 rounded-lg ${iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          {(title || subtitle) && (
            <div>
              {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};