import { create } from 'zustand';

interface userIdState {
  userId: number;
  setUserId: (by: number) => void;
}

const useUserIdStore = create<userIdState>()((set) => ({
  userId: 0,
  setUserId: (newId: number) => set((state) => ({ userId: newId })),
}));

export default useUserIdStore;
