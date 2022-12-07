import React from "react";
import {EmailPortal, PortalProps} from "./Portal";
import {Input, TextArea} from "../components/Input";

const Email: React.FC<PortalProps> = ({ className, style, close, onClose }) => {
  return (
    <EmailPortal close={close}>
      <div className={"z-1000 flex justify-between w-full m-auto max-w-contents items-center"}>
        <article className={"max-w-[555px] w-[38.54vw] bg-white flex flex-col mt-2vw md-2vmax pt-8 p-7"}>
          <span className={"font-genshin"}>E-mail 보내기</span>
          <span className={"w-full h-px rounded-full bg-emailBg mt-4"} />
          <Input
            className={"mt-8"}
            legend={"제목"}
            placeholder={"제목을 입력하세요.(필수)"} />
          <TextArea
            className={"mt-8"}
            legend={"내용"}
            placeholder={"본문을 입력하세요."} />
        </article>
        <article className={"max-w-[555px] w-[38.54vw] bg-white flex flex-col mt-2vw md-2vmax pt-8 p-7"}>

        </article>
      </div>
    </EmailPortal>
  )
}

export default Email;