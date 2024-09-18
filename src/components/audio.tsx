import { cn } from '@/lib/utils/tailwind-util';
import React, {
  CSSProperties,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

interface AudioProps {
  className?: string;
  style?: CSSProperties;
  isInitialPlaying?: boolean;
  callback?: () => void;
}
const Audio: React.FC<AudioProps> = ({
  className,
  style,
  isInitialPlaying = false,
  callback,
}) => {
  const [isPlay, setIsPlay] = useState(false);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (callback) callback();
      setIsPlay((prev) => !prev);
    },
    [callback],
  );

  useLayoutEffect(() => {
    setIsPlay(isInitialPlaying);
  }, [isInitialPlaying]);

  return (
    <div
      className={`${className} flex cursor-pointer items-center px-2vw py-1vw transition-opacity`}
      style={style}
      onClick={toggle}
    >
      <span
        className={cn([
          `mr-1.5 h-px w-px scale-y-200 bg-white`,
          'animation-delay-600',
          isPlay && 'animate-sound',
        ])}
      />
      <span
        className={cn([
          `mr-1.5 h-px w-px scale-y-200 bg-white`,
          'animation-delay-1100',
          isPlay && 'animate-sound',
        ])}
      />
      <span
        className={cn([
          `mr-1.5 h-px w-px scale-y-200 bg-white`,
          'animation-delay-2000',
          isPlay && 'animate-sound',
        ])}
      />
      <span
        className={cn([
          `mr-1.5 h-px w-px scale-y-200 bg-white`,
          'animation-delay-1000',
          isPlay && 'animate-sound',
        ])}
      />
      <span
        className={cn([
          `mr-1.5 h-px w-px scale-y-200 bg-white`,
          'animation-delay-1500',
          isPlay && 'animate-sound',
        ])}
      />
      <span
        className={cn([
          `mr-1.5 h-px w-px scale-y-200 bg-white`,
          'animation-delay-600',
          isPlay && 'animate-sound',
        ])}
      />
    </div>
  );
};

export default Audio;
