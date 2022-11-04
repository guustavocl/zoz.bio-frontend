import { useContext } from "react";
import { ToastContext } from ".";

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};
