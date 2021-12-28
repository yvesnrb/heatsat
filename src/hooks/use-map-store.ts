import create from 'zustand';

export interface IMapStore {
  currentTimeframe: 1 | 6 | 12;
  setCurrentTimeframe: (newTimeframe: 1 | 6 | 12) => void;
}

export const useMapStore = create<IMapStore>((set) => ({
  currentTimeframe: 1,
  setCurrentTimeframe: (newTimeFrame) =>
    set(() => ({ currentTimeframe: newTimeFrame })),
}));
