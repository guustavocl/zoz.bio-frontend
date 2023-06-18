import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";
import Tippy from "@tippyjs/react/headless";

const TooltipComponent = ({
  children,
  content = "",
  className = "",
  backgroundColor = "secondary",
  textVariable,
  bgVariable,
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
            "box z-10 h-full rounded p-1",
            `bg-${backgroundColor} opacity-90 saturate-200 backdrop-blur`,
            className
          )}
          tabIndex={-1}
          style={
            bgVariable && textVariable ? { backgroundColor: `var(${bgVariable})`, color: `var(${textVariable})` } : {}
          }
          {...attrs}
        >
          {content}
          <span
            data-popper-arrow=""
            className={twMerge(
              `bottom-1.5 h-0 w-3 translate-y-5 rotate-45 text-sm text-${backgroundColor}`,
              bgVariable ? "opacity-70 saturate-200 backdrop-blur" : "opacity-90"
            )}
            style={bgVariable ? { color: `var(${bgVariable})` } : {}}
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
