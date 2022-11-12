import React, {ReactNode} from "react";
import Button from "../components/Button";

const BasicLayout: React.FC<{ children: ReactNode}> = ({ children}) => {

  return (
    <div className={"fixed top-0 w-screen h-screen flex flex-col p-11"}>
      <div className={"relative w-full h-full"}>
        <div className={"absolute top-0 left-0 w-full flex items-center justify-between"}>
          <span className={"font-genshin text-sm uppercase cursor-pointer"}>Project: Fucking Awesome!</span>
          <Button className={"cursor-pointer"}>Menu</Button>
        </div>
        <div className={"absolute bottom-0 left-0 w-full flex items-end justify-between"}>
          <div className={"flex flex-col"}>
            <span className={"font-serif text-5xl"}>Russel.dev</span>
            <span className={"font-serif text-base tracking-wide"}>i_am_in_the_joo@naver.com</span>
          </div>
          <span className={"font-genshin text-sm cursor-pointer"}>Next Project →</span>
        </div>
      </div>
      {children}
    </div>
  )
}

export default BasicLayout;