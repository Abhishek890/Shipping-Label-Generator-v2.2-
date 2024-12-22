import Quagga from 'quagga';
import type { QuaggaConfig } from './types';

export class QuaggaInitializer {
  private static instance: QuaggaInitializer;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): QuaggaInitializer {
    if (!QuaggaInitializer.instance) {
      QuaggaInitializer.instance = new QuaggaInitializer();
    }
    return QuaggaInitializer.instance;
  }

  async initialize(config: QuaggaConfig): Promise<void> {
    if (this.isInitialized) {
      await this.stop();
    }

    return new Promise((resolve, reject) => {
      try {
        Quagga.init(config, (err) => {
          if (err) {
            console.error("Failed to initialize Quagga:", err);
            reject(err);
            return;
          }
          this.isInitialized = true;
          resolve();
        });
      } catch (error) {
        console.error("Error during Quagga initialization:", error);
        reject(error);
      }
    });
  }

  async start(): Promise<void> {
    if (!this.isInitialized) {
      throw new Error("Quagga must be initialized before starting");
    }
    try {
      Quagga.start();
    } catch (error) {
      console.error("Error starting Quagga:", error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      Quagga.stop();
      this.isInitialized = false;
    } catch (error) {
      console.error("Error stopping Quagga:", error);
    }
  }

  onDetected(callback: (data: any) => void): void {
    Quagga.onDetected(callback);
  }

  offDetected(callback: (data: any) => void): void {
    Quagga.offDetected(callback);
  }

  onProcessed(callback: (data: any) => void): void {
    Quagga.onProcessed(callback);
  }

  offProcessed(callback: (data: any) => void): void {
    Quagga.offProcessed(callback);
  }
}