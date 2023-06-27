"use client";
import { successToast } from "@/utils/toaster";
import { memo } from "react";

const CopyLabel = ({ label, textToCopy }: { label: string; textToCopy: string }) => {
  return (
    <span
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
