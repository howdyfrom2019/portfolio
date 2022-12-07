import React from "react";
import {EmailPortal, PortalProps} from "./Portal";

const Email: React.FC<PortalProps> = ({ className, style, close, onClose }) => {
  return (
    <EmailPortal close={close}>
      <div className={"z-1000 flex justify-between w-full m-auto max-w-contents items-center"}>
        <article className={"max-w-[555px] w-[38.54vw] bg-white flex flex-col mt-2vw md-2vmax pt-8 p-7"}>
          <span className={"font-genshin"}>E-mail 보내기</span>
          <span className={"w-full h-px rounded-full bg-emailBg mt-4"} />
        </article>
        <article className={"max-w-[555px] w-[38.54vw] bg-white flex flex-col mt-2vw md-2vmax pt-8 p-7"}>

        </article>
      </div>
    </EmailPortal>
  )
}

export default Email;