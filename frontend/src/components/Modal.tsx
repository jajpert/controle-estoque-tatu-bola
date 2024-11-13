import { KeyboardEvent, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    isOpen && (
      <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
        <div onClick={onClose} className="fixed left-0 top-0 z-0 h-screen w-screen bg-neutral-900/75"></div>
        <div className="z-10 m-4 w-full rounded-lg bg-background p-2 text-xs text-inherit lg:w-3/4">
          <div className="flex flex-col gap-8 rounded-md border-2 border-neutral-800 p-4">{children}</div>
        </div>
      </div>
    )
  );
}

export default Modal;
