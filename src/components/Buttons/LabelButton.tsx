"use client";
import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

type LabelButtonProps = {
  id: string;
  type?: "button" | "submit" | "reset";
  label?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

const LabelButton = ({
  id,
  label,
  type = "button",
  disabled = false,
  onClick,
  className,
  children,
}: LabelButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap text-base hover:text-secondary",
        className
      )}
    >
      {children ? children : label}
    </button>
  );
};

export default memo(LabelButton);
