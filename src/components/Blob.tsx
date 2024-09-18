import React, { ReactNode } from 'react';

const Blob: React.FC<{ className?: string; children?: ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <span
      className={`${className && className} rounded-full bg-[#DFEDFE] p-4 pb-[3px] pt-[2px]`}
    >
      {children}
    </span>
  );
};

export default Blob;
