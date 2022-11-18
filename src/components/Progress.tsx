import React, {CSSProperties, useEffect, useRef} from "react";
/**
 * @progress: let in 0 ~ 1 number;
 * @startingOffset: where the progress starts. start from 0, start from 1...;
 * @points: how many dots you need.;
 * @[caution]: when determine bg-color of dots, be careful with mix-blend-mode!
* */
interface ProgressProps {
  className?: string;
  style?: CSSProperties;
  progress: number;
  startingOffset: number;
  points: number;
}

const Progress: React.FC<ProgressProps> = ({ className, style, progress, startingOffset, points }) => {
  const progressRef = useRef<HTMLSpanElement>(null);
  const Dots: React.FC<{ isFilled?: boolean }> = ({ isFilled })=> {
    return (
      <span className={`w-0.5 h-0.5 rounded-full border border-white z-20 ${isFilled ? "bg-white" : "bg-black"}`} />
    );
  };
  
  useEffect(() => {
    if (progressRef.current) {
      const start = Math.ceil(((startingOffset) / points) * 100);
      progressRef.current.style.height = `calc(${start}% + ${progress * (100 / (points - 1))}%)`;
    }
  }, [points, progress, startingOffset]);

  return (
    <div className={`${className} ${"relative flex flex-col justify-between items-center"}`} style={style}>
      <span className={"absolute top-0 left-1/2 -translate-x-1/2 bg-gray h-full w-px rounded z-10"} />
      <span className={"absolute top-0 left-1/2 -translate-x-1/2 bg-gray w-px rounded z-10"} ref={progressRef} />
      {
        new Array(points).fill(0).map((_, i) => {
          return (i <= startingOffset) ? <Dots key={i} isFilled /> : <Dots key={i} isFilled={progress === 1} />
        })
      }
    </div>
  );
}

export default Progress;