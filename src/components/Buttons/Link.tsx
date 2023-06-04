import React from "react";
import Link from "next/link";
import clsx from "clsx";

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
  children?: JSX.Element[];
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      rel="noopener noreferrer"
      className={clsx(
        className,
        "inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap text-base hover:text-secondary"
      )}
    >
      {label ? label : children}
    </Link>
  );
};

export default React.memo(LinkComponent);
