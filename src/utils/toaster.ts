import { Id, Slide, ToastOptions, toast } from "react-toastify";

type ErrorProps = {
  message: string;
};

const config: ToastOptions = {
  position: "bottom-center",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  className: "mytoaster",
  theme: "colored",
  transition: Slide,
};

export function successToast(message: string, customConfig = {}) {
  return toast.success(message, { ...config, ...customConfig });
}

export function infoToast(message: string, customConfig = {}) {
  return toast.info(message, { ...config, ...customConfig });
}

export function errorToast(error: string | ErrorProps, customConfig = {}) {
  return toast.error(typeof error === "string" ? error : error.message, { ...config, ...customConfig });
}

export function updateToast(toastId: Id, customConfig = {}) {
  return toast.update(toastId, { ...config, ...customConfig });
}
