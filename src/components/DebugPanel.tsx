import React from 'react';
import { Bug } from 'lucide-react';
import type { ShippingData } from '../types/shipping';

interface DebugPanelProps {
  data: ShippingData | null;
  isGenerating: boolean;
}

export function DebugPanel({ data, isGenerating }: DebugPanelProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
        title="Toggle Debug Panel"
      >
        <Bug className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 right-0 w-96 bg-gray-800 text-white p-4 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Bug className="w-4 h-4" />
            Debug Information
          </h3>
          
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-gray-400">PDF Generation Status:</p>
              <p className={isGenerating ? 'text-yellow-400' : 'text-green-400'}>
                {isGenerating ? 'Generating...' : 'Ready'}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Form Data:</p>
              <pre className="bg-gray-900 p-2 rounded text-xs overflow-auto max-h-48">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>

            <div>
              <p className="text-gray-400">Viewport Size:</p>
              <p>{window.innerWidth}px × {window.innerHeight}px</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}