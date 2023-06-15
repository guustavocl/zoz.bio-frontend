import { memo } from "react";
import Tippy from "@tippyjs/react";

const TooltipComponent = ({
  children,
  content = "",
}: {
  children: React.ReactNode;
  content?: string;
  className?: string;
  backgroundColor?: string;
  textVariable?: string;
  bgVariable?: string;
}) => {
  return (
    <Tippy content={content}>
      <span>{children}</span>
    </Tippy>
  );
};

export default memo(TooltipComponent);
