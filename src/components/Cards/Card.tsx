import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

const Card = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={twMerge("w-full h-full rounded-xl bg-primary/80", className)}>{children}</div>;
};
export default memo(Card);
