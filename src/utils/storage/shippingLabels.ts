import type { ShippingData } from '../../types/shipping';
import { getItem, setItem, removeItem } from './localStorage';

const STORAGE_KEY = 'shipping_labels';

export function saveShippingLabel(data: ShippingData): void {
  const labels = getShippingLabels();
  const newLabel = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending' as const
  };
  
  labels.push(newLabel);
  setItem(STORAGE_KEY, labels);
}

export function getShippingLabels(): ShippingData[] {
  return getItem<ShippingData[]>(STORAGE_KEY) || [];
}

export function clearShippingLabels(): void {
  removeItem(STORAGE_KEY);
}

export function updateShippingLabel(id: string, updates: Partial<ShippingData>): void {
  const labels = getShippingLabels();
  const index = labels.findIndex(label => label.id === id);
  
  if (index !== -1) {
    labels[index] = { ...labels[index], ...updates };
    setItem(STORAGE_KEY, labels);
  }
}