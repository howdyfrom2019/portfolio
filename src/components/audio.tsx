import React, {CSSProperties, useCallback, useState} from "react";

interface AudioProps {
  className?: string;
  style?: CSSProperties;
  isInitialPlaying?: boolean;
  callback?: () => void;
}
const Audio: React.FC<AudioProps> = ({ className, style, isInitialPlaying = true, callback }) => {
  const [isPlay, setIsPlay] = useState(isInitialPlaying);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (callback) callback();
    setIsPlay((prev) => !prev);
  }, [callback]);

  return (
    <div className={`${className} flex items-center py-1vw px-2vw cursor-pointer transition-opacity`} style={style} onClick={toggle}>
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