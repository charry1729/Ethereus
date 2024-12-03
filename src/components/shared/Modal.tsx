import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-slate-900/75"
          onClick={onClose}
        />

        <div className={`relative inline-block w-full ${sizes[size]} p-6 overflow-hidden text-left align-middle transition-all transform bg-slate-800 rounded-lg shadow-xl`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <Button
              variant="ghost"
              size="sm"
              icon={X}
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <div className="mt-2">{children}</div>

          {footer && (
            <div className="mt-6 pt-6 border-t border-slate-700">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};