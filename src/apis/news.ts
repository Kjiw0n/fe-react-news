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
