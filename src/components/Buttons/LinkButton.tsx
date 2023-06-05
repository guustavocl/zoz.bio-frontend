import { memo } from "react";
import Link from "next/link";
import clsx from "clsx";

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
  children?: JSX.Element[];
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      rel="noopener noreferrer"
      className={clsx(
        className,
        "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent",
        "bg-secondary px-4 py-2 text-base font-medium shadow-sm hover:bg-secondary/80 hover:text-violet-300"
      )}
    >
      {label ? label : children}
    </Link>
  );
};

export default memo(LinkButtonComponent);
