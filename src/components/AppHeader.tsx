import React from 'react';
import { Printer } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Printer className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Shipping Label Generator</h1>
        </div>
      </div>
    </header>
  );
}