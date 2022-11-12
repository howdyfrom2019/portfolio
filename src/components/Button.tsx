import React, { ReactNode } from "react";

const Button: React.FC<{ className?: string, children?: ReactNode }> = ({ className, children }) => {
  return (
    <div className={ `${className} font-genshin px-8 pt-4 pb-3.5 rounded-full border-gray border`}>
      {children}
    </div>
  )
}

export default Button;