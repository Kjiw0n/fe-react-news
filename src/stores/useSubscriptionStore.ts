import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SubscriptionStore {
  subscribedPresses: string[];
  subscribe: (pressId: string) => void;
  unsubscribe: (pressId: string) => void;
  isSubscribed: (pressId: string) => boolean;
}

const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscribedPresses: [],
      subscribe: (pressId) =>
        set((state) => ({
          subscribedPresses: [...state.subscribedPresses, pressId],
        })),
      unsubscribe: (pressId) =>
        set((state) => ({
          subscribedPresses: state.subscribedPresses.filter((id) => id !== pressId),
        })),
      isSubscribed: (pressId) => get().subscribedPresses.includes(pressId),
    }),
    {
      name: 'subscription-storage',
    }
  )
);

export default useSubscriptionStore;