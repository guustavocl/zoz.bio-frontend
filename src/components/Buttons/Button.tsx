import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

type ButtonComponentProps = {
  id: string;
  type?: "button" | "submit" | "reset";
  label?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
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
      className={twMerge(
        "text-3x1 group relative flex w-full justify-center rounded bg-secondary px-4 py-2 font-medium text-white",
        "border border-transparent hover:bg-secondary-darker hover:text-violet-300 focus:outline-none active:bg-secondary-darker/80 transition-colors duration-200",
        className
      )}
    >
      {iconAdornment && <span className="absolute left-0 flex items-center pl-3">{iconAdornment}</span>}
      {children ? children : label}
    </button>
  );
};

export default memo(ButtonComponent);
