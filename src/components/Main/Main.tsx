import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

const MainComponent = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <main className={twMerge("container w-full", className)}>{children}</main>;
};

export default memo(MainComponent);
