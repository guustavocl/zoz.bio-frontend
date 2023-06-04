import React from "react";
import clsx from "clsx";

type ButtonComponentProps = {
  id: string;
  type: "button" | "submit" | "reset";
  label: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: JSX.Element[];
  iconAdornment?: JSX.Element;
};

const ButtonComponent = ({
  id,
  label,
  type = "button",
  disabled = false,
  onClick,
  className,
  children,
  iconAdornment,
}: ButtonComponentProps) => {
  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "text-3x1 group relative mt-4 flex w-full justify-center rounded bg-secondary px-4 py-2 font-medium text-white",
        "border border-transparent hover:bg-secondary-darker hover:text-violet-300 focus:outline-none",
        className
      )}
    >
      {iconAdornment && <span className="absolute left-0 flex items-center pl-3">{iconAdornment}</span>}
      {children ? children : label}
    </button>
  );
};

export default React.memo(ButtonComponent);
