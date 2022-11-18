import React, { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}
const Button: React.FC<ButtonProps> = ({ className, children, onClick }) => {
  return (
    <button className={ `${className} font-genshin px-8 pt-4 pb-3.5 rounded-full border-gray border cursor-pointer`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;