import React, {useCallback, useState} from "react";

const Audio = () => {
  const [isPlay, setIsPlay] = useState(true);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsPlay((prev) => !prev);
  }, []);

  return (
    <div className={"flex items-center py-1vw px-2vw cursor-pointer transition-opacity"} onClick={toggle}>
      <span className={`h-px w-px mr-1.5 scale-y-200 bg-white ${isPlay && "animate-sound"} animation-delay-600`} />
      <span className={`h-px w-px mr-1.5 scale-y-200 bg-white ${isPlay && "animate-sound"} animation-delay-1100`} />
      <span className={`h-px w-px mr-1.5 scale-y-200 bg-white ${isPlay && "animate-sound"} animation-delay-2000`} />
      <span className={`h-px w-px mr-1.5 scale-y-200 bg-white ${isPlay && "animate-sound"} animation-delay-1000`} />
      <span className={`h-px w-px mr-1.5 scale-y-200 bg-white ${isPlay && "animate-sound"} animation-delay-1500`} />
      <span className={`h-px w-px mr-1.5 scale-y-200 bg-white ${isPlay && "animate-sound"} animation-delay-600`} />
    </div>
  )
}

export default Audio;