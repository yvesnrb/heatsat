import { useCallback, ReactNode } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';

import { useUIStore } from '@/hooks/use-ui-store';

export interface IProps {
  children: ReactNode;
}

export function MainContainer(props: IProps): JSX.Element {
  const { children } = props;

  const isMainWindowOpen = useUIStore((state) => state.isMainWindowOpen);

  const closeMainWindow = useUIStore((state) => state.closeMainWindow);

  const handleMinimizeClick = useCallback(
    () => closeMainWindow(),
    [closeMainWindow]
  );

  const transition = useTransition(isMainWindowOpen, {
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

  return (
    <>
      {transition(
        (styles, show) =>
          show && (
            <animated.div
              className={`z-10 fixed rounded w-[800px] h-[750px] bg-foreground
              text-background px-7 py-5 ${
                !isMainWindowOpen && 'pointer-events-none'
              }`}
              style={styles}
            >
              <div className="flex justify-between items-center bg-foreground mb-1 border-b-2 border-accent-7 pb-4">
                <img src="/logo.svg" alt="Site Logo" className="h-[30px]" />

                <div
                  className="flex justify-center items-center p-3 rounded transition-all hover:cursor-pointer hover:bg-accent-6 bg-accent-7 text-background"
                  onClick={handleMinimizeClick}
                >
                  <FaChevronDown />
                </div>
              </div>

              {children}
            </animated.div>
          )
      )}

      {isMainWindowOpen && (
        <div className="z-0 backdrop-blur w-screen h-screen fixed blur"></div>
      )}
    </>
  );
}
