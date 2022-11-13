import { useContext } from "react";
import { ToastContext } from ".";

export const useToasts = () => {
  const context = useContext(ToastContext);
  return context;
};
