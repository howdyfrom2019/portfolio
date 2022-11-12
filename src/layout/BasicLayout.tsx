import React, {ReactNode} from "react";
import Button from "../components/Button";

const BasicLayout: React.FC<{ children: ReactNode}> = ({ children}) => {

  return (
    <div className={"fixed top-0 w-screen h-screen flex flex-col p-11"}>
      <div className={"relative w-full h-full z-10"}>
        <div className={"absolute top-0 left-0 w-full flex items-center justify-between"}>
          <span className={"font-genshin text-sm uppercase cursor-pointer mix-blend-color"}>Project: Fucking Awesome!</span>
          <Button className={"cursor-pointer text-black mix-blend-color"}>Menu</Button>
        </div>
        <div className={"absolute bottom-0 left-0 w-full flex items-end justify-between"}>
          <div className={"flex flex-col"}>
            <span className={"font-serif text-5xl text-black mix-blend-color"}>Russel.dev</span>
            <span className={"font-serif text-base tracking-wide text-black mix-blend-color"}>i_am_in_the_joo@naver.com</span>
          </div>
          <span className={"font-genshin text-sm cursor-pointer text-black mix-blend-color"}>Next Project →</span>
        </div>
      </div>
      {children}
    </div>
  )
}

export default BasicLayout;