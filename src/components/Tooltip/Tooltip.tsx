import { memo } from "react";
import { twMerge } from "tailwind-merge";
import Tippy from "@tippyjs/react/headless";

const TooltipComponent = ({
  children,
  content,
  className = "",
  backgroundColor = "secondary",
}: {
  children: React.ReactNode;
  content: string;
  className?: string;
  backgroundColor?: string;
}) => {
  return (
    <Tippy
      content={content}
      theme="translucent"
      render={attrs => (
        <div
          className={twMerge("box z-10 h-full rounded p-1", `bg-${backgroundColor}`, className)}
          tabIndex={-1}
          {...attrs}
        >
          {content}
          <span data-popper-arrow="" className={`-bottom-4 w-3 translate-y-5 rotate-45 text-${backgroundColor}`}>
            ▼
          </span>
        </div>
      )}
    >
      <span>{children}</span>
    </Tippy>
  );
};

export default memo(TooltipComponent);
