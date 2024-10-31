import { forwardRef, ReactNode } from "react";

interface DialogProps {
  toggleDialog: () => void;
  children: ReactNode;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ toggleDialog, children }, ref) => {
    return (
      <dialog
        ref={ref}
        onClick={(e) => e.currentTarget === e.target && toggleDialog()}
        className="w-full rounded-lg bg-background p-2 text-xs text-inherit backdrop:bg-neutral-900/75 focus:outline-none lg:w-3/4"
      >
        <div className="flex flex-col gap-8 rounded-md border-2 border-neutral-800 p-4">
          {children}
        </div>
      </dialog>
    );
  },
);

export default Dialog;
