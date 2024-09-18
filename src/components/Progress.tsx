import { cn } from '@/lib/utils/tailwind-util';
import React, { CSSProperties, useEffect, useRef } from 'react';
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

const Dots: React.FC<{ isFilled?: boolean }> = ({ isFilled }) => {
  return (
    <span
      className={cn([
        `z-20 h-0.5 w-0.5 rounded-full border border-white bg-black`,
        isFilled && 'bg-white',
      ])}
    />
  );
};
const Progress: React.FC<ProgressProps> = ({
  className,
  style,
  progress,
  startingOffset,
  points,
}) => {
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      const start = Math.ceil((startingOffset / points) * 100);
      progressRef.current.style.height = `calc(${start}% + ${progress * (100 / (points - 1))}%)`;
    }
  }, [points, progress, startingOffset]);

  return (
    <div
      className={`${className} ${'relative flex flex-col items-center justify-between'}`}
      style={style}
    >
      <span
        className={
          'absolute left-1/2 top-0 z-10 h-full w-px -translate-x-1/2 rounded bg-gray'
        }
      />
      <span
        className={
          'absolute left-1/2 top-0 z-10 w-px-2 -translate-x-1/2 rounded bg-gray'
        }
        ref={progressRef}
      />
      {new Array(points).fill(0).map((_, i) => {
        return i <= startingOffset ? (
          <Dots key={i} isFilled />
        ) : (
          <Dots key={i} isFilled={i === startingOffset + 1 && progress === 1} />
        );
      })}
    </div>
  );
};

export default Progress;
