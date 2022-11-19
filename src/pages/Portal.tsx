import React, {CSSProperties, useEffect} from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  className?: string;
  style?: CSSProperties;
  close: boolean;
  children?: React.ReactNode;
}

export const LoadingPortal: React.FC<PortalProps> = (props) => {
  const { className, style, close, children } = props;

  useEffect(() => {
    document.body.style.overflow = `${close ? "unset" : "hidden"}`;
  }, [close]);

  return createPortal(
    <>
      <div className={`${className} ${close ? "hidden" : "flex"} absolute top-0 left-0 w-screen h-screen bg-white z-999`} style={style}>
        {children}
      </div>
    </>,
    document.getElementById("loading") as HTMLElement
  )
}