// import Blob from "@/components/Blob";
// import Button from "@/components/Button";
// import { Input, TextArea } from "@/components/Input";
// import useUserAgent from "@/lib/hooks/use-user-agent";
// import { EmailPortal, PortalProps } from "@/pages/Portal";
// import React, { useCallback, useRef, useState } from "react";

// const Email: React.FC<PortalProps> = ({ className, style, close, onClose }) => {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [email, setEmail] = useState("");
//   const formRef = useRef<HTMLFormElement>(null);
//   const { isDesktop } = useUserAgent();

//   const handleSubmit = useCallback(
//     async (e: React.FormEvent) => {
//       e.preventDefault();
//       if (title.trim().length === 0 || desc.trim().length === 0) return;
//       if (!formRef.current) return;
//       const data = await (
//         await fetch(
//           "https://script.google.com/macros/s/AKfycbz-Twy9HNRPG1685qJqwnYMTqSSHGdEO2XT8LuBuJ70TEooKL-DGbgE4FGikyEy-xIOiQ/exec",
//           {
//             method: "POST",
//             mode: "cors",
//             cache: "no-cache",
//             credentials: "same-origin",
//             body: new FormData(formRef.current),
//           }
//         )
//       ).json();
//       console.log(data);
//     },
//     [desc, title]
//   );

//   // TODO: email input 넣기
//   return (
//     <EmailPortal close={close} className={"overflow-y-scroll"}>
//       <span
//         className={
//           "absolute top-0 right-0 p-11 pt-8 text-2xl cursor-pointer z-1001"
//         }
//         onClick={(e) => {
//           e.preventDefault();
//           onClose && onClose();
//         }}
//       >
//         CLOSE
//       </span>
//       <div
//         className={
//           "z-1000 flex justify-between min-h-80vh h-fit w-full m-[auto] max-w-contents p-11"
//         }
//       >
//         <form
//           className={
//             "max-w-[555px] w-[38.54vw] h-full bg-white flex flex-col mt-2vw md-2vmax pt-8 p-7 md:max-w-full md:w-full"
//           }
//           ref={formRef}
//           name={"email-sheet"}
//         >
//           <span className={"font-genshin"}>Email 보내기</span>
//           <span className={"w-full h-px rounded-full bg-emailBg mt-4"} />
//           <Input
//             className={"mt-8"}
//             legend={"Your email"}
//             placeholder={"답장 받을 Email을 적어주세요."}
//             name={"email"}
//             value={email}
//             border
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Input
//             className={"mt-8"}
//             legend={"제목"}
//             placeholder={"제목을 입력하세요.(필수)"}
//             name={"title"}
//             value={title}
//             border
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <TextArea
//             className={"mt-8"}
//             legend={"내용"}
//             placeholder={"본문을 입력하세요."}
//             value={desc}
//             name={"message"}
//             border
//             onChange={(e) => setDesc(e.target.value)}
//           />
//           <Button
//             type={"submit"}
//             className={"w-1/3 self-end mt-8"}
//             onClick={handleSubmit}
//           >
//             전송하기
//           </Button>
//         </form>
//         {isDesktop && (
//           <article
//             className={
//               "max-w-[555px] w-[38.54vw] h-full bg-white flex flex-col mt-2vw md-2vmax pt-8 p-7"
//             }
//           >
//             <section className={"flex flex-col font-notoRegular"}>
//               <Input
//                 className={"font-notoMedium text-2xl p-0"}
//                 readonly
//                 value={title}
//                 placeholder={"제목은 필수입니다."}
//               />
//               <div className={"flex flex-col mt-6"}>
//                 <div className={"flex gap-3 font-notoMedium items-center"}>
//                   <span>보낸 사람</span>
//                   <Blob className={"font-notoRegular"}>
//                     {email || "portfolio2022-ksj@gmail.com"}
//                   </Blob>
//                   <Button
//                     className={
//                       "pt-[2px!important] pb-[2px] px-3 font-notoMedium rounded-full text-gray cursor-default"
//                     }
//                   >
//                     VIP
//                   </Button>
//                 </div>
//                 <div className={"flex gap-3 font-notoMedium mt-3 items-center"}>
//                   <span>받는 사람</span>
//                   <Blob className={"font-notoRegular"}>
//                     i_am_in_the_joo@naver.com
//                   </Blob>
//                 </div>
//               </div>
//               <span className={"text-sm text-blackTint mt-4"}>
//                 2022년 12월 7일 (수) 오전 12:00
//               </span>
//               <span
//                 className={"w-full rounded-full bg-emailBg h-px mt-6 mb-12"}
//               />
//               <TextArea
//                 className={"p-0"}
//                 placeholder={"본문이 비어있습니다."}
//                 value={desc}
//                 readonly
//                 autoHeight
//               />
//             </section>
//           </article>
//         )}
//       </div>
//     </EmailPortal>
//   );
// };

// export default Email;
