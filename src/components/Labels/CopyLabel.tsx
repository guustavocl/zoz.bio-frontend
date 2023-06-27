"use client";
import { successToast } from "@/utils/toaster";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

const CopyLabel = ({ label, textToCopy, className }: { label: string; textToCopy: string; className?: string }) => {
  return (
    <span
      className={twMerge("cursor-pointer text-lg md:text-sm font-semibold tracking-wide", className)}
      onClick={() => {
        successToast(`Copied`);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy);
        }
      }}
    >
      {label}
    </span>
  );
};
export default memo(CopyLabel);
