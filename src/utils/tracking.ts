import type { TrackingNumber } from '../types/address';

export function generateTrackingKey(addressId: string, tracking: TrackingNumber): string {
  return `${addressId}-${tracking.number}-${tracking.date}-${tracking.status}`;
}

export function isTrackingActive(tracking: TrackingNumber): boolean {
  return tracking.status === 'pending' || tracking.status === 'dispatched';
}

export function sortTrackingNumbers(trackingNumbers: TrackingNumber[]): TrackingNumber[] {
  return [...trackingNumbers].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}