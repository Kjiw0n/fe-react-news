import { TAB_VALUES } from '@/constants/type';
import { shuffle } from '@/lib/utils';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const usePressList = (activeTab: string, view: 'list' | 'grid') => {
  return useQuery({
    queryKey: [activeTab, 'press', view],
    queryFn: () => {
      if (activeTab === TAB_VALUES.ALL) {
        return fetchAllPress(view);
      }
      return fetchSubscribedPress(view);
    },

    select: (data) => {
      if (view === 'grid' && activeTab === TAB_VALUES.ALL) {
        return Array.isArray(data) ? shuffle(data).slice(0, 96) : [];
      }
      return data;
    },

    staleTime: 1000 * 60 * 5,
  });
};

export const useRollingNewsQuery = () =>
  useSuspenseQuery({
    queryKey: ['rollingNews'],
    queryFn: fetchRollingNews,
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
