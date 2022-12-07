import React, {ReactNode} from "react";

const Blob: React.FC<{ className?: string; children?: ReactNode }> = ({ className, children }) => {
  return (
    <span className={`${className && className} pt-[2px] pb-[3px] p-4 bg-[#DFEDFE] rounded-full`}>{children}</span>
  )
}

export default Blob;