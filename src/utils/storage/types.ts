import type { CustomerAddress, TrackingNumber } from '../../types/address';

export interface StorageOperation<T> {
  get(): T[];
  save(data: T): void;
  clear(): void;
  delete(id: string): void;
  update(id: string, data: Partial<T>): void;
}

export interface AddressStorage extends StorageOperation<CustomerAddress> {
  addTracking(addressId: string, trackingNumber: string): void;
  updateTrackingStatus(addressId: string, trackingNumber: string, status: TrackingNumber['status']): void;
}