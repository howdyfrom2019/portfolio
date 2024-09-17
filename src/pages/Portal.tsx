import React, { CSSProperties, useEffect } from 'react';
import { createPortal } from 'react-dom';

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
    document.body.style.overflow = `${close ? 'unset' : 'hidden'}`;
  }, [close]);

  return createPortal(
    <>
      <div
        className={`${className ? className : ''} ${
          close ? 'hidden' : 'flex'
        } fixed left-0 top-0 z-999 h-screen w-screen bg-white`}
        style={style}
      >
        {children}
      </div>
    </>,
    document.getElementById('loading') as HTMLElement,
  );
};

export const MenuPortal = (props: PortalProps) => {
  const { className, style, close, children } = props;

  useEffect(() => {
    document.body.style.overflow = `${close ? 'unset' : 'hidden'}`;
  }, [close]);

  return createPortal(
    <>
      <div
        className={`${className ? className : ''} ${
          close ? 'hidden' : 'flex'
        } fixed left-0 top-0 z-999 h-screen w-screen cursor-default bg-blackTint transition-all delay-200`}
        style={style}
      >
        {children}
      </div>
    </>,
    document.getElementById('menu') as HTMLElement,
  );
};

export const EmailPortal = (props: PortalProps) => {
  const { className, style, close, children } = props;

  useEffect(() => {
    document.body.style.overflow = `${close ? 'unset' : 'hidden'}`;
  }, [close]);

  return createPortal(
    <>
      <div
        className={`${className ? className : ''} ${
          close ? 'hidden' : 'flex'
        } fixed left-0 top-0 z-999 h-screen w-screen cursor-default bg-emailBg transition-all delay-200`}
        style={style}
      >
        {children}
      </div>
    </>,
    document.getElementById('email') as HTMLElement,
  );
};
