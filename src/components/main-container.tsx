import { useCallback, ReactNode } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SimpleBar from 'simplebar-react';

import { useUIStore } from '@/hooks/use-ui-store';

export interface IProps {
  children: ReactNode;
}

export function MainContainer(props: IProps): JSX.Element {
  const { children } = props;

  const isMainWindowOpen = useUIStore((state) => state.isMainWindowOpen);

  const mainWindowAnimation = useUIStore((state) => state.mainWindowAnimation);

  const setMainWindowAnimation = useUIStore(
    (state) => state.setMainWindowAnimation
  );

  const openMainNav = useUIStore((state) => state.openMainNav);

  const { pathname } = useRouter();

  const handleMinimizeClick = useCallback(() => {
    setMainWindowAnimation('fromBottom');
    openMainNav();
  }, [openMainNav, setMainWindowAnimation]);

  const transition = useTransition(isMainWindowOpen, {
    from: {
      opacity: 0,
      y: mainWindowAnimation === 'fromTop' ? -20 : 20,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: mainWindowAnimation === 'fromTop' ? -20 : 20,
    },
  });

  return (
    <>
      {transition(
        (styles, show) =>
          show && (
            <animated.div
              style={styles}
              className={`z-10 fixed ${
                !isMainWindowOpen && 'pointer-events-none'
              }`}
            >
              <SimpleBar
                className={`rounded w-[800px] h-[750px] bg-foreground
                text-background px-7 py-5 overflow-x-hidden overflow-y-auto`}
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

                <div className="flex items-center mb-8 space-x-1">
                  <Link href="/">
                    <a
                      className={`flex flex-1 justify-center p-1 rounded
                    transition-all hover:cursor-pointer hover:bg-accent-6
                    bg-accent-7 text-background ${
                      pathname === '/' && 'bg-accent-6'
                    }`}
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/regions">
                    <a
                      className={`flex flex-1 justify-center p-1 rounded
                    transition-all hover:cursor-pointer hover:bg-accent-6
                    bg-accent-7 text-background ${
                      pathname === '/regions' && 'bg-accent-6'
                    }`}
                    >
                      Regions
                    </a>
                  </Link>
                  <Link href="/info">
                    <a
                      className={`flex flex-1 justify-center p-1 rounded
                    transition-all hover:cursor-pointer hover:bg-accent-6
                    bg-accent-7 text-background ${
                      pathname === '/info' && 'bg-accent-6'
                    }`}
                    >
                      Info
                    </a>
                  </Link>
                  <Link href="/data">
                    <a
                      className={`flex flex-1 justify-center p-1 rounded
                    transition-all hover:cursor-pointer hover:bg-accent-6
                    bg-accent-7 text-background ${
                      pathname === '/data' && 'bg-accent-6'
                    }`}
                    >
                      Data
                    </a>
                  </Link>
                </div>

                {children}
              </SimpleBar>
            </animated.div>
          )
      )}

      {isMainWindowOpen && (
        <div className="z-0 backdrop-blur w-screen h-screen fixed blur"></div>
      )}
    </>
  );
}
