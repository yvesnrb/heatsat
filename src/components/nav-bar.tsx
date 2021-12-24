import { useCallback } from 'react';
import { FaExpandAlt } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';

import { useUIStore } from '@/hooks/use-ui-store';

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
          <img src="/logo.svg" alt="Site Logo" className="h-[30px]" />

          <div
            onClick={handleMaximizeClick}
            className="flex justify-center items-center p-2 text-accent-2 border-solid border-accent-2 border-2 rounded transition-all hover:text-foreground hover:bg-accent-2 hover:cursor-pointer"
          >
            <FaExpandAlt />
          </div>
        </animated.div>
      )
  );
}
