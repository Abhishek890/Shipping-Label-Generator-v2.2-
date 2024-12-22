import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  isLoading?: boolean;
}

export function Button({ 
  children, 
  icon: Icon, 
  isLoading, 
  className = '', 
  ...props 
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white font-medium transition-colors ${
        isLoading || props.disabled
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      } ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}