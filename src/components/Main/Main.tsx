import { memo } from "react";
import { twMerge } from "tailwind-merge";

const MainComponent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <main className={twMerge("flex w-full justify-center", className)}>
      <div className="mx-8 flex w-full flex-col items-center md:mx-14 lg:max-w-6xl">{children}</div>
    </main>
  );
};

export default memo(MainComponent);
