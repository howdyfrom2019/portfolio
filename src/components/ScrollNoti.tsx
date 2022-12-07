import React from "react";

const MouseAnimation = () => {
  return (
    <div className={"relative w-16 h-32 lg:rounded-full border-black border-1 md:rounded-2xl transition-all "}>
      <span className={"absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-black rounded-full animate-scroll"} />
    </div>
  )
}

const ScrollNoti = () => {
  return (
    <figure className={"absolute top-0 left-1/2 -translate-x-1/2 h-screen flex flex-col gap-9 items-center z-10"}>
      <span className={"bg-black w-px flex-1"} />
      <MouseAnimation />
      <span className={"bg-black w-px flex-1"} />
    </figure>
  );
}

export default ScrollNoti;