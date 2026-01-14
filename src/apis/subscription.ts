export const unsubscribePress = async (pressName: string) => {
  const res = await fetch(`/api/subscription?pressName=${pressName}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to unsubscribe from press');
  return res.json();
};

export const subscribePress = async (pressName: string) => {
  const res = await fetch(`/api/subscription?pressName=${pressName}`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to subscribe to press');
  return res.json();
};

export const getSubscribedPresses = async () => {
  const res = await fetch('/api/subscription', { method: 'GET' });
  if (!res.ok) throw new Error('Failed to fetch subscribed press names');
  return res.json();
};
