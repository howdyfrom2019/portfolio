import React, {ReactNode, useCallback, useState} from "react";
import Button from "../components/Button";
import Audio from "../components/audio";
import Progress from "../components/Progress";
import {useCheckModalOpenedDispatch, useZProgressState} from "../store/Context";
import {MenuPortal} from "../pages/Portal";
import Menu from "../components/Menu";
import {useNavigate, useParams} from "react-router-dom";
import Email from "../pages/Email";

interface LayoutProps {
  children: ReactNode;
  audioCallback?: () => void;
  audioVal?: boolean;
}

const BasicLayout: React.FC<LayoutProps> = ({ children, audioCallback, audioVal }) => {
  const navigator = useNavigate();
  const params = useParams<{ page: string }>();
  const state = useZProgressState();
  const modalDispatch = useCheckModalOpenedDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  const audioHandler = useCallback(() => {
    audioCallback && audioCallback();
  }, [audioCallback]);
  
  const checkModalOpened = useCallback(() => {
    modalDispatch({ type: "change", isOpened: openMenu && openEmail });
  }, [modalDispatch, openEmail, openMenu]);

  const toggleMenu = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setOpenMenu((prev) => !prev);
    checkModalOpened();
  }, [checkModalOpened]);

  const toggleEmail = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setOpenEmail((prev) => !prev);
    checkModalOpened();
  }, [checkModalOpened]);

  return (
    <div className={"fixed top-0 w-screen h-screen flex flex-col p-11"}>
      <div className={"relative w-full h-full z-10 mix-blend-difference"}>
        <div className={"absolute top-0 left-0 w-full flex items-center justify-between"}>
          <span className={"font-genshin text-sm text-white uppercase cursor-pointer"}>Project: Fucking Awesome!</span>
          <div className={"flex gap-1vw"}>
            <Audio callback={audioHandler} isInitialPlaying={audioVal} />
            <Button className={"cursor-pointer text-white"} onClick={toggleMenu}>Menu</Button>
          </div>
        </div>
        <div className={"absolute bottom-0 left-0 w-full flex items-end justify-between"}>
          <div className={"flex flex-col cursor-pointer"} onClick={toggleEmail}>
            <span className={"font-serif text-5xl text-white"}>Russel.dev</span>
            <span className={"font-serif text-base tracking-wide text-white"}>i_am_in_the_joo@naver.com</span>
          </div>
          <button className={"font-genshin text-sm cursor-pointer text-white outline-0 bg-none"}>Next Project →</button>
        </div>
        <Progress className={"absolute top-1/2 left-full -translate-y-1/2 w-1vw h-5/6"} progress={state.progress} startingOffset={0} points={3} />
      </div>
      {children}
      <MenuPortal close={!openMenu}>
        <Menu
          onClose={toggleMenu}
          close={openMenu}
          scrollCallback={(y, page) => {
            if (page === params.page) {
              window.scrollTo({ top: y });
            }
            else navigator("/page/etcs", { state: { y: y }});
          }} />
      </MenuPortal>
      <Email close={!openEmail} onClose={toggleEmail} />
    </div>
  )
}

export default BasicLayout;