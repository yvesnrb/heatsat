import { useCallback } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';

import { useUIStore } from '@/hooks/use-ui-store';
import { useMapStore } from '@/hooks/use-map-store';

export function RegionNav(): JSX.Element {
  const isRegionNavOpen = useUIStore((state) => state.isRegionNavOpen);

  const openMainWindow = useUIStore((state) => state.openMainWindow);

  const setCurrentRegion = useMapStore((store) => store.setCurrentRegion);

  const currentRegion = useMapStore((store) => store.currentRegion);

  const setMainWindowAnimation = useUIStore(
    (state) => state.setMainWindowAnimation
  );

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

            <p>13 heat readings this month. Up from last month.</p>
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
