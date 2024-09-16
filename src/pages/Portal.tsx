import React, { CSSProperties, useEffect } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  className?: string;
  style?: CSSProperties;
  close: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const LoadingPortal = (props: PortalProps) => {
  const { className, style, close, children } = props;

  useEffect(() => {
    document.body.style.overflow = `${close ? "unset" : "hidden"}`;
  }, [close]);

  return createPortal(
    <>
      <div
        className={`${className ? className : ""} ${
          close ? "hidden" : "flex"
        } fixed top-0 left-0 w-screen h-screen bg-white z-999`}
        style={style}
      >
        {children}
      </div>
    </>,
    document.getElementById("loading") as HTMLElement
  );
};

export const MenuPortal = (props: PortalProps) => {
  const { className, style, close, children } = props;

  useEffect(() => {
    document.body.style.overflow = `${close ? "unset" : "hidden"}`;
  }, [close]);

  return createPortal(
    <>
      <div
        className={`${className ? className : ""} ${
          close ? "hidden" : "flex"
        } fixed top-0 left-0 w-screen h-screen bg-blackTint z-999 transition-all delay-200 cursor-default`}
        style={style}
      >
        {children}
      </div>
    </>,
    document.getElementById("menu") as HTMLElement
  );
};

export const EmailPortal = (props: PortalProps) => {
  const { className, style, close, children } = props;

  useEffect(() => {
    document.body.style.overflow = `${close ? "unset" : "hidden"}`;
  }, [close]);

  return createPortal(
    <>
      <div
        className={`${className ? className : ""} ${
          close ? "hidden" : "flex"
        } fixed top-0 left-0 w-screen h-screen bg-emailBg z-999 transition-all delay-200 cursor-default`}
        style={style}
      >
        {children}
      </div>
    </>,
    document.getElementById("email") as HTMLElement
  );
};
