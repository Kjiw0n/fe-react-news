import { create } from 'zustand';

interface SubscriptionStore {
  subscribedPressIds: string[];
  subscribe: (pressId: string) => void;
  unsubscribe: (pressId: string) => void;
  isSubscribed: (pressId: string) => boolean;
}

const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  subscribedPressIds: [],
  subscribe: (pressId) =>
    set((state) => ({
      subscribedPressIds: [...state.subscribedPressIds, pressId],
    })),
  unsubscribe: (pressId) =>
    set((state) => ({
      subscribedPressIds: state.subscribedPressIds.filter(
        (id) => id !== pressId,
      ),
    })),
  isSubscribed: (pressId) => get().subscribedPressIds.includes(pressId),
}));

export default useSubscriptionStore;
