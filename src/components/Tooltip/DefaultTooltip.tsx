import { ReactNode, memo } from "react";
import Tippy from "@tippyjs/react";

const TooltipComponent = ({
  children,
  content = "",
  className = "",
}: {
  children: ReactNode;
  content?: string;
  className?: string;
}) => {
  return (
    <Tippy content={content} className={className}>
      <span>{children}</span>
    </Tippy>
  );
};

export default memo(TooltipComponent);
