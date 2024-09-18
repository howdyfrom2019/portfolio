import { cn } from '@/lib/utils/tailwind-util';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children?: ReactNode;
}
const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn([
        'cursor-pointer rounded-full border border-gray px-8 pb-3.5 pt-4 font-genshin',
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
