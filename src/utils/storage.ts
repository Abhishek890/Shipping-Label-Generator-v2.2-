import type { ShippingData } from '../types/shipping';

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(labels));
}

export function getShippingLabels(): ShippingData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from storage:', error);
    return [];
  }
}

export function clearShippingLabels(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function updateShippingLabel(id: string, updates: Partial<ShippingData>): void {
  const labels = getShippingLabels();
  const index = labels.findIndex(label => label.id === id);
  
  if (index !== -1) {
    labels[index] = { ...labels[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(labels));
  }
}