import React, { ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}
const Button: React.FC<ButtonProps> = ({
  className,
  children,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${className} cursor-pointer rounded-full border border-gray px-8 pb-3.5 pt-4 font-genshin`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
