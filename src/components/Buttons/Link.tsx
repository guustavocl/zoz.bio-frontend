import Link from "next/link";
import { memo, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type LinkComponentProps = {
  href: string;
  label?: string;
  target?: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

const LinkComponent = ({ href, label, target, onClick, className, children }: LinkComponentProps) => {
  return (
    <Link
      href={href}
      target={target}
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
