import { createContext } from "react";
import { ToastContainer, toast, Id, ToastOptions, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export interface ToastProviderProps {
  children: JSX.Element;
}

export interface ToastContextProps {
  successToast: (message: string, customConfig?: ToastOptions) => Id;
  infoToast: (message: string, customConfig?: ToastOptions) => Id;
  errorToast: (message: string, customConfig?: ToastOptions) => Id;
  updateToast: (toastId: Id, customConfig?: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const config: ToastOptions = {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    className: "customtoastify",
    transition: Slide,
  };

  function successToast(message: string, customConfig = {}) {
    return toast.success(message, { ...config, ...customConfig });
  }

  function infoToast(message: string, customConfig = {}) {
    return toast.info(message, { ...config, ...customConfig });
  }

  function errorToast(message: string, customConfig = {}) {
    return toast.error(message, { ...config, ...customConfig });
  }

  function updateToast(toastId: Id, customConfig = {}) {
    return toast.update(toastId, { ...config, ...customConfig });
  }

  return (
    <ToastContext.Provider value={{ successToast, infoToast, errorToast, updateToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
