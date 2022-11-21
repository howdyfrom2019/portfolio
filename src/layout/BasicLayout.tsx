import React, {ReactNode, useCallback, useImperativeHandle} from "react";
import Button from "../components/Button";
import Audio from "../components/audio";
import Progress from "../components/Progress";
import {useZProgressState} from "../store/Context";

interface LayoutProps {
  children: ReactNode;
  audioCallback?: () => void;
}

const BasicLayout: React.FC<LayoutProps> = ({ children, audioCallback }) => {
  const state = useZProgressState();

  const audioHandler = useCallback(() => {
    audioCallback && audioCallback();
  }, [audioCallback]);

  return (
    <div className={"fixed top-0 w-screen h-screen flex flex-col p-11"}>
      <div className={"relative w-full h-full z-10 mix-blend-difference"}>
        <div className={"absolute top-0 left-0 w-full flex items-center justify-between"}>
          <span className={"font-genshin text-sm text-white uppercase cursor-pointer"}>Project: Fucking Awesome!</span>
          <div className={"flex gap-1vw"}>
            <Audio callback={audioHandler} />
            <Button className={"cursor-pointer text-white"}>Menu</Button>
          </div>
        </div>
        <div className={"absolute bottom-0 left-0 w-full flex items-end justify-between"}>
          <div className={"flex flex-col"}>
            <span className={"font-serif text-5xl text-white"}>Russel.dev</span>
            <span className={"font-serif text-base tracking-wide text-white"}>i_am_in_the_joo@naver.com</span>
          </div>
          <span className={"font-genshin text-sm cursor-pointer text-white"}>Next Project →</span>
        </div>
        <Progress className={"absolute top-1/2 left-full -translate-y-1/2 w-1vw h-5/6"} progress={state.progress} startingOffset={0} points={3} />
      </div>
      {children}
    </div>
  )
}

export default BasicLayout;