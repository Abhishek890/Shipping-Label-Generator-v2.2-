import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function FormSection({ title, icon: Icon, children }: FormSectionProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}