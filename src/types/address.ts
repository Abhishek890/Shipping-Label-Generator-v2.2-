export interface TrackingNumber {
  number: string;
  date: string;
  status: 'pending' | 'dispatched' | 'delivered';
}

export interface CustomerAddress {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  createdAt: string;
  lastUsed?: string;
  trackingNumbers?: TrackingNumber[];
}