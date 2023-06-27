import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";
import Tippy from "@tippyjs/react/headless";

const TooltipComponent = ({
  children,
  content = "",
  className = "",
  backgroundColor = "secondary",
}: {
  children: ReactNode;
  content?: string;
  className?: string;
  backgroundColor?: string;
  textVariable?: string;
  bgVariable?: string;
}) => {
  return (
    <Tippy
      render={attrs => (
        <div
          className={twMerge(
            "box z-10 h-full rounded p-1 px-2 font-medium tracking-wide",
            `bg-${backgroundColor} opacity-90 saturate-200 backdrop-blur`,
            className
          )}
          tabIndex={-1}
          {...attrs}
        >
          {content}
          <span
            data-popper-arrow=""
            className={twMerge(
              `bottom-1.5 h-0 w-3 translate-y-5 text-sm text-secondary opacity-90`,
              backgroundColor ? `text-${backgroundColor}` : ""
            )}
          >
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
