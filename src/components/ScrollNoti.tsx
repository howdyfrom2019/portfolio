import React, {ReactNode, useState} from "react";
import checkEnv from "../utils/checkEnv";
import { ReactComponent as ScrollIcon } from "../assets/svg/mouse_scroll.svg";
import { ReactComponent as ScrollMobileIcon } from "../assets/svg/mobile_scroll.svg";
import { StageResize } from "../utils/stageResize";
import {standards} from "../styles/standards";

const ScrollNoti = () => {
  const [scrollImage, setScrollImage] = useState<ReactNode>(<ScrollIcon />);
  StageResize(() => {
    if (checkEnv() === "mobile") {
      setScrollImage(<ScrollMobileIcon/>);
    } else {
      if (window.innerWidth <= standards.mobile) setScrollImage(<ScrollMobileIcon />);
      else setScrollImage(<ScrollIcon />);
    }
  });

  return (
    <figure className={"absolute top-0 left-1/2 -translate-x-1/2 h-screen flex flex-col gap-7 items-center z-10"}>
      <span className={"bg-black w-px flex-1"} />
      {scrollImage}
      <span className={"bg-black w-px flex-1"} />
    </figure>
  );
}

export default ScrollNoti;