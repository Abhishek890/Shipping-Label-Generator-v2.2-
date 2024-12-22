export interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface ShippingData {
  from: Address;
  to: Address;
  id?: string;
  createdAt?: string;
  trackingNumber?: string;
  status: 'pending' | 'dispatched' | 'delivered';
}

export interface TrackingData {
  trackingNumber: string;
  timestamp: string;
  status: 'pending' | 'dispatched' | 'delivered';
  scannedBy?: string;
}