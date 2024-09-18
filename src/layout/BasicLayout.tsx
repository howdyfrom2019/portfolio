import Audio from '@/components/audio';
import Button from '@/components/Button';
import Progress from '@/components/Progress';
import {
  useCheckModalOpenedDispatch,
  useZProgressState,
} from '@/store/context';
import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  audioCallback?: (playing?: boolean) => void;
  audioVal?: boolean;
}

const BasicLayout: React.FC<LayoutProps> = ({
  children,
  audioCallback,
  audioVal,
}) => {
  const navigator = useNavigate();
  const params = useParams<{ page: string }>();
  const state = useZProgressState();
  const modalDispatch = useCheckModalOpenedDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  const audioHandler = useCallback(() => {
    audioCallback && audioCallback(!audioVal);
  }, [audioCallback, audioVal]);

  const checkModalOpened = useCallback(() => {
    console.log(openMenu, openEmail);
    modalDispatch({ type: 'change', isOpened: openMenu || openEmail });
  }, [modalDispatch, openEmail, openMenu]);

  const toggleMenu = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setOpenMenu((prev) => !prev);
  }, []);

  const toggleEmail = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setOpenEmail((prev) => !prev);
  }, []);

  useLayoutEffect(() => {
    checkModalOpened();
  }, [openMenu, openEmail]);

  return (
    <div className={'fixed top-0 flex h-screen w-screen flex-col p-11'}>
      <div className={'relative z-10 h-full w-full mix-blend-difference'}>
        <div
          className={
            'absolute left-0 top-0 flex w-full items-center justify-between'
          }
        >
          <span
            className={
              'cursor-pointer font-genshin text-sm uppercase text-white'
            }
          >
            Project: Awesome Project
          </span>
          <div className={'flex gap-1vw'}>
            <Audio callback={audioHandler} isInitialPlaying={audioVal} />
            <Button
              className={'cursor-pointer text-white'}
              onClick={toggleMenu}
            >
              Menu
            </Button>
          </div>
        </div>
        <div
          className={
            'absolute bottom-0 left-0 flex w-full items-end justify-between'
          }
        >
          <div className={'flex cursor-pointer flex-col'} onClick={toggleEmail}>
            <span className={'font-serif text-5xl text-white'}>Russel.dev</span>
            <span className={'font-serif text-base tracking-wide text-white'}>
              i_am_in_the_joo@/naver.com
            </span>
          </div>
          <button
            className={
              'cursor-pointer bg-none font-genshin text-sm text-white outline-0'
            }
          >
            Next Project →
          </button>
        </div>
        <Progress
          className={'absolute left-full top-1/2 h-5/6 w-1vw -translate-y-1/2'}
          progress={state.progress}
          startingOffset={0}
          points={3}
        />
      </div>
      {children}
      {/* <MenuPortal close={!openMenu}>
        <Menu
          onClose={toggleMenu}
          close={openMenu}
          scrollCallback={(y, page) => {
            if (page === params.page) {
              window.scrollTo({ top: y });
            } else navigator("/page/etcs", { state: { y: y } });
          }}
        />
      </MenuPortal> */}
      {/* <Email close={!openEmail} onClose={toggleEmail} /> */}
    </div>
  );
};

export default BasicLayout;
