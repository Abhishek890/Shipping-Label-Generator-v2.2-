import React, { useState, useEffect } from 'react';
import { Bug, X, RefreshCw, Trash2 } from 'lucide-react';
import { errorHandler } from '../../utils/errorHandling';

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState(errorHandler.getErrors());

  useEffect(() => {
    const interval = setInterval(() => {
      setErrors(errorHandler.getErrors());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClearErrors = () => {
    errorHandler.clearErrors();
    setErrors([]);
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bug className="w-4 h-4" />
              Debug Information
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearErrors}
                className="p-1 hover:bg-gray-700 rounded"
                title="Clear Errors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setErrors(errorHandler.getErrors())}
                className="p-1 hover:bg-gray-700 rounded"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-700 rounded"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Application Info:</p>
              <div className="bg-gray-900 p-2 rounded text-xs">
                <p>Environment: {process.env.NODE_ENV}</p>
                <p>User Agent: {navigator.userAgent}</p>
                <p>Viewport: {window.innerWidth}×{window.innerHeight}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">Recent Errors ({errors.length}):</p>
              <div className="space-y-2 max-h-60 overflow-auto">
                {errors.map((error, index) => (
                  <div key={index} className="bg-gray-900 p-2 rounded text-xs">
                    <p className="text-red-400">{error.message}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(error.timestamp).toLocaleString()}
                    </p>
                    {error.stack && (
                      <pre className="mt-1 text-gray-400 overflow-x-auto">
                        {error.stack}
                      </pre>
                    )}
                  </div>
                ))}
                {errors.length === 0 && (
                  <p className="text-gray-500 text-center py-2">No errors recorded</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}