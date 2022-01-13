import create from 'zustand';

export interface IUIStore {
  isMainWindowOpen: boolean;
  isMainNavOpen: boolean;
  isRegionNavOpen: boolean;
  mainWindowAnimation: 'fromBottom' | 'fromTop';
  openMainWindow: () => void;
  openMainNav: () => void;
  openRegionNav: () => void;
  setMainWindowAnimation: (direction: 'fromBottom' | 'fromTop') => void;
}

export const useUIStore = create<IUIStore>((set) => ({
  isMainWindowOpen: false,
  isMainNavOpen: true,
  isRegionNavOpen: false,
  mainWindowAnimation: 'fromBottom',
  openMainWindow: () =>
    set(() => ({
      isMainWindowOpen: true,
      isMainNavOpen: false,
      isRegionNavOpen: false,
    })),
  openMainNav: () =>
    set(() => ({
      isMainWindowOpen: false,
      isMainNavOpen: true,
      isRegionNavOpen: false,
    })),
  openRegionNav: () =>
    set(() => ({
      isMainWindowOpen: false,
      isMainNavOpen: false,
      isRegionNavOpen: true,
    })),
  setMainWindowAnimation: (direction: 'fromBottom' | 'fromTop') =>
    set(() => ({
      mainWindowAnimation: direction,
    })),
}));
