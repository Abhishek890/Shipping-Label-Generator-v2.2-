import React from 'react';
import { Trash2 } from 'lucide-react';

interface ClearAllButtonProps {
  onClear: () => void;
}

export function ClearAllButton({ onClear }: ClearAllButtonProps) {
  return (
    <button
      onClick={onClear}
      className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      Clear All
    </button>
  );
}