import React from "react";

const Audio: React.FC<{ isPlay?: boolean }> = ({ isPlay }) => {
  return (
    <div className={"flex items-center py-1vw px-2vw cursor-pointer transition-opacity"}>
      <span className={"h-1 w-1 mr-3 scale-200 animate-sound"} />
      <span className={"h-1 w-1 mr-3 scale-200 animate-sound"} />
      <span className={"h-1 w-1 mr-3 scale-200 animate-sound"} />
      <span className={"h-1 w-1 mr-3 scale-200 animate-sound"} />
      <span className={"h-1 w-1 mr-3 scale-200 animate-sound"} />
      <span className={"h-1 w-1 mr-3 scale-200 animate-sound"} />
    </div>
  )
}

export default Audio;