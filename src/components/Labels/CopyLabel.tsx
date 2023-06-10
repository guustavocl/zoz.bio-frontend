import { successToast } from "@/utils/toaster";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

const CopyLabel = ({ label, className }: { label: string; className: string }) => {
  return (
    <span
      className={twMerge("cursor-pointer text-sm font-semibold tracking-wide", className)}
      onClick={() => {
        successToast(`Copied`);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`https://zoz.bio/${page?.pagename || ""}`);
        }
      }}
    >
      {label}
    </span>
  );
};
export default memo(CopyLabel);
