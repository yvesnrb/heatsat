import { useCallback } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';

import { useUIStore } from '@/hooks/use-ui-store';
import { ListBox } from '@/components/listbox';

export function NavBar(): JSX.Element {
  const isMainWindowOpen = useUIStore((state) => state.isMainWindowOpen);

  const openMainWindow = useUIStore((state) => state.openMainWindow);

  const handleMaximizeClick = useCallback(
    () => openMainWindow(),
    [openMainWindow]
  );

  const transition = useTransition(!isMainWindowOpen, {
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

          <div className="flex">
            <ListBox />

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
