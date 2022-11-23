import React, {CSSProperties, useEffect} from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  className?: string;
  style?: CSSProperties;
  close: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const LoadingPortal: React.FC<PortalProps> = (props) => {
  const { className, style, close, children } = props;

  useEffect(() => {
    document.body.style.overflow = `${close ? "unset" : "hidden"}`;
  }, [close]);

  return createPortal(
    <>
      <div className={`${className ? className : ""} ${close ? "hidden" : "flex"} fixed top-0 left-0 w-screen h-screen bg-white z-999`} style={style}>
        {children}
      </div>
    </>,
    document.getElementById("loading") as HTMLElement
  )
}

export const MenuPortal: React.FC<PortalProps> = (props) => {
  const { className, style, close, children } = props;

  useEffect(() => {
    document.body.style.overflow = `${close ? "unset" : "hidden"}`;
  }, [close]);

  return createPortal(
    <>
      <div className={`${className ? className : ""} ${close ? "hidden" : "flex"} fixed top-0 left-0 w-screen h-screen bg-blackTint z-999 transition-all delay-200`} style={style}>
        {children}
      </div>
    </>,
    document.getElementById("menu") as HTMLElement
  )
}