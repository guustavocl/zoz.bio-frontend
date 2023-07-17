import Link from "next/link";
import { memo, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const LinkButtonComponent = ({
  href,
  label,
  onClick,
  className,
  children,
}: {
  href: string;
  label?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      rel="noopener noreferrer"
      className={twMerge(
        "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent",
        "bg-secondary px-4 py-2 text-base font-medium shadow-sm hover:bg-secondary/90 hover:text-violet-300",
        className
      )}
    >
      {label ? label : children}
    </Link>
  );
};

export default memo(LinkButtonComponent);
