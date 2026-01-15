import { useQuery } from '@tanstack/react-query';

export const usePressAllQuery = (view: 'list' | 'grid') =>
  useQuery({
    queryKey: ['press', 'all', view],
    queryFn: () => fetchAllPress(view),
    staleTime: 1000 * 60 * 5,
  });

export const usePressSubscribedQuery = (view: 'list' | 'grid') =>
  useQuery({
    queryKey: ['subscribedPresses', 'press', view],
    queryFn: () => fetchSubscribedPress(view),
    staleTime: 1000 * 60 * 5,
  });

// --- api ---
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

export const fetchRollingNews = async () => {
  const res = await fetch('/api/news/rolling');
  if (!res.ok) throw new Error('Failed to fetch rolling news');
  return res.json();
};
