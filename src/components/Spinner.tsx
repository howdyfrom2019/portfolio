import { ReactComponent as SpinnerSVG } from '@/assets/svg/spinner.svg';
import { cn } from '@/lib/utils/tailwind-util';
import React, { CSSProperties } from 'react';

interface SpinnerProps {
  className?: string;
  style?: CSSProperties;
}

const Spinner: React.FC<SpinnerProps> = ({ className, style }) => {
  return (
    <>
      <SpinnerSVG
        className={cn([
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          className,
        ])}
        style={style}
      />
      <span
        className={
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 font-sans text-7xl uppercase'
        }
      >
        loading...
      </span>
    </>
  );
};

export default Spinner;
