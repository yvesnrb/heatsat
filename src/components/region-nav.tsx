import { useCallback, useMemo } from 'react';
import { FaChevronDown, FaSpinner } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';
import useSWR from 'swr';

import { useUIStore } from '@/hooks/use-ui-store';
import { useMapStore } from '@/hooks/use-map-store';
import { Serialized } from '@/util/serialized';
import { IExecuteResponse as IStats } from '@/services/find-region-stats.service';
import { fetcher } from '@/util/fetcher';

export function RegionNav(): JSX.Element {
  const isRegionNavOpen = useUIStore((state) => state.isRegionNavOpen);

  const openMainWindow = useUIStore((state) => state.openMainWindow);

  const setCurrentRegion = useMapStore((store) => store.setCurrentRegion);

  const currentRegion = useMapStore((store) => store.currentRegion);

  const { data: stats } = useSWR<Serialized<IStats>>(
    () => (currentRegion ? `/api/regions/${currentRegion._id}/stats` : false),
    fetcher
  );

  const setMainWindowAnimation = useUIStore(
    (state) => state.setMainWindowAnimation
  );

  const statsString = useMemo<string | null>(() => {
    if (!stats) return null;
    if (stats.thisMonth > stats.lastMonth)
      return `${stats.thisMonth} heat readings this month. Up from last month.`;

    if (stats.thisMonth < stats.lastMonth)
      return `${stats.thisMonth} heat readings this month. Down from last month.`;

    if (stats.thisMonth === stats.lastMonth)
      return `${stats.thisMonth} heat readings this month. Same as the last month.`;

    return null;
  }, [stats]);

  const handleReturnClick = useCallback(() => {
    setMainWindowAnimation('fromTop');
    setCurrentRegion(null);
    openMainWindow();
  }, [openMainWindow, setMainWindowAnimation, setCurrentRegion]);

  const transition = useTransition(isRegionNavOpen, {
    from: {
      opacity: 0,
      y: 20,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: 20,
    },
  });

  return transition(
    (styles, show) =>
      show && (
        <animated.div
          style={styles}
          className="flex justify-between items-center bg-foreground fixed top-5 w-[800px] px-7 py-3 rounded"
        >
          <div className="flex flex-col text-background">
            <p className="font-semibold">{currentRegion?.name}</p>

            {!statsString && (
              <div className="flex space-x-2 items-center">
                <FaSpinner className="animate-spin" />

                <p>Loading stats for this region...</p>
              </div>
            )}

            {statsString && <p>{statsString}</p>}
          </div>

          <div
            onClick={handleReturnClick}
            className="flex justify-center items-center p-3 rounded transition-all hover:cursor-pointer hover:bg-accent-6 bg-accent-7 text-background"
          >
            <FaChevronDown />
          </div>
        </animated.div>
      )
  );
}
