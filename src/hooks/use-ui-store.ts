import create from 'zustand';

export interface IUIStore {
  isMainWindowOpen: boolean;
  toggleMainWindow: () => void;
  openMainWindow: () => void;
  closeMainWindow: () => void;
}

export const useUIStore = create<IUIStore>((set) => ({
  isMainWindowOpen: true,
  toggleMainWindow: () =>
    set((state) => ({ isMainWindowOpen: !state.isMainWindowOpen })),
  openMainWindow: () => set(() => ({ isMainWindowOpen: true })),
  closeMainWindow: () => set(() => ({ isMainWindowOpen: false })),
}));
