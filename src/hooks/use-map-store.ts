import create from 'zustand';

import { Serialized } from '@/util/serialized';
import { IRegion } from '@/entities/region.entity';

export interface IMapStore {
  currentTimeframe: 1 | 6 | 12;
  setCurrentTimeframe: (newTimeframe: 1 | 6 | 12) => void;
  currentRegion: Serialized<Omit<IRegion, 'geojson'>> | null;
  setCurrentRegion: (
    region: Serialized<Omit<IRegion, 'geojson'>> | null
  ) => void;
}

export const useMapStore = create<IMapStore>((set) => ({
  currentTimeframe: 1,
  setCurrentTimeframe: (newTimeFrame) =>
    set(() => ({ currentTimeframe: newTimeFrame })),
  currentRegion: null,
  setCurrentRegion: (newRegion) => set(() => ({ currentRegion: newRegion })),
}));
