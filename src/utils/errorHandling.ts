import type { ErrorInfo } from 'react';

interface ErrorDetails {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

class ErrorHandler {
  private static instance: ErrorHandler;
  private errors: ErrorDetails[] = [];
  private readonly MAX_ERRORS = 50;

  private constructor() {
    this.setupGlobalHandlers();
  }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalHandlers(): void {
    if (typeof window !== 'undefined') {
      // Handle uncaught errors
      window.onerror = (msg, url, lineNo, columnNo, error) => {
        this.logError({
          message: error?.message || String(msg),
          stack: error?.stack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        });
        return false;
      };

      // Handle unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.logError({
          message: event.reason?.message || 'Unhandled Promise Rejection',
          stack: event.reason?.stack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        });
      });

      // Handle network errors
      this.interceptFetch();
    }
  }

  private interceptFetch(): void {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch.apply(window, args);
        if (!response.ok) {
          this.logError({
            message: `HTTP Error: ${response.status} ${response.statusText}`,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
          });
        }
        return response;
      } catch (error) {
        this.logError({
          message: `Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        });
        throw error;
      }
    };
  }

  logError(error: ErrorDetails): void {
    console.error('Application Error:', error);
    this.errors.unshift(error);
    
    // Keep only the last MAX_ERRORS errors
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.pop();
    }

    // Save to localStorage for persistence
    try {
      localStorage.setItem('app_errors', JSON.stringify(this.errors));
    } catch (e) {
      console.warn('Failed to save errors to localStorage:', e);
    }
  }

  logComponentError(error: Error, errorInfo: ErrorInfo): void {
    this.logError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }

  getErrors(): ErrorDetails[] {
    return [...this.errors];
  }

  clearErrors(): void {
    this.errors = [];
    try {
      localStorage.removeItem('app_errors');
    } catch (e) {
      console.warn('Failed to clear errors from localStorage:', e);
    }
  }
}

export const errorHandler = ErrorHandler.getInstance();