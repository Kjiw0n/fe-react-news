import type { PressData } from '@/constants/type';

export const fetchPressData = async (): Promise<PressData[]> => {
  const res = await fetch('/api/press-data');
  if (!res.ok) {
    throw new Error(`Failed to fetch press data: ${res.status}`);
  }
  return res.json();
};
