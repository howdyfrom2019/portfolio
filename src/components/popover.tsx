import { cn } from '@/lib/utils/tailwind-util';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface PopoverProps {
  className?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

interface ImperativeHandleDispatch {
  showModal: () => void;
  closeModal: () => void;
}

export const Popover = forwardRef<ImperativeHandleDispatch, PopoverProps>(
  ({ defaultOpen, open, onClose, className, children }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        showModal: () => {
          dialogRef.current?.showModal();
        },
        closeModal: () => {
          onClose?.();
          dialogRef.current?.close();
        },
      }),
      [dialogRef.current],
    );

    return (
      <dialog
        className={cn([
          defaultOpen && 'flex',
          open && 'flex',
          'fixed left-0 top-0 z-999 hidden h-screen w-screen bg-white',
          className,
        ])}
        ref={dialogRef}
      >
        {children}
      </dialog>
    );
  },
);

Popover.displayName = 'custom-popover';
