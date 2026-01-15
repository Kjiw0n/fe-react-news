import { create } from 'zustand';

interface SubscriptionStore {
  subscribedPresses: string[];
  setSubscribedPresses: (presses: string[]) => void;
  subscribe: (pressId: string) => void;
  unsubscribe: (pressId: string) => void;
  isSubscribed: (pressId: string) => boolean;
}

const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  subscribedPresses: [],
  setSubscribedPresses: (presses) => set({ subscribedPresses: presses }),
  subscribe: (pressId) =>
    set((state) => ({
      subscribedPresses: [...state.subscribedPresses, pressId],
    })),
  unsubscribe: (pressId) =>
    set((state) => ({
      subscribedPresses: state.subscribedPresses.filter((id) => id !== pressId),
    })),
  isSubscribed: (pressId) => get().subscribedPresses.includes(pressId),
}));

export default useSubscriptionStore;
