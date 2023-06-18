import Link from "next/link";
import { memo, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const LinkComponent = ({
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
        "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap text-base hover:text-secondary",
        className
      )}
    >
      {label ? label : children}
    </Link>
  );
};

export default memo(LinkComponent);
