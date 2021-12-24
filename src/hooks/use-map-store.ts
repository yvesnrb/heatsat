import create from 'zustand';

import { IDataPoint } from '@/entities/data-point.entity';

export interface IMapStore {
  markers: IDataPoint[];
  setMarkers: (markers: IDataPoint[]) => void;
}

export const useMapStore = create<IMapStore>((set) => ({
  markers: [],
  setMarkers: (markers: IDataPoint[]) => set(() => ({ markers })),
}));
