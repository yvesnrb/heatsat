import { useCallback } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';

import { useUIStore } from '@/hooks/use-ui-store';
import { TimeframeListbox } from '@/components/timeframe-listbox';

export function MainNav(): JSX.Element {
  const isMainNavOpen = useUIStore((state) => state.isMainNavOpen);

  const openMainWindow = useUIStore((state) => state.openMainWindow);

  const setMainWindowAnimation = useUIStore(
    (state) => state.setMainWindowAnimation
  );

  const handleMaximizeClick = useCallback(() => {
    setMainWindowAnimation('fromBottom');
    openMainWindow();
  }, [openMainWindow, setMainWindowAnimation]);

  const transition = useTransition(isMainNavOpen, {
    from: {
      opacity: 0,
      y: -20,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: -20,
    },
  });

  return transition(
    (styles, show) =>
      show && (
        <animated.div
          style={styles}
          className="flex justify-between items-center bg-foreground fixed bottom-5 w-[800px] px-7 py-3 rounded"
        >
          <img src="/logo-compact.svg" alt="Site Logo" className="h-[30px]" />

          <div className="flex space-x-3">
            <TimeframeListbox />

            <div
              onClick={handleMaximizeClick}
              className="flex justify-center items-center p-3 rounded transition-all hover:cursor-pointer hover:bg-accent-6 bg-accent-7 text-background"
            >
              <FaChevronUp />
            </div>
          </div>
        </animated.div>
      )
  );
}
