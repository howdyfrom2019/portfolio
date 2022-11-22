import React, {ReactNode, useState} from "react";
import checkEnv from "../utils/checkEnv";
import { ReactComponent as ScrollIcon } from "../assets/svg/mouse_scroll.svg";
import { ReactComponent as ScrollMobileIcon } from "../assets/svg/mobile_scroll.svg";
import { StageResize } from "../utils/stageResize";
import {standards} from "../styles/standards";

const MouseAnimation = () => {
  return (
    <div className={"relative w-16 h-32 lg:rounded-full border-black border-1 md:rounded-2xl transition-all "}>
      <span className={"absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-black rounded-full animate-scroll"} />
    </div>
  )
}

const ScrollNoti = () => {
  // const [scrollImage, setScrollImage] = useState<ReactNode>(<ScrollIcon />);
  StageResize(() => {
    // if (checkEnv() === "mobile") {
    //   setScrollImage(<ScrollMobileIcon/>);
    // } else {
    //   if (window.innerWidth <= standards.mobile) setScrollImage(<ScrollMobileIcon />);
    //   else setScrollImage(<ScrollIcon />);
    // }
  });

  return (
    <figure className={"absolute top-0 left-1/2 -translate-x-1/2 h-screen flex flex-col gap-9 items-center z-10"}>
      <span className={"bg-black w-px flex-1"} />
      <MouseAnimation />
      <span className={"bg-black w-px flex-1"} />
    </figure>
  );
}

export default ScrollNoti;