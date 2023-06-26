import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { memo } from "react";
import { Fragment } from "react";

type ConfirmationDialogProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  message?: string | JSX.Element;
  confirmText?: string;
  doAfterConfirm: () => void;
};

const ConfirmationDialog = ({
  message,
  isOpen,
  confirmText = "Confirm",
  setIsOpen,
  doAfterConfirm,
}: ConfirmationDialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-900 bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-primary p-6 text-left align-middle shadow-xl transition-all md:bg-opacity-90">
                <Dialog.Title as="h3" className="select-none text-center text-lg font-medium leading-6 text-gray-200">
                  {message || "Click confirm to proceed or cancel to go back."}
                </Dialog.Title>

                <div className="flex flex-row gap-2 w-full mt-4">
                  <button
                    className={clsx(
                      "text-3x1 relative group w-full justify-center rounded bg-secondary px-4 py-2 font-medium text-white",
                      "border border-transparent hover:bg-secondary-darker hover:text-violet-300 focus:outline-none active:bg-secondary-darker/80 transition-colors duration-200"
                    )}
                    type="button"
                    onClick={() => {
                      doAfterConfirm();
                      setIsOpen(false);
                    }}
                  >
                    {confirmText}
                  </button>
                  <button
                    className={clsx(
                      "text-3x1 relative group w-full justify-center rounded bg-red-600/50 px-4 py-2 font-medium text-white",
                      "border border-transparent hover:bg-red-700/50 focus:outline-none active:bg-red-900/50 transition-colors duration-200"
                    )}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default memo(ConfirmationDialog);
