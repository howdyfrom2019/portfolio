import React, {useState} from "react";
import {EmailPortal, PortalProps} from "./Portal";
import {Input, TextArea} from "../components/Input";
import Blob from "../components/Blob";
import Button from "../components/Button";

const Email: React.FC<PortalProps> = ({ className, style, close, onClose }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <EmailPortal close={close}>
      <div className={"z-1000 flex justify-between h-80vh w-full m-[auto] max-w-contents items-center"}>
        <div className={"max-w-[555px] w-[38.54vw] h-full bg-white flex flex-col mt-2vw md-2vmax pt-8 p-7"}>
          <span className={"font-genshin"}>E-mail 보내기</span>
          <span className={"w-full h-px rounded-full bg-emailBg mt-4"} />
          <Input
            className={"mt-8"}
            legend={"제목"}
            placeholder={"제목을 입력하세요.(필수)"}
            value={title}
            border
            onChange={(e) => setTitle(e.target.value)} />
          <TextArea
            className={"mt-8"}
            legend={"내용"}
            placeholder={"본문을 입력하세요."}
            value={desc}
            border
            onChange={(e) => setDesc(e.target.value)} />
          <Button className={"w-1/4 self-end mt-8"}>전송하기</Button>
        </div>
        <article className={"max-w-[555px] w-[38.54vw] h-full bg-white flex flex-col mt-2vw md-2vmax pt-8 p-7"}>
          <section className={"flex flex-col font-notoRegular"}>
            <Input
              className={"font-notoMedium text-2xl p-0"}
              readonly
              value={title}
              placeholder={"제목은 필수입니다."} />
            <div className={"flex flex-col mt-6"}>
              <div className={"flex gap-3 font-notoMedium items-center"}>
                <span>보낸 사람</span>
                <Blob className={"font-notoRegular"}>portfolio2022-ksj@gmail.com</Blob>
                <Button className={"pt-[2px!important] pb-[2px] px-3 font-notoMedium rounded-full text-gray"}>VIP</Button>
              </div>
              <div className={"flex gap-3 font-notoMedium mt-3 items-center"}>
                <span>받는 사람</span>
                <Blob className={"font-notoRegular"}>i_am_in_the_joo@naver.com</Blob>
              </div>
            </div>
            <span className={"text-sm text-blackTint mt-4"}>2022년 12월 7일 (수) 오전 12:00</span>
            <span className={"w-full rounded-full bg-emailBg h-px mt-6 mb-12"} />
            <TextArea
              className={"p-0"}
              placeholder={"본문이 비어있습니다."}
              value={desc}
              readonly
              fixHeight={"100%"} />
          </section>
        </article>
      </div>
    </EmailPortal>
  )
}

export default Email;