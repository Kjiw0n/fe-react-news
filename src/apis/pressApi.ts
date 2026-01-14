import type { PressData } from '@/constants/type';

export const fetchPressData = async (): Promise<PressData[]> => {
  const res = await fetch('/api/press-data');
  if (!res.ok) {
    throw new Error(`Failed to fetch press data: ${res.status}`);
  }
  return res.json();
};

export const fetchAllPress = async (view: 'list' | 'grid') => {
  const res = await fetch(`/api/press/all?view=${view}`);
  if (!res.ok) throw new Error('Failed to fetch all press data');
  return res.json();
};

export const fetchSubscribedPress = async (view: 'list' | 'grid') => {
  const res = await fetch(`/api/press/subscribed?view=${view}`);
  if (!res.ok) throw new Error('Failed to fetch subscribed press data');
  return res.json();
};
